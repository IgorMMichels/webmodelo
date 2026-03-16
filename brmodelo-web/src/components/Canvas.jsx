import { useRef, useState, useCallback, useEffect } from 'react';
import useModelStore from '../stores/useModelStore';
import EREntity from './er/EREntity';
import ERRelationship from './er/ERRelationship';
import ERAttribute from './er/ERAttribute';
import ERConnection from './er/ERConnection';
import ERSpecialization from './er/ERSpecialization';
import ERTextBlock from './er/ERTextBlock';
import LogicalTable from './er/LogicalTable';

export default function Canvas() {
    const svgRef = useRef(null);
    const [dragging, setDragging] = useState(null);
    const [panning, setPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [selectionBox, setSelectionBox] = useState(null);
    const [connectingFrom, setConnectingFrom] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const {
        activeModelId, models, zoom, panX, panY, setZoom, setPan,
        activeTool, setActiveTool, addObject, addConnection,
        selectedIds, setSelectedIds, clearSelection, moveObjects,
        updateObject,
    } = useModelStore();

    const model = activeModelId ? models[activeModelId] : null;
    const objects = model ? Object.values(model.objects) : [];
    const connections = model ? Object.values(model.connections) : [];

    const screenToCanvas = useCallback((screenX, screenY) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const rect = svg.getBoundingClientRect();
        return {
            x: (screenX - rect.left - panX) / zoom,
            y: (screenY - rect.top - panY) / zoom,
        };
    }, [zoom, panX, panY]);

    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const newZoom = Math.max(0.2, Math.min(3, zoom * delta));
        const ratio = newZoom / zoom;

        setPan(
            mx - (mx - panX) * ratio,
            my - (my - panY) * ratio,
        );
        setZoom(newZoom);
    }, [zoom, panX, panY, setZoom, setPan]);

    useEffect(() => {
        const svg = svgRef.current;
        if (svg) {
            svg.addEventListener('wheel', handleWheel, { passive: false });
            return () => svg.removeEventListener('wheel', handleWheel);
        }
    }, [handleWheel]);

    const handleMouseDown = useCallback((e) => {
        if (e.target === svgRef.current || e.target.classList.contains('canvas-bg')) {
            const pos = screenToCanvas(e.clientX, e.clientY);

            if (e.button === 1 || (e.button === 0 && e.altKey) || activeTool === 'select' && e.button === 0 && e.shiftKey) {
                setPanning(true);
                setPanStart({ x: e.clientX - panX, y: e.clientY - panY });
                return;
            }

            if (activeTool === 'select') {
                clearSelection();
                setSelectionBox({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
                return;
            }

            // Create objects based on active tool
            if (activeTool === 'entity') {
                addObject({
                    type: 'entity', x: pos.x - 60, y: pos.y - 20,
                    width: 120, height: 40, name: 'Entidade', weak: false,
                });
                setActiveTool('select');
            } else if (activeTool === 'relationship') {
                addObject({
                    type: 'relationship', x: pos.x - 50, y: pos.y - 30,
                    width: 100, height: 60, name: 'Relação',
                });
                setActiveTool('select');
            } else if (activeTool === 'attribute') {
                addObject({
                    type: 'attribute', x: pos.x, y: pos.y,
                    rx: 50, ry: 16, name: 'atributo',
                    identifier: false, multiValued: false, optional: false, composed: false,
                    dataType: '', owner: null,
                });
                setActiveTool('select');
            } else if (activeTool === 'attributeId') {
                addObject({
                    type: 'attribute', x: pos.x, y: pos.y,
                    rx: 50, ry: 16, name: 'identificador',
                    identifier: true, multiValued: false, optional: false, composed: false,
                    dataType: '', owner: null,
                });
                setActiveTool('select');
            } else if (activeTool === 'attributeMulti') {
                addObject({
                    type: 'attribute', x: pos.x, y: pos.y,
                    rx: 50, ry: 16, name: 'multivalorado',
                    identifier: false, multiValued: true, optional: false, composed: false,
                    dataType: '', owner: null,
                });
                setActiveTool('select');
            } else if (activeTool === 'attributeOpt') {
                addObject({
                    type: 'attribute', x: pos.x, y: pos.y,
                    rx: 50, ry: 16, name: 'opcional',
                    identifier: false, multiValued: false, optional: true, composed: false,
                    dataType: '', owner: null,
                });
                setActiveTool('select');
            } else if (activeTool === 'attributeComp') {
                addObject({
                    type: 'attribute', x: pos.x, y: pos.y,
                    rx: 50, ry: 16, name: 'composto',
                    identifier: false, multiValued: false, optional: false, composed: true,
                    dataType: '', owner: null,
                });
                setActiveTool('select');
            } else if (activeTool === 'specialization') {
                addObject({
                    type: 'specialization', x: pos.x - 20, y: pos.y - 20,
                    size: 40, name: 'E', total: false, disjoint: true,
                });
                setActiveTool('select');
            } else if (activeTool === 'text') {
                addObject({
                    type: 'text', x: pos.x, y: pos.y,
                    text: 'Texto',
                });
                setActiveTool('select');
            } else if (activeTool === 'connection') {
                // Start connection mode
                setConnectingFrom(pos);
            } else if (activeTool === 'table') {
                addObject({
                    type: 'table', x: pos.x - 100, y: pos.y - 40,
                    width: 200, height: 88, name: 'Tabela',
                    fields: [
                        { id: `fld_${Date.now()}_1`, name: 'id', type: 'INTEGER', pk: true, fk: false, nn: true },
                        { id: `fld_${Date.now()}_2`, name: 'nome', type: 'VARCHAR(100)', pk: false, fk: false, nn: true },
                    ],
                    pks: ['id'],
                });
                setActiveTool('select');
            }
        }
    }, [activeTool, screenToCanvas, addObject, setActiveTool, clearSelection, panX, panY]);

    const handleMouseMove = useCallback((e) => {
        const pos = screenToCanvas(e.clientX, e.clientY);
        setMousePos(pos);

        if (panning) {
            setPan(e.clientX - panStart.x, e.clientY - panStart.y);
            return;
        }

        if (selectionBox) {
            setSelectionBox(prev => ({ ...prev, x2: pos.x, y2: pos.y }));
            return;
        }

        if (dragging) {
            const dx = (e.movementX) / zoom;
            const dy = (e.movementY) / zoom;
            moveObjects(selectedIds.length > 0 && selectedIds.includes(dragging) ? selectedIds : [dragging], dx, dy);
        }
    }, [panning, selectionBox, dragging, zoom, panStart, screenToCanvas, moveObjects, selectedIds, setPan]);

    const handleMouseUp = useCallback((e) => {
        if (panning) {
            setPanning(false);
            return;
        }

        if (selectionBox) {
            const box = selectionBox;
            const minX = Math.min(box.x1, box.x2);
            const maxX = Math.max(box.x1, box.x2);
            const minY = Math.min(box.y1, box.y2);
            const maxY = Math.max(box.y1, box.y2);

            const selected = objects.filter(obj => {
                const cx = obj.x + (obj.width || obj.rx || 0) / 2;
                const cy = obj.y + (obj.height || obj.ry || 0) / 2;
                return cx >= minX && cx <= maxX && cy >= minY && cy <= maxY;
            }).map(obj => obj.id);

            setSelectedIds(selected);
            setSelectionBox(null);
            return;
        }

        if (dragging) {
            setDragging(null);
            return;
        }

        if (connectingFrom) {
            // Find nearest object for connection target
            const pos = screenToCanvas(e.clientX, e.clientY);
            const target = findObjectAt(pos.x, pos.y);
            if (target) {
                // Find source object closest to connectingFrom
                const source = findObjectAt(connectingFrom.x, connectingFrom.y);
                if (source && source.id !== target.id) {
                    addConnection({
                        from: source.id,
                        to: target.id,
                        fromPoint: { x: connectingFrom.x, y: connectingFrom.y },
                        toPoint: { x: pos.x, y: pos.y },
                    });
                }
            }
            setConnectingFrom(null);
        }
    }, [panning, selectionBox, dragging, connectingFrom, objects, screenToCanvas, addConnection]);

    const findObjectAt = (x, y) => {
        return objects.find(obj => {
            if (obj.type === 'entity') {
                return x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height;
            }
            if (obj.type === 'relationship') {
                const cx = obj.x + obj.width / 2;
                const cy = obj.y + obj.height / 2;
                const dx = Math.abs(x - cx) / (obj.width / 2);
                const dy = Math.abs(y - cy) / (obj.height / 2);
                return dx + dy <= 1;
            }
            if (obj.type === 'attribute') {
                const dx = (x - obj.x) / obj.rx;
                const dy = (y - obj.y) / obj.ry;
                return dx * dx + dy * dy <= 1;
            }
            return false;
        });
    };

    const handleObjectMouseDown = useCallback((e, id) => {
        e.stopPropagation();

        if (activeTool === 'connection') {
            const pos = screenToCanvas(e.clientX, e.clientY);
            setConnectingFrom(pos);
            return;
        }

        if (e.ctrlKey || e.metaKey) {
            useModelStore.getState().toggleSelected(id);
        } else if (!selectedIds.includes(id)) {
            setSelectedIds([id]);
        }
        setDragging(id);
    }, [activeTool, screenToCanvas, selectedIds, setSelectedIds]);

    const handleObjectDoubleClick = useCallback((e, id) => {
        e.stopPropagation();
        const obj = model?.objects[id];
        if (!obj) return;
        const name = prompt('Nome:', obj.name || obj.text || '');
        if (name !== null) {
            if (obj.type === 'text') {
                updateObject(id, { text: name });
            } else {
                updateObject(id, { name });
            }
        }
    }, [model, updateObject]);

    // Render grid pattern
    const gridSize = 20;

    const getConnectionPoints = (conn) => {
        const from = model?.objects[conn.from];
        const to = model?.objects[conn.to];
        if (!from || !to) return null;

        const getCenter = (obj) => {
            if (obj.type === 'entity') return { x: obj.x + obj.width / 2, y: obj.y + obj.height / 2 };
            if (obj.type === 'relationship') return { x: obj.x + obj.width / 2, y: obj.y + obj.height / 2 };
            if (obj.type === 'attribute') return { x: obj.x, y: obj.y };
            if (obj.type === 'specialization') return { x: obj.x + obj.size / 2, y: obj.y + obj.size / 2 };
            if (obj.type === 'table') return { x: obj.x + (obj.width || 200) / 2, y: obj.y + (obj.height || 80) / 2 };
            return { x: obj.x, y: obj.y };
        };

        return { from: getCenter(from), to: getCenter(to) };
    };

    if (!model) {
        return (
            <div className="canvas-container">
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M12 8v8M8 12h8" />
                    </svg>
                    <p>Crie ou abra um modelo para começar</p>
                    <button className="btn btn-primary" onClick={() => useModelStore.getState().createModel('conceptual')}>
                        Novo Modelo Conceitual
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="canvas-container">
            <svg
                ref={svgRef}
                className="canvas-svg"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => { setPanning(false); setDragging(null); }}
                style={{ cursor: panning ? 'grabbing' : (activeTool === 'select' ? 'default' : 'crosshair') }}
            >
                {/* Gradients & Filters */}
                <defs>
                    <pattern id="grid" width={gridSize * zoom} height={gridSize * zoom} patternUnits="userSpaceOnUse"
                        x={panX % (gridSize * zoom)} y={panY % (gridSize * zoom)}>
                        <circle cx={gridSize * zoom / 2} cy={gridSize * zoom / 2} r={0.8} fill="rgba(99,102,241,0.15)" />
                    </pattern>

                    {/* Entity gradient — dark glass */}
                    <linearGradient id="entityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(30,41,59,0.95)" />
                        <stop offset="100%" stopColor="rgba(15,23,42,0.95)" />
                    </linearGradient>

                    {/* Relationship gradient — subtle indigo */}
                    <linearGradient id="relationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(30,41,59,0.92)" />
                        <stop offset="100%" stopColor="rgba(20,30,50,0.95)" />
                    </linearGradient>

                    {/* Attribute gradient — dark teal tint */}
                    <linearGradient id="attrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(25,35,52,0.9)" />
                        <stop offset="100%" stopColor="rgba(15,23,42,0.9)" />
                    </linearGradient>

                    {/* Attribute ID gradient — indigo tint */}
                    <linearGradient id="attrIdGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(49,46,129,0.7)" />
                        <stop offset="100%" stopColor="rgba(30,27,75,0.8)" />
                    </linearGradient>

                    {/* Specialization gradient */}
                    <linearGradient id="specGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(28,38,56,0.9)" />
                        <stop offset="100%" stopColor="rgba(15,23,42,0.92)" />
                    </linearGradient>

                    {/* Selection glow filter */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <rect className="canvas-bg" width="100%" height="100%" fill="url(#grid)" />

                {/* Canvas transform group */}
                <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
                    {/* Connections */}
                    {connections.map(conn => {
                        const points = getConnectionPoints(conn);
                        if (!points) return null;
                        return (
                            <ERConnection
                                key={conn.id}
                                conn={conn}
                                from={points.from}
                                to={points.to}
                                selected={selectedIds.includes(conn.id)}
                            />
                        );
                    })}

                    {/* Connecting line preview */}
                    {connectingFrom && (
                        <line
                            x1={connectingFrom.x} y1={connectingFrom.y}
                            x2={mousePos.x} y2={mousePos.y}
                            stroke="var(--accent-primary)" strokeWidth={1.5} strokeDasharray="4 3"
                        />
                    )}

                    {/* Objects */}
                    {objects.map(obj => {
                        const selected = selectedIds.includes(obj.id);
                        const commonProps = {
                            key: obj.id,
                            obj,
                            selected,
                            onMouseDown: (e) => handleObjectMouseDown(e, obj.id),
                            onDoubleClick: (e) => handleObjectDoubleClick(e, obj.id),
                        };

                        switch (obj.type) {
                            case 'entity':
                                return <EREntity {...commonProps} />;
                            case 'relationship':
                                return <ERRelationship {...commonProps} />;
                            case 'attribute':
                                return <ERAttribute {...commonProps} />;
                            case 'specialization':
                                return <ERSpecialization {...commonProps} />;
                            case 'text':
                                return <ERTextBlock {...commonProps} />;
                            case 'table':
                                return <LogicalTable {...commonProps} />;
                            default:
                                return null;
                        }
                    })}

                    {/* Selection box */}
                    {selectionBox && (
                        <rect
                            className="selection-box"
                            x={Math.min(selectionBox.x1, selectionBox.x2)}
                            y={Math.min(selectionBox.y1, selectionBox.y2)}
                            width={Math.abs(selectionBox.x2 - selectionBox.x1)}
                            height={Math.abs(selectionBox.y2 - selectionBox.y1)}
                        />
                    )}
                </g>
            </svg>
        </div>
    );
}

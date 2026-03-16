export default function ERAttribute({ obj, selected, onMouseDown, onDoubleClick }) {
    const isIdentifier = obj.identifier;
    const isMulti = obj.multiValued;
    const isOptional = obj.optional;
    const isComposed = obj.composed;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Glow on selection */}
            {selected && (
                <ellipse
                    cx={obj.x} cy={obj.y}
                    rx={obj.rx + 4} ry={obj.ry + 4}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    opacity={0.25}
                />
            )}

            {/* Shadow */}
            <ellipse
                cx={obj.x + 1.5} cy={obj.y + 1.5}
                rx={obj.rx} ry={obj.ry}
                fill="rgba(0,0,0,0.2)"
            />

            {/* Outer ring for multivalued */}
            {isMulti && (
                <ellipse
                    cx={obj.x} cy={obj.y}
                    rx={obj.rx + 5} ry={obj.ry + 4}
                    fill="none"
                    stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'}
                    strokeWidth={1.5}
                />
            )}

            {/* Main ellipse */}
            <ellipse
                cx={obj.x} cy={obj.y}
                rx={obj.rx} ry={obj.ry}
                fill={isIdentifier ? 'url(#attrIdGradient)' : 'url(#attrGradient)'}
                stroke={selected ? 'var(--accent-primary)' : (isOptional ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.4)')}
                strokeWidth={selected ? 2 : 1.5}
                strokeDasharray={isOptional ? '4 2' : 'none'}
            />

            {/* Composed indicator line */}
            {isComposed && (
                <line
                    x1={obj.x} y1={obj.y - obj.ry + 3}
                    x2={obj.x} y2={obj.y + obj.ry - 3}
                    stroke="rgba(148,163,184,0.3)"
                    strokeWidth={0.8}
                />
            )}

            {/* Attribute name */}
            <text
                x={obj.x}
                y={obj.y + 4}
                textAnchor="middle"
                fill={isIdentifier ? '#E0E7FF' : '#CBD5E1'}
                fontSize={11}
                fontWeight={isIdentifier ? 600 : 400}
                fontFamily="'Inter', sans-serif"
                textDecoration={isIdentifier ? 'underline' : 'none'}
            >
                {obj.name}
            </text>

            {/* Selection handles */}
            {selected && (
                <>
                    <circle cx={obj.x - obj.rx} cy={obj.y} r={3} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={obj.x + obj.rx} cy={obj.y} r={3} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={obj.x} cy={obj.y - obj.ry} r={3} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={obj.x} cy={obj.y + obj.ry} r={3} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

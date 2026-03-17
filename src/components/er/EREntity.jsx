export default function EREntity({ obj, selected, onMouseDown, onDoubleClick }) {
    const isWeak = obj.weak;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Selection highlight */}
            {selected && (
                <rect
                    x={obj.x - 3} y={obj.y - 3}
                    width={obj.width + 6} height={obj.height + 6}
                    rx={1}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                />
            )}

            {/* Main rectangle */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={1}
                fill="#FFFFFF"
                stroke="#1A1A1A"
                strokeWidth={1.5}
            />

            {/* Inner rectangle for weak entity (Heuser: retângulo duplo) */}
            {isWeak && (
                <rect
                    x={obj.x + 4} y={obj.y + 4}
                    width={obj.width - 8} height={obj.height - 8}
                    rx={1}
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth={1.2}
                />
            )}

            {/* Entity name — Heuser: bold, black, centered */}
            <text
                x={obj.x + obj.width / 2}
                y={obj.y + obj.height / 2 + 5}
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize={13}
                fontWeight={700}
                fontFamily="'Inter', 'Segoe UI', sans-serif"
            >
                {obj.name}
            </text>

            {/* Selection handles */}
            {selected && (
                <>
                    <rect x={obj.x - 3} y={obj.y - 3} width={6} height={6} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <rect x={obj.x + obj.width - 3} y={obj.y - 3} width={6} height={6} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <rect x={obj.x - 3} y={obj.y + obj.height - 3} width={6} height={6} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <rect x={obj.x + obj.width - 3} y={obj.y + obj.height - 3} width={6} height={6} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

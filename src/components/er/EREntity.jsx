export default function EREntity({ obj, selected, onMouseDown, onDoubleClick }) {
    const isWeak = obj.weak;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
            filter="url(#shadow)"
        >
            {/* Main rectangle */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={0}
                fill="#FFFFFF"
                stroke={selected ? '#2563EB' : '#111'}
                strokeWidth={selected ? 2 : 1.2}
            />

            {/* Inner rectangle for weak entity */}
            {isWeak && (
                <rect
                    x={obj.x + 4} y={obj.y + 4}
                    width={obj.width - 8} height={obj.height - 8}
                    rx={0}
                    fill="none"
                    stroke={selected ? '#2563EB' : '#111'}
                    strokeWidth={1}
                />
            )}

            {/* Entity name */}
            <text
                x={obj.x + obj.width / 2}
                y={obj.y + obj.height / 2 + 5}
                textAnchor="middle"
                fill="#111"
                fontSize={12}
                fontWeight={700}
                fontFamily="'Inter', 'Segoe UI', sans-serif"
            >
                {obj.name}
            </text>
        </g>
    );
}

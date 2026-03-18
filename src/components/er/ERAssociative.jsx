export default function ERAssociative({ obj, selected, onMouseDown, onDoubleClick }) {
    // Heuser: retângulo envolvendo losango (entidade associativa)
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;

    // Diamond dimensions inside rectangle (smaller)
    const dw = obj.width * 0.4;
    const dh = obj.height * 0.35;

    const diamondPoints = `${cx},${cy - dh} ${cx + dw},${cy} ${cx},${cy + dh} ${cx - dw},${cy}`;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
            filter="url(#shadow)"
        >
            {/* Outer rectangle — entity part */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={0}
                fill="#FFFFFF"
                stroke={selected ? '#2563EB' : '#111'}
                strokeWidth={selected ? 2 : 1.2}
            />

            {/* Inner diamond — relationship part */}
            <polygon
                points={diamondPoints}
                fill="#FFFFFF"
                stroke={selected ? '#2563EB' : '#111'}
                strokeWidth={1}
                strokeLinejoin="round"
            />

            {/* Name centered */}
            <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="#111"
                fontSize={12}
                fontWeight={600}
                fontFamily="'Inter', 'Segoe UI', sans-serif"
            >
                {obj.name}
            </text>
        </g>
    );
}

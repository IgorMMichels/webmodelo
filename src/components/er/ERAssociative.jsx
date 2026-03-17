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

            {/* Outer rectangle — entity part */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={1}
                fill="#FFFFFF"
                stroke="#1A1A1A"
                strokeWidth={1.5}
            />

            {/* Inner diamond — relationship part */}
            <polygon
                points={diamondPoints}
                fill="#FFFFFF"
                stroke="#1A1A1A"
                strokeWidth={1.2}
                strokeLinejoin="round"
            />

            {/* Name centered */}
            <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize={12}
                fontWeight={600}
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

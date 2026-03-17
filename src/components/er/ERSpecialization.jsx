export default function ERSpecialization({ obj, selected, onMouseDown, onDoubleClick }) {
    const cx = obj.x + obj.size / 2;
    const top = obj.y;
    const halfBase = obj.size * 0.6;
    const bottom = obj.y + obj.size;

    const points = `${cx},${top} ${cx + halfBase},${bottom} ${cx - halfBase},${bottom}`;

    // Heuser notation: 't' = total, 'p' = parcial, 'd' = disjunta (exclusiva)
    const label = obj.exclusive !== false ? (obj.total ? 't' : 'p') : (obj.total ? 't' : 'p');


    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Selection highlight */}
            {selected && (
                <polygon
                    points={points}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    strokeDasharray="6 3"
                    opacity={0.6}
                />
            )}

            {/* Main triangle — Heuser: white fill, black border */}
            <polygon
                points={points}
                fill="#FFFFFF"
                stroke="#1A1A1A"
                strokeWidth={1.5}
                strokeLinejoin="round"
            />

            {/* Total indicator: thick line at base */}
            {obj.total && (
                <line
                    x1={cx - halfBase * 0.7} y1={bottom}
                    x2={cx + halfBase * 0.7} y2={bottom}
                    stroke="#1A1A1A"
                    strokeWidth={3}
                />
            )}

            {/* Type label inside triangle */}
            <text
                x={cx}
                y={bottom - obj.size * 0.3 + 2}
                textAnchor="middle"
                fontSize={11}
                fill="#1A1A1A"
                fontWeight={600}
                fontFamily="'Inter', 'Segoe UI', sans-serif"
            >
                {obj.name || label}
            </text>
        </g>
    );
}

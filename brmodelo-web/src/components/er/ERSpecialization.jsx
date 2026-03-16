export default function ERSpecialization({ obj, selected, onMouseDown, onDoubleClick }) {
    const cx = obj.x + obj.size / 2;
    const top = obj.y;
    const halfBase = obj.size * 0.6;
    const bottom = obj.y + obj.size;

    const points = `${cx},${top} ${cx + halfBase},${bottom} ${cx - halfBase},${bottom}`;
    const shadowPoints = `${cx + 1.5},${top + 1.5} ${cx + halfBase + 1.5},${bottom + 1.5} ${cx - halfBase + 1.5},${bottom + 1.5}`;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Glow */}
            {selected && (
                <polygon
                    points={points}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={4}
                    opacity={0.25}
                />
            )}

            {/* Shadow */}
            <polygon points={shadowPoints} fill="rgba(0,0,0,0.2)" strokeLinejoin="round" />

            {/* Main triangle */}
            <polygon
                points={points}
                fill="url(#specGradient)"
                stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'}
                strokeWidth={selected ? 2 : 1.5}
                strokeLinejoin="round"
            />

            {/* Label */}
            <text
                x={cx}
                y={bottom - obj.size * 0.3 + 2}
                textAnchor="middle"
                fontSize={11}
                fill="#CBD5E1"
                fontWeight={600}
                fontFamily="'Inter', sans-serif"
            >
                {obj.name}
            </text>

            {/* Total/Partial indicator */}
            {obj.total && (
                <line
                    x1={cx - halfBase * 0.5} y1={bottom}
                    x2={cx + halfBase * 0.5} y2={bottom}
                    stroke="var(--accent-primary)"
                    strokeWidth={2}
                />
            )}
        </g>
    );
}

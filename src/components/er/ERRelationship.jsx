export default function ERRelationship({ obj, selected, onMouseDown, onDoubleClick }) {
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;
    const hw = obj.width / 2;
    const hh = obj.height / 2;

    const points = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
            filter="url(#shadow)"
        >
            {/* Main diamond */}
            <polygon
                points={points}
                fill="#FFFFFF"
                stroke={selected ? '#2563EB' : '#111'}
                strokeWidth={selected ? 2 : 1.2}
                strokeLinejoin="round"
            />

            {/* Relationship name */}
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

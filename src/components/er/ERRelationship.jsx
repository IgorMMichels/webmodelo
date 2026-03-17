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

            {/* Main diamond — Heuser: white fill, black border */}
            <polygon
                points={points}
                fill="#FFFFFF"
                stroke="#1A1A1A"
                strokeWidth={1.5}
                strokeLinejoin="round"
            />

            {/* Relationship name */}
            <text
                x={cx}
                y={cy + 4.5}
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize={12}
                fontWeight={600}
                fontFamily="'Inter', 'Segoe UI', sans-serif"
            >
                {obj.name}
            </text>

            {/* Selection handles at diamond vertices */}
            {selected && (
                <>
                    <circle cx={cx} cy={cy - hh} r={3} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <circle cx={cx + hw} cy={cy} r={3} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <circle cx={cx} cy={cy + hh} r={3} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                    <circle cx={cx - hw} cy={cy} r={3} fill="var(--accent-primary)" stroke="#fff" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

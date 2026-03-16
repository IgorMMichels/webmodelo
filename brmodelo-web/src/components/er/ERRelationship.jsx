export default function ERRelationship({ obj, selected, onMouseDown, onDoubleClick }) {
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;
    const hw = obj.width / 2;
    const hh = obj.height / 2;

    const points = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;
    const shadowPoints = `${cx + 2},${cy - hh + 2} ${cx + hw + 2},${cy + 2} ${cx + 2},${cy + hh + 2} ${cx - hw + 2},${cy + 2}`;

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
            <polygon points={shadowPoints} fill="rgba(0,0,0,0.25)" />

            {/* Main diamond */}
            <polygon
                points={points}
                fill="url(#relationGradient)"
                stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'}
                strokeWidth={selected ? 2 : 1.5}
                strokeLinejoin="round"
            />

            {/* Name */}
            <text
                x={cx}
                y={cy + 4.5}
                textAnchor="middle"
                fill="#F1F5F9"
                fontSize={12}
                fontWeight={500}
                fontFamily="'Inter', sans-serif"
            >
                {obj.name}
            </text>

            {/* Selection handles */}
            {selected && (
                <>
                    <circle cx={cx} cy={cy - hh} r={3.5} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={cx + hw} cy={cy} r={3.5} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={cx} cy={cy + hh} r={3.5} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <circle cx={cx - hw} cy={cy} r={3.5} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

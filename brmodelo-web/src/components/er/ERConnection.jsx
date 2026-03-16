export default function ERConnection({ conn, from, to, selected }) {
    // Calculate midpoint for cardinality labels
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    // Calculate positions closer to each endpoint for card. labels
    const fromLabelX = from.x + (to.x - from.x) * 0.18;
    const fromLabelY = from.y + (to.y - from.y) * 0.18;
    const toLabelX = from.x + (to.x - from.x) * 0.82;
    const toLabelY = from.y + (to.y - from.y) * 0.82;

    // Offset labels perpendicular to the line
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const offset = 14;

    return (
        <g className={`er-connection ${selected ? 'selected' : ''}`}>
            {/* Shadow line */}
            <line
                x1={from.x + 1} y1={from.y + 1}
                x2={to.x + 1} y2={to.y + 1}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth={2}
            />

            {/* Main line */}
            <line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.5)'}
                strokeWidth={selected ? 2 : 1.5}
            />

            {/* Cardinality from */}
            {conn.cardFrom && (
                <>
                    <rect
                        x={fromLabelX + nx * offset - 14}
                        y={fromLabelY + ny * offset - 9}
                        width={28} height={18}
                        rx={4}
                        fill="rgba(15,23,42,0.85)"
                        stroke="rgba(99,102,241,0.3)"
                        strokeWidth={0.8}
                    />
                    <text
                        x={fromLabelX + nx * offset}
                        y={fromLabelY + ny * offset + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill="#A5B4FC"
                        fontFamily="'JetBrains Mono', monospace"
                    >
                        ({conn.cardFrom})
                    </text>
                </>
            )}

            {/* Cardinality to */}
            {conn.cardTo && (
                <>
                    <rect
                        x={toLabelX + nx * offset - 14}
                        y={toLabelY + ny * offset - 9}
                        width={28} height={18}
                        rx={4}
                        fill="rgba(15,23,42,0.85)"
                        stroke="rgba(99,102,241,0.3)"
                        strokeWidth={0.8}
                    />
                    <text
                        x={toLabelX + nx * offset}
                        y={toLabelY + ny * offset + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill="#A5B4FC"
                        fontFamily="'JetBrains Mono', monospace"
                    >
                        ({conn.cardTo})
                    </text>
                </>
            )}

            {/* Connection endpoints */}
            <circle cx={from.x} cy={from.y} r={2.5} fill={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'} />
            <circle cx={to.x} cy={to.y} r={2.5} fill={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'} />
        </g>
    );
}

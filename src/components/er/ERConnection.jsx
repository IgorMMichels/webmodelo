export default function ERConnection({ conn, from, to, selected }) {
    // Calculate positions for cardinality labels near each endpoint
    const fromLabelX = from.x + (to.x - from.x) * 0.2;
    const fromLabelY = from.y + (to.y - from.y) * 0.2;
    const toLabelX = from.x + (to.x - from.x) * 0.8;
    const toLabelY = from.y + (to.y - from.y) * 0.8;

    // Offset labels perpendicular to the line
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const offset = 14;

    return (
        <g className={`er-connection ${selected ? 'selected' : ''}`}>
            {/* Main line — Heuser: solid black, thin */}
            <line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={selected ? 'var(--accent-primary)' : '#1A1A1A'}
                strokeWidth={selected ? 2 : 1.2}
            />

            {/* Cardinality from — Heuser: simple text (min,max) */}
            {conn.cardFrom && (
                <text
                    x={fromLabelX + nx * offset}
                    y={fromLabelY + ny * offset + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={500}
                    fill="#1A1A1A"
                    fontFamily="'Inter', 'Segoe UI', sans-serif"
                >
                    ({conn.cardFrom})
                </text>
            )}

            {/* Cardinality to — Heuser: simple text (min,max) */}
            {conn.cardTo && (
                <text
                    x={toLabelX + nx * offset}
                    y={toLabelY + ny * offset + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={500}
                    fill="#1A1A1A"
                    fontFamily="'Inter', 'Segoe UI', sans-serif"
                >
                    ({conn.cardTo})
                </text>
            )}

            {/* Role label for auto-relationships */}
            {conn.roleFrom && (
                <text
                    x={fromLabelX - nx * offset}
                    y={fromLabelY - ny * offset + 4}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#666"
                    fontStyle="italic"
                    fontFamily="'Inter', 'Segoe UI', sans-serif"
                >
                    {conn.roleFrom}
                </text>
            )}

            {conn.roleTo && (
                <text
                    x={toLabelX - nx * offset}
                    y={toLabelY - ny * offset + 4}
                    textAnchor="middle"
                    fontSize={9}
                    fill="#666"
                    fontStyle="italic"
                    fontFamily="'Inter', 'Segoe UI', sans-serif"
                >
                    {conn.roleTo}
                </text>
            )}
        </g>
    );
}

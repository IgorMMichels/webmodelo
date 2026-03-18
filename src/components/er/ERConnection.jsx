export default function ERConnection({ conn, from, to, selected, lineIndex = 0 }) {
    // Define a consistent direction for the normal vector (nx, ny)
    // based on comparing object IDs. This ensures parallel connections
    // have their labels on the SAME side of the line.
    const isReversed = conn.from > conn.to;
    const baseDx = isReversed ? (from.x - to.x) : (to.x - from.x);
    const baseDy = isReversed ? (from.y - to.y) : (to.y - from.y);
    const baseLen = Math.sqrt(baseDx * baseDx + baseDy * baseDy) || 1;

    // Consistent Normal: -dy, dx from the stabilized direction
    const cnx = -baseDy / baseLen;
    const cny = baseDx / baseLen;

    // Stagger labels along the line segment
    const shiftStart = 0.18 + (lineIndex * 0.22);
    const shiftEnd = 0.82 - (lineIndex * 0.22);

    const fromLabelX = from.x + (to.x - from.x) * shiftStart;
    const fromLabelY = from.y + (to.y - from.y) * shiftStart;
    const toLabelX = from.x + (to.x - from.x) * shiftEnd;
    const toLabelY = from.y + (to.y - from.y) * shiftEnd;

    const offset = 14;

    const formatLabel = (role, card) => {
        if (!role && !card) return null;
        let c = card ? (card.startsWith('(') ? card : `(${card})`) : '';
        return { role, card: c };
    };

    const labelFromData = formatLabel(conn.roleFrom, conn.cardFrom);
    const labelToData = formatLabel(conn.roleTo, conn.cardTo);

    const margin = 18;

    return (
        <g className={`er-connection ${selected ? 'selected' : ''}`}>
            {/* Main line */}
            <line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={selected ? '#2563EB' : '#111'}
                strokeWidth={selected ? 2 : 1}
            />

            {labelFromData && (
                <text
                    x={fromLabelX + cnx * margin}
                    y={fromLabelY + cny * margin + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill={selected ? '#2563EB' : '#222'}
                    fontFamily="'Inter', sans-serif"
                    filter="url(#label-bg)"
                >
                    {labelFromData.role && <tspan x={fromLabelX + cnx * margin} dy="-0.2em" fontSize={10} fontWeight={400} fill="#64748B">{labelFromData.role}</tspan>}
                    <tspan x={fromLabelX + cnx * margin} dy={labelFromData.role ? "1.1em" : "0"}>{labelFromData.card}</tspan>
                </text>
            )}

            {labelToData && (
                <text
                    x={toLabelX + cnx * margin}
                    y={toLabelY + cny * margin + 4}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill={selected ? '#2563EB' : '#222'}
                    fontFamily="'Inter', sans-serif"
                    filter="url(#label-bg)"
                >
                    {labelToData.role && <tspan x={toLabelX + cnx * margin} dy="-0.2em" fontSize={10} fontWeight={400} fill="#64748B">{labelToData.role}</tspan>}
                    <tspan x={toLabelX + cnx * margin} dy={labelToData.role ? "1.1em" : "0"}>{labelToData.card}</tspan>
                </text>
            )}
        </g>
    );
}

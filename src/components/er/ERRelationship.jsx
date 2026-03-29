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
                className={`fill-white ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800 stroke-[1.2px]'} stroke-linejoin-round`}
            />

            {/* Relationship name */}
            <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                className="fill-slate-800 text-xs font-semibold font-sans"
            >
                {obj.name}
            </text>
        </g>
    );
}

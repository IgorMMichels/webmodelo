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
            filter="url(#shadow)"
        >
            {/* Main triangle */}
            <polygon
                points={points}
                className={`fill-white ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800 stroke-[1.2px]'} stroke-linejoin-round`}
            />

            {/* Total indicator: thick line at base */}
            {obj.total && (
                <line
                    x1={cx - halfBase * 0.7} y1={bottom}
                    x2={cx + halfBase * 0.7} y2={bottom}
                    className={`${selected ? 'stroke-blue-600' : 'stroke-slate-800'} stroke-[3px]`}
                />
            )}

            {/* Type label inside triangle */}
            <text
                x={cx}
                y={bottom - obj.size * 0.3 + 2}
                textAnchor="middle"
                className="fill-slate-800 text-[11px] font-semibold font-sans"
            >
                {obj.name || label}
            </text>
        </g>
    );
}

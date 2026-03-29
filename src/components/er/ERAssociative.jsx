export default function ERAssociative({ obj, selected, onMouseDown, onDoubleClick }) {
    // Heuser: retângulo envolvendo losango (entidade associativa)
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;

    // Diamond dimensions inside rectangle (smaller)
    const dw = obj.width * 0.4;
    const dh = obj.height * 0.35;

    const diamondPoints = `${cx},${cy - dh} ${cx + dw},${cy} ${cx},${cy + dh} ${cx - dw},${cy}`;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
            filter="url(#shadow)"
        >
            {/* Outer rectangle — entity part */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={0}
                className={`fill-white ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800 stroke-[1.2px]'}`}
            />

            {/* Inner diamond — relationship part */}
            <polygon
                points={diamondPoints}
                className={`fill-white ${selected ? 'stroke-blue-600' : 'stroke-slate-800'} stroke-1 stroke-linejoin-round`}
            />

            {/* Name centered */}
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

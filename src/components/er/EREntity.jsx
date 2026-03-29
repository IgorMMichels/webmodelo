export default function EREntity({ obj, selected, onMouseDown, onDoubleClick }) {
    const isWeak = obj.weak;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
            filter="url(#shadow)"
        >
            {/* Main rectangle */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={0}
                className={`fill-white ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800 stroke-[1.2px]'}`}
            />

            {/* Inner rectangle for weak entity */}
            {isWeak && (
                <rect
                    x={obj.x + 4} y={obj.y + 4}
                    width={obj.width - 8} height={obj.height - 8}
                    rx={0}
                    className={`fill-transparent fill-none ${selected ? 'stroke-blue-600' : 'stroke-slate-800'} stroke-1`}
                />
            )}

            {/* Entity name */}
            <text
                x={obj.x + obj.width / 2}
                y={obj.y + obj.height / 2 + 5}
                textAnchor="middle"
                className="fill-slate-800 text-xs font-bold font-sans"
            >
                {obj.name}
            </text>
        </g>
    );
}

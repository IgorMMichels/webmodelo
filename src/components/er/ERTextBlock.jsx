export default function ERTextBlock({ obj, selected, onMouseDown, onDoubleClick }) {
    const textLen = (obj.text?.length || 4) * 7 + 12;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {selected && (
                <rect
                    x={obj.x - 6}
                    y={obj.y - 16}
                    width={textLen}
                    height={24}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={1.5}
                    strokeDasharray="4 2"
                    rx={3}
                    opacity={0.5}
                />
            )}

            <text
                x={obj.x}
                y={obj.y}
                className="fill-slate-400 text-xs font-sans italic"
            >
                {obj.text}
            </text>
        </g>
    );
}

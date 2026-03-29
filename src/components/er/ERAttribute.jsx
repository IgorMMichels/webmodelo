export default function ERAttribute({ obj, selected, onMouseDown, onDoubleClick }) {
    const isIdentifier = obj.identifier;
    const isMulti = obj.multiValued;
    const isOptional = obj.optional;


    // Position text to the right of the circle
    const textX = obj.x + 12;
    const textY = obj.y + 4;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Main Attribute Ball - Blue strokes in brModelo 2.0 */}
            <circle
                cx={obj.x} cy={obj.y}
                r={4}
                className={`${isIdentifier ? 'fill-slate-800' : 'fill-white'} ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800 stroke-[1.2px]'} ${isOptional && !isIdentifier ? 'stroke-dashed border-dashed dasharray-[2,1]' : ''}`}
                strokeDasharray={isOptional && !isIdentifier ? '2 1' : 'none'}
            />

            {/* Multivalued outer ring */}
            {isMulti && (
                <circle
                    cx={obj.x} cy={obj.y}
                    r={6}
                    className={`fill-none ${selected ? 'stroke-blue-600 stroke-2' : 'stroke-slate-800'} stroke-1`}
                />
            )}

            {/* Text Label */}
            <text
                x={textX}
                y={textY}
                textAnchor="start"
                className={`fill-slate-800 text-xs font-sans ${isIdentifier ? 'font-semibold' : 'font-normal'}`}
            >
                {obj.name}
            </text>
        </g>
    );
}

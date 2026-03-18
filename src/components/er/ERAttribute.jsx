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
                fill={isIdentifier ? '#003366' : '#FFFFFF'}
                stroke={selected ? '#2563EB' : '#003366'}
                strokeWidth={selected ? 2 : 1.2}
                strokeDasharray={isOptional && !isIdentifier ? '2 1' : 'none'}
            />

            {/* Multivalued outer ring */}
            {isMulti && (
                <circle
                    cx={obj.x} cy={obj.y}
                    r={6}
                    fill="none"
                    stroke={selected ? '#2563EB' : '#003366'}
                    strokeWidth={1}
                />
            )}

            {/* Text Label */}
            <text
                x={textX}
                y={textY}
                textAnchor="start"
                fill="#111"
                fontSize={12}
                fontWeight={isIdentifier ? 600 : 400}
                fontFamily="var(--font-ui)"
            >
                {obj.name}
            </text>
        </g>
    );
}

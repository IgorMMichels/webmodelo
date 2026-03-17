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
            {/* Selection highlight box / glow */}
            {selected && (
                <circle
                    cx={obj.x} cy={obj.y}
                    r={10}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    opacity={0.6}
                />
            )}

            {/* Multivalued outer ring */}
            {isMulti && (
                <circle
                    cx={obj.x} cy={obj.y}
                    r={8}
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth={1.2}
                />
            )}

            {/* Main Attribute Ball */}
            <circle
                cx={obj.x} cy={obj.y}
                r={5}
                fill={isIdentifier ? '#1A1A1A' : '#FFFFFF'}
                stroke={isIdentifier ? 'none' : '#1A1A1A'}
                strokeWidth={1.5}
                strokeDasharray={isOptional && !isIdentifier ? '2 1' : 'none'}
            />

            {/* Text Label */}
            <text
                x={textX}
                y={textY}
                textAnchor="start"
                fill="#1A1A1A"
                fontSize={12}
                fontWeight={isIdentifier ? 600 : 400}
                fontFamily="var(--font-ui)"
                textDecoration={isIdentifier ? 'underline' : 'none'}
            >
                {obj.name}
            </text>
        </g>
    );
}

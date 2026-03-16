export default function EREntity({ obj, selected, onMouseDown, onDoubleClick }) {
    const isWeak = obj.weak;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Glow effect on selection */}
            {selected && (
                <rect
                    x={obj.x - 3} y={obj.y - 3}
                    width={obj.width + 6} height={obj.height + 6}
                    rx={4}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={2}
                    opacity={0.5}
                    filter="url(#glow)"
                />
            )}

            {/* Shadow */}
            <rect
                x={obj.x + 2} y={obj.y + 2}
                width={obj.width} height={obj.height}
                rx={3}
                fill="rgba(0,0,0,0.3)"
            />

            {/* Main rectangle — gradient fill */}
            <rect
                x={obj.x} y={obj.y}
                width={obj.width} height={obj.height}
                rx={3}
                fill="url(#entityGradient)"
                stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.4)'}
                strokeWidth={selected ? 2 : 1.5}
            />

            {/* Inner border for weak entity */}
            {isWeak && (
                <rect
                    x={obj.x + 4} y={obj.y + 4}
                    width={obj.width - 8} height={obj.height - 8}
                    rx={2}
                    fill="none"
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth={1.2}
                />
            )}

            {/* Entity name */}
            <text
                x={obj.x + obj.width / 2}
                y={obj.y + obj.height / 2 + 5}
                textAnchor="middle"
                fill="#F1F5F9"
                fontSize={13}
                fontWeight={600}
                fontFamily="'Inter', sans-serif"
                letterSpacing="0.3"
            >
                {obj.name}
            </text>

            {/* Selection handles */}
            {selected && (
                <>
                    <rect x={obj.x - 3.5} y={obj.y - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x + obj.width - 3.5} y={obj.y - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x - 3.5} y={obj.y + obj.height - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x + obj.width - 3.5} y={obj.y + obj.height - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

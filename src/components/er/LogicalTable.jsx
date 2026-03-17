/**
 * LogicalTable.jsx — SVG table component for the logical model
 * Renders a table with header, fields (PK/FK/NN indicators), in the dark theme
 */
export default function LogicalTable({ obj, selected, onMouseDown, onDoubleClick }) {
    const fields = obj.fields || [];
    const headerH = 32;
    const fieldH = 22;
    const w = obj.width || 200;
    const totalH = headerH + fields.length * fieldH + 4;

    return (
        <g
            className={`er-object ${selected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
            style={{ cursor: 'move' }}
        >
            {/* Glow */}
            {selected && (
                <rect
                    x={obj.x - 3} y={obj.y - 3}
                    width={w + 6} height={totalH + 6}
                    rx={6}
                    fill="none"
                    stroke="var(--accent-primary)"
                    strokeWidth={2}
                    opacity={0.4}
                    filter="url(#glow)"
                />
            )}

            {/* Shadow */}
            <rect
                x={obj.x + 3} y={obj.y + 3}
                width={w} height={totalH}
                rx={4}
                fill="rgba(0,0,0,0.35)"
            />

            {/* Table body */}
            <rect
                x={obj.x} y={obj.y}
                width={w} height={totalH}
                rx={4}
                fill="url(#entityGradient)"
                stroke={selected ? 'var(--accent-primary)' : 'rgba(148,163,184,0.35)'}
                strokeWidth={selected ? 2 : 1}
            />

            {/* Header background */}
            <rect
                x={obj.x} y={obj.y}
                width={w} height={headerH}
                rx={4}
                fill="rgba(99,102,241,0.2)"
            />
            {/* Bottom corners of header are square */}
            <rect
                x={obj.x} y={obj.y + headerH - 4}
                width={w} height={4}
                fill="rgba(99,102,241,0.2)"
            />

            {/* Header separator */}
            <line
                x1={obj.x} y1={obj.y + headerH}
                x2={obj.x + w} y2={obj.y + headerH}
                stroke="rgba(148,163,184,0.2)"
                strokeWidth={1}
            />

            {/* Table name */}
            <text
                x={obj.x + w / 2}
                y={obj.y + headerH / 2 + 5}
                textAnchor="middle"
                fill="#E0E7FF"
                fontSize={13}
                fontWeight={700}
                fontFamily="'Inter', sans-serif"
                letterSpacing="0.3"
            >
                {obj.name}
            </text>

            {/* Fields */}
            {fields.map((field, i) => {
                const fy = obj.y + headerH + i * fieldH + 4;

                return (
                    <g key={field.id || i}>
                        {/* Alternating row bg */}
                        {i % 2 === 0 && (
                            <rect
                                x={obj.x + 1} y={fy - 2}
                                width={w - 2} height={fieldH}
                                fill="rgba(255,255,255,0.02)"
                            />
                        )}

                        {/* PK icon */}
                        {field.pk && (
                            <text
                                x={obj.x + 10} y={fy + 13}
                                fontSize={10} fontWeight={700}
                                fill="#FBBF24"
                                fontFamily="'JetBrains Mono', monospace"
                            >
                                PK
                            </text>
                        )}

                        {/* FK icon */}
                        {field.fk && !field.pk && (
                            <text
                                x={obj.x + 10} y={fy + 13}
                                fontSize={10} fontWeight={600}
                                fill="#60A5FA"
                                fontFamily="'JetBrains Mono', monospace"
                            >
                                FK
                            </text>
                        )}

                        {/* Field name */}
                        <text
                            x={obj.x + (field.pk || field.fk ? 32 : 10)}
                            y={fy + 13}
                            fontSize={11}
                            fill={field.pk ? '#FEF3C7' : (field.fk ? '#BFDBFE' : '#CBD5E1')}
                            fontWeight={field.pk ? 600 : 400}
                            fontFamily="'JetBrains Mono', monospace"
                            textDecoration={field.pk ? 'underline' : 'none'}
                        >
                            {field.name}
                        </text>

                        {/* Type */}
                        <text
                            x={obj.x + w - 8}
                            y={fy + 13}
                            textAnchor="end"
                            fontSize={9}
                            fill="#64748B"
                            fontFamily="'JetBrains Mono', monospace"
                        >
                            {field.type}
                        </text>

                        {/* NN indicator */}
                        {field.nn && !field.pk && (
                            <circle
                                cx={obj.x + w - 50}
                                cy={fy + 9}
                                r={2.5}
                                fill="#F87171"
                                opacity={0.6}
                            />
                        )}
                    </g>
                );
            })}

            {/* Selection handles */}
            {selected && (
                <>
                    <rect x={obj.x - 3.5} y={obj.y - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x + w - 3.5} y={obj.y - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x - 3.5} y={obj.y + totalH - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                    <rect x={obj.x + w - 3.5} y={obj.y + totalH - 3.5} width={7} height={7} rx={1} fill="var(--accent-primary)" stroke="#0F172A" strokeWidth={1} />
                </>
            )}
        </g>
    );
}

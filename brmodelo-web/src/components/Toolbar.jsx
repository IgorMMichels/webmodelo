import useModelStore from '../stores/useModelStore';

/* Custom SVG icons matching brModelo's original toolbar style */
const icons = {
    select: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M5 3l14 9-7 2-3 7z" fill="#22C55E" stroke="#166534" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    entity: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="6" width="18" height="12" rx="1" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        </svg>
    ),
    relationship: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 22,12 12,20 2,12" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        </svg>
    ),
    attribute: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <ellipse cx="12" cy="12" rx="9" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        </svg>
    ),
    attributeId: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <ellipse cx="12" cy="12" rx="9" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
            <line x1="5" y1="16" x2="19" y2="16" stroke="#334155" strokeWidth="1.2" />
        </svg>
    ),
    attributeMulti: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <ellipse cx="12" cy="12" rx="10" ry="7" fill="none" stroke="#334155" strokeWidth="1.2" />
            <ellipse cx="12" cy="12" rx="7" ry="5" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        </svg>
    ),
    attributeOpt: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <ellipse cx="12" cy="12" rx="9" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
    ),
    attributeComp: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <ellipse cx="12" cy="12" rx="9" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
            <line x1="12" y1="6" x2="12" y2="18" stroke="#334155" strokeWidth="0.8" />
        </svg>
    ),
    specialization: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 22,20 2,20" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    connection: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#64748B" strokeWidth="2" />
            <circle cx="4" cy="4" r="2.5" fill="#6366F1" />
            <circle cx="20" cy="20" r="2.5" fill="#6366F1" />
        </svg>
    ),
    selfRelation: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="8" width="10" height="8" rx="1" fill="#F8FAFC" stroke="#334155" strokeWidth="1.2" />
            <path d="M13 12 Q20 4 20 12 Q20 20 13 12" fill="none" stroke="#334155" strokeWidth="1.2" />
        </svg>
    ),
    associative: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="2" y="5" width="20" height="14" rx="1" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
            <polygon points="12,7 18,12 12,17 6,12" fill="none" stroke="#334155" strokeWidth="1.2" />
        </svg>
    ),
    text: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <text x="4" y="18" fontSize="16" fontWeight="bold" fill="#3B82F6" fontFamily="serif">A</text>
        </svg>
    ),
    line: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="4" y1="20" x2="20" y2="4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    // Logical model icons
    table: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
            <line x1="3" y1="9" x2="21" y2="9" stroke="#6366F1" strokeWidth="1.5" />
            <line x1="3" y1="14" x2="21" y2="14" stroke="#334155" strokeWidth="0.8" />
        </svg>
    ),
    logicalConnection: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="4" y1="12" x2="20" y2="12" stroke="#64748B" strokeWidth="2" />
            <circle cx="4" cy="12" r="3" fill="#FBBF24" />
            <text x="3" y="14" fontSize="6" fontWeight="bold" fill="#000" fontFamily="monospace">1</text>
            <circle cx="20" cy="12" r="3" fill="#60A5FA" />
            <text x="18" y="14" fontSize="6" fontWeight="bold" fill="#000" fontFamily="monospace">N</text>
        </svg>
    ),
};

const conceptualTools = [
    { id: 'select', label: 'Selecionar (V)', icon: 'select' },
    { divider: true },
    { id: 'entity', label: 'Entidade', icon: 'entity' },
    { id: 'relationship', label: 'Relacionamento', icon: 'relationship' },
    { id: 'attribute', label: 'Atributo', icon: 'attribute' },
    { id: 'attributeId', label: 'Atributo Identificador', icon: 'attributeId' },
    { id: 'attributeMulti', label: 'Atributo Multivalorado', icon: 'attributeMulti' },
    { id: 'attributeOpt', label: 'Atributo Opcional', icon: 'attributeOpt' },
    { id: 'attributeComp', label: 'Atributo Composto', icon: 'attributeComp' },
    { divider: true },
    { id: 'specialization', label: 'Generalização/Especialização', icon: 'specialization' },
    { id: 'connection', label: 'Ligação', icon: 'connection' },
    { id: 'selfRelation', label: 'Auto-Relacionamento', icon: 'selfRelation' },
    { id: 'associative', label: 'Entidade Associativa', icon: 'associative' },
    { divider: true },
    { id: 'text', label: 'Texto', icon: 'text' },
    { id: 'line', label: 'Linha', icon: 'line' },
];

const logicalTools = [
    { id: 'select', label: 'Selecionar (V)', icon: 'select' },
    { divider: true },
    { id: 'table', label: 'Tabela', icon: 'table' },
    { id: 'logicalConnection', label: 'Conexão FK', icon: 'logicalConnection' },
    { divider: true },
    { id: 'text', label: 'Texto', icon: 'text' },
];

export default function Toolbar() {
    const { activeTool, setActiveTool, activeModelId, models } = useModelStore();
    const model = activeModelId ? models[activeModelId] : null;
    const isLogical = model?.type === 'logical';
    const tools = isLogical ? logicalTools : conceptualTools;

    return (
        <div className="toolbar">
            {tools.map((tool, i) => {
                if (tool.divider) {
                    return <div key={`div-${i}`} className="toolbar-divider" />;
                }
                return (
                    <button
                        key={tool.id}
                        className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                        onClick={() => setActiveTool(tool.id)}
                        title={tool.label}
                    >
                        {icons[tool.icon]}
                        <span className="tool-tooltip">{tool.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

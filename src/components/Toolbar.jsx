import useModelStore from '../stores/useModelStore';

/* Custom SVG icons matching brModelo's original toolbar style */
const icons = {
    select: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M5 3l14 9-7 2-3 7z" fill="#f8fafc" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    entity: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="6" width="18" height="12" rx="0" fill="#F8FAFC" stroke="#111" strokeWidth="1.5" />
        </svg>
    ),
    relationship: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 22,12 12,20 2,12" fill="#F8FAFC" stroke="#111" strokeWidth="1.5" />
        </svg>
    ),
    attribute: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="6" fill="#F8FAFC" stroke="#003366" strokeWidth="1.5" />
        </svg>
    ),
    attributeId: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="6" fill="#003366" stroke="#003366" strokeWidth="1.5" />
        </svg>
    ),
    attributeMulti: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="8" fill="none" stroke="#003366" strokeWidth="1" />
            <circle cx="12" cy="12" r="5" fill="#F8FAFC" stroke="#003366" strokeWidth="1.5" />
        </svg>
    ),
    attributeOpt: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="6" fill="#F8FAFC" stroke="#003366" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
    ),
    attributeComp: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="6" fill="#F8FAFC" stroke="#003366" strokeWidth="1.5" />
            <line x1="12" y1="6" x2="12" y2="18" stroke="#003366" strokeWidth="1" />
        </svg>
    ),
    specialization: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 22,20 2,20" fill="#F8FAFC" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    ),
    connection: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="4" y1="4" x2="20" y2="20" stroke="#111" strokeWidth="1.5" />
            <circle cx="4" cy="4" r="2.5" fill="#2563EB" stroke="#1e40af" strokeWidth={0.5} />
            <circle cx="20" cy="20" r="2.5" fill="#2563EB" stroke="#1e40af" strokeWidth={0.5} />
        </svg>
    ),
    selfRelation: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="10" width="10" height="8" rx="0" fill="#F8FAFC" stroke="#111" strokeWidth="1.2" />
            <path d="M13 14 Q20 6 20 14 Q20 22 13 14" fill="none" stroke="#111" strokeWidth="1.2" />
        </svg>
    ),
    associative: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="2" y="5" width="20" height="14" rx="0" fill="#F8FAFC" stroke="#111" strokeWidth="1.5" />
            <polygon points="12,7 18,12 12,17 6,12" fill="none" stroke="#111" strokeWidth="1" />
        </svg>
    ),
    text: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <text x="4" y="18" fontSize="16" fontWeight="bold" fill="#2563EB" fontFamily="serif">A</text>
        </svg>
    ),
    specExclusive: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 18,12 6,12" fill="#F8FAFC" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
            <line x1="12" y1="12" x2="12" y2="16" stroke="#111" strokeWidth="1" />
            <line x1="7" y1="16" x2="17" y2="16" stroke="#111" strokeWidth="1" />
            <rect x="4" y="16" width="6" height="4" fill="#F8FAFC" stroke="#111" strokeWidth="1" />
            <rect x="14" y="16" width="6" height="4" fill="#F8FAFC" stroke="#111" strokeWidth="1" />
        </svg>
    ),
    specNonExclusive: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <polygon points="12,4 18,12 6,12" fill="#F8FAFC" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
            <path d="M7 9 Q12 14 17 9" fill="none" stroke="#111" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="12" y1="12" x2="12" y2="16" stroke="#111" strokeWidth="1" />
            <line x1="7" y1="16" x2="17" y2="16" stroke="#111" strokeWidth="1" />
            <rect x="4" y="16" width="6" height="4" fill="#F8FAFC" stroke="#111" strokeWidth="1" />
            <rect x="14" y="16" width="6" height="4" fill="#F8FAFC" stroke="#111" strokeWidth="1" />
        </svg>
    ),
    delete: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="6" y1="6" x2="18" y2="18" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    // Logical model icons
    table: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="3" y="4" width="18" height="16" rx="0" fill="#F8FAFC" stroke="#111" strokeWidth="1.5" />
            <line x1="3" y1="9" x2="21" y2="9" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="3" y1="14" x2="21" y2="14" stroke="#111" strokeWidth="1" />
        </svg>
    ),
    logicalConnection: (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <line x1="4" y1="12" x2="20" y2="12" stroke="#111" strokeWidth="1.5" />
            <circle cx="4" cy="12" r="3" fill="#FBBF24" />
            <text x="3" y="14" fontSize="6" fontWeight="bold" fill="#000" fontFamily="monospace">1</text>
            <circle cx="20" cy="12" r="3" fill="#2563EB" />
            <text x="18" y="14" fontSize="6" fontWeight="bold" fill="#000" fontFamily="monospace">N</text>
        </svg>
    ),
};

const conceptualTools = [
    { id: 'select', label: 'Selecionar (V)', icon: 'select' },
    { divider: true },
    { id: 'entity', label: 'Criar Entidade', icon: 'entity' },
    { id: 'relationship', label: 'Criar Relacionamento', icon: 'relationship' },
    { id: 'associative', label: 'Entidade Associativa', icon: 'associative' },
    { divider: true },
    { id: 'specialization', label: 'Especialização', icon: 'specialization' },
    { id: 'specExclusive', label: 'Especialização Exclusiva (com sub-entidades)', icon: 'specExclusive' },
    { id: 'specNonExclusive', label: 'Especialização Não-Exclusiva (com sub-entidades)', icon: 'specNonExclusive' },
    { divider: true },
    { id: 'attribute', label: 'Criação de Atributo', icon: 'attribute' },
    { id: 'attributeId', label: 'Atributo Identificador', icon: 'attributeId' },
    { id: 'attributeComp', label: 'Atributo Composto', icon: 'attributeComp' },
    { id: 'attributeOpt', label: 'Atributo Opcional', icon: 'attributeOpt' },
    { id: 'attributeMulti', label: 'Atributo Multivalorado', icon: 'attributeMulti' },
    { divider: true },
    { id: 'selfRelation', label: 'Auto-Relacionar', icon: 'selfRelation' },
    { id: 'connection', label: 'Ligar Objetos', icon: 'connection' },
    { id: 'text', label: 'Texto (Observação)', icon: 'text' },
    { divider: true },
    { id: 'delete', label: 'Apagar Objeto Selecionado', icon: 'delete', isAction: true },
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
    const { activeTool, setActiveTool, deleteSelected, activeModelId, models } = useModelStore();
    const model = activeModelId ? models[activeModelId] : null;
    const isLogical = model?.type === 'logical';
    const tools = isLogical ? logicalTools : conceptualTools;

    return (
        <div className="flex flex-col w-[44px] bg-slate-100 border-r border-slate-300 p-1 gap-1 shrink-0 overflow-y-auto z-10">
            {tools.map((tool, i) => {
                if (tool.divider) {
                    return <div key={`div-${i}`} className="h-px bg-slate-300 mx-1 my-1 shrink-0" />;
                }
                const isActive = activeTool === tool.id;
                return (
                    <button
                        key={tool.id}
                        className={`group relative flex items-center justify-center w-9 h-9 rounded-sm border transition-all duration-150 cursor-pointer ${isActive
                            ? 'bg-[#2563EB] text-white border-[#1E40AF] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]'
                            : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300'}`}
                        onClick={() => {
                            if (tool.isAction) {
                                if (tool.id === 'delete') deleteSelected();
                            } else {
                                setActiveTool(tool.id);
                            }
                        }}
                        title={tool.label}
                    >
                        <div className={isActive ? 'brightness-0 invert' : ''}>
                            {icons[tool.icon]}
                        </div>
                        <span className="hidden group-hover:block absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded text-[11px] whitespace-nowrap shadow-md z-[100] pointer-events-none text-left">
                            {tool.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

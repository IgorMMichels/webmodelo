import { useState, useRef, useEffect } from 'react';
import useModelStore from '../stores/useModelStore';
import ConvertDialog from './ConvertDialog';
import {
    FileText, FilePlus, FolderOpen, Save, ChevronDown
} from 'lucide-react';

const menus = [
    {
        label: 'Sistema',
        items: [
            { label: 'Novo Conceitual (brModelo Inicial)', action: 'newConceptual', shortcut: 'Ctrl+N', icon: FilePlus },
            { label: 'Novo Lógico', action: 'newLogical', icon: FilePlus },
            { type: 'separator' },
            { label: 'Abrir...', action: 'open', shortcut: 'Ctrl+O', icon: FolderOpen },
            { label: 'Salvar (.brM)', action: 'save', shortcut: 'Ctrl+S', icon: Save },
            { label: 'Salvar Como...', action: 'saveAs', icon: Save },
            { type: 'separator' },
            { label: 'Fechar Modelo', action: 'close' },
        ],
    },
    {
        label: 'Editar',
        items: [
            { label: 'Desfazer', action: 'undo', shortcut: 'Ctrl+Z' },
            { label: 'Refazer', action: 'redo', shortcut: 'Ctrl+Y' },
            { type: 'separator' },
            { label: 'Excluir Seleção', action: 'delete', shortcut: 'Del' },
        ],
    },
    {
        label: 'Esquema Conceitual',
        items: [
            { label: 'Entidade', action: 'tool:entity' },
            { label: 'Relacionamento', action: 'tool:relationship' },
            { label: 'Atributo', action: 'tool:attribute' },
            { label: 'Atributo Identificador', action: 'tool:attributeId' },
            { type: 'separator' },
            { label: 'Generalização/Especialização', action: 'tool:specialization' },
            { label: 'Ligação', action: 'tool:connection' },
            { type: 'separator' },
            { label: '🔄 Converter para Modelo Lógico', action: 'convertLogical' },
        ],
    },
    {
        label: 'Esquema Lógico',
        items: [
            { label: 'Tabela', action: 'tool:table' },
            { label: 'Conexão', action: 'tool:logicalConnection' },
            { type: 'separator' },
            { label: '📄 Gerar Esquema Físico (SQL)', action: 'convertPhysical' },
        ],
    },
    {
        label: 'Ajuda',
        items: [
            { label: 'Sobre', action: 'about' },
        ],
    },
];

export default function MenuBar() {
    const [openMenu, setOpenMenu] = useState(null);
    const [convertDialog, setConvertDialog] = useState(null); // 'logical' | 'physical' | null
    const menuRef = useRef(null);
    const { createModel, saveToFile, openFile, closeModel, activeModelId,
        undo, redo, deleteSelected, setActiveTool, getActiveModel, setView } = useModelStore();

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleAction = (action) => {
        setOpenMenu(null);
        if (action === 'newConceptual') createModel('conceptual');
        else if (action === 'newLogical') createModel('logical');
        else if (action === 'save' || action === 'saveAs') saveToFile();
        else if (action === 'close') closeModel(activeModelId);
        else if (action === 'undo') undo();
        else if (action === 'redo') redo();
        else if (action === 'delete') deleteSelected();
        else if (action === 'open') openFile();
        else if (action === 'convertLogical') {
            const model = getActiveModel();
            if (!model || model.type !== 'conceptual') {
                alert('Selecione um modelo conceitual para converter.');
                return;
            }
            setConvertDialog('logical');
        }
        else if (action === 'convertPhysical') {
            const model = getActiveModel();
            if (!model || model.type !== 'logical') {
                alert('Selecione um modelo lógico para gerar SQL.');
                return;
            }
            setConvertDialog('physical');
        }
        else if (action.startsWith('tool:')) {
            setActiveTool(action.replace('tool:', ''));
        }
    };

    return (
        <div className="flex items-center h-[32px] bg-slate-100 border-b border-slate-300 px-2 gap-1 shrink-0 z-40 relative" ref={menuRef}>
            <div
                className="flex items-center gap-2 pr-3 mr-2 border-r border-slate-300 cursor-pointer hover:bg-slate-200 hover:text-slate-900 text-slate-800 rounded px-2 py-1 transition-colors"
                onClick={() => setView('dashboard')}
                title="Ir para o Painel"
                style={{ cursor: 'pointer' }}
            >
                <FileText size={16} className="text-[#2563EB]" />
                <span className="font-bold text-[13px] tracking-tight">Web<span className="text-[#2563EB]">Modelo</span></span>
            </div>
            {menus.map((menu, i) => (
                <div key={i} className="relative">
                    <button
                        className={`relative px-3 py-1 text-xs rounded-sm cursor-pointer transition-colors duration-150 border-none font-sans ${openMenu === i ? 'bg-[#2563EB] text-white shadow-sm font-medium' : 'text-slate-600 bg-transparent hover:bg-slate-200 hover:text-slate-900'}`}
                        onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        onMouseEnter={() => openMenu !== null && setOpenMenu(i)}
                    >
                        {menu.label}
                    </button>
                    {openMenu === i && (
                        <div className="absolute top-full left-0 min-w-[220px] bg-white border border-slate-200 rounded shadow-lg p-1 z-[1000] mt-1">
                            {menu.items.map((item, j) => (
                                item.type === 'separator' ? (
                                    <div key={j} className="h-px bg-slate-100 my-1" />
                                ) : (
                                    <button
                                        key={j}
                                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-xs text-slate-600 rounded-sm cursor-pointer hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                                        onClick={() => handleAction(item.action)}
                                    >
                                        {item.icon && <item.icon size={14} className="opacity-80" />}
                                        <span className={!item.icon ? "ml-[26px]" : ""}>{item.label}</span>
                                        {item.shortcut && <span className="ml-auto text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{item.shortcut}</span>}
                                    </button>
                                )
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {convertDialog && (
                <ConvertDialog
                    type={convertDialog}
                    onClose={() => setConvertDialog(null)}
                />
            )}
        </div>
    );
}

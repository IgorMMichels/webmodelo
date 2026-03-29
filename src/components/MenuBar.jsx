import { useState, useRef, useEffect } from 'react';
import useModelStore from '../stores/useModelStore';
import ConvertDialog from './ConvertDialog';
import {
    FileText, FilePlus, FolderOpen, Save, X
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
            { label: 'Fechar Modelo', action: 'close', icon: X },
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
            { label: 'Converter para Modelo Lógico', action: 'convertLogical' },
        ],
    },
    {
        label: 'Esquema Lógico',
        items: [
            { label: 'Tabela', action: 'tool:table' },
            { label: 'Conexão', action: 'tool:logicalConnection' },
            { type: 'separator' },
            { label: 'Gerar Esquema Físico (SQL)', action: 'convertPhysical' },
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
    const [convertDialog, setConvertDialog] = useState(null);
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
        <div className="flex items-center h-[28px] bg-slate-50 border-b border-slate-200 px-1.5 gap-0 shrink-0 z-40 relative" ref={menuRef}>
            {/* Brand */}
            <button
                className="flex items-center gap-1.5 px-2 h-full cursor-pointer transition-colors duration-150 hover:bg-white rounded-sm group"
                onClick={() => setView('dashboard')}
                title="Ir para o Painel"
            >
                <FileText size={13} className="text-[#2563EB]" strokeWidth={2} />
                <span className="font-bold text-[12px] tracking-tight text-slate-700">Web<span className="text-[#2563EB]">Modelo</span></span>
            </button>

            <div className="w-px h-3.5 bg-slate-200 mx-1 shrink-0" />

            {/* Menu buttons */}
            {menus.map((menu, i) => (
                <div key={i} className="relative">
                    <button
                        className={`px-2 h-[22px] text-[12px] rounded-sm cursor-pointer transition-all duration-100 font-medium ${
                            openMenu === i
                                ? 'bg-slate-200/80 text-slate-700'
                                : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
                        }`}
                        onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        onMouseEnter={() => openMenu !== null && setOpenMenu(i)}
                    >
                        {menu.label}
                    </button>
                    {openMenu === i && (
                        <div className="absolute top-full left-0 min-w-[240px] bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-[1000] mt-0.5"
                             style={{ animation: 'fadeSlideIn 0.12s ease-out' }}>
                            {menu.items.map((item, j) => (
                                item.type === 'separator' ? (
                                    <div key={j} className="h-px bg-slate-100 my-0.5 mx-2" />
                                ) : (
                                    <button
                                        key={j}
                                        className="flex items-center gap-2 w-full text-left px-3 py-[5px] text-[12px] text-slate-600 cursor-pointer hover:bg-slate-50 hover:text-slate-800 transition-colors duration-100"
                                        onClick={() => handleAction(item.action)}
                                    >
                                        {item.icon && <item.icon size={13} className="text-slate-400 shrink-0" strokeWidth={1.8} />}
                                        <span className={!item.icon ? 'ml-[21px]' : ''}>{item.label}</span>
                                        {item.shortcut && (
                                            <span className="ml-auto text-[10px] text-slate-300 font-mono pl-4">{item.shortcut}</span>
                                        )}
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

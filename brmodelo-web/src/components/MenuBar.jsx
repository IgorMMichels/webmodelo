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
            { label: 'Novo Conceitual', action: 'newConceptual', shortcut: 'Ctrl+N', icon: FilePlus },
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
        undo, redo, deleteSelected, setActiveTool, getActiveModel } = useModelStore();

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
        <>
            <div className="menubar" ref={menuRef}>
                <div className="menubar-logo">
                    <FileText size={16} color="var(--accent-primary)" />
                    <span>br<span className="logo-accent">Modelo</span></span>
                </div>
                {menus.map((menu, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                        <button
                            className={`menubar-item ${openMenu === i ? 'active' : ''}`}
                            onClick={() => setOpenMenu(openMenu === i ? null : i)}
                            onMouseEnter={() => openMenu !== null && setOpenMenu(i)}
                        >
                            {menu.label}
                        </button>
                        {openMenu === i && (
                            <div className="dropdown-menu">
                                {menu.items.map((item, j) => (
                                    item.type === 'separator' ? (
                                        <div key={j} className="dropdown-separator" />
                                    ) : (
                                        <button
                                            key={j}
                                            className="dropdown-item"
                                            onClick={() => handleAction(item.action)}
                                        >
                                            {item.icon && <item.icon size={14} />}
                                            {item.label}
                                            {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                                        </button>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {convertDialog && (
                <ConvertDialog
                    type={convertDialog}
                    onClose={() => setConvertDialog(null)}
                />
            )}
        </>
    );
}

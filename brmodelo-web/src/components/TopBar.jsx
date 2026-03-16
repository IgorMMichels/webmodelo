import useModelStore from '../stores/useModelStore';
import {
    FilePlus, FolderOpen, Save, Copy, Scissors, Clipboard,
    Undo2, Redo2, ChevronDown, Search
} from 'lucide-react';

export default function TopBar() {
    const { models, activeModelId, setActiveModel, createModel, saveToFile,
        loadFromFile, undo, redo } = useModelStore();

    const modelList = Object.values(models);

    const handleOpen = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.brM,.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => loadFromFile(re.target.result);
                reader.readAsText(file);
            }
        };
        input.click();
    };

    return (
        <div className="topbar">
            <div className="topbar-group">
                <button className="topbar-btn" title="Novo" onClick={() => createModel('conceptual')}>
                    <FilePlus size={16} />
                </button>
                <button className="topbar-btn" title="Abrir" onClick={handleOpen}>
                    <FolderOpen size={16} />
                </button>
                <button className="topbar-btn" title="Salvar" onClick={saveToFile}>
                    <Save size={16} />
                </button>
            </div>

            <div className="topbar-separator" />

            <div className="topbar-group">
                <button className="topbar-btn" title="Desfazer" onClick={undo}>
                    <Undo2 size={16} />
                </button>
                <button className="topbar-btn" title="Refazer" onClick={redo}>
                    <Redo2 size={16} />
                </button>
            </div>

            <div className="topbar-separator" />

            <div className="topbar-group">
                <button className="topbar-btn" title="Copiar"><Copy size={16} /></button>
                <button className="topbar-btn" title="Recortar"><Scissors size={16} /></button>
                <button className="topbar-btn" title="Colar"><Clipboard size={16} /></button>
            </div>

            <div className="topbar-separator" />

            <div className="topbar-label" style={{ minWidth: 160 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Modelos abertos</span>
                <ChevronDown size={12} />
            </div>

            {modelList.length > 0 && (
                <div className="topbar-group" style={{ gap: '2px' }}>
                    {modelList.map(model => (
                        <button
                            key={model.id}
                            className={`topbar-btn ${activeModelId === model.id ? 'active' : ''}`}
                            onClick={() => setActiveModel(model.id)}
                            style={{
                                width: 'auto',
                                padding: '0 8px',
                                fontSize: 11,
                                fontWeight: activeModelId === model.id ? 600 : 400,
                            }}
                            title={model.name}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>
            )}

            <div style={{ flex: 1 }} />

            <div className="topbar-label">
                <Search size={12} />
                <span>Localizar objeto</span>
            </div>
        </div>
    );
}

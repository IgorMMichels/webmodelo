import { useState, useRef, useEffect } from 'react';
import useModelStore from '../stores/useModelStore';
import {
    FilePlus, FolderOpen, Save, Copy, Scissors, Clipboard,
    Undo2, Redo2, ChevronDown, Search
} from 'lucide-react';

export default function TopBar() {
    const { models, activeModelId, setActiveModel, createModel, saveToFile,
        loadFromFile, undo, redo } = useModelStore();

    const [newMenuOpen, setNewMenuOpen] = useState(false);
    const newMenuRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (newMenuRef.current && !newMenuRef.current.contains(e.target)) {
                setNewMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

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
        <div className="flex items-center h-[36px] bg-slate-50 border-b border-slate-200 px-3 gap-2 shrink-0">
            <div className="flex items-center gap-1">
                <div className="relative" ref={newMenuRef}>
                    <button
                        className="flex items-center justify-center h-7 px-3 rounded text-white cursor-pointer transition-colors duration-200 bg-purple-600 hover:bg-purple-700 shadow-sm gap-[6px]"
                        onClick={() => setNewMenuOpen(!newMenuOpen)}
                    >
                        <FilePlus size={14} />
                        <span className="font-semibold text-xs">Novo Modelo</span>
                        <ChevronDown size={14} className="opacity-80" />
                    </button>
                    {newMenuOpen && (
                        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50">
                            <button
                                className="flex items-center gap-3 w-full text-left p-2 text-xs text-slate-600 rounded cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => { createModel('conceptual'); setNewMenuOpen(false); }}
                            >
                                <div className="flex flex-col gap-[2px]">
                                    <strong className="text-purple-600 font-semibold">Modelo Conceitual (brModelo Inicial)</strong>
                                    <span className="text-[10px] text-slate-500">Esquema de Entidade-Relacionamento original</span>
                                </div>
                            </button>
                            <div className="h-px bg-slate-200 my-1 flex-shrink-0" />
                            <button
                                className="flex items-center gap-3 w-full text-left p-2 text-xs text-slate-600 font-medium rounded cursor-pointer hover:bg-slate-100 transition-colors"
                                onClick={() => { createModel('logical'); setNewMenuOpen(false); }}
                            >
                                Modelo Lógico Relacional
                            </button>
                        </div>
                    )}
                </div>
                <button
                    className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Abrir"
                    onClick={handleOpen}
                >
                    <FolderOpen size={16} />
                </button>
                <button
                    className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Salvar"
                    onClick={saveToFile}
                >
                    <Save size={16} />
                </button>
            </div>

            <div className="w-px h-5 bg-slate-300 mx-2 shrink-0" />

            <div className="flex items-center gap-1">
                <button
                    className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Desfazer"
                    onClick={undo}
                >
                    <Undo2 size={16} />
                </button>
                <button
                    className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Refazer"
                    onClick={redo}
                >
                    <Redo2 size={16} />
                </button>
            </div>

            <div className="w-px h-5 bg-slate-300 mx-2 shrink-0" />

            <div className="flex items-center gap-1">
                <button className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer" title="Copiar"><Copy size={16} /></button>
                <button className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer" title="Recortar"><Scissors size={16} /></button>
                <button className="flex items-center justify-center w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer" title="Colar"><Clipboard size={16} /></button>
            </div>

            <div className="w-px h-5 bg-slate-300 mx-2 shrink-0" />

            <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-500 bg-slate-100 rounded border border-slate-200/60 min-w-[140px] cursor-pointer hover:border-slate-300 hover:bg-slate-200 transition-colors">
                <span>Modelos abertos</span>
                <ChevronDown size={14} className="ml-auto opacity-70" />
            </div>

            {modelList.length > 0 && (
                <div className="flex items-center gap-[2px]">
                    {modelList.map(model => (
                        <button
                            key={model.id}
                            className={`flex items-center justify-center h-7 px-3 rounded transition-all text-[11px] cursor-pointer ${activeModelId === model.id
                                ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-medium border border-transparent'
                                }`}
                            onClick={() => setActiveModel(model.id)}
                            title={model.name}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-2 px-3 py-1 text-xs text-slate-500 bg-slate-100 rounded border border-slate-200 cursor-pointer hover:border-slate-300">
                <Search size={12} />
                <span>Localizar objeto</span>
            </div>
        </div>
    );
}

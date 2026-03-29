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

    const IconBtn = ({ title, onClick, children, className = '' }) => (
        <button
            className={`flex items-center justify-center w-[28px] h-[28px] rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-150 cursor-pointer ${className}`}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );

    return (
        <div className="flex items-center h-[36px] bg-white border-b border-slate-200 px-2 gap-1 shrink-0">
            {/* New Model */}
            <div className="relative" ref={newMenuRef}>
                <button
                    className="flex items-center h-[28px] px-3 gap-1.5 rounded-md text-white text-[12px] font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-150 cursor-pointer shadow-sm"
                    onClick={() => setNewMenuOpen(!newMenuOpen)}
                >
                    <FilePlus size={13} strokeWidth={2} />
                    <span>Novo Modelo</span>
                    <ChevronDown size={10} className="opacity-60 ml-0.5" />
                </button>
                {newMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 min-w-[240px] bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50"
                         style={{ animation: 'fadeSlideIn 0.12s ease-out' }}>
                        <button
                            className="flex flex-col w-full text-left px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors duration-100"
                            onClick={() => { createModel('conceptual'); setNewMenuOpen(false); }}
                        >
                            <span className="text-[12px] text-[#2563EB] font-semibold">Modelo Conceitual (brModelo Inicial)</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Esquema de Entidade-Relacionamento original</span>
                        </button>
                        <div className="h-px bg-slate-100 mx-2" />
                        <button
                            className="flex items-center w-full text-left px-3 py-2 text-[12px] text-slate-600 font-medium cursor-pointer hover:bg-slate-50 transition-colors duration-100"
                            onClick={() => { createModel('logical'); setNewMenuOpen(false); }}
                        >
                            Modelo Lógico Relacional
                        </button>
                    </div>
                )}
            </div>

            {/* File actions */}
            <div className="flex items-center gap-0.5">
                <IconBtn title="Abrir" onClick={handleOpen}><FolderOpen size={14} strokeWidth={1.8} /></IconBtn>
                <IconBtn title="Salvar" onClick={saveToFile}><Save size={14} strokeWidth={1.8} /></IconBtn>
            </div>

            <div className="w-px h-4 bg-slate-200 mx-0.5 shrink-0" />

            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5">
                <IconBtn title="Desfazer" onClick={undo}><Undo2 size={14} strokeWidth={1.8} /></IconBtn>
                <IconBtn title="Refazer" onClick={redo}><Redo2 size={14} strokeWidth={1.8} /></IconBtn>
            </div>

            <div className="w-px h-4 bg-slate-200 mx-0.5 shrink-0" />

            {/* Clipboard */}
            <div className="flex items-center gap-0.5">
                <IconBtn title="Copiar"><Copy size={14} strokeWidth={1.8} /></IconBtn>
                <IconBtn title="Recortar"><Scissors size={14} strokeWidth={1.8} /></IconBtn>
                <IconBtn title="Colar"><Clipboard size={14} strokeWidth={1.8} /></IconBtn>
            </div>

            <div className="w-px h-4 bg-slate-200 mx-0.5 shrink-0" />

            {/* Models dropdown */}
            <button className="flex items-center gap-1.5 h-[28px] px-2.5 text-[11px] font-medium text-slate-400 bg-slate-50 rounded-md border border-slate-200 cursor-pointer hover:border-slate-300 transition-all duration-150">
                <span>Modelos abertos</span>
                <ChevronDown size={10} className="opacity-50" />
            </button>

            {/* Model Tabs — same 28px height as buttons */}
            {modelList.length > 0 && (
                <div className="flex items-center gap-0.5 ml-1">
                    {modelList.map(model => (
                        <button
                            key={model.id}
                            className={`flex items-center justify-center h-[28px] px-2.5 rounded-md transition-all duration-150 text-[11px] cursor-pointer ${
                                activeModelId === model.id
                                    ? 'bg-[#2563EB] text-white font-semibold shadow-sm'
                                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 font-medium'
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

            {/* Search */}
            <button className="flex items-center gap-1.5 h-[28px] px-2.5 text-[11px] text-slate-400 bg-slate-50 rounded-md border border-slate-200 cursor-pointer hover:border-slate-300 transition-all duration-150">
                <Search size={11} strokeWidth={1.8} className="opacity-50" />
                <span>Localizar objeto</span>
            </button>
        </div>
    );
}

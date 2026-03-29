import useModelStore from '../stores/useModelStore';

export default function StatusBar() {
    const { activeModelId, models, activeTool, selectedIds } = useModelStore();
    const model = activeModelId ? models[activeModelId] : null;
    const zoom = useModelStore.getState().zoom ?? 100;

    if (!model) return null;

    const objCount = Object.keys(model.objects).length;
    const isModified = model.modified;
    const toolName = activeTool ? activeTool.charAt(0).toUpperCase() + activeTool.slice(1) : 'Selecionar';

    const Segment = ({ children }) => (
        <div className="flex items-center gap-1.5 px-2.5 h-full border-r border-slate-100 text-[10px]">
            {children}
        </div>
    );

    return (
        <footer className="flex items-center h-[22px] bg-white border-t border-slate-200 px-1 text-slate-400 font-medium shrink-0 z-10 select-none">
            <Segment>
                <div className={`w-[5px] h-[5px] rounded-full shrink-0 ${isModified ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className={`text-[10px] ${isModified ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {isModified ? 'Modificado' : 'Salvo'}
                </span>
            </Segment>

            <Segment>
                <span className="text-slate-300 text-[10px]">MODELO:</span>
                <span className="text-slate-500 text-[10px]">{model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}</span>
            </Segment>

            <Segment>
                <span className="text-slate-300 text-[10px]">OBJETOS:</span>
                <span className="text-slate-500 text-[10px] font-semibold">{objCount}</span>
            </Segment>

            <Segment>
                <span className="text-slate-300 text-[10px]">FERRAMENTA:</span>
                <span className="text-slate-500 text-[10px]">{toolName}</span>
            </Segment>

            {selectedIds.length > 0 && (
                <Segment>
                    <span className="text-slate-300 text-[10px]">SELEÇÃO:</span>
                    <span className="text-[#2563EB] text-[10px] font-semibold">{selectedIds.length}</span>
                </Segment>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 px-2.5 h-full text-[10px]">
                <span className="text-slate-300">Zoom:</span>
                <span className="text-slate-500 font-semibold">{zoom}%</span>
            </div>
        </footer>
    );
}

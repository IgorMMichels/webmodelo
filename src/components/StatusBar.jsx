import useModelStore from '../stores/useModelStore';

export default function StatusBar() {
    const { activeModelId, models, selectedIds, zoom, activeTool, isDirty } = useModelStore();
    const model = activeModelId ? models[activeModelId] : null;

    const toolNames = {
        select: 'Selecionar',
        entity: 'Criar Entidade',
        relationship: 'Criar Relacionamento',
        attribute: 'Criar Atributo',
        attributeId: 'Criar Atrib. Identificador',
        attributeMulti: 'Criar Atrib. Multivalorado',
        attributeOpt: 'Criar Atrib. Opcional',
        attributeComp: 'Criar Atrib. Composto',
        specialization: 'Criar Especialização',
        connection: 'Criar Ligação',
        selfRelation: 'Criar Auto-Relação',
        associative: 'Criar Ent. Associativa',
        text: 'Criar Texto',
        line: 'Criar Linha',
    };

    const objectCount = model ? Object.keys(model.objects).length : 0;

    return (
        <div className="flex items-center h-[24px] bg-slate-100 border-t border-slate-300 px-3 gap-4 text-[11px] text-slate-500 shrink-0 select-none z-10 w-full font-sans">
            <div className="flex items-center gap-1.5">
                <span className={`w-[6px] h-[6px] rounded-full ${isDirty ? 'bg-amber-500' : 'bg-[#2563EB]'}`} />
                {isDirty ? 'Modificado' : 'Salvo'}
            </div>

            {model && (
                <>
                    <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
                        <span className="font-semibold text-slate-600 uppercase text-[9px]">Modelo:</span> {model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
                        <span className="font-semibold text-slate-600 uppercase text-[9px]">Objetos:</span> {objectCount}
                    </div>
                </>
            )}

            <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
                <span className="font-semibold text-slate-600 uppercase text-[9px]">Ferramenta:</span> {toolNames[activeTool] || activeTool}
            </div>

            {selectedIds.length > 0 && (
                <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
                    <span className="font-semibold text-[#2563EB] uppercase text-[9px]">Seleção:</span> {selectedIds.length} objeto{selectedIds.length > 1 ? 's' : ''}
                </div>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 font-medium">
                Zoom: {Math.round(zoom * 100)}%
            </div>
        </div>
    );
}

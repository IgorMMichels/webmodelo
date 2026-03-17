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
        <div className="flex items-center h-[24px] bg-slate-50 border-t border-slate-200 px-3 gap-4 text-[11px] text-slate-500 shrink-0 select-none z-10 w-full">
            <div className="flex items-center gap-1.5">
                <span className={`w-[6px] h-[6px] rounded-full ${isDirty ? 'bg-amber-500' : 'bg-purple-500'}`} />
                {isDirty ? 'Modificado' : 'Salvo'}
            </div>

            {model && (
                <>
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-600">Modelo:</span> {model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-600">Objetos:</span> {objectCount}
                    </div>
                </>
            )}

            <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-600">Ferramenta:</span> {toolNames[activeTool] || activeTool}
            </div>

            {selectedIds.length > 0 && (
                <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-purple-600">Seleção:</span> {selectedIds.length} objeto{selectedIds.length > 1 ? 's' : ''}
                </div>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 font-medium">
                Zoom: {Math.round(zoom * 100)}%
            </div>
        </div>
    );
}

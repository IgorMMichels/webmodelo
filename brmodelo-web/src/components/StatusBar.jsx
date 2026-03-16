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
        <div className="statusbar">
            <div className="statusbar-item">
                <span className="dot" style={{ background: isDirty ? 'var(--warning)' : 'var(--success)' }} />
                {isDirty ? 'Modificado' : 'Salvo'}
            </div>

            {model && (
                <>
                    <div className="statusbar-item">
                        Modelo: {model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}
                    </div>
                    <div className="statusbar-item">
                        Objetos: {objectCount}
                    </div>
                </>
            )}

            <div className="statusbar-item">
                Ferramenta: {toolNames[activeTool] || activeTool}
            </div>

            {selectedIds.length > 0 && (
                <div className="statusbar-item">
                    Seleção: {selectedIds.length} objeto{selectedIds.length > 1 ? 's' : ''}
                </div>
            )}

            <div style={{ flex: 1 }} />

            <div className="statusbar-item">
                Zoom: {Math.round(zoom * 100)}%
            </div>
        </div>
    );
}

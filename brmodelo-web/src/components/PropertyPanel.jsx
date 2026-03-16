import { useState } from 'react';
import useModelStore from '../stores/useModelStore';

export default function PropertyPanel() {
    const [activeTab, setActiveTab] = useState('selection');
    const { activeModelId, models, selectedIds, updateObject, updateModelInfo } = useModelStore();

    const model = activeModelId ? models[activeModelId] : null;
    const selectedObj = selectedIds.length === 1 && model ? model.objects[selectedIds[0]] : null;

    const handleChange = (field, value) => {
        if (!selectedObj) return;
        updateObject(selectedObj.id, { [field]: value });
    };

    const renderSelectionPanel = () => {
        if (!model) {
            return (
                <div className="panel-section">
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                        Nenhum modelo aberto
                    </p>
                </div>
            );
        }

        if (!selectedObj) {
            return (
                <>
                    <div className="panel-section">
                        <div className="panel-section-title">Informações: Modelo {model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}</div>
                        <div className="panel-info">
                            <div className="panel-info-row">
                                <span className="label">Nome</span>
                                <input
                                    style={{
                                        flex: 1, background: 'transparent', border: 'none',
                                        color: 'var(--accent-primary)', fontSize: 12, fontWeight: 500,
                                        fontFamily: 'var(--font-ui)', outline: 'none',
                                    }}
                                    value={model.name}
                                    onChange={(e) => updateModelInfo('name', e.target.value)}
                                />
                            </div>
                            <div className="panel-info-row">
                                <span className="label">Versão</span>
                                <span className="value">{model.version}</span>
                            </div>
                            <div className="panel-info-row">
                                <span className="label">Autor(es)</span>
                                <input
                                    style={{
                                        flex: 1, background: 'transparent', border: 'none',
                                        color: 'var(--accent-primary)', fontSize: 12,
                                        fontFamily: 'var(--font-ui)', outline: 'none',
                                    }}
                                    value={model.author}
                                    onChange={(e) => updateModelInfo('author', e.target.value)}
                                    placeholder="—"
                                />
                            </div>
                            <div className="panel-info-row">
                                <span className="label">Observações</span>
                                <input
                                    style={{
                                        flex: 1, background: 'transparent', border: 'none',
                                        color: 'var(--text-secondary)', fontSize: 12,
                                        fontFamily: 'var(--font-ui)', outline: 'none',
                                    }}
                                    value={model.notes}
                                    onChange={(e) => updateModelInfo('notes', e.target.value)}
                                    placeholder="—"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="panel-section" style={{ marginTop: 16 }}>
                        <div className="panel-section-title">Objetos ({Object.keys(model.objects).length})</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            {(() => {
                                const counts = {};
                                Object.values(model.objects).forEach(obj => {
                                    counts[obj.type] = (counts[obj.type] || 0) + 1;
                                });
                                const labels = {
                                    entity: 'Entidades', relationship: 'Relacionamentos',
                                    attribute: 'Atributos', specialization: 'Especializações',
                                    text: 'Textos',
                                };
                                return Object.entries(counts).map(([type, count]) => (
                                    <div key={type} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                                        <span>{labels[type] || type}</span>
                                        <span style={{ color: 'var(--text-primary)' }}>{count}</span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </>
            );
        }

        // Selected object properties
        return (
            <>
                <div className="panel-section">
                    <div className="panel-section-title">
                        {selectedObj.type === 'entity' && 'Entidade'}
                        {selectedObj.type === 'relationship' && 'Relacionamento'}
                        {selectedObj.type === 'attribute' && 'Atributo'}
                        {selectedObj.type === 'specialization' && 'Especialização'}
                        {selectedObj.type === 'text' && 'Texto'}
                        {selectedObj.type === 'table' && 'Tabela'}
                    </div>

                    {(selectedObj.type !== 'text') && (
                        <div className="panel-field">
                            <label>Nome</label>
                            <input
                                value={selectedObj.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>
                    )}

                    {selectedObj.type === 'text' && (
                        <div className="panel-field">
                            <label>Texto</label>
                            <input
                                value={selectedObj.text || ''}
                                onChange={(e) => handleChange('text', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {selectedObj.type === 'entity' && (
                    <div className="panel-section">
                        <div className="panel-section-title">Propriedades</div>
                        <div className="panel-field">
                            <label>Fraca</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.weak || false}
                                onChange={(e) => handleChange('weak', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

                {selectedObj.type === 'attribute' && (
                    <div className="panel-section">
                        <div className="panel-section-title">Propriedades</div>
                        <div className="panel-field">
                            <label>Identificador</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.identifier || false}
                                onChange={(e) => handleChange('identifier', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="panel-field">
                            <label>Multivalorado</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.multiValued || false}
                                onChange={(e) => handleChange('multiValued', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="panel-field">
                            <label>Opcional</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.optional || false}
                                onChange={(e) => handleChange('optional', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="panel-field">
                            <label>Composto</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.composed || false}
                                onChange={(e) => handleChange('composed', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="panel-field">
                            <label>Tipo</label>
                            <input
                                value={selectedObj.dataType || ''}
                                onChange={(e) => handleChange('dataType', e.target.value)}
                                placeholder="ex: VARCHAR, INT"
                            />
                        </div>
                    </div>
                )}

                {selectedObj.type === 'specialization' && (
                    <div className="panel-section">
                        <div className="panel-section-title">Propriedades</div>
                        <div className="panel-field">
                            <label>Total</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.total || false}
                                onChange={(e) => handleChange('total', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="panel-field">
                            <label>Disjunta</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.disjoint || false}
                                onChange={(e) => handleChange('disjoint', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

                {selectedObj.type === 'table' && (
                    <div className="panel-section">
                        <div className="panel-section-title">Campos ({(selectedObj.fields || []).length})</div>
                        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                            {(selectedObj.fields || []).map((f, i) => (
                                <div key={i} style={{ display: 'flex', gap: 6, padding: '3px 0', borderBottom: '1px solid rgba(51,65,85,0.3)' }}>
                                    <span style={{ width: 20, color: f.pk ? '#FBBF24' : (f.fk ? '#60A5FA' : 'transparent'), fontWeight: 700, fontSize: 9 }}>
                                        {f.pk ? 'PK' : (f.fk ? 'FK' : '')}
                                    </span>
                                    <span style={{ flex: 1, color: f.pk ? '#FEF3C7' : '#CBD5E1' }}>{f.name}</span>
                                    <span style={{ color: '#64748B', fontSize: 10 }}>{f.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="panel-section">
                    <div className="panel-section-title">Posição</div>
                    <div className="panel-field">
                        <label>X</label>
                        <input
                            type="number"
                            value={Math.round(selectedObj.x)}
                            onChange={(e) => handleChange('x', Number(e.target.value))}
                        />
                    </div>
                    <div className="panel-field">
                        <label>Y</label>
                        <input
                            type="number"
                            value={Math.round(selectedObj.y)}
                            onChange={(e) => handleChange('y', Number(e.target.value))}
                        />
                    </div>
                    {selectedObj.width && (
                        <div className="panel-field">
                            <label>Largura</label>
                            <input
                                type="number"
                                value={selectedObj.width}
                                onChange={(e) => handleChange('width', Number(e.target.value))}
                            />
                        </div>
                    )}
                    {selectedObj.height && (
                        <div className="panel-field">
                            <label>Altura</label>
                            <input
                                type="number"
                                value={selectedObj.height}
                                onChange={(e) => handleChange('height', Number(e.target.value))}
                            />
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="panel-right">
            <div className="panel-tabs">
                <button
                    className={`panel-tab ${activeTab === 'selection' ? 'active' : ''}`}
                    onClick={() => setActiveTab('selection')}
                >
                    Seleção
                </button>
                <button
                    className={`panel-tab ${activeTab === 'hidden' ? 'active' : ''}`}
                    onClick={() => setActiveTab('hidden')}
                >
                    Atr. ocultos
                </button>
            </div>
            <div className="panel-content">
                {activeTab === 'selection' && renderSelectionPanel()}
                {activeTab === 'hidden' && (
                    <div className="panel-section">
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                            Nenhum atributo oculto
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

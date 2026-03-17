import { useState } from 'react';
import useModelStore from '../stores/useModelStore';

export default function PropertyPanel() {
    const [activeTab, setActiveTab] = useState('selection');
    const { activeModelId, models, selectedIds, updateObject, updateModelInfo } = useModelStore();

    const model = activeModelId ? models[activeModelId] : null;
    const selectedObj = selectedIds.length === 1 && model ? (model.objects[selectedIds[0]] || model.connections[selectedIds[0]]) : null;

    const handleChange = (field, value) => {
        if (!selectedObj) return;
        if (selectedObj.from && selectedObj.to) {
            useModelStore.getState().updateConnection(selectedObj.id, { [field]: value });
        } else {
            updateObject(selectedObj.id, { [field]: value });
        }
    };

    const renderSelectionPanel = () => {
        if (!model) {
            return (
                <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                        Nenhum modelo aberto
                    </p>
                </div>
            );
        }

        if (!selectedObj) {
            return (
                <>
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Informações: Modelo {model.type === 'conceptual' ? 'Conceitual' : 'Lógico'}</div>
                        <div className="panel-info">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="label">Nome</span>
                                <input
                                    style={{
                                        flex: 1, background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 6px',
                                        color: 'var(--accent-primary)', fontSize: 12, fontWeight: 500,
                                        fontFamily: 'var(--font-ui)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                                    }}
                                    value={model.name}
                                    onChange={(e) => updateModelInfo('name', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="label">Versão</span>
                                <span className="value">{model.version}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="label">Autor(es)</span>
                                <input
                                    style={{
                                        flex: 1, background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 6px',
                                        color: 'var(--text-primary)', fontSize: 12,
                                        fontFamily: 'var(--font-ui)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                                    }}
                                    value={model.author}
                                    onChange={(e) => updateModelInfo('author', e.target.value)}
                                    placeholder="—"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="label">Observações</span>
                                <input
                                    style={{
                                        flex: 1, background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-primary)', borderRadius: '4px', padding: '2px 6px',
                                        color: 'var(--text-primary)', fontSize: 12,
                                        fontFamily: 'var(--font-ui)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                                    }}
                                    value={model.notes}
                                    onChange={(e) => updateModelInfo('notes', e.target.value)}
                                    placeholder="—"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200" style={{ marginTop: 16 }}>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Objetos ({Object.keys(model.objects).length})</div>
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
                <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {selectedObj.type === 'entity' && 'Entidade'}
                        {selectedObj.type === 'relationship' && 'Relacionamento'}
                        {selectedObj.type === 'attribute' && 'Atributo'}
                        {selectedObj.type === 'specialization' && 'Especialização'}
                        {selectedObj.type === 'associative' && 'Entidade Associativa'}
                        {selectedObj.type === 'text' && 'Texto'}
                        {selectedObj.type === 'table' && 'Tabela'}
                        {selectedObj.from && selectedObj.to && 'Ligação (Cardinalidade)'}
                    </div>

                    {(selectedObj.type !== 'text' && !selectedObj.from) && (
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Nome</label>
                            <input
                                value={selectedObj.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>
                    )}

                    {selectedObj.type === 'text' && (
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Texto</label>
                            <input
                                value={selectedObj.text || ''}
                                onChange={(e) => handleChange('text', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {selectedObj.type === 'entity' && (
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Propriedades</div>
                        <div className="flex flex-col gap-1 mb-2">
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
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Propriedades</div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Identificador</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.identifier || false}
                                onChange={(e) => handleChange('identifier', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Multivalorado</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.multiValued || false}
                                onChange={(e) => handleChange('multiValued', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Opcional</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.optional || false}
                                onChange={(e) => handleChange('optional', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Composto</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.composed || false}
                                onChange={(e) => handleChange('composed', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
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
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Propriedades</div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Total</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.total || false}
                                onChange={(e) => handleChange('total', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Disjunta</label>
                            <input
                                type="checkbox"
                                checked={selectedObj.disjoint !== false}
                                onChange={(e) => handleChange('disjoint', e.target.checked)}
                                style={{ width: 16, height: 16, flex: 'none', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

                {(selectedObj.from && selectedObj.to) && (
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Propriedades da Ligação</div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Card. Origem</label>
                            <select
                                value={selectedObj.cardFrom || ''}
                                onChange={(e) => handleChange('cardFrom', e.target.value)}
                            >
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Card. Destino</label>
                            <select
                                value={selectedObj.cardTo || ''}
                                onChange={(e) => handleChange('cardTo', e.target.value)}
                            >
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Papel Origem</label>
                            <input
                                value={selectedObj.roleFrom || ''}
                                onChange={(e) => handleChange('roleFrom', e.target.value)}
                                placeholder="ex: gerente"
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Papel Destino</label>
                            <input
                                value={selectedObj.roleTo || ''}
                                onChange={(e) => handleChange('roleTo', e.target.value)}
                                placeholder="ex: subordinado"
                            />
                        </div>
                    </div>
                )}

                {selectedObj.type === 'table' && (
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Campos ({(selectedObj.fields || []).length})</div>
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

                {(!selectedObj.from && selectedObj.type !== 'table') && (
                    <div className="flex flex-col gap-2 p-3 border-b border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Posição</div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>X</label>
                            <input
                                type="number"
                                value={Math.round(selectedObj.x || 0)}
                                onChange={(e) => handleChange('x', Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Y</label>
                            <input
                                type="number"
                                value={Math.round(selectedObj.y || 0)}
                                onChange={(e) => handleChange('y', Number(e.target.value))}
                            />
                        </div>
                        {selectedObj.width && (
                            <div className="flex flex-col gap-1 mb-2">
                                <label>Largura</label>
                                <input
                                    type="number"
                                    value={selectedObj.width}
                                    onChange={(e) => handleChange('width', Number(e.target.value))}
                                />
                            </div>
                        )}
                        {selectedObj.height && (
                            <div className="flex flex-col gap-1 mb-2">
                                <label>Altura</label>
                                <input
                                    type="number"
                                    value={selectedObj.height}
                                    onChange={(e) => handleChange('height', Number(e.target.value))}
                                />
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="flex flex-col w-[280px] bg-slate-50 border-l border-slate-200 shrink-0 z-10 h-full">
            <div className="flex h-[32px] border-b border-slate-200 shrink-0">
                <button
                    className={`flex-1 flex items-center justify-center text-[11px] font-medium bg-transparent border-none border-b-2 cursor-pointer transition-colors duration-200 ${activeTab === 'selection' ? 'text-purple-600 border-purple-600 shadow-sm' : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-white'}`}
                    onClick={() => setActiveTab('selection')}
                >
                    Seleção
                </button>
                <button
                    className={`flex-1 flex items-center justify-center text-[11px] font-medium bg-transparent border-none border-b-2 cursor-pointer transition-colors duration-200 ${activeTab === 'hidden' ? 'text-purple-600 border-purple-600 shadow-sm' : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-white'}`}
                    onClick={() => setActiveTab('hidden')}
                >
                    Atr. ocultos
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 [&_label]:text-[11px] [&_label]:font-semibold [&_label]:text-slate-500 [&_label]:tracking-tight [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:bg-white/60 [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-slate-200 [&_input:not([type=checkbox])]:rounded [&_input:not([type=checkbox])]:px-2 [&_input:not([type=checkbox])]:py-1 [&_input:not([type=checkbox])]:text-xs [&_input:not([type=checkbox])]:transition-all [&_input:not([type=checkbox])]:duration-200 hover:[&_input:not([type=checkbox])]:border-slate-300 focus:[&_input:not([type=checkbox])]:border-purple-400 focus:[&_input:not([type=checkbox])]:shadow-[0_0_0_2px_rgba(168,85,247,0.15)] focus:[&_input:not([type=checkbox])]:bg-white focus:[&_input:not([type=checkbox])]:outline-none [&_select]:w-full [&_select]:bg-white/60 [&_select]:border [&_select]:border-slate-200 [&_select]:rounded [&_select]:px-2 [&_select]:py-1 [&_select]:text-xs [&_select]:transition-all [&_select]:duration-200 hover:[&_select]:border-slate-300 focus:[&_select]:border-purple-400 focus:[&_select]:shadow-[0_0_0_2px_rgba(168,85,247,0.15)] focus:[&_select]:bg-white focus:[&_select]:outline-none">
                {activeTab === 'selection' && renderSelectionPanel()}
                {activeTab === 'hidden' && (
                    <div className="mb-4">
                        <p className="text-[12px] text-slate-400 text-center py-5">
                            Nenhum atributo oculto
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

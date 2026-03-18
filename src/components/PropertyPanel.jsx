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

    const PropertyHeader = ({ children }) => (
        <div className="bg-slate-100/80 border-y border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 first:border-t-0">
            {children}
        </div>
    );

    const PropertyRow = ({ label, children }) => (
        <div className="flex items-center gap-3 px-3 mb-2.5 last:mb-4">
            <span className="text-[11px] font-medium text-slate-500 w-[85px] shrink-0 text-right leading-tight">{label}</span>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );

    const InputField = (props) => (
        <input
            className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1 text-xs text-slate-800 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none placeholder:text-slate-300"
            {...props}
        />
    );

    const CheckboxField = (props) => (
        <div className="flex items-center h-6">
            <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                {...props}
            />
        </div>
    );

    const SelectField = ({ children, ...props }) => (
        <select
            className="w-full bg-white border border-slate-200 rounded-sm px-1.5 py-1 text-xs text-slate-800 focus:border-blue-500 focus:outline-none cursor-pointer"
            {...props}
        >
            {children}
        </select>
    );

    const renderSelectionPanel = () => {
        if (!model) {
            return (
                <div className="flex flex-col items-center justify-center p-8 gap-3 opacity-40">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="text-[11px] font-medium text-slate-500 text-center">Nenhum modelo ativo</p>
                </div>
            );
        }

        if (!selectedObj) {
            return (
                <div className="animate-in fade-in duration-300">
                    <PropertyHeader>Informações do Modelo</PropertyHeader>
                    <PropertyRow label="Nome">
                        <InputField
                            value={model.name}
                            onChange={(e) => updateModelInfo('name', e.target.value)}
                        />
                    </PropertyRow>
                    <PropertyRow label="Versão">
                        <span className="text-[11px] font-mono text-slate-400 px-2">{model.version}</span>
                    </PropertyRow>
                    <PropertyRow label="Autor(es)">
                        <InputField
                            value={model.author}
                            onChange={(e) => updateModelInfo('author', e.target.value)}
                            placeholder="Nome do autor"
                        />
                    </PropertyRow>
                    <PropertyRow label="Observações">
                        <textarea
                            className="w-full bg-white border border-slate-200 rounded-sm px-2 py-1.5 text-xs text-slate-800 min-h-[60px] resize-none focus:border-blue-500 focus:outline-none placeholder:text-slate-300"
                            value={model.notes || ''}
                            onChange={(e) => updateModelInfo('notes', e.target.value)}
                            placeholder="Notas do projeto..."
                        />
                    </PropertyRow>

                    <PropertyHeader>Resumo de Objetos</PropertyHeader>
                    <div className="px-3 pb-4">
                        <div className="bg-white border border-slate-100 rounded p-2 shadow-sm">
                            {(() => {
                                const counts = {};
                                Object.values(model.objects).forEach(obj => {
                                    counts[obj.type] = (counts[obj.type] || 0) + 1;
                                });
                                const labels = {
                                    entity: 'Entidades', relationship: 'Relacionamentos',
                                    attribute: 'Atributos', specialization: 'Especializações',
                                    text: 'Textos', associative: 'Associativas'
                                };
                                const entries = Object.entries(counts);
                                if (entries.length === 0) return <p className="text-[11px] text-slate-400 text-center py-2 italic text-muted">Vazio</p>;

                                return entries.map(([type, count]) => (
                                    <div key={type} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                                        <span className="text-[11px] text-slate-500">{labels[type] || type}</span>
                                        <span className="text-[11px] font-bold text-slate-700">{count}</span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            );
        }

        const typeLabel = {
            entity: 'Entidade',
            relationship: 'Relacionamento',
            attribute: 'Atributo',
            specialization: 'Especialização',
            associative: 'Associativa',
            text: 'Texto',
            table: 'Tabela'
        }[selectedObj.type] || 'Ligação';

        return (
            <div className="animate-in slide-in-from-right-2 fade-in duration-300">
                <PropertyHeader>{typeLabel}</PropertyHeader>

                {(selectedObj.type !== 'text' && !selectedObj.from) && (
                    <PropertyRow label="Nome">
                        <InputField
                            value={selectedObj.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </PropertyRow>
                )}

                {selectedObj.type === 'text' && (
                    <PropertyRow label="Texto">
                        <InputField
                            value={selectedObj.text || ''}
                            onChange={(e) => handleChange('text', e.target.value)}
                        />
                    </PropertyRow>
                )}

                {/* Specific Properties */}
                {selectedObj.type === 'entity' && (
                    <>
                        <PropertyHeader>Propriedades</PropertyHeader>
                        <PropertyRow label="Fraca">
                            <CheckboxField
                                checked={selectedObj.weak || false}
                                onChange={(e) => handleChange('weak', e.target.checked)}
                            />
                        </PropertyRow>
                    </>
                )}

                {selectedObj.type === 'attribute' && (
                    <>
                        <PropertyHeader>Propriedades</PropertyHeader>
                        <PropertyRow label="Identificador">
                            <CheckboxField checked={selectedObj.identifier || false} onChange={(e) => handleChange('identifier', e.target.checked)} />
                        </PropertyRow>
                        <PropertyRow label="Multivalorado">
                            <CheckboxField checked={selectedObj.multiValued || false} onChange={(e) => handleChange('multiValued', e.target.checked)} />
                        </PropertyRow>
                        <PropertyRow label="Opcional">
                            <CheckboxField checked={selectedObj.optional || false} onChange={(e) => handleChange('optional', e.target.checked)} />
                        </PropertyRow>
                        <PropertyRow label="Composto">
                            <CheckboxField checked={selectedObj.composed || false} onChange={(e) => handleChange('composed', e.target.checked)} />
                        </PropertyRow>
                        <PropertyRow label="Tipo de Dado">
                            <InputField
                                value={selectedObj.dataType || ''}
                                onChange={(e) => handleChange('dataType', e.target.value)}
                                placeholder="ex: VARCHAR(50)"
                            />
                        </PropertyRow>
                    </>
                )}

                {selectedObj.from && selectedObj.to && (
                    <>
                        <PropertyHeader>Ligação (Cardinalidade)</PropertyHeader>
                        <PropertyRow label="Card. Origem">
                            <SelectField value={selectedObj.cardFrom || ''} onChange={(e) => handleChange('cardFrom', e.target.value)}>
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </SelectField>
                        </PropertyRow>
                        <PropertyRow label="Card. Destino">
                            <SelectField value={selectedObj.cardTo || ''} onChange={(e) => handleChange('cardTo', e.target.value)}>
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </SelectField>
                        </PropertyRow>
                        <PropertyRow label="Papel Origem">
                            <InputField
                                value={selectedObj.roleFrom || ''}
                                onChange={(e) => handleChange('roleFrom', e.target.value)}
                                placeholder="Opcional"
                            />
                        </PropertyRow>
                        <PropertyRow label="Papel Destino">
                            <InputField
                                value={selectedObj.roleTo || ''}
                                onChange={(e) => handleChange('roleTo', e.target.value)}
                                placeholder="Opcional"
                            />
                        </PropertyRow>
                    </>
                )}

                {selectedObj.type === 'specialization' && (
                    <>
                        <PropertyHeader>Restrições</PropertyHeader>
                        <PropertyRow label="Totalidade (T)">
                            <CheckboxField checked={selectedObj.total || false} onChange={(e) => handleChange('total', e.target.checked)} />
                        </PropertyRow>
                        <PropertyRow label="Disjunta (d)">
                            <CheckboxField checked={selectedObj.disjoint !== false} onChange={(e) => handleChange('disjoint', e.target.checked)} />
                        </PropertyRow>
                    </>
                )}

                {/* Geometry Info */}
                {!selectedObj.from && selectedObj.type !== 'table' && (
                    <>
                        <PropertyHeader>Posicionamento</PropertyHeader>
                        <div className="grid grid-cols-2 gap-x-1 px-3 mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-300 w-4">X</span>
                                <InputField type="number" value={Math.round(selectedObj.x)} onChange={(e) => handleChange('x', Number(e.target.value))} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-300 w-4">Y</span>
                                <InputField type="number" value={Math.round(selectedObj.y)} onChange={(e) => handleChange('y', Number(e.target.value))} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <aside className="w-[300px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.02)] z-10 h-full">
            {/* Custom Tab Headings - Segmented Style */}
            <div className="p-2.5 shrink-0 bg-slate-50/50">
                <div className="bg-slate-200/60 p-1 rounded-md flex">
                    <button
                        onClick={() => setActiveTab('selection')}
                        className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-all duration-200 shadow-sm ${activeTab === 'selection'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Propriedades
                    </button>
                    <button
                        onClick={() => setActiveTab('hidden')}
                        className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-all duration-200 ${activeTab === 'hidden'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Atr. Ocultos
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden border-t border-slate-100">
                {activeTab === 'selection' ? renderSelectionPanel() : (
                    <div className="flex flex-col items-center justify-center p-12 opacity-30">
                        <p className="text-[11px] text-slate-500 italic">Nenhum oculto</p>
                    </div>
                )}
            </div>

            {/* Selection info footer */}
            {selectedIds.length > 0 && (
                <div className="p-3 bg-blue-50/30 border-t border-slate-100 shrink-0">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tight">
                        {selectedIds.length} {selectedIds.length === 1 ? 'objeto selecionado' : 'objetos selecionados'}
                    </span>
                </div>
            )}
        </aside>
    );
}

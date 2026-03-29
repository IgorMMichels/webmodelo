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

    const SectionHeader = ({ children }) => (
        <div className="bg-slate-50 border-y border-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 first:border-t-0 flex items-center gap-1.5">
            <span className="w-[2px] h-[10px] bg-[#2563EB] rounded-full shrink-0" />
            {children}
        </div>
    );

    const Field = ({ label, children }) => (
        <div className="flex items-center gap-2 px-3 mb-2 last:mb-3">
            <span className="text-[11px] font-medium text-slate-400 w-[80px] shrink-0 text-right">{label}</span>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );

    const Input = (props) => (
        <input
            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-[12px] text-slate-700 transition-all duration-150 focus:border-[#2563EB] focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-slate-300"
            {...props}
        />
    );

    const Checkbox = (props) => (
        <div className="flex items-center h-6">
            <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#2563EB] cursor-pointer accent-[#2563EB]"
                {...props}
            />
        </div>
    );

    const Select = ({ children, ...props }) => (
        <select
            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-[12px] text-slate-700 focus:border-[#2563EB] focus:outline-none cursor-pointer"
            {...props}
        >{children}</select>
    );

    const renderSelectionPanel = () => {
        if (!model) {
            return (
                <div className="flex flex-col items-center justify-center p-8 gap-2 opacity-40">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="text-[11px] text-slate-400 text-center">Nenhum modelo ativo</p>
                </div>
            );
        }

        if (!selectedObj) {
            return (
                <div>
                    <SectionHeader>Informações do Modelo</SectionHeader>
                    <Field label="Nome">
                        <Input value={model.name} onChange={(e) => updateModelInfo('name', e.target.value)} />
                    </Field>
                    <Field label="Versão">
                        <span className="text-[11px] font-mono text-slate-300 px-2 py-0.5">{model.version}</span>
                    </Field>
                    <Field label="Autor(es)">
                        <Input value={model.author} onChange={(e) => updateModelInfo('author', e.target.value)} placeholder="Nome do autor" />
                    </Field>
                    <Field label="Observações">
                        <textarea
                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-[12px] text-slate-700 min-h-[50px] resize-none focus:border-[#2563EB] focus:outline-none placeholder-slate-300"
                            value={model.notes || ''}
                            onChange={(e) => updateModelInfo('notes', e.target.value)}
                            placeholder="Notas do projeto..."
                        />
                    </Field>

                    <SectionHeader>Resumo de Objetos</SectionHeader>
                    <div className="px-3 pb-3">
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
                            if (entries.length === 0) return <p className="text-[11px] text-slate-300 text-center py-2 italic">Vazio</p>;

                            return entries.map(([type, count]) => (
                                <div key={type} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                                    <span className="text-[11px] text-slate-400">{labels[type] || type}</span>
                                    <span className="text-[11px] font-semibold text-slate-600">{count}</span>
                                </div>
                            ));
                        })()}
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
            <div>
                <SectionHeader>{typeLabel}</SectionHeader>

                {(selectedObj.type !== 'text' && !selectedObj.from) && (
                    <Field label="Nome">
                        <Input value={selectedObj.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
                    </Field>
                )}

                {selectedObj.type === 'text' && (
                    <Field label="Texto">
                        <Input value={selectedObj.text || ''} onChange={(e) => handleChange('text', e.target.value)} />
                    </Field>
                )}

                {selectedObj.type === 'entity' && (
                    <>
                        <SectionHeader>Propriedades</SectionHeader>
                        <Field label="Fraca">
                            <Checkbox checked={selectedObj.weak || false} onChange={(e) => handleChange('weak', e.target.checked)} />
                        </Field>
                    </>
                )}

                {selectedObj.type === 'attribute' && (
                    <>
                        <SectionHeader>Propriedades</SectionHeader>
                        <Field label="Identificador"><Checkbox checked={selectedObj.identifier || false} onChange={(e) => handleChange('identifier', e.target.checked)} /></Field>
                        <Field label="Multivalorado"><Checkbox checked={selectedObj.multiValued || false} onChange={(e) => handleChange('multiValued', e.target.checked)} /></Field>
                        <Field label="Opcional"><Checkbox checked={selectedObj.optional || false} onChange={(e) => handleChange('optional', e.target.checked)} /></Field>
                        <Field label="Composto"><Checkbox checked={selectedObj.composed || false} onChange={(e) => handleChange('composed', e.target.checked)} /></Field>
                        <Field label="Tipo de Dado">
                            <Input value={selectedObj.dataType || ''} onChange={(e) => handleChange('dataType', e.target.value)} placeholder="ex: VARCHAR(50)" />
                        </Field>
                    </>
                )}

                {selectedObj.from && selectedObj.to && (
                    <>
                        <SectionHeader>Ligação (Cardinalidade)</SectionHeader>
                        <Field label="Card. Origem">
                            <Select value={selectedObj.cardFrom || ''} onChange={(e) => handleChange('cardFrom', e.target.value)}>
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </Select>
                        </Field>
                        <Field label="Card. Destino">
                            <Select value={selectedObj.cardTo || ''} onChange={(e) => handleChange('cardTo', e.target.value)}>
                                <option value="">Nenhuma</option>
                                <option value="0,1">0,1</option>
                                <option value="1,1">1,1</option>
                                <option value="0,n">0,n</option>
                                <option value="1,n">1,n</option>
                            </Select>
                        </Field>
                        <Field label="Papel Origem">
                            <Input value={selectedObj.roleFrom || ''} onChange={(e) => handleChange('roleFrom', e.target.value)} placeholder="Opcional" />
                        </Field>
                        <Field label="Papel Destino">
                            <Input value={selectedObj.roleTo || ''} onChange={(e) => handleChange('roleTo', e.target.value)} placeholder="Opcional" />
                        </Field>
                    </>
                )}

                {selectedObj.type === 'specialization' && (
                    <>
                        <SectionHeader>Restrições</SectionHeader>
                        <Field label="Totalidade (T)"><Checkbox checked={selectedObj.total || false} onChange={(e) => handleChange('total', e.target.checked)} /></Field>
                        <Field label="Disjunta (d)"><Checkbox checked={selectedObj.disjoint !== false} onChange={(e) => handleChange('disjoint', e.target.checked)} /></Field>
                    </>
                )}

                {!selectedObj.from && selectedObj.type !== 'table' && (
                    <>
                        <SectionHeader>Posicionamento</SectionHeader>
                        <div className="grid grid-cols-2 gap-x-1 px-3 mb-3">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-300 w-3">X</span>
                                <Input type="number" value={Math.round(selectedObj.x)} onChange={(e) => handleChange('x', Number(e.target.value))} />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-300 w-3">Y</span>
                                <Input type="number" value={Math.round(selectedObj.y)} onChange={(e) => handleChange('y', Number(e.target.value))} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <aside className="w-[280px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden z-10 h-full">
            {/* Tabs */}
            <div className="px-2 pt-2 pb-1.5 shrink-0 border-b border-slate-100">
                <div className="bg-slate-100 p-[2px] rounded-md flex">
                    <button
                        onClick={() => setActiveTab('selection')}
                        className={`flex-1 py-1 text-[11px] font-semibold rounded transition-all duration-150 cursor-pointer ${
                            activeTab === 'selection'
                                ? 'bg-white text-[#2563EB] shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Propriedades
                    </button>
                    <button
                        onClick={() => setActiveTab('hidden')}
                        className={`flex-1 py-1 text-[11px] font-semibold rounded transition-all duration-150 cursor-pointer ${
                            activeTab === 'hidden'
                                ? 'bg-white text-[#2563EB] shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        Atr. Ocultos
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {activeTab === 'selection' ? renderSelectionPanel() : (
                    <div className="flex flex-col items-center justify-center p-10 opacity-30">
                        <p className="text-[11px] text-slate-400 italic">Nenhum oculto</p>
                    </div>
                )}
            </div>

            {/* Selection footer */}
            {selectedIds.length > 0 && (
                <div className="px-3 py-2 bg-blue-50/50 border-t border-slate-100 shrink-0">
                    <span className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider">
                        {selectedIds.length} {selectedIds.length === 1 ? 'objeto selecionado' : 'objetos selecionados'}
                    </span>
                </div>
            )}
        </aside>
    );
}

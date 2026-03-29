import { useState } from 'react';
import { X, Copy, Download, ArrowLeft } from 'lucide-react';
import { convertConceptualToLogical } from '../services/conversionService';
import { generateSQL } from '../services/sqlGenerator';
import useModelStore from '../stores/useModelStore';

export default function ConvertDialog({ type, onClose }) {
    const { models, activeModelId } = useModelStore();
    const [step, setStep] = useState(1);
    const [result, setResult] = useState(null);
    const [sqlPreview, setSqlPreview] = useState('');
    const [sgbd, setSgbd] = useState('postgresql');

    const model = activeModelId ? models[activeModelId] : null;

    const handleConvertToLogical = () => {
        if (!model || model.type !== 'conceptual') return;
        const { tables, logicalConnections } = convertConceptualToLogical(model);
        setResult({ tables, logicalConnections });
        setStep(2);
    };

    const handleApplyLogical = () => {
        if (!result) return;
        const store = useModelStore.getState();
        const newModelId = store.createModel('logical');

        for (const table of result.tables) {
            store.addObject(table, newModelId);
        }
        for (const conn of result.logicalConnections) {
            store.addConnection(conn, newModelId);
        }
        store.setActiveModel(newModelId);
        onClose();
    };

    const handleGenerateSQL = () => {
        if (!model) return;

        const tables = Object.values(model.objects).filter(o => o.type === 'table');
        const connections = Object.values(model.connections);

        if (tables.length === 0) {
            alert('Nenhuma tabela encontrada no modelo lógico.');
            return;
        }

        const sql = generateSQL(tables, connections, sgbd);
        setSqlPreview(sql);
        setStep(3);
    };

    const handleCopySQL = () => {
        navigator.clipboard.writeText(sqlPreview);
    };

    const handleDownloadSQL = () => {
        const blob = new Blob([sqlPreview], { type: 'text/sql' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${model?.name || 'schema'}.sql`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog" style={{ minWidth: 520, maxWidth: 700 }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="dialog-header">
                    <h2 className="text-[15px] font-semibold text-slate-800">
                        {type === 'logical' ? 'Converter para Modelo Lógico' : 'Gerar Esquema Físico (SQL)'}
                    </h2>
                    <button className="btn-icon" onClick={onClose} title="Fechar">
                        <X size={16} />
                    </button>
                </div>

                <div className="dialog-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {/* Step 1: Confirm conversion */}
                    {type === 'logical' && step === 1 && (
                        <div>
                            <p className="text-sm text-slate-500 mb-4">
                                Converter o modelo conceitual <strong className="text-[#2563EB]">{model?.name}</strong> para modelo lógico relacional.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 space-y-2">
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-slate-400 font-medium">Entidades:</span>
                                    <span className="font-bold text-slate-600">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'entity').length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-slate-400 font-medium">Relações:</span>
                                    <span className="font-bold text-slate-600">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'relationship').length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-slate-400 font-medium">Atributos:</span>
                                    <span className="font-bold text-slate-600">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'attribute').length}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 italic">
                                Regras de conversão baseadas no livro "Projeto de Banco de Dados" (Heuser).
                            </p>
                        </div>
                    )}

                    {/* Step 2: Preview logical result */}
                    {type === 'logical' && step === 2 && result && (
                        <div>
                            <p className="text-sm text-slate-500 mb-3">
                                Resultado da conversão:
                            </p>
                            <div className="flex flex-col gap-2">
                                {result.tables.map((table, i) => (
                                    <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                                        <div className="font-semibold text-blue-300 mb-2 text-[13px]">
                                            {table.name}
                                        </div>
                                        {table.fields.map((f, j) => (
                                            <div key={j} className="flex gap-2 text-[11px] font-mono leading-relaxed">
                                                <span className="w-6 text-right" style={{ color: f.pk ? '#FBBF24' : (f.fk ? '#60A5FA' : 'transparent'), fontWeight: 700 }}>
                                                    {f.pk ? 'PK' : (f.fk ? 'FK' : '')}
                                                </span>
                                                <span className={`flex-1 ${f.pk ? 'text-yellow-100 underline' : 'text-slate-300'}`}>
                                                    {f.name}
                                                </span>
                                                <span className="text-slate-500">{f.type}</span>
                                                {f.nn && <span className="text-red-400 text-[9px] font-bold">NN</span>}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 1 for SQL: select SGBD */}
                    {type === 'physical' && step === 1 && (
                        <div>
                            <p className="text-sm text-slate-500 mb-4">
                                Gerar script SQL a partir do modelo lógico <strong className="text-[#2563EB]">{model?.name}</strong>
                            </p>
                            <div className="mb-4">
                                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">SGBD</label>
                                <select className="select-field" value={sgbd} onChange={e => setSgbd(e.target.value)}>
                                    <option value="postgresql">PostgreSQL</option>
                                    <option value="mysql">MySQL</option>
                                    <option value="sqlite">SQLite</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 3: SQL Preview */}
                    {step === 3 && sqlPreview && (
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[12px] text-slate-400">
                                    SGBD: <strong className="text-[#2563EB]">{sgbd.toUpperCase()}</strong>
                                </span>
                                <div className="flex gap-2">
                                    <button className="btn" onClick={handleCopySQL}>
                                        <Copy size={13} />
                                        Copiar
                                    </button>
                                    <button className="btn btn-primary" onClick={handleDownloadSQL}>
                                        <Download size={13} />
                                        Baixar .sql
                                    </button>
                                </div>
                            </div>
                            <pre className="bg-[#0F172A] border border-slate-700 rounded-lg p-4 font-mono text-[12px] text-slate-300 leading-relaxed overflow-auto max-h-[400px] whitespace-pre-wrap break-words">
                                {sqlPreview}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="dialog-footer">
                    {type === 'logical' && step === 1 && (
                        <button className="btn btn-primary" onClick={handleConvertToLogical}>
                            Converter para Lógico
                        </button>
                    )}
                    {type === 'logical' && step === 2 && (
                        <>
                            <button className="btn" onClick={() => setStep(1)}>
                                <ArrowLeft size={13} />
                                Voltar
                            </button>
                            <button className="btn btn-primary" onClick={handleApplyLogical}>
                                Criar Modelo Lógico
                            </button>
                        </>
                    )}
                    {type === 'physical' && step === 1 && (
                        <button className="btn btn-primary" onClick={handleGenerateSQL}>
                            Gerar SQL
                        </button>
                    )}
                    {step === 3 && (
                        <button className="btn" onClick={onClose}>Fechar</button>
                    )}
                </div>
            </div>
        </div>
    );
}

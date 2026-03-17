import { useState } from 'react';
import { convertConceptualToLogical } from '../services/conversionService';
import { generateSQL } from '../services/sqlGenerator';
import useModelStore from '../stores/useModelStore';

export default function ConvertDialog({ type, onClose }) {
    const { models, activeModelId, createModel } = useModelStore();
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
        // Create a new logical model with the converted tables
        const store = useModelStore.getState();
        const newModelId = store.createModel('logical');

        // Add each table as an object in the new model
        for (const table of result.tables) {
            store.addObject(table, newModelId);
        }
        // Add logical connections
        for (const conn of result.logicalConnections) {
            store.addConnection(conn, newModelId);
        }
        store.setActiveModel(newModelId);
        onClose();
    };

    const handleGenerateSQL = () => {
        if (!model) return;

        // If current model is logical, use its tables directly
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
                <div className="dialog-header">
                    <h2>
                        {type === 'logical' ? '🔄 Converter para Modelo Lógico' : '📄 Gerar Esquema Físico (SQL)'}
                    </h2>
                    <button className="topbar-btn" onClick={onClose} style={{ fontSize: 18 }}>✕</button>
                </div>

                <div className="dialog-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {/* Step 1: Confirm conversion */}
                    {type === 'logical' && step === 1 && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                                Converter o modelo conceitual <strong style={{ color: 'var(--accent-primary)' }}>{model?.name}</strong> para modelo lógico relacional.
                            </p>
                            <div className="panel-info" style={{ marginBottom: 16 }}>
                                <div className="panel-info-row">
                                    <span className="label">Entidades:</span>
                                    <span className="value">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'entity').length}
                                    </span>
                                </div>
                                <div className="panel-info-row">
                                    <span className="label">Relações:</span>
                                    <span className="value">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'relationship').length}
                                    </span>
                                </div>
                                <div className="panel-info-row">
                                    <span className="label">Atributos:</span>
                                    <span className="value">
                                        {Object.values(model?.objects || {}).filter(o => o.type === 'attribute').length}
                                    </span>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                                Regras de conversão baseadas no livro "Projeto de Banco de Dados" (Heuser).
                            </p>
                        </div>
                    )}

                    {/* Step 2: Preview logical result */}
                    {type === 'logical' && step === 2 && result && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
                                Resultado da conversão:
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {result.tables.map((table, i) => (
                                    <div key={i} className="panel-info" style={{ padding: 10 }}>
                                        <div style={{ fontWeight: 600, color: '#E0E7FF', marginBottom: 6, fontSize: 13 }}>
                                            {table.name}
                                        </div>
                                        {table.fields.map((f, j) => (
                                            <div key={j} style={{ display: 'flex', gap: 8, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                                                <span style={{ width: 24, color: f.pk ? '#FBBF24' : (f.fk ? '#60A5FA' : 'transparent'), fontWeight: 700 }}>
                                                    {f.pk ? 'PK' : (f.fk ? 'FK' : '')}
                                                </span>
                                                <span style={{ flex: 1, color: f.pk ? '#FEF3C7' : '#CBD5E1', textDecoration: f.pk ? 'underline' : 'none' }}>
                                                    {f.name}
                                                </span>
                                                <span style={{ color: '#64748B' }}>{f.type}</span>
                                                {f.nn && <span style={{ color: '#F87171', fontSize: 9 }}>NN</span>}
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
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                                Gerar script SQL a partir do modelo lógico <strong style={{ color: 'var(--accent-primary)' }}>{model?.name}</strong>
                            </p>
                            <div className="panel-field" style={{ marginBottom: 16 }}>
                                <label>SGBD:</label>
                                <select value={sgbd} onChange={e => setSgbd(e.target.value)}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                                    SGBD: <strong style={{ color: 'var(--accent-primary)' }}>{sgbd.toUpperCase()}</strong>
                                </span>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn" onClick={handleCopySQL}>Copiar</button>
                                    <button className="btn btn-primary" onClick={handleDownloadSQL}>Baixar .sql</button>
                                </div>
                            </div>
                            <pre style={{
                                background: '#0F172A',
                                border: '1px solid var(--border-primary)',
                                borderRadius: 6,
                                padding: 16,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12,
                                color: '#E2E8F0',
                                lineHeight: 1.6,
                                overflow: 'auto',
                                maxHeight: 400,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}>
                                {sqlPreview}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="dialog-footer">
                    {type === 'logical' && step === 1 && (
                        <button className="btn btn-primary" onClick={handleConvertToLogical}>
                            Converter para Lógico
                        </button>
                    )}
                    {type === 'logical' && step === 2 && (
                        <>
                            <button className="btn" onClick={() => setStep(1)}>Voltar</button>
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

import React, { useState } from 'react';
import useModelStore from '../../stores/useModelStore';

export default function NewModelModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('conceptual');
    const { createModel } = useModelStore();

    const handleSave = () => {
        const name = title.trim() || undefined;
        createModel(type, name);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-slide">
                {/* Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800">New model</h2>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <label className="text-[12px] font-semibold text-slate-500 w-12 text-right uppercase tracking-wider">Title</label>
                        <input
                            type="text"
                            className="input-field flex-1 !py-2 !px-3 !text-sm"
                            placeholder="My Model"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-[12px] font-semibold text-slate-500 w-12 text-right uppercase tracking-wider">Type</label>
                        <select
                            className="select-field flex-1 !py-2 !px-3 !text-sm"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="conceptual">Conceptual</option>
                            <option value="logical">Logical</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="btn"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

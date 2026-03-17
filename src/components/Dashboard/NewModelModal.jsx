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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">New model</h2>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700 w-12 text-right">Title</label>
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="My Model"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700 w-12 text-right">Type</label>
                        <select
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="conceptual">Conceptual</option>
                            <option value="logical">Logical</option>
                        </select>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

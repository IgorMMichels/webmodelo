import { HardDrive, Trash2 } from 'lucide-react';
import useModelStore from '../../stores/useModelStore';

export default function ModelCard({ model }) {
    const { setActiveModel, setView, closeModel } = useModelStore();

    const handleOpen = () => {
        setActiveModel(model.id);
        setView('editor');
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${model.name}"?`)) {
            closeModel(model.id);
        }
    };

    const isConceptual = model.type === 'conceptual';

    return (
        <div
            onClick={handleOpen}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 cursor-pointer flex flex-col justify-between group"
            style={{ minHeight: '140px' }}
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <div className="text-slate-300 mt-1 group-hover:text-[#2563EB] transition-colors duration-200">
                        <HardDrive size={20} />
                    </div>
                    <div>
                        <h3 className="text-slate-800 font-semibold text-base mb-1.5 truncate max-w-[200px] group-hover:text-[#2563EB] transition-colors duration-200" title={model.name}>
                            {model.name}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isConceptual
                                ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                            {isConceptual ? 'Conceptual' : 'Logical'}
                        </span>
                    </div>
                </div>

                <button
                    className="btn-icon w-7 h-7 text-slate-200 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    onClick={handleDelete}
                    title="Delete model"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="text-[11px] text-slate-300 mt-4 flex items-center justify-between">
                <span>Updated: {model.modifiedAt ? new Date(model.modifiedAt).toLocaleDateString() : 'Unknown'}</span>
                <span className="bg-slate-50 text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-100 font-mono font-medium">
                    v{model.version || '3.0.0'}
                </span>
            </div>
        </div>
    );
}

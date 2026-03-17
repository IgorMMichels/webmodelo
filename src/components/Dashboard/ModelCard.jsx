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
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
            style={{ minHeight: '140px' }}
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <div className="text-gray-400 mt-1">
                        <HardDrive size={20} />
                    </div>
                    <div>
                        <h3 className="text-gray-800 font-semibold text-base mb-1 truncate max-w-[200px]" title={model.name}>
                            {model.name}
                        </h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            {isConceptual ? 'Conceptual' : 'Logical'}
                        </span>
                    </div>
                </div>

                <button
                    className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleDelete}
                    title="Delete model"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="text-xs text-gray-400 mt-4 flex items-center justify-between">
                <span>Updated: {model.modifiedAt ? new Date(model.modifiedAt).toLocaleDateString() : 'Unknown'}</span>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] px-1.5 py-0.5 rounded border border-emerald-100 font-medium">
                    v{model.version || '3.0.0'}
                </span>
            </div>
        </div>
    );
}

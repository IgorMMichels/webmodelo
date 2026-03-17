import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import useModelStore from '../../stores/useModelStore';
import Header from './Header';
import ModelCard from './ModelCard';
import NewModelModal from './NewModelModal';

export default function Dashboard() {
    const { models, loadFromFile } = useModelStore();
    const [isNewModelModalOpen, setIsNewModelModalOpen] = useState(false);

    // Convert the 'models' object into an array and sort by modifiedAt descending
    const modelList = Object.values(models).sort((a, b) => {
        const timeA = new Date(a.modifiedAt || 0).getTime();
        const timeB = new Date(b.modifiedAt || 0).getTime();
        return timeB - timeA;
    });

    const handleImportClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.brM,.json';
        input.onchange = (ev) => {
            const file = ev.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => loadFromFile(re.target.result);
                reader.readAsText(file);
            }
        };
        input.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Models</h1>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsNewModelModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 font-medium text-sm transition-colors shadow-sm"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            New model
                        </button>
                        <button
                            onClick={handleImportClick}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 font-medium text-sm transition-colors shadow-sm"
                        >
                            <Download size={16} strokeWidth={2.5} />
                            Import model
                        </button>
                    </div>
                </div>

                {/* Table Headers (Visual Only) */}
                <div className="border-b border-gray-300 pb-3 mb-6">
                    <h2 className="text-sm font-semibold text-gray-600 tracking-wide uppercase">Type</h2>
                </div>

                {modelList.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No models yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">Create a new conceptual or logical model to get started with your database design.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {modelList.map(model => (
                            <ModelCard key={model.id} model={model} />
                        ))}
                    </div>
                )}
            </main>

            {/* Donation Banner Footer */}
            <footer className="max-w-4xl mx-auto w-full px-8 pb-12 mt-auto">
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex items-start gap-6">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="w-16 h-16 object-contain opacity-80" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-800 mb-2">Please consider make a donation</h4>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed max-w-2xl">
                            BRMW is maintained by a small team working in their spare time, doing their best to make it available for free. Still, the server and database to keep the project live cost money.<br /><br />
                            If you can, please consider a one time only or even monthly contribution via Github Sponsor.
                        </p>
                        <a
                            href="https://github.com/sponsors/brmodeloweb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-md text-sm font-medium transition-colors"
                        >
                            Go to Github Sponsors
                        </a>
                    </div>
                </div>
            </footer>

            {isNewModelModalOpen && (
                <NewModelModal onClose={() => setIsNewModelModalOpen(false)} />
            )}
        </div>
    );
}

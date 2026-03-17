import { Users, File, UserCircle } from 'lucide-react';


export default function Header() {
    return (
        <header className="dashboard-header flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-lg">
                        b
                    </div>
                    <span className="text-emerald-700 font-bold text-xl tracking-tight">BRMW</span>
                </div>
                <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
                    <button className="hover:text-emerald-600 transition-colors">Models</button>
                    <button className="hover:text-emerald-600 transition-colors">Shared with me</button>
                    <button className="hover:text-emerald-600 transition-colors">Teams</button>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    <UserCircle className="w-8 h-8" strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
}

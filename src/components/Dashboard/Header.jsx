import { Users, File, UserCircle } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-3.5 bg-white border-b border-slate-200">
            <div className="flex items-center gap-6">
                {/* Brand */}
                <div className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-200 group-hover:shadow-md group-hover:shadow-blue-200 transition-all duration-200 group-hover:scale-105">
                        W
                    </div>
                    <span className="text-slate-800 font-bold text-xl tracking-tight">Web<span className="text-[#2563EB]">Modelo</span></span>
                </div>
                {/* Nav */}
                <nav className="flex items-center gap-1 text-sm font-medium text-slate-500">
                    <button className="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#2563EB] transition-all duration-200 cursor-pointer">Models</button>
                    <button className="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#2563EB] transition-all duration-200 cursor-pointer">Shared with me</button>
                    <button className="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#2563EB] transition-all duration-200 cursor-pointer">Teams</button>
                </nav>
            </div>
            <div className="flex items-center gap-3">
                <button className="btn-icon w-9 h-9 rounded-full hover:bg-slate-100 cursor-pointer transition-all duration-200">
                    <UserCircle className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
}

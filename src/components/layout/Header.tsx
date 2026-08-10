import { Bell, Search } from "lucide-react";
import { useState } from "react";



export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');


  return (
      <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">

        {/* logo */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">Patient Managment</h1>
          <p className="text-xs text-slate-400">Welcome back, Admin</p>
        </div>


        {/* Right side */}
        <div className="flex items-center gap-5">
          <div className="hidden items-center rounded-xl bg-slate-100 px-4 py-2 md:flex">
            <Search size={18} className="text-slate-500"/>
            <input type="text" className="ml-2 w-48 bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          <button type="button" className="relative rounded-xl p-2 transition hover:bg-slate-100">
            <Bell size={21} className="text-slate-600"/>
            <span className="absolute right-1 top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
            3
          </span>
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-semibold text-white shadow-md shadow-sky-200">RD</div>
        </div>
      </header>
  );
}
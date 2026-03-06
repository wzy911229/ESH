import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-[#135bec] w-64 text-sm outline-none" 
            placeholder="搜索隐患编号或内容..." 
            type="text"
          />
        </div>
        
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="relative">
            <Bell className="text-slate-600 cursor-pointer w-5 h-5 hover:text-[#135bec]" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-none">管理员</p>
              <p className="text-[10px] text-slate-500 mt-1">安全监察部</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden cursor-pointer border border-slate-200">
              <img 
                alt="User Profile" 
                src="https://picsum.photos/seed/admin/100/100" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

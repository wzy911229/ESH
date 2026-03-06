import React from 'react';
import { LayoutDashboard, AlertTriangle, FileText, HelpCircle, Shield, BellRing, BarChart3 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: any) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: '首页', icon: LayoutDashboard },
    { id: 'list', label: '隐患管理', icon: AlertTriangle },
    { id: 'notifications', label: '通知发布', icon: BellRing },
    { id: 'reports', label: '数据报表', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#041428] text-white flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-[#135bec] rounded-lg p-2 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-base font-bold leading-tight">ESH 管理系统</h1>
            <p className="text-slate-400 text-[10px] font-normal uppercase tracking-wider">Enterprise Safety & Health</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors text-left",
              currentPage === item.id 
                ? "bg-[#135bec] text-white" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-400 cursor-pointer hover:text-white transition-colors text-left">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">帮助中心</span>
        </button>
      </div>
    </aside>
  );
}

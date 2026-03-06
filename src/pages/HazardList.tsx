import React from 'react';
import { 
  Plus, Download, Filter, ChevronRight, ChevronLeft, 
  Eye, Edit3, Search
} from 'lucide-react';
import { Hazard, RiskLevel, HazardStatus } from '../types';

const mockHazards: Hazard[] = [
  {
    id: '#ESH-2024-001',
    checkType: '专项检查',
    hazardType: '火灾隐患',
    riskLevel: '重大风险',
    location: 'A-2 仓库东侧',
    department: '物流部',
    status: '进行中',
    discoverer: '王小明',
    discoverTime: '2024-03-01',
    title: '仓库消防栓遮挡',
    description: '仓库东侧消防栓被货物遮挡，无法正常使用。'
  },
  {
    id: '#ESH-2024-002',
    checkType: '日常检查',
    hazardType: '化学品泄漏',
    riskLevel: '较大风险',
    location: '中央实验室',
    department: '研发中心',
    status: '结案',
    discoverer: '李华',
    discoverTime: '2024-02-28',
    title: '试剂瓶破损',
    description: '实验室地面发现不明液体，经查为试剂瓶破损。'
  },
  {
    id: '#ESH-2024-003',
    checkType: '综合检查',
    hazardType: '机械防护缺失',
    riskLevel: '一般风险',
    location: '4号生产线南侧',
    department: '生产部',
    status: '待确认',
    discoverer: '张强',
    discoverTime: '2024-03-05',
    title: '传送带护栏松动',
    description: '4号线传送带南侧护栏螺丝松动，存在脱落风险。'
  },
  {
    id: '#ESH-2024-004',
    checkType: '专项检查',
    hazardType: '高处坠落风险',
    riskLevel: '较大风险',
    location: '锅炉房二层平台',
    department: '生产部',
    status: '待验证',
    discoverer: '赵敏',
    discoverTime: '2024-03-04',
    title: '平台护栏高度不足',
    description: '锅炉房二层平台部分护栏高度低于标准要求。'
  }
];

interface HazardListProps {
  onAdd: () => void;
  onView: (hazard: Hazard) => void;
}

export default function HazardList({ onAdd, onView }: HazardListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <span>首页</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">隐患管理</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">隐患排查与治理</h1>
        <p className="text-slate-500 text-sm">对全厂范围内的环境、安全及职业健康隐患进行闭环跟踪管理。</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-200">
        <FilterSelect label="检查类型" options={['全部类型', '日常检查', '专项检查', '综合检查', '外部审计']} />
        <FilterSelect label="风险等级" options={['全部等级', '重大风险', '较大风险', '一般风险']} />
        <FilterSelect label="当前状态" options={['全部状态', '待确认', '进行中', '待验证', '结案']} />
        <FilterSelect label="责任部门" options={['全部部门', '生产部', '物流部', '研发中心', '行政部']} />
        <div className="flex items-end">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            重置筛选
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onAdd}
          className="bg-[#135bec] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#135bec]/90 transition-all shadow-md active:scale-95"
        >
          <Plus className="w-5 h-5" />
          新增隐患
        </button>
        <button className="px-3 py-2 text-slate-600 hover:bg-white rounded-lg text-sm font-medium flex items-center gap-1 transition-colors border border-slate-200">
          <Download className="w-4 h-4" />
          导出数据
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">编号</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">检查类型</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">隐患类型</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">风险等级</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">隐患位置</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">责任部门</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">当前状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockHazards.map((hazard) => (
                <tr key={hazard.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#135bec]">{hazard.id}</td>
                  <td className="px-6 py-4 text-sm">{hazard.checkType}</td>
                  <td className="px-6 py-4 text-sm">{hazard.hazardType}</td>
                  <td className="px-6 py-4">
                    <RiskBadge level={hazard.riskLevel} />
                  </td>
                  <td className="px-6 py-4 text-sm">{hazard.location}</td>
                  <td className="px-6 py-4 text-sm font-medium">{hazard.department}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={hazard.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onView(hazard)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-[#135bec] transition-colors" 
                        title="查看详情"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-[#135bec] transition-colors" title="编辑">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-500 font-medium">共 124 条记录，当前显示第 1-4 条</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#135bec] text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-xs text-slate-600">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-xs text-slate-600">3</button>
              <span className="text-slate-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-xs text-slate-600">42</button>
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 ml-1">{label}</label>
      <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-sm py-2 focus:ring-[#135bec] focus:border-[#135bec] outline-none">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const styles: any = {
    '重大风险': 'bg-red-100 text-red-600',
    '较大风险': 'bg-orange-100 text-orange-600',
    '一般风险': 'bg-blue-100 text-blue-600',
    '低风险': 'bg-emerald-100 text-emerald-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${styles[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: HazardStatus }) {
  const styles: any = {
    '待确认': 'bg-blue-50 text-blue-600 border-blue-200',
    '进行中': 'bg-amber-50 text-amber-600 border-amber-200',
    '待验证': 'bg-indigo-50 text-indigo-600 border-indigo-200',
    '结案': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  
  const dotColors: any = {
    '待确认': 'bg-blue-500',
    '进行中': 'bg-amber-500',
    '待验证': 'bg-indigo-500',
    '结案': 'bg-emerald-500',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`}></span>
      <span className="text-xs font-bold">{status}</span>
    </div>
  );
}

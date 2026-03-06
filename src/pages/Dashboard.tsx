import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  FileText, Verified, Edit, CheckSquare, Wrench, CheckCircle2, Archive, BarChart3,
  MapPin, Clock, AlertCircle, Gauge, ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';

const barData = [
  { name: '日常检查', value: 70 },
  { name: '专项检查', value: 45 },
  { name: '综合检查', value: 30 },
  { name: '节前检查', value: 85 },
  { name: '外部审核', value: 60 },
];

const pieData = [
  { name: '重大风险', value: 10, color: '#ef4444' },
  { name: '较大风险', value: 25, color: '#f59e0b' },
  { name: '一般风险', value: 40, color: '#3b82f6' },
  { name: '低风险', value: 25, color: '#10b981' },
];

const lifecycleSteps = [
  { id: 1, label: '隐患发布', icon: Edit, active: true },
  { id: 2, label: '整改审核', icon: CheckSquare, active: false },
  { id: 3, label: '隐患整改', icon: Wrench, active: false },
  { id: 4, label: '隐患结案', icon: CheckCircle2, active: false },
  { id: 5, label: '闭环归档', icon: Archive, active: false },
  { id: 6, label: '数据分析', icon: BarChart3, active: false },
];

const alerts = [
  { id: 1, type: '重大隐患', time: '10分钟前', title: '2号车间压力容器参数异常', location: '生产二部', color: 'red' },
  { id: 2, type: '逾期未整改', time: '2小时前', title: '危化品库喷淋系统年度检修', location: '逾期 3 天', color: 'amber' },
  { id: 3, type: '重大隐患', time: '5小时前', title: '动力站配电柜绝缘老化测试失败', location: '动力能源部', color: 'red' },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-8">
      {/* Lifecycle Tracker */}
      <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wider">隐患生命周期流程追踪</h3>
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-5 left-16 right-16 h-0.5 bg-slate-200 z-0"></div>
          {lifecycleSteps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                step.active 
                  ? 'bg-[#135bec] text-white shadow-lg shadow-[#135bec]/30' 
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-bold ${step.active ? 'text-[#135bec]' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="总隐患数" 
              value="2,456" 
              trend="+8.5%" 
              trendType="up" 
              icon={FileText} 
              iconColor="blue" 
            />
            <StatCard 
              title="待整改" 
              value="142" 
              trend="紧急 12" 
              trendType="danger" 
              icon={ClipboardList} 
              iconColor="orange" 
            />
            <StatCard 
              title="已结案" 
              value="2,314" 
              trend="完成率 92%" 
              trendType="up" 
              icon={Verified} 
              iconColor="emerald" 
            />
            <StatCard 
              title="整改完成率" 
              value="94.2%" 
              progress={94.2} 
              icon={Gauge} 
              iconColor="purple" 
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">检查类型分布</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium bg-slate-100 rounded text-slate-600">周</button>
                  <button className="px-3 py-1 text-xs font-medium bg-[#135bec] text-white rounded">月</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" fill="#135bec" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-8">风险等级占比</h3>
              <div className="h-64 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <aside className="w-80 flex flex-col bg-[#041428] text-slate-100 shrink-0 border-l border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">重大/逾期预警</h3>
              <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">实时</span>
            </div>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`bg-slate-800/40 p-4 rounded-lg border-l-4 transition-colors cursor-pointer hover:bg-slate-800 ${
                    alert.color === 'red' ? 'border-red-500' : 'border-amber-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold ${alert.color === 'red' ? 'text-red-400' : 'text-amber-400'}`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">{alert.title}</p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400">
                    <MapPin className="w-3 h-3" /> {alert.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 mt-auto border-t border-slate-800">
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> 查看历史预警
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendType, progress, icon: Icon, iconColor }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-[#135bec]',
    orange: 'bg-orange-50 text-orange-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const trendClasses: any = {
    up: 'text-emerald-500 bg-emerald-50',
    danger: 'text-red-500 bg-red-50',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[iconColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${trendClasses[trendType] || 'text-slate-500 bg-slate-50'}`}>
            {trend}
          </span>
        )}
        {progress !== undefined && (
          <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-purple-500`} style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h4 className="text-3xl font-bold text-slate-900 mt-1">{value}</h4>
    </motion.div>
  );
}

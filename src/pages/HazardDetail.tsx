import React from 'react';
import { 
  Shield, Printer, ArrowLeft, Info, FileText, 
  MapPin, UserCheck, Wrench, CheckCircle2, ZoomIn, PlayCircle,
  Verified
} from 'lucide-react';
import { Hazard } from '../types';

interface HazardDetailProps {
  hazard: Hazard;
  onBack: () => void;
}

export default function HazardDetail({ hazard, onBack }: HazardDetailProps) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 lg:px-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#135bec] text-white p-1.5 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-slate-900 text-xl font-bold leading-tight">ESH 问题管理系统</h1>
              <p className="text-slate-400 text-xs font-medium">隐患处理详情展示</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
              <Printer className="w-4 h-4" />
              打印单据
            </button>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full py-10 px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-[#135bec] w-5 h-5" />
            <span className="text-[#135bec] font-bold text-sm tracking-wide">单据详情查看</span>
          </div>
          <h2 className="text-slate-900 text-3xl font-black">隐患处理详情展示页</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">已完成</span>
            <span className="text-slate-400 text-xs">最后更新时间：2023-11-25 09:15</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Info className="text-[#135bec] w-5 h-5" />
              <h3 className="font-bold text-slate-800 text-lg">基础信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
              <DetailItem label="发现人" value={hazard.discoverer} />
              <DetailItem label="隐患编号" value={hazard.id} mono />
              <DetailItem label="工号" value="952701" mono />
              <DetailItem label="发现时间" value={hazard.discoverTime} />
              <div className="md:col-span-2 lg:col-span-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">隐患标题</p>
                <p className="text-sm text-slate-700 font-medium text-base">{hazard.title}</p>
              </div>
            </div>
          </section>

          {/* Detailed Info */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <FileText className="text-[#135bec] w-5 h-5" />
              <h3 className="font-bold text-slate-800 text-lg">隐患详细信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <DetailItem label="检查类型" value={hazard.checkType} />
              <DetailItem label="隐患类别" value={hazard.hazardType} />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">风险等级</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                  {hazard.riskLevel}
                </span>
              </div>
              <DetailItem label="责任部门" value={hazard.department} />
              <div className="md:col-span-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">隐患位置</p>
                <div className="flex items-center gap-1 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {hazard.location}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">隐患描述</p>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                  {hazard.description}
                </p>
              </div>
            </div>
          </section>

          {/* Attachments */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <PaperclipIcon className="text-[#135bec] w-5 h-5" />
              <h3 className="font-bold text-slate-800 text-lg">附件展示</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <ImageThumbnail src="https://picsum.photos/seed/hazard1/400/400" />
              <ImageThumbnail src="https://picsum.photos/seed/hazard2/400/400" />
              <div className="group relative w-32 h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-800 cursor-pointer flex items-center justify-center">
                <PlayCircle className="text-white w-10 h-10" />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">00:15</div>
              </div>
            </div>
          </section>

          {/* Lifecycle Sections */}
          <div className="space-y-6">
            <LifecycleSection 
              title="隐患确认" 
              icon={UserCheck} 
              time="2023-11-20 16:00"
              items={[
                { label: '确认人', value: '张经理 (安全科)' },
                { label: '核实结果', value: '有效隐患', badge: true },
                { label: '核实说明', value: '经现场核实，配电柜接线松动属实，已要求设备部立即安排电工跟进。此隐患被列为本周安全重点管控项。', fullWidth: true }
              ]}
            />
            <LifecycleSection 
              title="隐患整改说明" 
              icon={Wrench} 
              time="2023-11-21 09:30"
              items={[
                { label: '整改责任人', value: '李工 (设备课)' },
                { label: '整改时限', value: '2023-11-23' },
                { label: '整改措施', value: '1. 组织持证电工对动力配电柜进行断电紧固处理；2. 更换损坏的柜门锁扣；3. 重新张贴标准的安全警示标识。', fullWidth: true }
              ]}
            />
            <LifecycleSection 
              title="整改结果展示" 
              icon={CheckCircle2} 
              time="2023-11-23 15:20"
              items={[
                { label: '整改完成时间', value: '2023-11-23 15:00' },
                { label: '整改后照片', value: (
                  <div className="flex gap-4 mt-2">
                    <div className="w-24 h-24 rounded border border-slate-200 overflow-hidden">
                      <img alt="整改后" className="w-full h-full object-cover" src="https://picsum.photos/seed/fixed1/200/200" referrerPolicy="no-referrer" />
                    </div>
                    <div className="w-24 h-24 rounded border border-slate-200 overflow-hidden">
                      <img alt="整改后" className="w-full h-full object-cover" src="https://picsum.photos/seed/fixed2/200/200" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                ), fullWidth: true }
              ]}
            />
            <LifecycleSection 
              title="隐患处理验证" 
              icon={Verified} 
              time="2023-11-25 09:15"
              isSuccess
              items={[
                { label: '验证人', value: '周主管 (安全办)' },
                { label: '验证结果', value: '合格', badge: true, badgeColor: 'green' },
                { label: '验证时间', value: '2023-11-25 09:10' },
                { label: '验证说明', value: '经现场复查，所有松动接线已紧固，柜门开启自如并已加锁。安全警示标识已张贴在明显位置。整改效果符合标准，准予闭环。', fullWidth: true }
              ]}
            />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs flex items-center justify-center gap-1">
            <Verified className="w-3 h-3" />
            该单据已经过电子签名加密，由 ESH 问题管理系统自动存档。
          </p>
        </div>
      </main>
    </div>
  );
}

function DetailItem({ label, value, mono }: any) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm text-slate-700 font-medium ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}

function ImageThumbnail({ src }: { src: string }) {
  return (
    <div className="group relative w-32 h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer">
      <img alt="隐患照片" className="w-full h-full object-cover" src={src} referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <ZoomIn className="text-white w-6 h-6" />
      </div>
    </div>
  );
}

function LifecycleSection({ title, icon: Icon, time, items, isSuccess }: any) {
  return (
    <section className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 ${isSuccess ? 'border-l-green-500 bg-green-50/20' : 'border-l-[#135bec]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${isSuccess ? 'text-green-600' : 'text-[#135bec]'}`} />
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        </div>
        <span className="text-xs text-slate-400">处理时间：{time}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item: any, idx: number) => (
          <div key={idx} className={item.fullWidth ? 'md:col-span-3' : ''}>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
            {item.badge ? (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${
                item.badgeColor === 'green' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {item.value}
              </span>
            ) : (
              <div className="text-sm text-slate-700 font-medium">{item.value}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

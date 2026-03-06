import React from 'react';
import { 
  Shield, PlusSquare, Info, Edit, Paperclip, 
  Camera, Video, UserCheck, Wrench, CheckCircle2, 
  MapPin, Tag, Badge, Clock, Lock
} from 'lucide-react';

interface HazardFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export default function HazardForm({ onCancel, onSubmit }: HazardFormProps) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 lg:px-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#135bec] text-white p-1.5 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-slate-900 text-xl font-bold leading-tight">ESH 问题管理系统</h1>
              <p className="text-slate-400 text-xs font-medium">隐患发布与整改详情</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onCancel}
              className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={onSubmit}
              className="px-6 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
            >
              提交
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full py-10 px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <PlusSquare className="text-[#135bec] w-5 h-5" />
            <span className="text-[#135bec] font-bold text-sm tracking-wide">隐患全流程管理</span>
          </div>
          <h2 className="text-slate-900 text-3xl font-black">隐患发布与整改详情表单</h2>
          <p className="text-slate-500 text-sm mt-2">请准确填写隐患全流程信息，标有 <span className="text-red-500">*</span> 的项目为必填项。</p>
        </div>

        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          {/* Basic Info */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Info className="text-slate-400 w-5 h-5 fill-slate-400" />
              <h3 className="font-bold text-slate-700 text-lg">基础信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <ReadOnlyField label="发现人" value="王小明" icon={Edit} />
              <ReadOnlyField label="隐患编号" value="HAZ-20231120-082" icon={Tag} />
              <ReadOnlyField label="工号" value="952701" icon={Badge} />
              <ReadOnlyField label="发现时间" value="2023-11-20 14:30" icon={Clock} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                隐患标题 <span className="text-red-500">*</span>
              </label>
              <input 
                className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                placeholder="请输入简洁明确的隐患标题" 
                type="text"
              />
            </div>
          </section>

          {/* Detailed Info */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Edit className="text-slate-400 w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">隐患详细信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormSelect label="检查类型" options={['日常检查', '专项检查', '节前检查', '综合检查']} required />
              <FormSelect label="隐患类别" options={['消防安全', '电气安全', '机械设备', '职业卫生', '环境污染']} required />
              <FormSelect label="风险等级" options={['重大隐患', '较大隐患', '一般隐患', '低风险隐患']} required />
              <FormSelect label="责任部门" options={['生产部', '行政部', '设备部', '物流仓储部', '质检中心']} required />
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  隐患位置 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                    placeholder="请输入隐患发生的具体地理位置或工段" 
                    type="text"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  隐患描述 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm min-h-[100px]" 
                  placeholder="请详细描述隐患的具体情况，包括不安全行为、不安全状态等..."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Attachments */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
              <Paperclip className="text-slate-400 w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">附件上传</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UploadBox label="隐患照片" icon={Camera} subtext="支持 JPG, PNG 格式，每张不超过 5MB" required />
              <UploadBox label="隐患视频" icon={Video} subtext="支持 MP4, MOV 格式，时长 30 秒以内" />
            </div>
          </section>

          {/* Verification Module */}
          <section className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200/60">
              <UserCheck className="text-slate-400 w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">隐患确认模块</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  核实结果 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <RadioOption label="有效隐患" name="check_result" />
                  <RadioOption label="无效隐患" name="check_result" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  核实说明 <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                  placeholder="请填写隐患核实情况说明" 
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Rectification Description */}
          <section className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200/60">
              <Wrench className="text-slate-400 w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">隐患整改说明</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-1 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  整改措施 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm min-h-[80px]" 
                  placeholder="请输入拟采取的整改措施..."
                ></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  整改责任人 <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                  placeholder="姓名/工号" 
                  type="text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  整改时限 <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                  type="date"
                />
              </div>
            </div>
          </section>

          {/* Result Display */}
          <section className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200/60">
              <CheckCircle2 className="text-slate-400 w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">整改结果展示</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  整改后照片 <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-white hover:border-[#135bec] transition-all cursor-pointer group text-center h-[110px]">
                  <Camera className="w-6 h-6 text-slate-300 group-hover:text-[#135bec] mb-1" />
                  <p className="text-xs font-bold text-slate-600 group-hover:text-[#135bec]">上传整改后对比照</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  整改完成时间 <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                  type="datetime-local"
                />
              </div>
            </div>
          </section>

          {/* Verification Module */}
          <section className="bg-blue-50/30 p-6 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-blue-200/60">
              <UserCheck className="text-[#135bec] w-5 h-5" />
              <h3 className="font-bold text-slate-700 text-lg">隐患处理验证模块</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  验证结果 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white border border-slate-200 px-3 py-2.5 rounded-lg hover:border-[#135bec] transition-all group">
                    <input className="text-[#135bec] focus:ring-[#135bec]" name="verification_result" type="radio" />
                    <span className="text-sm text-slate-600 group-hover:text-[#135bec] font-medium">合格</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-white border border-slate-200 px-3 py-2.5 rounded-lg hover:border-red-500 transition-all group">
                    <input className="text-red-500 focus:ring-red-500" name="verification_result" type="radio" />
                    <span className="text-sm text-slate-600 group-hover:text-red-500 font-medium">不合格</span>
                  </label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  验证时间 <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm" 
                  type="datetime-local"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  验证说明 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm min-h-[44px]" 
                  placeholder="请填写详细的验证评价或改进建议..."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              所有数据将严格保密，提交后系统将即时推送到相关部门。
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

function ReadOnlyField({ label, value, icon: Icon }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="flex items-center px-4 h-11 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-sm">
        <Icon className="w-4 h-4 mr-2 text-slate-400" />
        {value}
      </div>
    </div>
  );
}

function FormSelect({ label, options, required }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none transition-all text-sm">
        <option disabled selected value="">请选择{label}</option>
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function UploadBox({ label, icon: Icon, subtext, required }: any) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-[#135bec] transition-all cursor-pointer group text-center">
        <Icon className="w-10 h-10 text-slate-300 group-hover:text-[#135bec] mb-3" />
        <p className="text-sm font-bold text-slate-600 group-hover:text-[#135bec]">点击或拖拽上传现场{label.slice(2)}</p>
        <p className="text-xs text-slate-400 mt-2">{subtext}</p>
      </div>
    </div>
  );
}

function RadioOption({ label, name }: any) {
  return (
    <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-[#135bec] transition-all">
      <input className="text-[#135bec] focus:ring-[#135bec]" name={name} type="radio" />
      <span className="text-sm text-slate-600">{label}</span>
    </label>
  );
}

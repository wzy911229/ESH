import React, { useState } from 'react';
import { 
  Bell, Send, Search, Filter, Plus, 
  AlertCircle, Info, CheckCircle2, Clock, 
  MoreHorizontal, Trash2, Eye, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  sender: string;
  time: string;
  isRead: boolean;
  department: string;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: '关于开展 2024 年第一季度安全大检查的通知',
    content: '请各部门按照《安全生产管理制度》要求，于本周五前完成自查自纠工作，并将结果报送至 ESH 办公室。',
    type: 'info',
    sender: 'ESH 办公室',
    time: '2024-03-05 09:00',
    isRead: false,
    department: '全厂区'
  },
  {
    id: '2',
    title: '重大隐患整改逾期预警',
    content: '编号为 HAZ-20231120-082 的隐患已超过整改时限，请生产部立即处理并提交反馈。',
    type: 'danger',
    sender: '系统自动',
    time: '2024-03-05 08:30',
    isRead: true,
    department: '生产部'
  },
  {
    id: '3',
    title: '消防设施月度维保完成公示',
    content: '本月全厂消防设施维保已完成，所有设备运行正常，详情请查看附件报告。',
    type: 'success',
    sender: '设备部',
    time: '2024-03-04 16:45',
    isRead: true,
    department: '全厂区'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isPublishing, setIsPublishing] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    type: 'info' as Notification['type'],
    department: '全厂区'
  });

  const handlePublish = () => {
    if (!newNotification.title || !newNotification.content) {
      toast.error('请填写完整通知内容');
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      sender: '当前用户',
      time: new Date().toLocaleString(),
      isRead: false
    };

    setNotifications([notification, ...notifications]);
    setIsPublishing(false);
    setNewNotification({ title: '', content: '', type: 'info', department: '全厂区' });
    toast.success('通知发布成功');
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'danger': return 'bg-red-50 text-red-600 border-red-100';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'danger': return AlertCircle;
      case 'warning': return Clock;
      case 'success': return CheckCircle2;
      default: return Info;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
              <Bell className="w-6 h-6 text-[#135bec]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">通知发布中心</h1>
              <p className="text-sm text-slate-500">管理并发布全厂安全生产相关通知与预警</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPublishing(true)}
            className="flex items-center gap-2 bg-[#135bec] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            发布新通知
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索通知标题、内容或发送人..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              筛选类型
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
              <Clock className="w-4 h-4" />
              按时间排序
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <AnimatePresence>
            {notifications.map((notif) => {
              const Icon = getTypeIcon(notif.type);
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group ${!notif.isRead ? 'border-l-4 border-l-[#135bec]' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${getTypeStyles(notif.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-slate-900 truncate pr-4">{notif.title}</h3>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">{notif.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3.5 h-3.5" />
                            {notif.sender}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            {notif.department}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Publish Modal */}
      <AnimatePresence>
        {isPublishing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-[#135bec] text-white p-2 rounded-lg">
                    <Send className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">发布新通知</h2>
                </div>
                <button 
                  onClick={() => setIsPublishing(false)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <Plus className="w-5 h-5 rotate-45 text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">通知标题</label>
                  <input 
                    type="text" 
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="请输入简洁明确的通知标题"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">通知类型</label>
                    <select 
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none bg-white"
                    >
                      <option value="info">常规通知</option>
                      <option value="warning">安全预警</option>
                      <option value="danger">重大风险</option>
                      <option value="success">公示结果</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">发布范围</label>
                    <select 
                      value={newNotification.department}
                      onChange={(e) => setNewNotification({...newNotification, department: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none bg-white"
                    >
                      <option value="全厂区">全厂区</option>
                      <option value="生产部">生产部</option>
                      <option value="设备部">设备部</option>
                      <option value="行政部">行政部</option>
                      <option value="物流仓储部">物流仓储部</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">通知内容</label>
                  <textarea 
                    value={newNotification.content}
                    onChange={(e) => setNewNotification({...newNotification, content: e.target.value})}
                    placeholder="请输入详细的通知内容..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-[#135bec]/10 focus:border-[#135bec] outline-none min-h-[120px]"
                  ></textarea>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsPublishing(false)}
                  className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-white transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handlePublish}
                  className="px-8 py-2 rounded-lg bg-[#135bec] text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                >
                  确认发布
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

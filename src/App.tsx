import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import HazardList from './pages/HazardList';
import HazardForm from './pages/HazardForm';
import HazardDetail from './pages/HazardDetail';
import NotificationCenter from './pages/NotificationCenter';
import { Page, Hazard } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setSelectedHazard(null);
  };

  const handleViewHazard = (hazard: Hazard) => {
    setSelectedHazard(hazard);
    setCurrentPage('detail');
  };

  const handleAddHazard = () => {
    setCurrentPage('form');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'list':
        return <HazardList onAdd={handleAddHazard} onView={handleViewHazard} />;
      case 'notifications':
        return <NotificationCenter />;
      case 'form':
        return <HazardForm onCancel={() => setCurrentPage('list')} onSubmit={() => setCurrentPage('list')} />;
      case 'detail':
        return selectedHazard ? (
          <HazardDetail hazard={selectedHazard} onBack={() => setCurrentPage('list')} />
        ) : (
          <Dashboard />
        );
      default:
        return <Dashboard />;
    }
  };

  const getHeaderTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'ESH数字化管理系统仪表盘';
      case 'list': return '隐患管理列表';
      case 'notifications': return '通知发布中心';
      case 'form': return '新增隐患单据';
      case 'detail': return '隐患详情查看';
      default: return 'ESH 管理系统';
    }
  };

  // For form and detail pages, we might want a different layout (no sidebar/standard header)
  // matching the user's provided screenshots.
  const isFullPage = currentPage === 'form' || currentPage === 'detail';

  if (isFullPage) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen bg-slate-50"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      <Toaster position="top-right" richColors />
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={getHeaderTitle()} />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}


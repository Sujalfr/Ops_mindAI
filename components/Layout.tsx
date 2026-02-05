
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  MessageSquare, 
  Settings, 
  ShieldCheck, 
  Search,
  ChevronRight,
  Menu,
  X,
  Bell,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'chat' | 'documents' | 'guide';
  setActiveTab: (tab: 'dashboard' | 'chat' | 'documents' | 'guide') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'chat', label: 'Knowledge Chat', icon: <MessageSquare size={20} /> },
    { id: 'documents', label: 'Document Library', icon: <Files size={20} /> },
    { id: 'guide', label: 'User Guide', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0f1e] text-white p-6 shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-12">
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20"
          >
            <ShieldCheck size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">OpsMind <span className="text-indigo-400">AI</span></h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Enterprise</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-indigo-600 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="font-medium relative z-10">{item.label}</span>
              
              {activeTab !== item.id && (
                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full text-left group">
            <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1e] shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-indigo-400" />
                  <h1 className="text-xl font-bold text-white">OpsMind AI</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-2 hover:bg-slate-800 rounded-lg">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative gradient-bg">
        {/* Header */}
        <header className="h-18 flex items-center justify-between px-6 bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-500 hover:bg-slate-100 p-2 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find technical docs..." 
                className="bg-slate-100/50 border border-transparent focus:border-indigo-200 rounded-xl pl-10 pr-4 py-2 w-72 text-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100/50">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[11px] font-bold text-green-700 tracking-wide uppercase">RAG Engine Online</span>
            </div>
            
            <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-800">Sujal Dolas</p>
                <p className="text-[10px] text-slate-400 font-medium">Ops Lead</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-white/20">
                <span className="text-xs font-bold">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

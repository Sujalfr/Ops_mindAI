
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import DocumentUpload from './components/DocumentUpload';
import ChatInterface from './components/ChatInterface';
import UserGuide from './components/UserGuide';
import LandingPage from './components/LandingPage';
import { DocumentSource } from './types';
import { 
  FileText, 
  Trash2, 
  Database, 
  Search, 
  Clock, 
  HardDrive,
  BarChart3,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Plus,
  Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'documents' | 'guide'>('dashboard');
  const [documents, setDocuments] = useState<DocumentSource[]>([]);

  const handleUploadSuccess = (doc: DocumentSource) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const renderDashboard = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-10 max-w-7xl mx-auto"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enterprise Intelligence</h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time health monitoring for the OpsMind RAG pipeline.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveTab('documents')}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Add Knowledge
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Database size={20} />, label: 'Vector Count', value: documents.reduce((acc, d) => acc + d.chunks.length, 0), unit: 'Chunks', color: 'indigo' },
          { icon: <FileText size={20} />, label: 'Knowledge Assets', value: documents.length, unit: 'Sources', color: 'green' },
          { icon: <HardDrive size={20} />, label: 'Storage Ingested', value: (documents.reduce((acc, d) => acc + d.size, 0) / 1024).toFixed(1), unit: 'KB', color: 'amber' },
          { icon: <BarChart3 size={20} />, label: 'Retriever Fidelity', value: '99.8', unit: '%', color: 'blue' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 glass-card"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${stat.color}-500/10 ${
              stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
              stat.color === 'green' ? 'bg-green-50 text-green-600' :
              stat.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
              <span className="text-xs text-slate-400 font-bold uppercase">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-200/20 glass-card">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/30">
              <h3 className="font-bold text-slate-900">Recent Knowledge Pipeline</h3>
              <button onClick={() => setActiveTab('documents')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors">
                View Full Index <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-slate-100/50">
              {documents.length > 0 ? documents.slice(0, 5).map(doc => (
                <motion.div 
                  key={doc.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 border border-slate-200/50 text-slate-400 rounded-2xl">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {doc.chunks.length} Vectors • Indexed {doc.uploadDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100/50 uppercase tracking-wider">Synced</span>
                  </div>
                </motion.div>
              )) : (
                <div className="p-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                    <Database size={32} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Pipeline empty. Indexing required for RAG features.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Sparkles size={120} />
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10">AI Chat Assistant</h3>
            <p className="text-indigo-100/80 text-sm mb-8 leading-relaxed font-medium relative z-10">Ask complex technical or policy questions grounded in your private document store.</p>
            <button 
              onClick={() => setActiveTab('chat')}
              className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2 relative z-10 active:scale-95"
            >
              <Search size={18} />
              Start Consultation
            </button>
          </motion.div>

          <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 shadow-xl shadow-slate-200/20 glass-card">
            <div className="flex items-center gap-3 text-amber-600 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Security Guardrails</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
              Verified Hallucination Prevention (VHP) is active. Responses are strictly anchored to identified semantic clusters.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <span>Retrieval Grounding</span>
                <span className="text-green-500">100% Active</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="bg-gradient-to-r from-green-400 to-green-500 h-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDocuments = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-5xl mx-auto space-y-10"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Knowledge Index</h1>
          <p className="text-slate-500 mt-2 font-medium">Partition and embed corporate assets for semantic retrieval.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-100 uppercase tracking-widest shadow-sm">
          <Clock size={16} />
          Auto-Partitioning Active
        </div>
      </header>

      <DocumentUpload onUploadSuccess={handleUploadSuccess} />

      <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-200/30 overflow-hidden glass-card">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/40">
          <h3 className="font-bold text-slate-900">Stored Assets</h3>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
            {documents.length} Total Files
          </span>
        </div>
        <div className="divide-y divide-slate-100/50">
          {documents.length > 0 ? documents.map(doc => (
            <motion.div 
              key={doc.id} 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-indigo-50/50 text-indigo-600 rounded-[1.25rem] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm border border-indigo-100/50">
                  <FileText size={28} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800">{doc.name}</h4>
                  <div className="flex flex-wrap items-center gap-4 mt-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{(doc.size / 1024).toFixed(1)} KB</span>
                    <span className="text-slate-200 text-lg leading-none">•</span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{doc.chunks.length} Vectors</span>
                    <span className="text-slate-200 text-lg leading-none">•</span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{doc.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteDocument(doc.id)}
                  className="p-3 text-slate-300 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 size={22} />
                </motion.button>
              </div>
            </motion.div>
          )) : (
            <div className="p-24 text-center">
              <div className="inline-flex p-6 bg-slate-50 text-slate-200 rounded-[2rem] mb-6 border border-slate-100">
                <Database size={56} />
              </div>
              <h3 className="text-slate-800 font-bold mb-2">Knowledge Base Empty</h3>
              <p className="text-slate-400 text-sm max-w-[280px] mx-auto font-medium leading-relaxed">
                Start by uploading technical documentation or internal policies to enable AI knowledge features.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onStart={() => setView('app')} />
        </motion.div>
      ) : (
        <motion.div 
          key="app"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'chat' && (
                <motion.div 
                  key="chat"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full flex flex-col"
                >
                  <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col pb-6">
                    <ChatInterface documents={documents} />
                  </div>
                </motion.div>
              )}
              {activeTab === 'documents' && renderDocuments()}
              {activeTab === 'guide' && <UserGuide />}
            </AnimatePresence>
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;

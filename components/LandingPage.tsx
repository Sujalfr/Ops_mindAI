
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Zap, 
  Database, 
  Lock, 
  FileCheck, 
  AlertCircle,
  Clock,
  ChevronRight,
  Globe,
  Cpu,
  MessageSquare
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">OpsMind <span className="text-indigo-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Security</a>
          </div>
          <button 
            onClick={onStart}
            className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
          >
            Launch Platforms
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm mb-6"
          >
            <Zap size={14} className="fill-indigo-600" />
            Next-Gen RAG Engine
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Find Answers Instantly.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Trust Every Response.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            OpsMind AI turns your internal documents into a trusted, searchable knowledge assistant. Grounded in your data, zero hallucinations guaranteed.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Index Your Knowledge <ArrowRight size={18} />
            </button>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
              See How It Works
            </a>
          </motion.div>

          {/* Product Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>
            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden p-4">
              <div className="rounded-[1.5rem] overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-900 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-full max-w-2xl px-10 space-y-6">
                      <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-2xl p-4 text-white/80 text-sm max-w-[80%] border border-white/10">
                          What is our remote work policy for 2024?
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-indigo-600 rounded-2xl p-4 text-white text-sm max-w-[80%] shadow-lg shadow-indigo-600/20">
                          Based on the <span className="underline decoration-indigo-300">Employee Handbook (v2.4)</span>, employees may work remotely up to 3 days per week...
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white" id="problem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Knowledge Crisis</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Employees spend up to <span className="text-indigo-600 font-bold">20% of their time</span> hunting for information buried in chaotic folders, nested PDFs, and outdated portals.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Clock className="text-red-500" />, text: "Hours wasted manually scanning documents" },
                  { icon: <AlertCircle className="text-amber-500" />, text: "Conflicting answers from different file versions" },
                  { icon: <Globe className="text-blue-500" />, text: "Knowledge silos across distributed teams" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {item.icon}
                    <span className="font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-slate-100 rounded-3xl animate-pulse"></div>
                <div className="h-64 bg-indigo-50 rounded-3xl p-6 flex flex-col justify-end">
                    <span className="text-4xl font-bold text-indigo-600 mb-2">91%</span>
                    <span className="text-sm font-medium text-indigo-900/60 uppercase tracking-wider">Search Friction</span>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-64 bg-slate-900 rounded-3xl p-6 flex flex-col justify-end">
                    <span className="text-4xl font-bold text-white mb-2">2.5h</span>
                    <span className="text-sm font-medium text-white/60 uppercase tracking-wider">Avg Daily Search Time</span>
                </div>
                <div className="h-48 bg-slate-100 rounded-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Engineered for Accuracy</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">OpsMind isn't just a chatbot. It's a high-fidelity information retrieval pipeline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Cpu className="text-indigo-600" />, 
                title: "Contextual RAG", 
                desc: "We don't just prompt. We retrieve the most relevant semantic clusters before generating answers." 
              },
              { 
                icon: <FileCheck className="text-green-600" />, 
                title: "Truth Guardrail", 
                desc: "If the information isn't in your data, the AI won't guess. It strictly responds with 'I don't know'." 
              },
              { 
                icon: <MessageSquare className="text-blue-600" />, 
                title: "Source Citations", 
                desc: "Every claim includes a link to the exact document used as context for complete auditability." 
              },
              { 
                icon: <Lock className="text-purple-600" />, 
                title: "Private Ingestion", 
                desc: "Your data is partitioned and stored in an isolated vector database. We never train on your IP." 
              },
              { 
                icon: <Search className="text-amber-600" />, 
                title: "Semantic Search", 
                desc: "Search by meaning, not just keywords. Find answers even when terms don't match exactly." 
              },
              { 
                icon: <Database className="text-slate-900" />, 
                title: "Hybrid Indexing", 
                desc: "Support for multi-modal data structures ensures policy manuals and technical logs are searchable." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 glass-card"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hallucination Demo */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Hallucination Prevention</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Standard AI chatbots guess when they don't know. <br className="hidden md:block" />
              OpsMind AI tells the truth, or tells you it doesn't know.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Standard AI */}
            <div className="bg-slate-800/50 rounded-[2.5rem] p-10 border border-red-500/20 relative">
              <div className="absolute -top-4 -right-4 px-4 py-1 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">Risky</div>
              <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
                <AlertCircle size={14} className="text-red-500" /> Standard AI Chatbot
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-700/50 rounded-2xl text-sm">"What is our policy on unlimited PTO?"</div>
                <div className="p-4 bg-slate-800 rounded-2xl text-sm border border-white/5 text-slate-400 italic">
                  "Most modern tech companies offer unlimited PTO. Therefore, our policy likely encourages employees to take time off as needed..."
                </div>
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                  <X size={14} /> Factual Guessing (Hallucination)
                </div>
              </div>
            </div>

            {/* OpsMind AI */}
            <div className="bg-indigo-600/10 rounded-[2.5rem] p-10 border border-indigo-500/30 relative backdrop-blur-sm">
              <div className="absolute -top-4 -right-4 px-4 py-1 bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-widest">Secure</div>
              <h3 className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
                <ShieldCheck size={14} className="text-green-500" /> OpsMind Engine
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl text-sm border border-white/10">"What is our policy on unlimited PTO?"</div>
                <div className="p-4 bg-indigo-600 rounded-2xl text-sm shadow-xl shadow-indigo-600/20">
                  "I don't know. The provided documents do not mention an unlimited PTO policy. The current handbook only specifies 15 days of accrued leave."
                </div>
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                  <CheckCircle2 size={14} /> Grounded Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-slate-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Turn Your Documents<br />Into Answers.</h2>
            <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto font-medium">
              Start indexing your corporate knowledge base today and empower your team with verified AI insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 flex items-center gap-2"
              >
                Start Indexing <ChevronRight size={20} />
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Lock size={12} /> SOC2 Compliant</span>
              <span className="flex items-center gap-2"><ShieldCheck size={12} /> GDPR Ready</span>
              <span className="flex items-center gap-2"><Globe size={12} /> Global Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">OpsMind <span className="text-slate-500">AI</span></span>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            © 2024 OpsMind AI. Built for the modern enterprise.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Globe size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Database size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Helper components with optional className prop to fix type errors */
const CheckCircle2 = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/* Helper component with optional className prop to fix type errors */
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default LandingPage;

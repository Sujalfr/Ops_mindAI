
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudUpload, 
  Database, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Lightbulb,
  Zap,
  Lock,
  MessageSquareCode,
  ArrowRight
} from 'lucide-react';

const UserGuide: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const steps = [
    {
      icon: <CloudUpload className="text-indigo-600" size={24} />,
      title: "1. Document Ingestion",
      desc: "Upload technical manuals, HR policies, or internal reports in PDF or TXT format. Our engine partitions the text into semantically relevant chunks.",
      color: "indigo"
    },
    {
      icon: <Database className="text-purple-600" size={24} />,
      title: "2. Vector Indexing",
      desc: "Chunks are converted into high-dimensional vector embeddings and stored in our secure vector database. This allows for 'meaning-based' retrieval rather than keyword matching.",
      color: "purple"
    },
    {
      icon: <MessageSquareCode className="text-blue-600" size={24} />,
      title: "3. Semantic Querying",
      desc: "When you ask a question, we convert your query into a vector and find the top-K most relevant document chunks across your entire library.",
      color: "blue"
    },
    {
      icon: <ShieldCheck className="text-green-600" size={24} />,
      title: "4. Grounded Response",
      desc: "The AI generates a concise answer using ONLY the retrieved chunks. Every response is cited, allowing you to verify the source material instantly.",
      color: "green"
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-12 pb-20"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
          <Zap size={14} />
          Operating Manual
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">How OpsMind AI Works</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Our Context-Aware Retrieval Augmented Generation (RAG) system bridges the gap between massive document stores and accurate AI insights.
        </p>
      </motion.section>

      {/* Visual Workflow */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200/60 glass-card relative group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
            <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-${step.color}-50 shadow-sm border border-${step.color}-100 group-hover:scale-110 transition-transform`}>
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-300">
                <ArrowRight size={24} />
              </div>
            )}
          </div>
        ))}
      </motion.section>

      {/* Hallucination Guardrail Deep Dive */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <ShieldCheck size={200} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <ShieldCheck size={24} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold">Hallucination Guardrails</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Standard AI can "hallucinate" facts when it doesn't know the answer. OpsMind AI employs a strict <strong>Zero-External-Knowledge</strong> policy.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Retrieval Filtering", desc: "If the semantic similarity score is below our safety threshold, the system rejects the chunk." },
                { title: "Context Anchor", desc: "The LLM is explicitly forbidden from using its pre-training data for factual claims." },
                { title: "Fail-Safe Response", desc: "If no context matches, the system triggers the standard 'I don't know' response." }
              ].map((feature, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{feature.title}</h4>
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 glass-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <Lightbulb size={24} className="text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Query Best Practices</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Do</p>
                <p className="text-sm text-slate-700">"What is the company policy regarding remote work for engineering staff as mentioned in the 2024 Employee Handbook?"</p>
              </div>
              <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100/50">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Avoid</p>
                <p className="text-sm text-slate-700 italic">"Tell me something cool about my job."</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Be specific. Mention titles or topics present in your documents for higher retrieval precision.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 flex items-center gap-6">
            <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Enterprise Data Privacy</h3>
              <p className="text-sm text-slate-600">
                Documents are processed and stored in a multi-tenant isolated environment. Chunks are never shared with the public internet.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Quick Links */}
      <motion.section variants={itemVariants} className="text-center py-10">
        <h3 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-8">System Components</h3>
        <div className="flex flex-wrap justify-center gap-10 opacity-40">
          <div className="flex items-center gap-2 font-bold text-slate-900"><Database size={20} /> Vector DB v2.4</div>
          <div className="flex items-center gap-2 font-bold text-slate-900"><ShieldCheck size={20} /> Grounding v1.0</div>
          <div className="flex items-center gap-2 font-bold text-slate-900"><Zap size={20} /> Gemini 3 Flash</div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default UserGuide;

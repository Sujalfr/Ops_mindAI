
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle2, Loader2, AlertCircle, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentSource } from '../types';
import { ragService } from '../services/ragService';

interface DocumentUploadProps {
  onUploadSuccess: (doc: DocumentSource) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.txt')) {
      alert("Only PDF or TXT files are supported for this demonstration.");
      return;
    }

    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const chunks = ragService.chunkDocument(text || "");

      const newDoc: DocumentSource = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        uploadDate: new Date(),
        content: text || "",
        chunks: chunks,
        status: 'ready'
      };

      setTimeout(() => {
        onUploadSuccess(newDoc);
        setIsProcessing(false);
      }, 1800);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) processFile(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative group border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02]' 
          : 'border-slate-300 bg-white shadow-sm hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/5'
      }`}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileSelect}
        accept=".pdf,.txt"
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-x-16 -translate-y-16 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full translate-x-16 translate-y-16 blur-3xl"></div>

      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
              <div className="relative p-5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-600/30">
                <Loader2 size={36} className="animate-spin" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Knowledge Asset</h3>
            <p className="text-sm text-slate-500 max-w-[280px]">Generating high-dimensional vector embeddings for secure semantic search.</p>
            
            <div className="mt-8 flex gap-2">
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1.5 w-12 bg-indigo-100 rounded-full overflow-hidden">
                <motion.div animate={{ x: [-48, 48] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-full w-full bg-indigo-600" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className={`p-5 rounded-2xl mb-6 transition-all duration-300 ${
              isDragging 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 -translate-y-2' 
                : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 group-hover:-translate-y-1 shadow-sm'
            }`}>
              <Cloud size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ingest Corporate Context</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-[320px]">
              Drag manuals, policies, or technical specs here. We'll automatically partition and index them.
            </p>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Browse Knowledge Files
            </motion.button>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                Semantic Chunking
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Vector Embeddings
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Private Storage
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentUpload;

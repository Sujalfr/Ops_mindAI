
import React, { useState, useRef, useEffect } from 'react';
/* Added Database to the imports from lucide-react */
import { Send, User, Bot, Loader2, Info, BookOpen, AlertCircle, ShieldCheck, Sparkles, Command, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, DocumentSource } from '../types';
import { queryRAG } from "../services/ragService";


interface ChatInterfaceProps {
  documents: DocumentSource[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ documents }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am OpsMind AI. I can answer questions based on the corporate documents you have uploaded. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    if (documents.length === 0) {
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I don't have any documents indexed yet. Please upload some knowledge assets in the Document Library first.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 1200);
      return;
    }

    try {
      const ragResponse = await queryRAG(userMessage.content);


      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ragResponse.answer,
        timestamp: new Date(),
        sources: ragResponse.sources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I encountered an error querying the vector engine. Please try re-indexing your documents.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl shadow-indigo-500/5 border border-slate-200/60 overflow-hidden glass-card">
      {/* Chat Header */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-600/20">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Knowledge Assistant</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Grounding Enabled</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-slate-500 border border-slate-200/50">
            <Database size={12} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{documents.length} Docs</span>
          </div>
          <button className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide" ref={scrollRef}>
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index === messages.length - 1 ? 0 : 0.05 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                    msg.role === 'user' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </motion.div>
                
                <div className={`p-5 rounded-3xl relative ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-600/10' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm'
                }`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-5 pt-4 border-t border-slate-100"
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Command size={10} />
                        Document Evidence
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, i) => (
                          <motion.span 
                            key={i} 
                            whileHover={{ scale: 1.05 }}
                            className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold border border-indigo-100 cursor-default"
                          >
                            {source}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              <span className={`text-[10px] text-slate-400 mt-2 font-medium px-1 ${msg.role === 'user' ? 'mr-14' : 'ml-14'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm">
              <Bot size={18} className="animate-pulse" />
            </div>
            <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-slate-200/80 shadow-sm min-w-[120px]">
              <div className="flex gap-1.5 items-center">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50/50 border-t border-slate-100 backdrop-blur-md">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-indigo-500/5 rounded-[22px] blur-xl group-focus-within:bg-indigo-500/10 transition-all"></div>
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/40 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all p-2">
            <div className="pl-4 text-slate-300">
              <Sparkles size={18} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={documents.length > 0 ? "Query the context library..." : "Index some documents to start querying"}
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`p-3 rounded-xl transition-all shadow-md ${
                inputValue.trim() && !isTyping 
                  ? 'bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-indigo-400" />
            End-to-End Encrypted
          </p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Command size={12} className="text-slate-300" />
            Zero Data Retention
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;


import React, { useState } from 'react';
import { GeneratedCode } from '../types';

interface CodePreviewProps {
  code: GeneratedCode;
  onBack: () => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, onBack }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = code.files[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Project Source Code</h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Boilerplate Generated from Blueprint</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                Copy Content
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row bg-slate-900 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] border border-slate-800">
        {/* Sidebar Explorer */}
        <div className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Explorer</p>
          {code.files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 group ${
                activeFileIndex === idx 
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                  : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
              }`}
            >
              <svg className={`w-4 h-4 ${activeFileIndex === idx ? 'text-indigo-400' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-slate-900 px-6 py-2 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">{activeFile.name} — {activeFile.language}</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed">
            <pre className="text-indigo-100 whitespace-pre-wrap">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreview;

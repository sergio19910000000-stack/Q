
import React from 'react';
import { AppBlueprint } from '../types';

interface BlueprintViewProps {
  blueprint: AppBlueprint;
  onReset: () => void;
  onConvertToCode: () => void;
  isConverting: boolean;
}

const BlueprintView: React.FC<BlueprintViewProps> = ({ blueprint, onReset, onConvertToCode, isConverting }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">{blueprint.appName}</h1>
          <p className="text-xl text-indigo-600 font-medium italic mt-1">{blueprint.tagline}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onReset}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium self-start"
          >
            New Project
          </button>
          <button 
            onClick={onConvertToCode}
            disabled={isConverting}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-200 transition-all font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isConverting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Converting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Convert to Code
              </>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar info */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Tech Stack</h3>
            <div className="space-y-3">
              {Object.entries(blueprint.techStack).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-500 uppercase">{key}</span>
                  <span className="text-slate-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 text-white">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Infrastructure
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium uppercase">RAM</span>
                <span className="text-emerald-400 font-mono font-bold">{blueprint.infrastructure.ram}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium uppercase">CPU</span>
                <span className="text-indigo-300 font-mono font-bold">{blueprint.infrastructure.cpu}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium uppercase">Storage</span>
                <span className="text-slate-200 font-mono font-bold">{blueprint.infrastructure.storage}</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-slate-400 font-medium uppercase block mb-1">Scaling Strategy</span>
                <p className="text-xs text-slate-300 italic">{blueprint.infrastructure.scalingStrategy}</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(blueprint.colorPalette).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border border-slate-200 shadow-inner" 
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-xs text-slate-600 truncate">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">01</span>
              Description
            </h2>
            <p className="text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              {blueprint.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">02</span>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprint.features.map((feature, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800">{feature.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      feature.priority === 'High' ? 'bg-rose-100 text-rose-600' : 
                      feature.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {feature.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">03</span>
              Data Architecture
            </h2>
            <div className="space-y-4">
              {blueprint.dataModels.map((model, idx) => (
                <div key={idx} className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                    <span className="code-font text-emerald-400 font-bold">{model.name}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Table / Model</span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left text-sm code-font">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800">
                          <th className="pb-2 font-medium">Field</th>
                          <th className="pb-2 font-medium">Type</th>
                          <th className="pb-2 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {model.fields.map((field, fIdx) => (
                          <tr key={fIdx}>
                            <td className="py-2 pr-4 text-indigo-300">{field.name}</td>
                            <td className="py-2 pr-4 text-amber-200 opacity-80">{field.type}</td>
                            <td className="py-2 text-slate-400 text-xs italic">{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">04</span>
              Sitemap & Routing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprint.pages.map((page, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-slate-800">{page.name}</h4>
                    <code className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{page.route}</code>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{page.purpose}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {page.components.map((comp, cIdx) => (
                      <span key={cIdx} className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlueprintView;

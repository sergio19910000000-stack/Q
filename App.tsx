
import React, { useState, useEffect } from 'react';
import { ViewMode, AppBlueprint, User, GeneratedCode } from './types';
import { generateAppBlueprint, generateAppCode } from './services/geminiService';
import BlueprintView from './components/BlueprintView';
import AuthForm from './components/AuthForm';
import CodePreview from './components/CodePreview';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [blueprint, setBlueprint] = useState<AppBlueprint | null>(null);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('appgenius_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setViewMode(ViewMode.CREATE);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('appgenius_user', JSON.stringify(newUser));
    setViewMode(ViewMode.CREATE);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('appgenius_user');
    setViewMode(ViewMode.AUTH);
    setBlueprint(null);
    setPrompt('');
    setGeneratedCode(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateAppBlueprint(prompt);
      setBlueprint(result);
      setViewMode(ViewMode.BLUEPRINT);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToCode = async () => {
    if (!blueprint) return;
    setConverting(true);
    setError(null);
    try {
      const code = await generateAppCode(blueprint);
      setGeneratedCode(code);
      setViewMode(ViewMode.PREVIEW);
    } catch (err: any) {
      setError("Failed to convert to code. The architect is busy, please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setBlueprint(null);
    setGeneratedCode(null);
    setPrompt('');
    setViewMode(ViewMode.CREATE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-300">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 blur-[120px] rounded-full" />
      </div>

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={user ? handleReset : undefined}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">
              G
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">AppGenius</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-500 uppercase tracking-widest">
              <span className={viewMode === ViewMode.CREATE ? "text-indigo-600 cursor-default" : "hover:text-slate-800 cursor-pointer transition-colors"} onClick={user ? handleReset : undefined}>Architect</span>
              <span className="hover:text-slate-800 cursor-pointer transition-colors">Showcase</span>
            </div>
            
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-[10px] text-slate-400 hover:text-rose-500 font-bold uppercase tracking-tighter transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-12 pb-24 px-4">
        {viewMode === ViewMode.AUTH && (
          <AuthForm onLogin={handleLogin} />
        )}

        {viewMode === ViewMode.CREATE && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-none">
                Bring your <span className="text-indigo-600">app idea</span> to life.
              </h1>
              <p className="text-xl text-slate-500 max-w-xl mx-auto">
                AppGenius uses Gemini 3 Pro to design your entire technical architecture, data models, and features in seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A multi-vendor marketplace for sustainable organic honey where farmers can track their hive health..."
                  className="w-full min-h-[160px] text-lg bg-transparent border-none focus:ring-0 resize-none text-slate-700 placeholder:text-slate-400"
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                  <p className="text-xs text-slate-400">Describe features, target audience, and style.</p>
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      loading 
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Architecting...
                      </>
                    ) : (
                      'Generate Blueprint'
                    )}
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-xl text-center font-medium animate-in zoom-in-95 duration-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
              {[
                { title: 'Full Stack Strategy', icon: '⚡' },
                { title: 'Relational Database Design', icon: '🗄️' },
                { title: 'User Journey Mapping', icon: '📍' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 text-center p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === ViewMode.BLUEPRINT && blueprint && (
          <BlueprintView 
            blueprint={blueprint} 
            onReset={handleReset} 
            onConvertToCode={handleConvertToCode}
            isConverting={converting}
          />
        )}

        {viewMode === ViewMode.PREVIEW && generatedCode && (
          <CodePreview 
            code={generatedCode} 
            onBack={() => setViewMode(ViewMode.BLUEPRINT)} 
          />
        )}
      </main>

      {/* Persistent Call to Action / Support */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/50 backdrop-blur-sm border-t border-slate-200 py-3 px-6 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>Powered by Gemini 3 Pro</span>
          <span className="hidden md:inline">© 2025 AppGenius Forge</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">API Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

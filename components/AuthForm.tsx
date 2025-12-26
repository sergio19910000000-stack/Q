
import React, { useState } from 'react';
import { User } from '../types';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      onLogin({ email, name: name || email.split('@')[0] });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto mt-10 md:mt-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Join AppGenius'}</h2>
          <p className="text-indigo-100 mt-2 opacity-80">
            {isLogin ? 'Log in to continue building your dreams.' : 'Start architecting your future today.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>{isLogin ? 'Login Now' : 'Create Account'}</>
            )}
          </button>
          
          <div className="text-center pt-2">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

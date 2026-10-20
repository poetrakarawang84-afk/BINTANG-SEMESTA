import React, { useState } from 'react';
import { X, Lock, Shield, User, Key, AlertCircle } from 'lucide-react';
import { UserSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@bintangsemesta.co.id');
  const [password, setPassword] = useState('bsm2026');
  const [role, setRole] = useState<'Super Admin' | 'Content Editor' | 'Admin Marketing'>('Super Admin');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap masukkan email/username dan kata sandi.');
      return;
    }

    const session: UserSession = {
      isAuthenticated: true,
      username: email.split('@')[0].toUpperCase(),
      role: role,
      email: email,
    };

    onLoginSuccess(session);
    onClose();
  };

  const setDemoAccount = (roleType: 'Super Admin' | 'Content Editor' | 'Admin Marketing') => {
    setRole(roleType);
    if (roleType === 'Super Admin') {
      setEmail('admin@bintangsemesta.co.id');
      setPassword('bsm2026');
    } else if (roleType === 'Content Editor') {
      setEmail('editor@bintangsemesta.co.id');
      setPassword('editor2026');
    } else {
      setEmail('marketing@bintangsemesta.co.id');
      setPassword('marketing2026');
    }
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white">
                Autentikasi Admin PT. BSM
              </h3>
              <p className="text-xs text-blue-300">
                Dashboard CMS Manajemen Produk & Analitik
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Demo 1-Click Fast Fill */}
          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 space-y-2">
            <span className="text-[11px] font-bold text-blue-800 block">
              ⚡ Akses Cepat Demo (Pilih Salah Satu):
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setDemoAccount('Super Admin')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  role === 'Super Admin'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => setDemoAccount('Content Editor')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  role === 'Content Editor'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Editor CMS
              </button>
              <button
                type="button"
                onClick={() => setDemoAccount('Admin Marketing')}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  role === 'Admin Marketing'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Marketing
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email / ID Pengguna
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="admin@bintangsemesta.co.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Masuk ke Dashboard CMS & Analitik</span>
              </button>
            </div>
          </form>

          <p className="text-[11px] text-center text-slate-400">
            Akses dibatasi hanya untuk staf pengelola web PT. Bintang Semesta Motor.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Shield, Sparkles, LogIn, LogOut, Phone, MapPin, Search } from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  currentView: 'website' | 'admin';
  setCurrentView: (view: 'website' | 'admin') => void;
  session: UserSession;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenSearch: () => void;
  activeWebsiteTab: string;
  setActiveWebsiteTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  session,
  onOpenAuth,
  onLogout,
  onOpenSearch,
  activeWebsiteTab,
  setActiveWebsiteTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Perusahaan' },
    { id: 'katalog', label: 'Katalog Pengenalan Produk' },
    { id: 'berita', label: 'Berita & Edukasi' },
    { id: 'kontak', label: 'Kontak Kemitraan' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Distributor Resmi Sparepart & Pelumas Motor Terpercaya Sejak 2012
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Hotline Layanan: (021) 5588-9900 / 0812-9800-8800
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Pusat Distribusi: Jakarta, Surabaya, Bandung, Semarang
            </span>
            <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-800">
              ✓ 100% Original OEM
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Company Brand Logo */}
          <button
            onClick={() => {
              setCurrentView('website');
              setActiveWebsiteTab('beranda');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">★</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-lg tracking-tight group-hover:text-blue-700 transition-colors">
                  BINTANG SEMESTA MOTOR
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                  PT. BSM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Profil Perusahaan & Pengenalan Produk Sparepart Motor
              </p>
            </div>
          </button>

          {/* Desktop Nav Links (Website View) */}
          {currentView === 'website' ? (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveWebsiteTab(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeWebsiteTab === link.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">Mode Dashboard CMS Admin & Analitik Aktif</span>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {currentView === 'website' && (
              <button
                onClick={onOpenSearch}
                aria-label="Cari Produk"
                className="p-2 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Cari Produk & Spesifikasi"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Portal CMS Admin Button */}
            {session.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView(currentView === 'website' ? 'admin' : 'website')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                    currentView === 'admin'
                      ? 'bg-slate-800 text-white hover:bg-slate-900'
                      : 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-blue-800 hover:to-indigo-800 shadow-blue-500/20'
                  }`}
                >
                  <Shield className="w-4 h-4 text-sky-300" />
                  <span>{currentView === 'admin' ? 'Lihat Website' : 'Dashboard CMS & Analitik'}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Keluar Sesi Admin"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-blue-800 transition-all shadow-xs group cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                <span>Login Admin CMS</span>
              </button>
            )}

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView('website');
                  setActiveWebsiteTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                  activeWebsiteTab === link.id && currentView === 'website'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 px-4">
              <button
                onClick={() => {
                  if (session.isAuthenticated) {
                    setCurrentView(currentView === 'website' ? 'admin' : 'website');
                  } else {
                    onOpenAuth();
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-700 text-white font-bold text-sm"
              >
                <Shield className="w-4 h-4 text-sky-200" />
                {session.isAuthenticated ? 'Buka Dashboard CMS & Analitik' : 'Login Admin CMS'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

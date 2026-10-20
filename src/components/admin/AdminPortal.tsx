import React, { useState } from 'react';
import {
  Package,
  BookOpen,
  BarChart3,
  LogOut,
  ExternalLink,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { Product, Article, ContactInquiry, UserSession } from '../../types';
import { ProductManagement } from './ProductManagement';
import { NewsManagement } from './NewsManagement';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ClientInquiries } from './ClientInquiries';

interface AdminPortalProps {
  products: Product[];
  articles: Article[];
  inquiries: ContactInquiry[];
  session: UserSession;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  onLogout: () => void;
  onBackToWebsite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  articles,
  inquiries,
  session,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onUpdateInquiryStatus,
  onLogout,
  onBackToWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'news' | 'inquiries' | 'analytics'>('products');

  const tabs = [
    {
      id: 'products',
      label: 'Katalog Produk (CMS)',
      icon: Package,
      count: products.length,
    },
    {
      id: 'news',
      label: 'Berita & Artikel (CMS)',
      icon: BookOpen,
      count: articles.length,
    },
    {
      id: 'inquiries',
      label: 'Inquiry Calon Klien',
      icon: MessageSquare,
      count: inquiries.filter((i) => i.status === 'Baru').length,
      badge: inquiries.filter((i) => i.status === 'Baru').length > 0 ? 'Baru' : undefined,
    },
    {
      id: 'analytics',
      label: 'Analitik Pengunjung',
      icon: BarChart3,
      live: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md">
                ★
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-tight text-white">
                    PT. BINTANG SEMESTA MOTOR
                  </span>
                  <span className="text-[10px] bg-blue-500/30 text-sky-300 font-bold px-1.5 py-0.5 rounded border border-blue-400/30">
                    CMS Admin
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Sistem Manajemen Konten Mandiri & Analitik Pengunjung
                </p>
              </div>
            </div>

            {/* User Session Info & Controls */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold text-slate-200">{session.role}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono">{session.username}</span>
              </div>

              <button
                onClick={onBackToWebsite}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                title="Buka Website Publik"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Website Publik</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold border border-rose-500/30 transition-all cursor-pointer"
                title="Keluar dari sesi admin"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-black uppercase">
                      {tab.badge}
                    </span>
                  )}
                  {typeof tab.count === 'number' && !tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.live && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'products' && (
          <ProductManagement
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {activeTab === 'news' && (
          <NewsManagement
            articles={articles}
            onAddArticle={onAddArticle}
            onUpdateArticle={onUpdateArticle}
            onDeleteArticle={onDeleteArticle}
          />
        )}

        {activeTab === 'inquiries' && (
          <ClientInquiries
            inquiries={inquiries}
            onUpdateStatus={onUpdateInquiryStatus}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </main>
    </div>
  );
};

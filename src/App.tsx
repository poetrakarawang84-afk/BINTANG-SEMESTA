import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CompanyProfile } from './components/CompanyProfile';
import { ProductCatalog } from './components/ProductCatalog';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { AuthModal } from './components/AuthModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Product, Article, ContactInquiry, UserSession } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ARTICLES,
  INITIAL_INQUIRIES,
} from './data/mockData';
import { Search, X, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Main Navigation View
  const [currentView, setCurrentView] = useState<'website' | 'admin'>('website');
  const [activeWebsiteTab, setActiveWebsiteTab] = useState<string>('beranda');

  // Application Data Stores (with LocalStorage persistence for realistic experience)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bsm_products_showcase');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('bsm_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('bsm_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // User Authentication State
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem('bsm_session');
      return saved
        ? JSON.parse(saved)
        : { isAuthenticated: false, username: '', role: 'Super Admin', email: '' };
    } catch {
      return { isAuthenticated: false, username: '', role: 'Super Admin', email: '' };
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preselectedProductForInquiry, setPreselectedProductForInquiry] = useState<Product | null>(null);

  // Global Quick Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('bsm_products_showcase', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bsm_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('bsm_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bsm_session', JSON.stringify(session));
  }, [session]);

  // Track pageview to analytics backend
  useEffect(() => {
    const trackPath = currentView === 'admin' ? '/admin' : `/${activeWebsiteTab}`;
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: trackPath,
        device: window.innerWidth < 768 ? 'Mobile Smartphone' : 'Desktop / Laptop',
        city: 'Jakarta',
        referrer: 'Direct Web Visit',
      }),
    }).catch(() => {});
  }, [currentView, activeWebsiteTab]);

  // Auth Handlers
  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    const emptySession: UserSession = {
      isAuthenticated: false,
      username: '',
      role: 'Super Admin',
      email: '',
    };
    setSession(emptySession);
    setCurrentView('website');
  };

  // Product CRUD
  const handleAddProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Article CRUD
  const handleAddArticle = (art: Article) => {
    setArticles((prev) => [art, ...prev]);
  };

  const handleUpdateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Inquiry Handlers
  const handleAddInquiry = (inquiry: ContactInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  // Inquire Product Direct Trigger (switches to Contact form tab with product pre-filled)
  const handleInquireProduct = (product: Product) => {
    setPreselectedProductForInquiry(product);
    setActiveWebsiteTab('kontak');
    setCurrentView('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered products for quick global search modal
  const searchResults = products.filter(
    (p) =>
      p.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          if (view === 'admin' && !session.isAuthenticated) {
            setIsAuthModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        session={session}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        activeWebsiteTab={activeWebsiteTab}
        setActiveWebsiteTab={setActiveWebsiteTab}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminPortal
            products={products}
            articles={articles}
            inquiries={inquiries}
            session={session}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddArticle={handleAddArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onLogout={handleLogout}
            onBackToWebsite={() => setCurrentView('website')}
          />
        ) : (
          <div>
            {/* Website Home / Profil / Katalog / Berita / Kontak */}
            {activeWebsiteTab === 'beranda' && (
              <>
                <HeroSection
                  onExploreCatalog={() => {
                    setActiveWebsiteTab('katalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onPartnerInquiry={() => {
                    setActiveWebsiteTab('kontak');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenAdmin={() => {
                    if (session.isAuthenticated) {
                      setCurrentView('admin');
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                />
                <CompanyProfile
                  onGoToCatalog={() => {
                    setActiveWebsiteTab('katalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onGoToContact={() => {
                    setActiveWebsiteTab('kontak');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <ProductCatalog
                  products={products}
                  onInquireProduct={handleInquireProduct}
                />
                <NewsSection articles={articles} />
                <ContactSection
                  onAddInquiry={handleAddInquiry}
                  preselectedProduct={preselectedProductForInquiry}
                />
              </>
            )}

            {activeWebsiteTab === 'profil' && (
              <CompanyProfile
                onGoToCatalog={() => {
                  setActiveWebsiteTab('katalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGoToContact={() => {
                  setActiveWebsiteTab('kontak');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeWebsiteTab === 'katalog' && (
              <ProductCatalog
                products={products}
                onInquireProduct={handleInquireProduct}
              />
            )}

            {activeWebsiteTab === 'berita' && (
              <NewsSection articles={articles} />
            )}

            {activeWebsiteTab === 'kontak' && (
              <ContactSection
                onAddInquiry={handleAddInquiry}
                preselectedProduct={preselectedProductForInquiry}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer (Website View Only) */}
      {currentView === 'website' && (
        <Footer
          onNavigate={(tab) => {
            setActiveWebsiteTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAdmin={() => {
            if (session.isAuthenticated) {
              setCurrentView('admin');
            } else {
              setIsAuthModalOpen(true);
            }
          }}
        />
      )}

      {/* Security Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Quick Search Modal (No Prices) */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="text"
                autoFocus
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Cari suku cadang, pelumas, merk, kode SKU..."
                className="w-full text-sm font-semibold outline-none"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
              {searchResults.length === 0 ? (
                <p className="text-center py-8 text-xs text-slate-400">
                  Tidak ada produk yang cocok dengan "{globalSearchQuery}"
                </p>
              ) : (
                searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      setActiveWebsiteTab('katalog');
                    }}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {p.code} • {p.brand} • {p.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {p.availability}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

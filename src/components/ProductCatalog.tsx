import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, MessageSquare, CheckCircle2, AlertCircle, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  products: Product[];
  onInquireProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onInquireProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'featured' | 'name'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    'Semua',
    'Oli & Pelumas',
    'Suku Cadang Mesin',
    'Ban & Velg',
    'Sistem Pengereman',
    'Kelistrikan & Aki',
    'Transmisi & Rantai',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(p.specification).some((val) =>
            val.toLowerCase().includes(searchTerm.toLowerCase())
          );
        return matchesCategory && matchesSearch && p.isActive;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Katalog Pengenalan Produk Resmi
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Koleksi Suku Cadang & Pelumas Motor Standar OEM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Jelajahi spesifikasi teknis, standar mutu (SNI/JASO/API), dan kesesuaian suku cadang untuk berbagai jenis kendaraan bermotor.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari suku cadang, pelumas, merk (Shell, NGK, FDR, Daytona, Castrol, dll)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-600 w-full md:w-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-medium">Urutan:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer text-xs"
                >
                  <option value="featured">Produk Unggulan</option>
                  <option value="name">Nama Produk (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Kategori:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Results */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Tidak ada produk yang sesuai kriteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Silakan coba kata kunci lain atau ubah kategori untuk menemukan suku cadang yang dicari.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs font-mono">
                      {product.code}
                    </span>
                    {product.isPopular && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                        Unggulan
                      </span>
                    )}
                  </div>

                  {/* Availability badge */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {product.availability}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {product.brand}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Specification snippet */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Kemasan:</span>
                        <span className="font-bold text-slate-800">{product.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Kesesuaian:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                          {product.specification['Kompatibilitas'] || product.specification['Kesesuaian'] || product.specification['Aplikasi'] || 'Standar Motor'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Detail</span>
                      </button>

                      <button
                        onClick={() => onInquireProduct(product)}
                        className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 shadow-xs shadow-blue-700/20 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Tanya</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquireProduct={onInquireProduct}
      />
    </div>
  );
};

import React from 'react';
import { X, CheckCircle2, ShieldCheck, MessageSquare, Tag, AlertCircle, Wrench, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onInquireProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onInquireProduct,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {product.code}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              {product.category}
            </span>
            <span className="text-xs font-bold text-slate-500">
              • {product.brand}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded shadow-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Status: {product.availability}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {product.brand}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h3>
              </div>

              {/* Quality Badges */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jaminan 100% Produk Original Standar OEM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Satuan Kemasan: <strong>{product.unit}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Wrench className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Garansi Resmi Prinsipal Terdaftar</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                *Katalog ini disusun untuk tujuan pengenalan produk dan spesifikasi teknis bagi calon klien dan mitra bengkel.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Deskripsi Produk</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {product.description}
            </p>
          </div>

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Keunggulan & Fitur Utama</span>
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-xs text-slate-700">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/60">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Spesifikasi & Kompatibilitas Kendaraan</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(product.specification).map(([key, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-2.5 font-bold text-slate-700 w-1/3 border-r border-slate-100">
                        {key}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 font-medium">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onInquireProduct(product);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-700/20 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya / Konsultasi Produk Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
};

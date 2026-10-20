import React, { useState } from 'react';
import { Calendar, Clock, Eye, Tag, ArrowRight, X, Share2, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface NewsSectionProps {
  articles: Article[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Tips Perawatan', 'Keselamatan', 'Berita Perusahaan'];

  const filteredArticles = articles.filter(
    (a) => a.isPublished && (selectedCategory === 'Semua' || a.category === selectedCategory)
  );

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Pusat Edukasi & Berita Otomotif
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Informasi Terkini Suku Cadang & Tips Perawatan Motor
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Disusun langsung oleh divisi teknis PT. Bintang Semesta Motor untuk mendukung operasional bengkel rekanan.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-slate-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-700 text-white shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {article.views.toLocaleString('id-ID')} pembaca
                  </span>

                  <span className="font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reading Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="relative aspect-16/9 sm:aspect-21/9 bg-slate-100 overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-700 text-white shadow-md">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-700">{selectedArticle.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {selectedArticle.views} Views
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {selectedArticle.title}
                </h1>
              </div>

              {/* Lead Summary */}
              <div className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-blue-600 text-slate-700 text-sm font-medium leading-relaxed italic">
                "{selectedArticle.summary}"
              </div>

              {/* Body Text */}
              <div className="text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Topik Terkait:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Publikasi Resmi PT. Bintang Semesta Motor
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

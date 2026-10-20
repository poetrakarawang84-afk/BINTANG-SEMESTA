import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Sparkles, X, Save, Eye, Calendar, BookOpen, Clock } from 'lucide-react';
import { Article } from '../../types';

interface NewsManagementProps {
  articles: Article[];
  onAddArticle: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
}

export const NewsManagement: React.FC<NewsManagementProps> = ({
  articles,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const [aiPromptTopic, setAiPromptTopic] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tips Perawatan',
    readTime: '4 menit baca',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    tags: 'Oli Motor, Tips Bengkel, Sparepart Asli',
    author: 'Tim Teknis PT BSM',
    isPublished: true,
  });

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: 'Tips Perawatan',
      readTime: '3 menit baca',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      tags: 'Oli Motor, Edukasi BSM, Sparepart',
      author: 'Tim Teknis PT BSM',
      isPublished: true,
    });
    setAiPromptTopic('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData({
      title: art.title,
      category: art.category,
      readTime: art.readTime,
      summary: art.summary,
      content: art.content,
      image: art.image,
      tags: art.tags.join(', '),
      author: art.author,
      isPublished: art.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleGenerateAiArticle = async () => {
    if (!aiPromptTopic.trim()) {
      alert('Ketik topik artikel yang ingin dibuat oleh AI terlebih dahulu.');
      return;
    }

    setIsAiDrafting(true);
    try {
      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiPromptTopic }),
      });

      const data = await res.json();
      if (data.success && data.article) {
        const art = data.article;
        setFormData((prev) => ({
          ...prev,
          title: art.title || prev.title,
          category: art.category || prev.category,
          readTime: art.readTime || prev.readTime,
          summary: art.summary || prev.summary,
          content: art.content || prev.content,
          tags: Array.isArray(art.tags) ? art.tags.join(', ') : prev.tags,
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Gagal membuat draf artikel via AI.');
    } finally {
      setIsAiDrafting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Judul dan Konten artikel wajib diisi.');
      return;
    }

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

    if (editingArticle) {
      const updated: Article = {
        ...editingArticle,
        title: formData.title,
        category: formData.category,
        readTime: formData.readTime,
        summary: formData.summary,
        content: formData.content,
        image: formData.image,
        tags: tagArray,
        author: formData.author,
        isPublished: formData.isPublished,
      };
      onUpdateArticle(updated);
    } else {
      const newArt: Article = {
        id: `ART-${Date.now()}`,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50),
        category: formData.category,
        readTime: formData.readTime,
        summary: formData.summary || formData.content.slice(0, 120) + '...',
        content: formData.content,
        image: formData.image,
        author: formData.author,
        date: dateStr,
        tags: tagArray,
        views: 0,
        isPublished: formData.isPublished,
      };
      onAddArticle(newArt);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Sistem Manajemen Konten (CMS) Berita & Artikel Edukasi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publikasikan tips perawatan motor, informasi suku cadang baru, dan berita ekspansi perusahaan untuk SEO.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 flex items-center gap-1.5 transition-all self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul artikel..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          />
        </div>

        <span className="text-xs font-bold text-slate-500">
          Total: {articles.length} Artikel
        </span>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-16">Foto</th>
                <th className="py-3 px-4">Judul Artikel</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-3 text-center">Views</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-12 h-9 rounded object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="font-bold text-slate-900 line-clamp-1">{art.title}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{art.summary}</div>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 font-medium">
                    {art.author}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">
                    {art.date}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-700">
                    {art.views}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Tayang
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Artikel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus artikel "${art.title}"?`)) {
                            onDeleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Write / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingArticle ? 'Edit Artikel' : 'Tulis Artikel & Berita Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* AI Draft Generator Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Bantuan AI Generator Konten Otomotif</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={aiPromptTopic}
                    onChange={(e) => setAiPromptTopic(e.target.value)}
                    placeholder="Contoh: Tips memilih pelumas rantai motor sport agar awet..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                  <button
                    type="button"
                    disabled={isAiDrafting}
                    onClick={handleGenerateAiArticle}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isAiDrafting ? (
                      <span className="animate-spin text-sm">⏳</span>
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Buat Draf via AI</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Artikel <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    placeholder="Contoh: Pentingnya Servis Berkala dan Memilih Busi Injeksi Berkualitas"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Tips Perawatan">Tips Perawatan</option>
                      <option value="Keselamatan">Keselamatan</option>
                      <option value="Berita Perusahaan">Berita Perusahaan</option>
                      <option value="Info Produk">Info Produk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimasi Waktu Baca
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                      placeholder="3 menit baca"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Penulis
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ringkasan Singkat (Meta Description SEO)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 resize-none"
                    placeholder="Ringkasan 2 kalimat untuk preview..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Konten Artikel Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none leading-relaxed"
                    placeholder="Tuliskan isi artikel lengkap di sini..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      URL Gambar Banner
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tags SEO (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                      placeholder="Oli Motor, Busi Injeksi, Bengkel"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingArticle ? 'Simpan Perubahan' : 'Terbitkan Artikel'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

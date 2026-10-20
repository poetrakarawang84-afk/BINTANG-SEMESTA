import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, CheckCircle2, AlertCircle, X, Save, Eye, Package, Tag, Wrench } from 'lucide-react';
import { Product } from '../../types';

interface ProductManagementProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields (No Prices)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    brand: 'Shell Advance',
    category: 'Oli & Pelumas' as Product['category'],
    unit: 'BOTOL',
    availability: 'Tersedia' as Product['availability'],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    description: '',
    features: '',
    specification: '',
  });

  const categories = [
    'Oli & Pelumas',
    'Suku Cadang Mesin',
    'Ban & Velg',
    'Sistem Pengereman',
    'Kelistrikan & Aki',
    'Transmisi & Rantai',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      code: `SKU-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      brand: 'Shell Advance',
      category: 'Oli & Pelumas',
      unit: 'BOTOL',
      availability: 'Tersedia',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      description: 'Deskripsi dan pengenalan suku cadang motor berstandar OEM.',
      features: 'Kualitas OEM Teruji\nDaya tahan tinggi\nPresisi ukuran pabrikan',
      specification: 'Standar Mutu: Standar Pabrikan OEM\nKesesuaian: Motor Matic/Bebek\nGaransi: Resmi Prinsipal',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      code: product.code,
      name: product.name,
      brand: product.brand,
      category: product.category,
      unit: product.unit,
      availability: product.availability,
      image: product.image,
      description: product.description,
      features: (product.features || []).join('\n'),
      specification: Object.entries(product.specification)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n'),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Nama produk dan Kode SKU wajib diisi.');
      return;
    }

    // Parse specifications
    const specObj: Record<string, string> = {};
    formData.specification.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        specObj[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    const featureArr = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        code: formData.code,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        unit: formData.unit,
        availability: formData.availability,
        image: formData.image,
        description: formData.description,
        features: featureArr,
        specification: Object.keys(specObj).length > 0 ? specObj : editingProduct.specification,
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `PROD-${Date.now()}`,
        code: formData.code,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        unit: formData.unit,
        availability: formData.availability,
        image: formData.image,
        description: formData.description,
        features: featureArr.length > 0 ? featureArr : ['Kualitas OEM Teruji'],
        specification: Object.keys(specObj).length > 0 ? specObj : { Standar: 'OEM Factory Quality' },
        isActive: true,
      };
      onAddProduct(newProd);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Sistem Manajemen Konten (CMS) Katalog Produk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola informasi pengenalan produk, spesifikasi teknis OEM, fitur keunggulan, dan ketersediaan suku cadang.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 flex items-center gap-1.5 transition-all self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Produk ke Katalog</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama barang, brand, atau kode SKU..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500">Kategori:</span>
          {['Semua', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table (No Prices) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-14">Foto</th>
                <th className="py-3 px-4">Kode & Nama Produk</th>
                <th className="py-3 px-4">Brand / Merk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-3 text-center">Satuan</th>
                <th className="py-3 px-3 text-center">Ketersediaan</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                    <div className="font-mono text-[10px] text-blue-600 font-semibold">{p.code}</div>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-700">
                    {p.brand}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-600 font-mono">
                    {p.unit}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        p.availability === 'Tersedia'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.availability}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Tayang
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Data Produk"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus produk "${p.name}"?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Produk"
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

      {/* Add / Edit Modal (No Prices) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru ke Katalog'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kode SKU Produk <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    placeholder="OIL-SHL-01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brand / Merk Prinsipal <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    placeholder="Contoh: Shell Advance, NGK, FDR"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Produk <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="Contoh: Oli Matic Shell Advance AX7 10W-30 0.8L"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Suku Cadang
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Satuan Kemasan
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white font-mono"
                  >
                    <option value="BOTOL">BOTOL</option>
                    <option value="PCS">PCS</option>
                    <option value="SET">SET</option>
                    <option value="DUS">DUS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Ketersediaan
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e: any) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white"
                  >
                    <option value="Tersedia">Tersedia (Ready)</option>
                    <option value="Stok Terbatas">Stok Terbatas</option>
                    <option value="Hubungi Sales">Hubungi Sales</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Gambar Produk
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Pengenalan Produk
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none resize-none"
                  placeholder="Uraian manfaat dan keunggulan teknologi produk..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keunggulan & Fitur Utama (1 fitur per baris)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none resize-none"
                  placeholder="Active Cleansing Technology&#10;Perlindungan suhu tinggi&#10;Tarikan mesin responsif"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Spesifikasi Teknis (Format: Kunci: Nilai per baris)
                </label>
                <textarea
                  rows={3}
                  value={formData.specification}
                  onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none font-mono resize-none"
                  placeholder="Viskositas: SAE 10W-30&#10;Standar JASO: JASO MB&#10;Kompatibilitas: BeAT, Vario, Scoopy"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Simpan Perubahan' : 'Tambahkan Produk'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, CheckCircle2, Clock, MessageSquare, Tag } from 'lucide-react';
import { ContactInquiry } from '../../types';

interface ClientInquiriesProps {
  inquiries: ContactInquiry[];
  onUpdateStatus: (id: string, status: ContactInquiry['status']) => void;
}

export const ClientInquiries: React.FC<ClientInquiriesProps> = ({ inquiries, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.interestedProduct || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Pesan & Inquiry Masuk dari Calon Klien
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola pertanyaan calon klien mengenai ketersediaan dan spesifikasi suku cadang yang dikirim via website.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama klien, bengkel, kota, produk..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {['Semua', 'Baru', 'Dihubungi', 'Selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Grid/Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
          Tidak ada pesan inquiry calon klien yang sesuai filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">{inq.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({inq.id})</span>
                    </div>
                    <p className="text-xs text-blue-700 font-semibold mt-0.5">
                      {inq.businessName} • {inq.businessType}
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inq.status === 'Baru'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inq.status === 'Dihubungi'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                {inq.interestedProduct && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-blue-50/60 p-2 rounded-lg border border-blue-100/60">
                    <Tag className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Tertarik pada: <strong>{inq.interestedProduct}</strong></span>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 italic leading-relaxed">
                  "{inq.message}"
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{inq.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{inq.city}</span>
                  </div>
                </div>
              </div>

              {/* Status Updater */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{inq.date}</span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Ubah Status:</span>
                  <select
                    value={inq.status}
                    onChange={(e: any) => onUpdateStatus(inq.id, e.target.value)}
                    className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold bg-white outline-none cursor-pointer"
                  >
                    <option value="Baru">Baru</option>
                    <option value="Dihubungi">Dihubungi</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, HelpCircle, ChevronDown, Package } from 'lucide-react';
import { ContactInquiry, Product } from '../types';

interface ContactSectionProps {
  onAddInquiry: (inquiry: ContactInquiry) => void;
  preselectedProduct?: Product | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onAddInquiry, preselectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: 'Bengkel Motor' as ContactInquiry['businessType'],
    city: '',
    phone: '',
    email: '',
    interestedProduct: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        interestedProduct: `${preselectedProduct.name} (${preselectedProduct.code})`,
        message: `Halo, saya tertarik berkonsultasi mengenai ketersediaan dan spesifikasi produk ${preselectedProduct.name}.`,
      }));
    }
  }, [preselectedProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Mohon lengkapi Nama Anda dan Nomor Telepon/WhatsApp.');
      return;
    }

    const generatedId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: ContactInquiry = {
      id: generatedId,
      name: formData.name,
      businessName: formData.businessName || 'Klien / Perorangan',
      businessType: formData.businessType,
      city: formData.city || 'Indonesia',
      phone: formData.phone,
      email: formData.email || '-',
      interestedProduct: formData.interestedProduct || 'Konsultasi Umum Sparepart',
      message: formData.message || 'Permintaan informasi dan pengenalan produk suku cadang & pelumas BSM.',
      status: 'Baru',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    };

    onAddInquiry(newInquiry);
    setTicketId(generatedId);
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Bagaimana cara mendapatkan informasi lengkap katalog produk PT. BSM?',
      a: 'Anda dapat menjelajahi seluruh spesifikasi suku cadang di halaman Katalog Produk atau mengisi formulir kontak ini. Tim kami akan mengirimkan brosur digital dan panduan teknis langsung ke WhatsApp atau email Anda.',
    },
    {
      q: 'Apakah PT. Bintang Semesta Motor melayani kemitraan bengkel dan toko di luar pulau Jawa?',
      a: 'Ya, melalui 4 pusat distribusi kami (Jakarta, Surabaya, Bandung, Semarang) serta rekanan ekspedisi nasional terpercaya, kami melayani koordinasi pasokan suku cadang ke seluruh nusantara.',
    },
    {
      q: 'Apakah semua produk yang ditampilkan memiliki sertifikasi resmi?',
      a: 'Seluruh suku cadang dan pelumas yang didistribusikan oleh PT. BSM terjamin 100% original berstandar pabrikan OEM, dengan sertifikasi SNI, JASO, dan API terverifikasi.',
    },
    {
      q: 'Bagaimana jika saya ingin berkonsultasi mengenai spesifikasi suku cadang tertentu?',
      a: 'Tim teknis kami siap membantu Anda memilih suku cadang yang tepat untuk model motor tertentu melalui sambungan telepon hotline (021) 5588-9900 atau WhatsApp resmi.',
    },
  ];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Formulir Kontak Calon Klien
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Konsultasikan Kebutuhan Suku Cadang Bersama PT. BSM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Kirimkan pertanyaan seputar spesifikasi teknis, ketersediaan produk, atau peluang kemitraan dengan mengisi data di bawah ini.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Pesan Anda Telah Terkirim!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Terima kasih, <strong>{formData.name}</strong>. Formulir inquiry Anda telah tercatat dengan Nomor Tiket:
                  </p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-blue-50 text-blue-800 font-mono font-bold text-base border border-blue-200">
                    {ticketId}
                  </div>
                </div>

                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tim representatif kami akan segera menghubungi nomor <strong>{formData.phone}</strong> untuk memberikan informasi yang Anda butuhkan.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        businessName: '',
                        businessType: 'Bengkel Motor',
                        city: '',
                        phone: '',
                        email: '',
                        interestedProduct: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Kirim Pesan Baru
                  </button>

                  <a
                    href={`https://wa.me/6281298008800?text=Halo%20PT%20Bintang%20Semesta%20Motor,%20saya%20sudah%20mengirim%20pertanyaan%20dengan%20nomor%20tiket%20${ticketId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Hubungi Cepat via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-extrabold text-slate-900 text-lg">Hubungi Tim PT. Bintang Semesta Motor</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Silakan isi data berikut agar kami dapat memberikan tanggapan secara tepat.
                  </p>
                </div>

                {formData.interestedProduct && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Anda sedang menanyakan tentang: <strong>{formData.interestedProduct}</strong></span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Anda <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: H. Bambang Irawan"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Usaha / Bengkel / Perusahaan
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Contoh: Bengkel Sentosa Motor (opsional)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Klien
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e: any) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white font-medium"
                    >
                      <option value="Bengkel Motor">Bengkel Motor</option>
                      <option value="Toko Sparepart">Toko Retail Suku Cadang</option>
                      <option value="Fleet Perusahaan">Fleet / Armada Kendaraan</option>
                      <option value="Reseller / Agen">Reseller / Mitra Bisnis</option>
                      <option value="Pengendara / Konsumen">Pengendara / Konsumen</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kota / Wilayah Anda
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Contoh: Surabaya, Jawa Timur"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Contoh: 0812-3456-7890"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alamat Email (Opsional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Produk yang Ingin Ditanyakan
                  </label>
                  <input
                    type="text"
                    value={formData.interestedProduct}
                    onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
                    placeholder="Contoh: Oli Shell Advance AX7 10W-30 / Busi NGK / Ban FDR"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pesan / Pertanyaan Konsultasi
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan spesifikasi teknis atau kebutuhan suku cadang Anda..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan / Konsultasi Produk</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="font-extrabold text-base tracking-tight text-white">
                Kontak Layanan Informasi Produk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tim perwakilan teknis PT. Bintang Semesta Motor siap membantu konsultasi pengenalan suku cadang dan pelumas kendaraan Anda.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Kantor Pusat & Pergudangan HO:</p>
                    <p className="text-slate-400">Kawasan Industri Otomotif Blok B No. 12-15, Daan Mogot, Jakarta Barat 11840</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Telepon Hunting:</p>
                    <p className="text-slate-400">(021) 5588-9900 / WA: 0812-9800-8800</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">Email Resmi:</p>
                    <p className="text-slate-400">bintangsemestamotor01@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm">Pertanyaan Sering Ditanyakan (FAQ)</h4>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          openFaq === idx ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-3 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

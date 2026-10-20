import React from 'react';
import { Target, Compass, Award, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CompanyProfileProps {
  onGoToCatalog: () => void;
  onGoToContact: () => void;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ onGoToCatalog, onGoToContact }) => {
  return (
    <div className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Tentang PT. Bintang Semesta Motor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Membangun Rantai Pasok Sparepart Otomotif yang Tangguh & Terpercaya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Berdiri sejak tahun 2012, PT. Bintang Semesta Motor (PT. BSM) telah berevolusi menjadi salah satu distributor suku cadang dan pelumas sepeda motor terkemuka di Indonesia, berdedikasi memperkenalkan produk berstandar pabrikan OEM ke jaringan bengkel dan calon mitra di seluruh nusantara.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Visi Perusahaan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Menjadi pusat pengenalan dan distribusi suku cadang serta pelumas sepeda motor nomor satu di Indonesia yang paling tepercaya, transparan, dan berkecepatan tinggi dalam mendukung kelancaran ekosistem otomotif roda dua.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Jangkauan Luas ke Lebih dari 500 Rekanan Bengkel</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-indigo-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Misi Perusahaan</h3>
            <ul className="text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                <span>Menjamin keaslian 100% dari seluruh produk suku cadang dan pelumas yang didistribusikan langsung dari pabrikan resmi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                <span>Menyajikan informasi produk dan spesifikasi teknis yang akurat, transparan, dan mudah diakses oleh calon klien.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                <span>Membangun hubungan kemitraan jangka panjang berbasis kepercayaan, integritas, dan kepuasan layanan pelanggan.</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Sertifikasi Standar Mutu Manajemen ISO 9001:2015</span>
            </div>
          </div>
        </div>

        {/* 4 Warehouse Logistics Network */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Jaringan Logistik BSM</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">4 Pusat Pergudangan Terpadu</h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Kapasitas penyimpanan modern yang menjamin ketersediaan barang dan stabilitas pasokan ke seluruh pelosok daerah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-4">
                HO
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">GUDANG HO - JAKARTA</h4>
              <p className="text-xs text-blue-700 font-semibold mt-1">Jakarta Barat (Kantor Pusat)</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kawasan Industri Daan Mogot Blok B. Kapasitas 6.000 m² melayani koordinasi pasokan area Jabodetabek dan Sumatera.
              </p>
              <span className="inline-block mt-4 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Hub Utama Logistik
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs mb-4">
                SBY
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">CABANG SURABAYA</h4>
              <p className="text-xs text-sky-700 font-semibold mt-1">Jawa Timur & Wilayah Timur</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kawasan Industri Rungkut Megah. Kapasitas 3.500 m² melayani distribusi ke Jawa Timur, Bali, NTB, dan Sulawesi.
              </p>
              <span className="inline-block mt-4 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Hub Regional Timur
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-4">
                BDG
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">CABANG BANDUNG</h4>
              <p className="text-xs text-indigo-700 font-semibold mt-1">Jawa Barat & Priangan</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Soekarno Hatta Bizpark. Kapasitas 2.800 m² melayani jaringan Bandung Raya, Garut, Sukabumi, dan Cirebon.
              </p>
              <span className="inline-block mt-4 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Hub Pasokan Priangan
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold text-xs mb-4">
                SMG
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">CABANG SEMARANG</h4>
              <p className="text-xs text-slate-700 font-semibold mt-1">Jawa Tengah & DIY</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kawasan Logistik Kaligawe Raya. Menjamin kelancaran pasokan ke Solo, Yogyakarta, Kudus, dan Purwokerto.
              </p>
              <span className="inline-block mt-4 text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                Hub Jalur Pantura
              </span>
            </div>
          </div>
        </div>

        {/* Why Partner with PT. BSM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Jaminan 100% Produk Original</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap kemasan oli dan kotak sparepart dilengkapi nomor seri dan segel otentikasi pabrikan resmi dari prinsipal terkemuka.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 w-fit mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Konsultasi Kebutuhan Produk</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tim spesialis teknis kami siap memberikan konsultasi pemilihan suku cadang yang tepat untuk jenis motor dan kebutuhan calon klien.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Pengenalan Produk Berkelanjutan</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Website dilengkapi sistem manajemen konten mandiri untuk memperbarui brosur, katalog digital, dan edukasi seputar dunia otomotif.
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Tertarik dengan Produk PT. Bintang Semesta Motor?</h3>
            <p className="text-sm text-blue-100 max-w-xl">
              Pelajari spesifikasi produk pada katalog digital kami atau hubungi tim representatif kami untuk informasi kemitraan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGoToContact}
              className="px-6 py-3 rounded-xl bg-white text-blue-800 hover:bg-blue-50 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Hubungi Kami
            </button>
            <button
              onClick={onGoToCatalog}
              className="px-6 py-3 rounded-xl bg-blue-900/80 hover:bg-blue-900 text-white font-bold text-sm border border-blue-400/30 transition-all cursor-pointer"
            >
              Buka Katalog Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

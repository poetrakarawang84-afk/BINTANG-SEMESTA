import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, ShieldCheck, Truck, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Suku Cadang Asli</h4>
              <p className="text-xs text-slate-400 mt-1">
                Jaminan garansi keaslian resmi langsung dari pabrik prinsipal terkemuka.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Distribusi 4 Hub Wilayah</h4>
              <p className="text-xs text-slate-400 mt-1">
                Pusat logistik Jakarta, Surabaya, Bandung, dan Semarang menjamin ketersediaan suku cadang.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Spesifikasi Standar OEM</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tiap produk dilengkapi detail spesifikasi teknis dan kompatibilitas kendaraan akurat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Edukasi & Konsultasi</h4>
              <p className="text-xs text-slate-400 mt-1">
                Informasi artikel teknis dan dukungan konsultasi kebutuhan suku cadang untuk calon klien.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-extrabold text-lg">
                ★
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight">
                  PT. BINTANG SEMESTA MOTOR
                </span>
                <span className="block text-[11px] text-blue-400 font-semibold tracking-wide">
                  DISTRIBUTOR SPAREPART & PELUMAS MOTOR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Didirikan untuk menjadi mitra terpercaya dalam pengenalan dan distribusi suku cadang serta pelumas sepeda motor berkualitas di seluruh Indonesia dengan keaslian produk teruji.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kantor Pusat & Pergudangan HO:</strong> Kawasan Industri Otomotif Blok B No. 12-15, Daan Mogot, Jakarta Barat 11840
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(021) 5588-9900 (Hunting) / WA: 0812-9800-8800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>bintangsemestamotor01@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Senin - Sabtu: 08.00 - 17.00 WIB (Minggu Libur)</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-slate-200">
              Navigasi Cepat
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('beranda')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Beranda Profil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Tentang PT. BSM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('katalog')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Katalog Suku Cadang & Pelumas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('berita')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Berita & Edukasi Otomotif
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Kontak & Kemitraan Klien
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 font-semibold border border-blue-700 hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Dashboard CMS & Analitik
                </button>
              </li>
            </ul>
          </div>

          {/* Kategori Unggulan */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-slate-200">
              Kategori Produk
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Oli & Pelumas Matic / Manual</li>
              <li>Busi Injeksi OEM & Nickel Alloy</li>
              <li>Ban Luar Tubeless & Ban Dalam</li>
              <li>Kampas Rem Cakram & Tromol</li>
              <li>Rantai Roda Heavy Duty & Gear Set</li>
              <li>Aki Kering Bebas Perawatan (MF)</li>
              <li>Roller CVT & Komponen Transmisi</li>
            </ul>
          </div>

          {/* Jaringan Distribusi */}
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-slate-200">
              Pusat Distribusi Regional
            </h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <p className="font-bold text-slate-300">PUSAT JAKARTA (HO)</p>
                <p className="text-[11px] text-slate-500">Kawasan Industri Daan Mogot</p>
              </div>
              <div>
                <p className="font-bold text-slate-300">CABANG SURABAYA</p>
                <p className="text-[11px] text-slate-500">Kawasan Industri Rungkut Megah</p>
              </div>
              <div>
                <p className="font-bold text-slate-300">CABANG BANDUNG</p>
                <p className="text-[11px] text-slate-500">Soekarno Hatta Bizpark</p>
              </div>
              <div>
                <p className="font-bold text-slate-300">CABANG SEMARANG</p>
                <p className="text-[11px] text-slate-500">Hub Logistik Kaligawe Raya</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} PT. Bintang Semesta Motor (PT. BSM). Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex justify-center sm:justify-end gap-6 mt-4 sm:mt-0 text-slate-400">
            <span>Standar Mutu SNI & ISO 9001:2015</span>
            <span>Katalog Pengenalan Produk Resmi</span>
            <span>Security Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

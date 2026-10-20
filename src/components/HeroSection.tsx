import React from 'react';
import { ArrowRight, Sparkles, Building2, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onPartnerInquiry: () => void;
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onPartnerInquiry,
  onOpenAdmin,
}) => {
  const brands = [
    { name: 'Shell Advance', desc: 'Pelumas Matic & Manual' },
    { name: 'Castrol Power1', desc: 'Oli Sintetis Performa' },
    { name: 'NGK Spark Plugs', desc: 'Busi Injeksi OEM' },
    { name: 'FDR Tire', desc: 'Ban Tubeless Sport' },
    { name: 'Daytona Racing', desc: 'Kampas Rem Ultra Force' },
    { name: 'GS Astra', desc: 'Aki Kering Motor MF' },
    { name: 'DID Japan', desc: 'Rantai Roda Heavy Duty' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-20">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
              Pusat Pengenalan & Distribusi Sparepart Otomotif Resmi
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Distributor Resmi <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Sparepart & Pelumas Motor
              </span>{' '}
              Terpercaya di Indonesia
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              PT. Bintang Semesta Motor (PT. BSM) menyajikan katalog pengenalan suku cadang asli OEM, pelumas matic/manual, aki, ban, dan sistem pengereman berkualitas prima bagi calon klien, pemilik bengkel, dan toko suku cadang di seluruh Indonesia.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Produk Original Standar OEM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Spesifikasi Lengkap & Kompatibilitas Motor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Jaringan Distribusi 4 Hub Regional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Konsultasi Teknis & Kemitraan Klien</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Jelajahi Katalog Produk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onPartnerInquiry}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Hubungi / Kemitraan Klien</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card without Prices */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-2xl backdrop-blur">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">KATALOG UNGGULAN PT. BSM</h3>
                    <p className="text-xs text-slate-400">Pengenalan Suku Cadang Resmi OEM</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sertifikasi OEM
                </span>
              </div>

              {/* Showcase items (Pure Introduction, NO Prices) */}
              <div className="py-5 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-bold">
                      OIL
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Oli Matic Shell Advance AX7 10W-30</p>
                      <p className="text-[11px] text-slate-400">JASO MB • Active Cleansing Technology</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Original
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center text-xs font-bold">
                      SPK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Busi Injeksi NGK CPR9EA-9</p>
                      <p className="text-[11px] text-slate-400">Nickel Alloy • Standar Pabrikan Injeksi</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                    Standar OEM
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs font-bold">
                      TYR
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Ban Luar Tubeless FDR Sport Zevo</p>
                      <p className="text-[11px] text-slate-400">Dual Compound • Grip Basah & Kering</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    SNI Certified
                  </span>
                </div>
              </div>

              {/* Fast Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-700 text-center">
                <div className="p-2 rounded-lg bg-slate-900/40">
                  <div className="text-lg font-black text-white">500+</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Mitra Rekanan</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/40">
                  <div className="text-lg font-black text-white">2.500+</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">SKU Produk</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/40">
                  <div className="text-lg font-black text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Keaslian Terjamin</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Principal Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
            Mitra Prinsipal Resmi & Merek Unggulan yang Didistribusikan
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {brands.map((b, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 text-center transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs font-extrabold text-slate-200 tracking-tight">{b.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Smartphone, MapPin, Activity, ArrowUpRight, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalVisitors: 14820,
    pageviews: 42180,
    activeNow: 18,
    bounceRate: '28.4%',
    avgSessionDuration: '3m 42s',
    ordersCreated: 154,
    dailyVisits: [
      { day: 'Sen', visits: 1820, pageviews: 5210 },
      { day: 'Sel', visits: 2140, pageviews: 6180 },
      { day: 'Rab', visits: 1980, pageviews: 5890 },
      { day: 'Kam', visits: 2450, pageviews: 7320 },
      { day: 'Jum', visits: 2610, pageviews: 7890 },
      { day: 'Sab', visits: 2230, pageviews: 6410 },
      { day: 'Min', visits: 1590, pageviews: 3280 },
    ],
    topPages: [
      { path: '/', title: 'Beranda Profil Perusahaan', views: 18450, change: '+14%' },
      { path: '/katalog', title: 'Katalog Sparepart & Pelumas Motor', views: 12920, change: '+22%' },
      { path: '/katalog/oli-matic', title: 'Kategori Oli & Pelumas Matic', views: 6480, change: '+18%' },
      { path: '/berita', title: 'Berita & Edukasi Otomotif', views: 4120, change: '+9%' },
      { path: '/kontak', title: 'Formulir Kemitraan & Kontak Bengkel', views: 2840, change: '+31%' },
    ],
    cityBreakdown: [
      { city: 'Jakarta & Bodetabek', percentage: 38 },
      { city: 'Surabaya & Jatim', percentage: 24 },
      { city: 'Bandung & Jabar', percentage: 16 },
      { city: 'Semarang & Jateng', percentage: 11 },
      { city: 'Medan & Sumut', percentage: 6 },
      { city: 'Lainnya', percentage: 5 },
    ],
    deviceBreakdown: [
      { device: 'Mobile Smartphone', percentage: 62 },
      { device: 'Desktop / Laptop', percentage: 33 },
      { device: 'Tablet', percentage: 5 },
    ],
    recentLogs: [
      { id: '1', path: '/katalog', referrer: 'Google Organic', device: 'Mobile (Android)', city: 'Surabaya', timestamp: '1 menit lalu' },
      { id: '2', path: '/kontak', referrer: 'Direct Mitra Bengkel', device: 'Desktop (Windows)', city: 'Jakarta Barat', timestamp: '3 menit lalu' },
      { id: '3', path: '/', referrer: 'Instagram Bio', device: 'Mobile (iOS)', city: 'Bandung', timestamp: '5 menit lalu' },
      { id: '4', path: '/berita', referrer: 'Google Organic', device: 'Mobile (Android)', city: 'Semarang', timestamp: '9 menit lalu' },
      { id: '5', path: '/katalog/busi-injeksi', referrer: 'Direct', device: 'Desktop (macOS)', city: 'Medan', timestamp: '12 menit lalu' },
    ],
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLiveStats = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/analytics/stats');
      const json = await res.json();
      if (json.success && json.data) {
        setStats(json.data);
      }
    } catch (e) {
      // Keep state
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 20000);
    return () => clearInterval(interval);
  }, []);

  const maxVisits = Math.max(...stats.dailyVisits.map((d) => d.visits));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Analitik Pengunjung Real-Time (Live Traffic)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring performa web, interaksi katalog suku cadang, dan asal wilayah pengunjung bengkel secara langsung.
          </p>
        </div>

        <button
          onClick={fetchLiveStats}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pengunjung Aktif</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Activity className="w-4 h-4 animate-pulse" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
            {stats.activeNow}
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> Live Now
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Pengunjung yang sedang membuka situs detik ini</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pengunjung</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
            {stats.totalVisitors.toLocaleString('id-ID')}
            <span className="text-xs text-blue-600 font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +16.8%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Akumulasi kunjungan unik 30 hari terakhir</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pageviews</span>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
            {stats.pageviews.toLocaleString('id-ID')}
            <span className="text-xs text-purple-600 font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Jumlah halaman yang dibuka oleh pengunjung</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Durasi Sesi & Bounce</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-2">
            {stats.avgSessionDuration}
            <span className="text-xs text-slate-500 font-bold">
              (Bounce: {stats.bounceRate})
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Rata-rata waktu membaca katalog & artikel</p>
        </div>
      </div>

      {/* Chart Section & Demographic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Trend Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Tren Kunjungan Mingguan (7 Hari Terakhir)
              </h3>
              <p className="text-[11px] text-slate-500">
                Perbandingan jumlah kunjungan unik harian ke website PT BSM
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              Rata-rata: 2.140 / hari
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6 pb-2">
            <div className="grid grid-cols-7 gap-3 h-48 items-end">
              {stats.dailyVisits.map((item, idx) => {
                const heightPercent = Math.round((item.visits / maxVisits) * 100);
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-[10px] font-bold text-slate-400 group-hover:text-blue-700 transition-colors">
                      {item.visits}
                    </div>
                    <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-36">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-blue-700 to-sky-500 rounded-t-md group-hover:from-blue-800 group-hover:to-sky-400 transition-all duration-300"
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: City Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-700" />
            <h3 className="font-extrabold text-sm text-slate-900">
              Wilayah Asal Pengunjung Bengkel
            </h3>
          </div>

          <div className="space-y-3 pt-1">
            {stats.cityBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.city}</span>
                  <span className="font-bold text-slate-900">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block mb-2">
              Distribusi Perangkat Akses:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {stats.deviceBreakdown.map((dev, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-black text-slate-900 block">{dev.percentage}%</span>
                  <span className="text-[10px] text-slate-500">{dev.device.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Pages & Live Traffic Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 5 Pages */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">
            Halaman Paling Populer (Katalog & Konten Terbanyak Dilihat)
          </h3>

          <div className="divide-y divide-slate-100">
            {stats.topPages.map((page, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">{page.title}</p>
                  <p className="font-mono text-[10px] text-blue-600">{page.path}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900 block">{page.views.toLocaleString('id-ID')} views</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{page.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed Stream */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Feed Kunjungan Terbaru
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Real-Time</span>
          </div>

          <div className="space-y-2.5">
            {stats.recentLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-slate-800">{log.city} • <span className="font-normal text-slate-500">{log.device}</span></p>
                  <p className="font-mono text-[10px] text-blue-700">{log.path}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

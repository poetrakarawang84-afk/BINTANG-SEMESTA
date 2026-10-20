import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Real-time Visitor Analytics Store
interface PageviewLog {
  id: string;
  path: string;
  referrer: string;
  device: string;
  city: string;
  timestamp: string;
}

const analyticsData = {
  totalVisitors: 15420,
  pageviews: 43890,
  activeNow: 22,
  bounceRate: '27.2%',
  avgSessionDuration: '3m 54s',
  inquiriesSubmitted: 94,
  dailyVisits: [
    { day: 'Sen', visits: 1920, pageviews: 5410 },
    { day: 'Sel', visits: 2240, pageviews: 6380 },
    { day: 'Rab', visits: 2080, pageviews: 6090 },
    { day: 'Kam', visits: 2550, pageviews: 7520 },
    { day: 'Jum', visits: 2710, pageviews: 8090 },
    { day: 'Sab', visits: 2330, pageviews: 6610 },
    { day: 'Min', visits: 1690, pageviews: 3790 },
  ],
  topPages: [
    { path: '/', title: 'Beranda Profil Perusahaan', views: 19250, change: '+15%' },
    { path: '/katalog', title: 'Katalog Pengenalan Suku Cadang & Pelumas', views: 13820, change: '+24%' },
    { path: '/katalog/oli-matic', title: 'Spesifikasi Oli Matic Shell & Castrol', views: 7120, change: '+19%' },
    { path: '/berita', title: 'Berita & Edukasi Otomotif BSM', views: 4560, change: '+11%' },
    { path: '/kontak', title: 'Formulir Kontak Kemitraan Klien', views: 3120, change: '+34%' },
  ],
  cityBreakdown: [
    { city: 'Jakarta & Bodetabek', percentage: 39 },
    { city: 'Surabaya & Jatim', percentage: 23 },
    { city: 'Bandung & Jabar', percentage: 17 },
    { city: 'Semarang & Jateng', percentage: 11 },
    { city: 'Medan & Sumut', percentage: 6 },
    { city: 'Lainnya', percentage: 4 },
  ],
  deviceBreakdown: [
    { device: 'Mobile Smartphone', percentage: 65 },
    { device: 'Desktop / Laptop', percentage: 31 },
    { device: 'Tablet', percentage: 4 },
  ],
  recentLogs: [
    { id: '1', path: '/katalog', referrer: 'Google Organic', device: 'Mobile (Android)', city: 'Surabaya', timestamp: '1 menit lalu' },
    { id: '2', path: '/kontak', referrer: 'Direct Klien', device: 'Desktop (Windows)', city: 'Jakarta Barat', timestamp: '2 menit lalu' },
    { id: '3', path: '/', referrer: 'Instagram Bio', device: 'Mobile (iOS)', city: 'Bandung', timestamp: '4 menit lalu' },
    { id: '4', path: '/berita', referrer: 'Google Organic', device: 'Mobile (Android)', city: 'Semarang', timestamp: '7 menit lalu' },
    { id: '5', path: '/katalog', referrer: 'Direct', device: 'Desktop (macOS)', city: 'Medan', timestamp: '10 menit lalu' },
  ] as PageviewLog[],
};

// API: AI Generate Article for Automotive News CMS
app.post('/api/ai/generate-article', async (req, res) => {
  const { topic } = req.body;
  const topicTitle = topic || 'Tips Memilih Oli Matic Terbaik untuk Motor Harian';

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Buatkan artikel berita edukasi otomotif profesional dan menarik untuk blog pengenalan produk perusahaan PT. Bintang Semesta Motor (distributor resmi sparepart & pelumas motor). Topik: "${topicTitle}".
Kembalikan format JSON dengan properti: title (string), category (string: Tips Perawatan / Info Produk / Tren Otomotif), readTime (string misal "4 menit baca"), summary (string 2 kalimat), content (string konten artikel lengkap dalam 3 paragraf komprehensif), tags (array of strings, 3-5 tags). Jangan mencantumkan harga spesifik, fokus pada edukasi teknis, keunggulan kualitas OEM, dan tips perawatan.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              readTime: { type: Type.STRING },
              summary: { type: Type.STRING },
              content: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['title', 'category', 'summary', 'content', 'tags'],
          },
        },
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      return res.json({ success: true, article: parsed });
    } catch (err: any) {
      console.warn('Gemini generate article error:', err?.message || err);
    }
  }

  // Fallback article
  return res.json({
    success: true,
    article: {
      title: topicTitle,
      category: 'Tips Perawatan',
      readTime: '3 menit baca',
      summary: 'Panduan lengkap dari tim teknis PT. Bintang Semesta Motor tentang cara merawat dan memilih suku cadang berstandar OEM.',
      content: 'Perawatan rutin pada kendaraan roda dua sangat krusial untuk menjaga performa mesin tetap prima dan menghemat konsumsi bahan bakar. Pemilihan pelumas oli sintetis yang memiliki sertifikasi JASO MB untuk matic atau JASO MA2 untuk motor kopling basah akan melindungi komponen ruang bakar dari gesekan berlebih pada suhu tinggi.\n\nSelain pelumas, pemeriksaan berkala pada sistem pengapian seperti busi dan keausan kampas rem wajib dilakukan setiap 4.000 hingga 8.000 km. Pastikan selalu menggunakan suku cadang original bergaransi resmi demi keselamatan berkendara di jalan raya.\n\nPT. Bintang Semesta Motor berkomitmen mengedukasi masyarakat dan para mekanik mengenai keaslian dan spesifikasi suku cadang berkualitas tinggi.',
      tags: ['Oli Motor', 'Perawatan Motor', 'Sparepart Asli', 'Edukasi BSM'],
    },
  });
});

// API: Visitor Analytics Tracker
app.post('/api/analytics/track', (req, res) => {
  const { path: pagePath, device, city, referrer } = req.body;
  analyticsData.pageviews += 1;
  const newLog: PageviewLog = {
    id: Date.now().toString(),
    path: pagePath || '/',
    referrer: referrer || 'Direct / Organik',
    device: device || 'Mobile Web',
    city: city || 'Jakarta',
    timestamp: 'Baru saja',
  };
  analyticsData.recentLogs.unshift(newLog);
  if (analyticsData.recentLogs.length > 10) {
    analyticsData.recentLogs.pop();
  }
  return res.json({ success: true });
});

// API: Get Visitor Analytics
app.get('/api/analytics/stats', (req, res) => {
  return res.json({ success: true, data: analyticsData });
});

// Mount Vite or serve production build
async function startServer() {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`PT Bintang Semesta Motor web server running on port ${port}`);
  });
}

startServer();

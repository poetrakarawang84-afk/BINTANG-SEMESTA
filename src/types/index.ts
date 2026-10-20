export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  category: 'Oli & Pelumas' | 'Suku Cadang Mesin' | 'Ban & Velg' | 'Sistem Pengereman' | 'Kelistrikan & Aki' | 'Transmisi & Rantai';
  unit: string;
  availability: 'Tersedia' | 'Stok Terbatas' | 'Hubungi Sales';
  image: string;
  description: string;
  features: string[];
  specification: Record<string, string>;
  isPopular?: boolean;
  isActive: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  isPublished: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  businessName: string;
  businessType: 'Bengkel Motor' | 'Toko Sparepart' | 'Fleet Perusahaan' | 'Reseller / Agen' | 'Pengendara / Konsumen' | 'Lainnya';
  city: string;
  phone: string;
  email: string;
  interestedProduct?: string;
  message: string;
  status: 'Baru' | 'Dihubungi' | 'Selesai';
  date: string;
}

export interface UserSession {
  isAuthenticated: boolean;
  username: string;
  role: 'Super Admin' | 'Content Editor' | 'Admin Marketing';
  email: string;
}

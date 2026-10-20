export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

export function formatNumber(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '0';
  return Math.round(amount).toLocaleString('id-ID');
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function generateOrderNumber(existingCount: number = 0): string {
  const year = new Date().getFullYear();
  const nextNum = (891 + existingCount).toString().padStart(4, '0');
  return `SO-BSM-${year}-${nextNum}`;
}

// Convert number to Indonesian word representation for enterprise invoices
export function angkaKeTerbilang(nilai: number): string {
  const bilangan = [
    '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
  ];

  const roundVal = Math.floor(Math.abs(nilai));
  if (roundVal === 0) return 'Nol Rupiah';

  function konversi(n: number): string {
    if (n < 12) return bilangan[n];
    if (n < 20) return konversi(n - 10) + ' Belas';
    if (n < 100) return konversi(Math.floor(n / 10)) + ' Puluh ' + konversi(n % 10);
    if (n < 200) return 'Seratus ' + konversi(n - 100);
    if (n < 1000) return konversi(Math.floor(n / 100)) + ' Ratus ' + konversi(n % 100);
    if (n < 2000) return 'Seribu ' + konversi(n - 1000);
    if (n < 1000000) return konversi(Math.floor(n / 1000)) + ' Ribu ' + konversi(n % 1000);
    if (n < 1000000000) return konversi(Math.floor(n / 1000000)) + ' Juta ' + konversi(n % 1000000);
    if (n < 1000000000000) return konversi(Math.floor(n / 1000000000)) + ' Miliar ' + konversi(n % 1000000000);
    return '';
  }

  const hasil = konversi(roundVal).replace(/\s+/g, ' ').trim();
  return (hasil + ' Rupiah').trim();
}

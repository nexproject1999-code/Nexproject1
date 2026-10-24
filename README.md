# Kopi Sela — Coffee Shop Demo

Website demo coffee shop modern untuk portofolio NEX Project.

## Fitur
- Responsive landing page
- Menu coffee, non-coffee, pastry & bites
- Pencarian dan filter kategori
- Keranjang pesanan dengan penyimpanan `localStorage`
- Tombol pesanan WhatsApp dengan ringkasan otomatis
- Form email demo
- Navigasi mobile

## Menjalankan di komputer
Buka `index.html` di browser. Lebih disarankan menggunakan server lokal:

```bash
python3 -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Catatan demo
- Kopi Sela adalah nama kedai fiktif.
- Harga, alamat, dan jam operasional adalah data contoh.
- Tombol WhatsApp membuka WhatsApp dengan pesan siap isi, lalu pengguna memilih kontak sendiri.
- Form email tidak mengirim atau menyimpan data.
- Foto menggunakan URL Unsplash dan perlu koneksi internet.
- Website ini belum terhubung ke sistem POS, stok, pembayaran, reservasi, atau pemesanan backend sungguhan.

## Kustomisasi
- Edit menu dan harga di `js/app.js` pada array `products`.
- Edit tampilan di `css/style.css`.
- Edit konten dan section di `index.html`.

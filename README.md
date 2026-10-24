# Rasa Rumah — Demo Website Restoran

Website demo responsif untuk portofolio NEX Project. Nama, menu, harga, lokasi, jam operasional, dan seluruh detail bisnis pada website ini adalah contoh.

## Cara menjalankan secara lokal

Buka `index.html` langsung di browser, atau jalankan server lokal dari folder ini:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Fitur

- Halaman restoran modern dan responsif
- Menu dari data JavaScript dengan filter kategori dan pencarian
- Keranjang pesanan dengan jumlah dan subtotal
- Penyimpanan keranjang melalui `localStorage`
- Pesanan melalui WhatsApp dengan ringkasan yang disiapkan otomatis
- Formulir permintaan reservasi melalui WhatsApp
- Navigasi mobile

## Catatan demo

- Nama restoran, menu, harga, alamat, dan jam operasional adalah data fiktif.
- Tombol WhatsApp membuka WhatsApp tanpa menentukan nomor tujuan; pengguna memilih kontak sendiri.
- Form reservasi hanya menyiapkan pesan. Tidak ada sistem reservasi atau konfirmasi otomatis.
- Gambar memakai URL Unsplash dan membutuhkan koneksi internet.
- Ini adalah demo front-end; belum terhubung ke backend, sistem POS, inventori, pembayaran, atau pengiriman nyata.

## Mengubah data menu

Edit array `menuItems` di `js/app.js`. Gambar, nama menu, deskripsi, kategori, dan harga disimpan bersama dalam setiap item.

# NEX SHOP — Fashion Online Shop Demo

Demo toko fashion minimalis untuk portofolio NEX Project.

## Cara menjalankan
- Buka `index.html` di browser untuk mulai dari halaman login demo.
- Pilih `Masuk sebagai Tamu` atau gunakan `Continue with Google` untuk membuka dialog simulasi.
- Kamu juga bisa langsung membuka `shop.html`.

## Struktur
- `index.html`: login/entry demo
- `shop.html`: etalase, filter, pencarian, quick view
- `product.html`: detail produk
- `cart.html`: keranjang, jumlah, voucher `NEX10`
- `checkout.html`: alamat, kurir, pembayaran simulasi
- `confirmation.html`: nomor pesanan demo dan persiapan pesan WhatsApp
- `assets/css/style.css`: tampilan responsif
- `assets/js/data.js`: data 12 produk fiktif yang mudah diubah
- `assets/js/`: logika halaman

## Penting
- Login Google **tidak** terhubung ke Google OAuth.
- Transfer bank, QRIS, e-wallet, COD, ongkir, stok, dan kurir hanya simulasi.
- Tidak ada uang yang diproses dan tidak ada pesanan dikirim.
- WhatsApp menggunakan `https://wa.me/?text=...` agar pengguna memilih sendiri kontak tujuan. Pesan diberi keterangan DEMO.
- Foto produk menggunakan URL gambar Unsplash sehingga memerlukan internet. Jika gambar gagal dimuat, ada gambar fallback.
- Data keranjang dan pesanan disimpan lokal di browser melalui `localStorage`, tidak dikirim ke server.
- Data produk berada di `assets/js/data.js` agar mudah diedit.

Untuk GitHub Pages, unggah seluruh isi folder ini ke root repository, jangan hanya file HTML.

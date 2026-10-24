document.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('confirmation-content');
  let order;
  try{order=JSON.parse(localStorage.getItem('nex-last-order')||'null')}catch(e){}
  if(!order){root.innerHTML='<div class="empty-state"><h2>Belum ada pesanan demo</h2><p>Coba alur checkout terlebih dahulu.</p><a href="shop.html" class="btn btn-dark">Kembali ke Toko</a></div>';return}
  const itemRows=order.items.map(i=>{const p=NEX.findProduct(i.id);return `<div class="summary-product"><span>${p?p.name:i.id} <small>× ${i.qty} · ${i.size}/${i.color}</small></span><strong>${NEX.money((p?p.price:0)*i.qty)}</strong></div>`}).join('');
  const text=`Halo, saya ingin membagikan pesanan DEMO dari NEX SHOP.
Nomor pesanan: ${order.number}
Nama: ${order.customer.name}
Produk:
${order.items.map(i=>{const p=NEX.findProduct(i.id);return `- ${p?p.name:i.id} x${i.qty} (${i.size}/${i.color})`}).join('\n')}
Subtotal: ${NEX.money(order.subtotal)}
Diskon simulasi: ${NEX.money(order.discount)}
Kurir demo: ${order.courier} ${order.shipping}
Ongkir simulasi: ${NEX.money(order.shippingCost)}
Pembayaran simulasi: ${order.payment}
Total simulasi: ${NEX.money(order.total)}

Ini hanya pesanan demo, bukan transaksi sungguhan.`;
  root.innerHTML=`<div class="confirmation-hero"><div class="confirmation-check">✓</div><p class="eyebrow">DEMO ORDER CREATED</p><h1>Pesanan demo dibuat.</h1><p>Ini simulasi alur belanja NEX SHOP. Pesanan ini tidak dikirim dan tidak ada pembayaran yang diproses.</p><div class="order-number">Nomor demo <strong>${order.number}</strong></div></div><div class="confirmation-layout"><section class="card-panel"><p class="eyebrow">RINGKASAN PESANAN</p><h2>Detail pesanan</h2>${itemRows}<hr class="divider"><div class="summary-line"><span>Subtotal</span><strong>${NEX.money(order.subtotal)}</strong></div><div class="summary-line"><span>Diskon</span><strong>− ${NEX.money(order.discount)}</strong></div><div class="summary-line"><span>Kurir</span><strong>${order.courier} · ${order.shipping}</strong></div><div class="summary-line"><span>Ongkir simulasi</span><strong>${NEX.money(order.shippingCost)}</strong></div><div class="summary-line"><span>Pembayaran</span><strong>${order.payment} (demo)</strong></div><div class="summary-total"><span>Total simulasi</span><strong>${NEX.money(order.total)}</strong></div></section><section class="card-panel"><p class="eyebrow">PENERIMA</p><h2>${NEX.escapeHtml(order.customer.name)}</h2><p>${NEX.escapeHtml(order.customer.phone)}</p><p>${NEX.escapeHtml(order.customer.address)}, ${NEX.escapeHtml(order.customer.city)}, ${NEX.escapeHtml(order.customer.postal)}</p><p class="small muted">Pengiriman: ${order.shippingETA}</p>${order.customer.note?`<p class="small muted">Catatan: ${NEX.escapeHtml(order.customer.note)}</p>`:''}<div class="notice-box">Status: <strong>Pesanan demo dibuat</strong>. Tidak ada kurir atau layanan pembayaran yang dihubungi.</div><a class="btn btn-dark btn-wide" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(text)}">Lanjutkan ke WhatsApp ↗</a><p class="small muted">WhatsApp akan disiapkan dengan detail pesanan. Kamu memilih sendiri penerima pesan. Pesan ini bertanda DEMO.</p></section></div><div class="confirmation-actions"><a class="btn btn-outline" href="shop.html">Kembali ke Toko</a><a class="text-link" href="cart.html">Lihat keranjang →</a></div>`;
});

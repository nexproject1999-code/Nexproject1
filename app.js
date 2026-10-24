const products = [
  {id:'espresso',name:'Espresso',category:'coffee',categoryName:'Coffee',price:18000,description:'Bold, balanced, and straight to the point.',image:'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=750&q=80',tag:'Classic',featured:true},
  {id:'iced-latte',name:'Iced Sela Latte',category:'coffee',categoryName:'Coffee',price:28000,description:'Espresso, fresh milk, and a little pause.',image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=750&q=80',tag:'Favorit',featured:true},
  {id:'aren-latte',name:'Aren Latte',category:'coffee',categoryName:'Coffee',price:30000,description:'Creamy milk with the mellow sweetness of palm sugar.',image:'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=750&q=80',tag:'Signature',featured:true},
  {id:'americano',name:'Iced Americano',category:'coffee',categoryName:'Coffee',price:23000,description:'Bright, refreshing, and easy to enjoy.',image:'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=750&q=80',tag:'Fresh'},
  {id:'matcha',name:'Iced Matcha',category:'noncoffee',categoryName:'Non-coffee',price:31000,description:'Earthy matcha with creamy milk.',image:'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=750&q=80',tag:'Non-coffee'},
  {id:'chocolate',name:'Dark Chocolate',category:'noncoffee',categoryName:'Non-coffee',price:29000,description:'Deep cocoa, smooth texture, no coffee needed.',image:'https://images.unsplash.com/photo-1542990253-0b8be8c7b8d4?auto=format&fit=crop&w=750&q=80',tag:''},
  {id:'vanilla-milk',name:'Vanilla Milk',category:'noncoffee',categoryName:'Non-coffee',price:26000,description:'Light vanilla and chilled milk.',image:'https://images.unsplash.com/photo-1553787499-6f913324f6e4?auto=format&fit=crop&w=750&q=80',tag:''},
  {id:'croissant',name:'Butter Croissant',category:'food',categoryName:'Pastry & bites',price:22000,description:'Golden layers, buttery and flaky.',image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=750&q=80',tag:'Fresh bake'},
  {id:'cinnamon-roll',name:'Cinnamon Roll',category:'food',categoryName:'Pastry & bites',price:25000,description:'Soft pastry with cinnamon and a sweet glaze.',image:'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=750&q=80',tag:''},
  {id:'banana-bread',name:'Banana Bread',category:'food',categoryName:'Pastry & bites',price:20000,description:'A simple slice to go with your coffee.',image:'https://images.unsplash.com/photo-1606101273945-e9eba91c0bb3?auto=format&fit=crop&w=750&q=80',tag:''},
  {id:'filter-coffee',name:'Manual Brew',category:'coffee',categoryName:'Coffee',price:32000,description:'A clean cup with notes that change by the beans.',image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=750&q=80',tag:'Brew bar'},
  {id:'cheese-toast',name:'Cheese Toast',category:'food',categoryName:'Pastry & bites',price:27000,description:'Toasted bread with a warm, savory cheese filling.',image:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=750&q=80',tag:''}
];

const rupiah = value => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value).replace(/\u00a0/g,' ');
const getCart = () => { try { return JSON.parse(localStorage.getItem('kopiSelaCartDemo') || '[]'); } catch { return []; } };
let cart = getCart();
let activeCategory = 'all';
let searchTerm = '';
const productGrid = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const toast = document.getElementById('toast');
let toastTimer;

function saveCart(){ localStorage.setItem('kopiSelaCartDemo',JSON.stringify(cart)); renderCart(); }
function renderProducts(){
  const list = products.filter(p => (activeCategory === 'all' || p.category === activeCategory) && `${p.name} ${p.categoryName} ${p.description}`.toLowerCase().includes(searchTerm));
  productGrid.innerHTML = list.length ? list.map(p => `
    <article class="product-card">
      <div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag || p.categoryName}</span><button class="product-quick" data-add="${p.id}" type="button">+ Tambah pesanan</button></div>
      <div class="product-info"><span class="product-category">${p.categoryName}</span><div class="product-name-row"><h3 class="product-name">${p.name}</h3><span class="product-price">${rupiah(p.price)}</span></div><p class="product-detail">${p.description}</p><button class="add-button" data-add="${p.id}" type="button">Tambah ke pesanan <span>+</span></button></div>
    </article>`).join('') : '<div class="empty-results">Menu tidak ditemukan. Coba kata pencarian lain.</div>';
}
function showToast(message){ toast.textContent=message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2500); }
function addProduct(id){ const item=cart.find(x=>x.id===id); if(item) item.qty++; else cart.push({id,qty:1}); saveCart(); const p=products.find(x=>x.id===id); showToast(`${p.name} ditambahkan ke pesanan`); }
function changeQty(id,delta){ const item=cart.find(x=>x.id===id); if(!item)return; item.qty+=delta; if(item.qty<1) cart=cart.filter(x=>x.id!==id); saveCart(); }
function removeProduct(id){ cart=cart.filter(x=>x.id!==id); saveCart(); }
function renderCart(){
  const count=cart.reduce((n,x)=>n+x.qty,0); document.getElementById('cartCount').textContent=count;
  const subtotal=cart.reduce((sum,x)=>{const p=products.find(p=>p.id===x.id);return sum+(p?p.price*x.qty:0)},0);
  document.getElementById('cartSubtotal').textContent=rupiah(subtotal);
  const drawerItems=document.getElementById('drawerItems');
  drawerItems.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);if(!p)return '';return `<div class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${p.categoryName}</p><span class="item-price">${rupiah(p.price*item.qty)}</span><div class="quantity-control"><button data-qty="-1" data-id="${p.id}" aria-label="Kurangi ${p.name}">−</button><span>${item.qty}</span><button data-qty="1" data-id="${p.id}" aria-label="Tambah ${p.name}">+</button></div></div><button class="remove-item" data-remove="${p.id}">Hapus</button></div>`}).join('');
  const empty=cart.length===0; document.getElementById('drawerEmpty').classList.toggle('show',empty); document.getElementById('drawerFooter').classList.toggle('hidden',empty); drawerItems.style.display=empty?'none':'block';
}
function openCart(){cartDrawer.classList.add('open');cartOverlay.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');document.getElementById('closeCart').focus();}
function closeCart(){cartDrawer.classList.remove('open');cartOverlay.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');}
function buildOrderMessage(){
  const subtotal=cart.reduce((sum,x)=>{const p=products.find(p=>p.id===x.id);return sum+(p?p.price*x.qty:0)},0);
  const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return p?`- ${p.name} x${x.qty}: ${rupiah(p.price*x.qty)}`:''}).filter(Boolean);
  return `Halo Kopi Sela, saya ingin memesan (website demo):\n\n${lines.join('\n')}\n\nSubtotal: ${rupiah(subtotal)}\nCatatan: Harga dan menu adalah simulasi demo. Mohon konfirmasi ketersediaan dan total pesanan. `;
}
function openWhatsApp(message){ const url=`https://wa.me/?text=${encodeURIComponent(message)}`; window.open(url,'_blank','noopener,noreferrer'); }

productGrid.addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(btn)addProduct(btn.dataset.add)});
document.getElementById('categoryTabs').addEventListener('click',e=>{const btn=e.target.closest('[data-category]');if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll('.category-tab').forEach(t=>t.classList.toggle('active',t===btn));renderProducts()});
document.getElementById('menuSearch').addEventListener('input',e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts()});
document.getElementById('viewAllMenu').addEventListener('click',()=>{activeCategory='all';searchTerm='';document.getElementById('menuSearch').value='';document.querySelectorAll('.category-tab').forEach(t=>t.classList.toggle('active',t.dataset.category==='all'));renderProducts()});
document.getElementById('openCart').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);cartOverlay.addEventListener('click',closeCart);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
document.getElementById('drawerItems').addEventListener('click',e=>{const qty=e.target.closest('[data-qty]');const remove=e.target.closest('[data-remove]');if(qty)changeQty(qty.dataset.id,Number(qty.dataset.qty));if(remove)removeProduct(remove.dataset.remove)});
document.getElementById('orderWhatsApp').addEventListener('click',()=>{if(!cart.length)return;openWhatsApp(buildOrderMessage())});
document.getElementById('visitWhatsApp').addEventListener('click',()=>openWhatsApp('Halo Kopi Sela, saya ingin bertanya tentang menu dan jam operasional. Saya melihat website demo Kopi Sela.'));
document.getElementById('shopFromEmpty').addEventListener('click',()=>{closeCart();document.getElementById('menu').scrollIntoView({behavior:'smooth'})});
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();showToast('Terima kasih! Form email ini hanya simulasi demo.');e.target.reset()});
const menuToggle=document.getElementById('menuToggle');const mainNav=document.getElementById('mainNav');menuToggle.addEventListener('click',()=>{const opened=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(opened))});mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
renderProducts();renderCart();

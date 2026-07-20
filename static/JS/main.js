// ---------- data ----------
const categories = [
  {name:'Hand-Knotted Wool', c1:'#9a3324', c2:'#e8d3ab', v:0},
  {name:'Silk & Silk-Blend', c1:'#4a1f24', c2:'#e8d3ab', v:1},
  {name:'Jute & Natural', c1:'#a97c34', c2:'#f1ebdf', v:2},
  {name:'Runners', c1:'#6b5c4c', c2:'#e8d3ab', v:0},
  {name:'Custom & Bespoke', c1:'#9a3324', c2:'#4a1f24', v:1},
];

const products = [
  {name:'Panipat Medallion', cat:'Wool · 6×9 ft', price:18500, was:23000, rating:4.8, c1:'#9a3324', c2:'#e8d3ab', v:0},
  {name:'Jaipur Trellis', cat:'Wool-Silk · 8×10 ft', price:26400, was:0, rating:4.9, c1:'#4a1f24', c2:'#f1ebdf', v:1},
  {name:'Lahori Diamond', cat:'Wool · 5×8 ft', price:14200, was:17000, rating:4.7, c1:'#a97c34', c2:'#9a3324', v:2},
  {name:'Kashan Border', cat:'Silk-Blend · 9×12 ft', price:34800, was:0, rating:5.0, c1:'#4a1f24', c2:'#e8d3ab', v:0},
  {name:'Amritsar Stripe', cat:'Jute · 6×9 ft', price:8900, was:11000, rating:4.6, c1:'#e8d3ab', c2:'#231810', v:1},
  {name:'Doaba Bloom', cat:'Wool · 8×10 ft', price:21500, was:0, rating:4.8, c1:'#9a3324', c2:'#a97c34', v:2},
  {name:'Ludhiana Runner', cat:'Wool · 2.5×8 ft', price:6400, was:7500, rating:4.7, c1:'#6b5c4c', c2:'#e8d3ab', v:0},
  {name:'Ferozepur Ivory', cat:'Silk-Blend · 6×9 ft', price:29900, was:0, rating:4.9, c1:'#f1ebdf', c2:'#9a3324', v:1},
];

const newArrivals = [
  {name:'Chandigarh Grid', cat:'Wool · 8×10 ft', price:19800, was:0, rating:4.6, c1:'#a97c34', c2:'#231810', v:1},
  {name:'Patiala Sunburst', cat:'Silk-Blend · 6×9 ft', price:31200, was:0, rating:4.8, c1:'#9a3324', c2:'#f1ebdf', v:2},
  {name:'Bathinda Weave', cat:'Jute · 5×8 ft', price:7600, was:0, rating:4.5, c1:'#6b5c4c', c2:'#e8d3ab', v:0},
  {name:'Ropar Mosaic', cat:'Wool · 9×12 ft', price:27800, was:0, rating:4.9, c1:'#4a1f24', c2:'#a97c34', v:1},
];

const reviews = [
  {q:'The colours were even richer in person. Genuinely feels like a family heirloom.', who:'Priya S., Delhi', r:5},
  {q:'Custom runner fit our stairway perfectly — measured exactly to what we sent them.', who:'Aman K., Chandigarh', r:5},
  {q:'Fast delivery, careful packaging, and the quality is way above the price point.', who:'Reema T., Mumbai', r:4},
  {q:'Bought two rugs for our new hotel lobby. Consistent quality on both.', who:'Boutique Stay, Manali', r:5},
];

function pattern(c1,c2,v){
  const pats = [
    `<rect width="100%" height="100%" fill="${c1}"/><g stroke="${c2}" stroke-opacity="0.55" stroke-width="1"><path d="M0 20h200M0 60h200M0 100h200M0 140h200M0 180h200"/></g>`,
    `<rect width="100%" height="100%" fill="${c1}"/><g fill="${c2}" fill-opacity="0.4"><rect x="10" y="10" width="16" height="16" transform="rotate(45 18 18)"/><rect x="90" y="60" width="16" height="16" transform="rotate(45 98 68)"/><rect x="150" y="20" width="16" height="16" transform="rotate(45 158 28)"/><rect x="50" y="120" width="16" height="16" transform="rotate(45 58 128)"/><rect x="140" y="140" width="16" height="16" transform="rotate(45 148 148)"/></g>`,
    `<rect width="100%" height="100%" fill="${c1}"/><g stroke="${c2}" stroke-opacity="0.5" stroke-width="1" fill="none"><circle cx="100" cy="100" r="70"/><circle cx="100" cy="100" r="40"/></g>`,
  ];
  return pats[v % pats.length];
}
function svgBox(c1,c2,v,ratio='1/1'){
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;aspect-ratio:${ratio};">${pattern(c1,c2,v)}</svg>`;
}
function starIcons(rating){
  let s='';
  for(let i=0;i<5;i++){
    s += `<svg viewBox="0 0 24 24" fill="${i < Math.round(rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 6 7 1-5 5 1.5 7L12 18l-6.5 3L7 14 2 9l7-1z"/></svg>`;
  }
  return s;
}
function money(n){ return '₹' + n.toLocaleString('en-IN'); }

// ---------- render categories ----------
const catGrid = document.getElementById('catGrid');
categories.forEach(c=>{
  const el = document.createElement('a');
  el.href = '#bestsellers';
  el.className = 'cat-card';
  el.innerHTML = `<div class="pattern">${svgBox(c.c1,c.c2,c.v)}</div><div class="overlay"></div><span>${c.name}</span>`;
  catGrid.appendChild(el);
});

// ---------- cart / wishlist state ----------
let cart = [];
let wishCount = 0;

function updateCartBadge(){
  const badge = document.getElementById('cartBadge');
  badge.textContent = cart.length;
  badge.classList.add('pulse');
  setTimeout(()=>badge.classList.remove('pulse'), 400);
}
function renderCartDrawer(){
  const wrap = document.getElementById('cartItems');
  if(cart.length === 0){
    wrap.innerHTML = '<p class="cart-empty">Your cart is empty. Start adding a rug you love.</p>';
  } else {
    wrap.innerHTML = cart.map(p => `
      <div class="cart-item">
        <div class="swatch">${svgBox(p.c1,p.c2,p.v)}</div>
        <div class="ci-info"><h4>${p.name}</h4><span>${p.cat}</span></div>
        <b style="font-family:'Fraunces',serif; font-size:13.5px;">${money(p.price)}</b>
      </div>`).join('');
  }
  const total = cart.reduce((sum,p)=>sum+p.price,0);
  document.getElementById('cartTotal').textContent = money(total);
}

function makeProductCard(p){
  const el = document.createElement('div');
  el.className = 'prod-card';
  const discount = p.was ? Math.round((1 - p.price/p.was)*100) : 0;
  el.innerHTML = `
    <div class="prod-media">
      ${svgBox(p.c1,p.c2,p.v)}
      ${discount ? `<span class="prod-discount">-${discount}%</span>` : ''}
      <button class="wish-btn" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
      </button>
    </div>
    <div class="prod-info">
      <span class="cat-tag">${p.cat}</span>
      <h3>${p.name}</h3>
      <div class="stars">${starIcons(p.rating)}<span>${p.rating}</span></div>
      <div class="price-row">
        <span class="price-now">${money(p.price)}</span>
        ${p.was ? `<span class="price-was">${money(p.was)}</span>` : ''}
      </div>
      <button class="add-cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/></svg>
        Add to Cart
      </button>
    </div>`;

  el.querySelector('.wish-btn').addEventListener('click', (e)=>{
    e.currentTarget.classList.toggle('active');
    wishCount += e.currentTarget.classList.contains('active') ? 1 : -1;
    document.getElementById('wishBadge').textContent = wishCount;
  });
  const addBtn = el.querySelector('.add-cart');
  addBtn.addEventListener('click', ()=>{
    cart.push(p);
    updateCartBadge();
    renderCartDrawer();
    addBtn.classList.add('added');
    addBtn.textContent = 'Added ✓';
    setTimeout(()=>{ addBtn.classList.remove('added'); addBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/></svg> Add to Cart`; }, 1200);
  });
  return el;
}

const prodGrid = document.getElementById('prodGrid');
products.forEach(p => prodGrid.appendChild(makeProductCard(p)));
const prodGrid2 = document.getElementById('prodGrid2');
newArrivals.forEach(p => prodGrid2.appendChild(makeProductCard(p)));

// ---------- reviews ----------
const reviewStrip = document.getElementById('reviewStrip');
reviews.forEach(r=>{
  const el = document.createElement('div');
  el.className = 'review-card';
  el.innerHTML = `<div class="stars">${starIcons(r.r)}</div><p class="quote">"${r.q}"</p><p class="who">${r.who}</p>`;
  reviewStrip.appendChild(el);
});

// ---------- cart drawer open/close ----------
const cartDrawer = document.getElementById('cartDrawer');
const overlayBg = document.getElementById('overlayBg');
function openCart(){ cartDrawer.classList.add('open'); overlayBg.classList.add('show'); }
function closeCart(){ cartDrawer.classList.remove('open'); overlayBg.classList.remove('show'); }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlayBg.addEventListener('click', closeCart);

// ---------- mobile menu ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=> navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---------- newsletter ----------
document.getElementById('nlForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  document.getElementById('nlStatus').textContent = 'Thanks — check your inbox for your 10% off code.';
  e.target.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

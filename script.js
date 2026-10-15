/* ====== EDIT THESE ====== */
const CONFIG = {
  brand: "Hello", sub: "i'm",
  first: "Prabhjot", last: "",
  title: "Artist & Painter",
  phone: "+91 8054410824",
  email: "hello@mysite.com",
  siteUrl: "https://yourwebsite.com"
};

/* ======================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const C = Object.fromEntries(Object.entries(CONFIG).map(([k, v]) => [k, esc(v)]));
const site = C.siteUrl.replace(/^https?:\/\//, '');
$('siteBtn').href = CONFIG.siteUrl;
document.title = CONFIG.first + ' ' + CONFIG.last;

/* ===== STYLES: add a new one by adding an item here (+ CSS for data-s="id") ===== */
const LOGO = cls => `<svg class="logo ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 66C30 24 62 14 84 30C70 32 56 42 50 62C44 80 28 88 18 66Z"/><path d="M30 56L44 42M38 64L56 46"/><circle cx="76" cy="72" r="7"/></svg>`;
const INIT = esc(CONFIG.first.charAt(0).toUpperCase());
const MK = `<svg class="mk" viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="22"/><text x="25" y="33" text-anchor="middle">${INIT}</text></svg>`;
const PM = esc((CONFIG.title + ' • ' + CONFIG.brand + ' • ').toUpperCase());

/* stamp card pieces: wine red + slate + copper */
const CURVE = 'M0 205C40 245 90 250 135 205S215 120 275 150';
const PALETTE = '<span class="pal" aria-hidden="true">🎨</span>';
const WAVE = `<svg class="wave" viewBox="0 0 275 435" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#434d53"/><stop offset="1" stop-color="#262d31"/></linearGradient><linearGradient id="cu" x1="0" x2="1"><stop offset="0" stop-color="#b6764f"/><stop offset=".5" stop-color="#eab18a"/><stop offset="1" stop-color="#b26e48"/></linearGradient></defs><path d="${CURVE}L275 435L0 435Z" fill="url(#sl)"/><path d="${CURVE}" fill="none" stroke="url(#cu)" stroke-width="13" stroke-linecap="round"/><path d="${CURVE}" fill="none" stroke="rgba(255,235,215,.45)" stroke-width="2" transform="translate(0 -3.6)"/><path class="gl" d="M170 0V310M0 78H275M0 310H275"/></svg>`;
const POSTMARK = `<svg class="pm" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="dsc" cx=".4" cy=".35"><stop offset="0" stop-color="#f6c7a0"/><stop offset=".7" stop-color="#c0764a"/><stop offset="1" stop-color="#8d4d2d"/></radialGradient></defs><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="25"/><circle cx="50" cy="50" r="22" fill="url(#dsc)" stroke="none"/><path id="pmp" d="M50 14a36 36 0 1 1-.01 0" fill="none" stroke="none"/><text><textPath href="#pmp" textLength="215" lengthAdjust="spacing">${PM}</textPath></text><text class="pi" x="50" y="59" text-anchor="middle">${INIT}</text><circle cx="50" cy="4" r="3.4" stroke="none" fill="currentColor"/></svg>`;

const STYLES = [
  { id: 'stamp', thick: 12, step: 4, holes: true,
    back: `${WAVE}<div class="brand bc"><b>${C.brand}</b><small>${C.sub}</small></div>${PALETTE}<p class="site">${site}</p>`,
    front: `${WAVE}<div class="brand"><b>${C.brand}</b><small>${C.sub}</small></div>${POSTMARK}${PALETTE}
      <div class="who"><h1><b>${C.first}</b> <span>${C.last}</span></h1><p class="ttl">${C.title}</p><p class="info">${C.phone}</p><p class="info em">${C.email}</p></div>`,
    save: drawStamp },
  { id: 'doodle', thick: 14, step: 2,
    back: `${LOGO('big')}<b class="bname">${C.brand}</b><span class="bsub">${C.sub}</span><p class="site">${site}</p>`,
    front: `${LOGO('')}<h1 class="name"><span>${C.first}</span><span>${C.last}</span></h1>
      <svg class="sq" viewBox="0 0 100 10" aria-hidden="true"><path d="M2 6Q10 0 18 6T34 6T50 6T66 6T82 6T98 6"/></svg>
      <p class="ttl">${C.title}</p><p class="info p">${C.phone}</p><p class="info e">${C.email}</p>`,
    save: drawDoodle },
  { id: 'kraft', thick: 14, step: 4,
    back: `<i class="kb big"></i><div class="lock">${MK}<div><b>${C.brand}</b><small>${C.sub}</small></div></div>`,
    front: `<i class="hatch"></i>${MK}<h1 class="name"><span>${C.first}</span><span>${C.last}</span></h1><p class="ttl">${C.title}</p>
      <p class="kc a">${C.phone}</p><p class="kc b">${C.email}</p><p class="web">${site}</p><i class="kb"></i>`,
    save: drawKraft },
  { id: 'gallery', thick: 10, step: 4,
    back: `<i class="wash full"></i><b class="gname">${C.brand}</b><span class="gsub">${C.sub}</span><p class="gsite">${site}</p>`,
    front: `<i class="wash"></i><span class="mono">${INIT}</span>
      <h1 class="name"><span>${C.first}</span><span>${C.last}</span></h1><p class="ttl">${C.title}</p><i class="grule"></i>
      <p class="gc a">${C.phone}</p><p class="gc b">${C.email}</p><span class="chips"><i></i><i></i><i></i><i></i><i></i></span>`,
    save: drawGallery }
];

let cur = 0;
const card = $('card');

function build() {
  const st = STYLES[cur];
  document.body.dataset.style = st.id; card.dataset.s = st.id;
  card.innerHTML = `<div class="side back">${st.back}</div><div class="side front">${st.front}</div>`;
  card.style.setProperty('--t', st.thick + 'px');
  for (let z = -st.thick + st.step; z < st.thick; z += st.step) {          // paper-stack thickness
    const s = document.createElement('div');
    s.className = 'slab'; s.style.transform = `translateZ(${z}px)`;
    card.insertBefore(s, card.firstChild);
  }
  if (st.holes) stampEdge();
}

/* ---- stamp edge: evenly spaced holes all round, corners included ---- */
const R = 28, HOLE = 4.2, OFF = .5, GAP = 14;     // R must equal --rad of the stamp style
function holes(w, h) {
  const Rp = R - OFF, o = OFF, a = w/2 - o - Rp, b = h - 2*o - 2*Rp, c = w - 2*o - 2*Rp, q = Math.PI*Rp/2, k = t => t / Rp;
  const segs = [
    {l:a, p:t=>[w/2+t, o]},
    {l:q, p:t=>[w-o-Rp+Rp*Math.sin(k(t)), o+Rp-Rp*Math.cos(k(t))]},
    {l:b, p:t=>[w-o, o+Rp+t]},
    {l:q, p:t=>[w-o-Rp+Rp*Math.cos(k(t)), h-o-Rp+Rp*Math.sin(k(t))]},
    {l:c, p:t=>[w-o-Rp-t, h-o]},
    {l:q, p:t=>[o+Rp-Rp*Math.sin(k(t)), h-o-Rp+Rp*Math.cos(k(t))]},
    {l:b, p:t=>[o, h-o-Rp-t]},
    {l:q, p:t=>[o+Rp-Rp*Math.cos(k(t)), o+Rp-Rp*Math.sin(k(t))]},
    {l:a, p:t=>[o+Rp+t, o]}
  ];
  const L = segs.reduce((s,g)=>s+g.l, 0);
  let n = Math.round(L/GAP); if (n % 2) n++;
  const pts = [], corner = {};
  for (let i = 0; i < n; i++) {
    let s = i*L/n, j = 0;
    while (s > segs[j].l && j < segs.length-1) { s -= segs[j].l; j++; }
    const p = segs[j].p(Math.min(s, segs[j].l));
    if (j % 2 === 1) (corner[j] = corner[j] || []).push(pts.length);   // holes on a corner curve
    pts.push(p);
  }
  const drop = new Set(Object.values(corner).map(a => a[Math.floor(a.length/2)]));
  return pts.filter((_, i) => !drop.has(i));
}
function stampEdge() {
  if (!STYLES[cur].holes) return;
  const w = card.offsetWidth, h = card.offsetHeight;
  const dots = holes(w, h).map(p => `<circle cx='${p[0].toFixed(2)}' cy='${p[1].toFixed(2)}' r='${HOLE}' fill='black'/>`).join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><mask id='m'><rect width='${w}' height='${h}' fill='white'/>${dots}</mask></defs><rect width='${w}' height='${h}' rx='${R}' fill='black' mask='url(#m)'/></svg>`;
  const m = `url("data:image/svg+xml,${encodeURIComponent(svg)}") center/100% 100% no-repeat`;
  card.querySelectorAll('.side,.slab').forEach(el => { el.style.setProperty('-webkit-mask', m); el.style.setProperty('mask', m); });
}
addEventListener('resize', stampEdge);

/* ---- entrance (pop + one flip) ---- */
const enter = () => { card.className = 'card'; void card.offsetWidth; card.classList.add('show'); $('saveBtn').parentElement.classList.add('show'); };
build();
addEventListener('load', () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(enter, 300)));

/* ---- "I don't like this design": flip out, swap style, flip in ---- */
$('styleBtn').addEventListener('click', e => {
  const btn = e.currentTarget; btn.disabled = true;
  clearTimeout(idle); target = null; vx = vy = 0; rx = ry = 0; apply();
  card.classList.remove('show'); card.classList.add('leave');
  setTimeout(() => { cur = (cur + 1) % STYLES.length; build(); enter(); btn.disabled = false; }, 480);
});

/* ---- drag to rotate, glide, return to front after 2s (shadow follows the angle) ---- */
const spin = $('spin');
let rx = 0, ry = 0, vx = 0, vy = 0, lx = 0, ly = 0, dragging = false, target = null, idle = null;
const flt = document.querySelector('.float');
const apply = () => {
  spin.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const cy = Math.abs(Math.cos(ry * Math.PI / 180)), cx = Math.abs(Math.cos(rx * Math.PI / 180));
  flt.style.setProperty('--sx', Math.max(cy, .06).toFixed(3));   // shadow width
  flt.style.setProperty('--sy', Math.max(cx, .06).toFixed(3));   // shadow height
  flt.style.setProperty('--so', (cy * cx).toFixed(3));           // shadow strength

  /* card reflection follows the tilt */
  const wrap = a => { a = ((a + 180) % 360 + 360) % 360 - 180; return Math.abs(a) > 90 ? a - Math.sign(a) * 180 : a; };
  card.style.setProperty('--gx', (50 + wrap(ry) * 1.1).toFixed(1) + '%');
  card.style.setProperty('--gy', (24 - wrap(rx) * 1.1).toFixed(1) + '%');
  card.style.setProperty('--gi', (cy * cx).toFixed(3));

};
const goFront = () => { vx = vy = 0; target = {x: Math.round(rx/360)*360, y: Math.round(ry/360)*360}; };
spin.addEventListener('pointerdown', e => { clearTimeout(idle); dragging = true; target = null; lx = e.clientX; ly = e.clientY; spin.setPointerCapture(e.pointerId); });
spin.addEventListener('pointermove', e => {
  
  if (!dragging) return;
  vy = (e.clientX - lx)*.5; vx = -(e.clientY - ly)*.5; ry += vy; rx += vx; lx = e.clientX; ly = e.clientY; apply();
});
['pointerup','pointercancel'].forEach(t => spin.addEventListener(t, () => { dragging = false; clearTimeout(idle); idle = setTimeout(goFront, 2000); }));
spin.addEventListener('dblclick', goFront);
(function tick() {
  if (!dragging) {
    if (target) {
      rx += (target.x-rx)*.12; ry += (target.y-ry)*.12;
      if (Math.abs(target.x-rx) < .1 && Math.abs(target.y-ry) < .1) { rx = target.x; ry = target.y; target = null; }
      apply();
    } else if (Math.abs(vx) > .05 || Math.abs(vy) > .05) { rx += vx; ry += vy; vx *= .95; vy *= .95; apply(); }
  }
  requestAnimationFrame(tick);
})();

/* ---- save card as PNG (site QR added only on the saved card) ---- */
const W = 275, H = 435, S = 4;
$('saveBtn').addEventListener('click', () => {
  const box = $('qrTemp'); box.innerHTML = ''; box.hidden = false; box.style.cssText = 'position:fixed;left:-9999px';
  new QRCode(box, {text: CONFIG.siteUrl, width: 300, height: 300, correctLevel: QRCode.CorrectLevel.H});
  setTimeout(() => {
    const out = STYLES[cur].save(box.querySelector('canvas'));
    const a = document.createElement('a');
    a.download = (CONFIG.first + '-' + CONFIG.last).toLowerCase() + '-' + STYLES[cur].id + '-card.png';
    a.href = out.toDataURL('image/png'); a.click(); box.innerHTML = '';
  }, 150);
});
const mk = () => { const c = document.createElement('canvas'); c.width = W*S; c.height = H*S; const x = c.getContext('2d'); x.scale(S,S); return [c,x]; };
 
       /* all png's pics that saves with save button starts from here */

function drawStamp(qr) {
  const [out, o] = mk(), [red, y] = mk(), rr = (x,X,Y,w,h,r) => { x.beginPath(); x.roundRect(X,Y,w,h,r); };
  const CR = '#f4efe8', CU = '#e2a981', ini = CONFIG.first.charAt(0).toUpperCase();
  rr(y,0,0,W,H,R); y.clip();
  let g = y.createLinearGradient(0,0,0,H); g.addColorStop(0,'#921e1e'); g.addColorStop(1,'#6a1010'); y.fillStyle = g; y.fillRect(0,0,W,H);
  g = y.createLinearGradient(0,150,0,H); g.addColorStop(0,'#434d53'); g.addColorStop(1,'#262d31'); y.fillStyle = g; y.fill(new Path2D(CURVE + 'L275 435L0 435Z'));
  g = y.createLinearGradient(0,0,W,0); g.addColorStop(0,'#b6764f'); g.addColorStop(.5,'#eab18a'); g.addColorStop(1,'#b26e48');
  y.lineCap = 'round'; y.strokeStyle = g; y.lineWidth = 13; y.stroke(new Path2D(CURVE));
  y.save(); y.translate(0,-3.6); y.strokeStyle = 'rgba(255,235,215,.45)'; y.lineWidth = 2; y.stroke(new Path2D(CURVE)); y.restore();
  y.strokeStyle = 'rgba(226,169,129,.5)'; y.lineWidth = .8; y.stroke(new Path2D('M170 0V310M0 78H275M0 310H275'));
  y.font = '34px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; y.textAlign = 'left'; y.fillText('🎨', W-72, 216);
  y.save(); y.translate(215,64); y.rotate(-14*Math.PI/180); y.scale(.84,.84);
  y.strokeStyle = y.fillStyle = CU; y.lineWidth = 1.5;
  y.beginPath(); y.arc(0,0,46,0,7); y.stroke(); y.beginPath(); y.arc(0,0,25,0,7); y.stroke();
  g = y.createRadialGradient(-6,-8,0,0,0,22); g.addColorStop(0,'#f6c7a0'); g.addColorStop(.7,'#c0764a'); g.addColorStop(1,'#8d4d2d');
  y.fillStyle = g; y.beginPath(); y.arc(0,0,22,0,7); y.fill();
  y.fillStyle = CU; y.beginPath(); y.arc(0,-46,3.4,0,7); y.fill();

  const t = (CONFIG.title + ' • ' + CONFIG.brand + ' • ').toUpperCase(); y.font = '600 8.5px Poppins'; y.textAlign = 'center';
  [...t].forEach((ch,i) => { y.save(); y.rotate(i/t.length*Math.PI*2); y.fillText(ch,0,-36); y.restore(); });
  y.fillStyle = '#6e1414'; y.font = '700 25px "Cormorant Garamond"'; y.fillText(ini,0,9); y.restore();
  const emb = (s, X, Y, c, hi, lo) => { y.fillStyle = lo; y.fillText(s, X+.8, Y+1.4); y.fillStyle = hi; y.fillText(s, X-.6, Y-.9); y.fillStyle = c; y.fillText(s, X, Y); };
  const RHI = 'rgba(255,215,205,.45)', RLO = 'rgba(40,0,0,.65)', SHI = 'rgba(255,255,255,.4)', SLO = 'rgba(0,0,0,.75)';
  y.textAlign = 'left';
  y.font = '600 25px Poppins'; emb(CONFIG.brand, 26, 56, '#cf5a52', RHI, RLO);
  y.font = '300 12.5px Poppins'; emb(CONFIG.sub, 26, 74, '#cf5a52', RHI, RLO);
  y.font = '400 24px Poppins'; emb(CONFIG.first + ' ' + CONFIG.last, 26, H-137, '#a9b3ba', SHI, SLO);
  y.font = '600 15.2px Poppins'; emb(CONFIG.title, 26, H-104, '#a9b3ba', SHI, SLO);
  y.font = '400 13.4px Poppins'; emb(CONFIG.phone, 26, H-73, '#a9b3ba', SHI, SLO);
  y.fillStyle = 'rgba(226,169,129,.4)'; y.fillRect(26, H-58, 140, 1); emb(CONFIG.email, 26, H-35, '#a9b3ba', SHI, SLO);

  const qs = 66, qx = W-26-qs, qy = H-30-qs;                              // QR on the saved card only
  y.fillStyle = CR; rr(y,qx-6,qy-6,qs+12,qs+12,8); y.fill(); y.drawImage(qr, qx, qy, qs, qs);
  y.font = '600 8px Poppins'; y.textAlign = 'center'; y.letterSpacing = '.6px';
  emb('SCAN TO VISIT', qx + qs/2, qy - 12, CU, SHI, SLO);
  y.letterSpacing = '0px'; y.textAlign = 'left';
  y.globalCompositeOperation = 'destination-out';
  holes(W,H).forEach(p => { y.beginPath(); y.arc(p[0],p[1],HOLE,0,7); y.fill(); });
   o.drawImage(red, 0, 0, W, H);
  return out;
}

function drawDoodle(qr) {
  const INK = '#2a3cc7', RED = '#d3202f', [c, x] = mk();
  x.beginPath(); x.roundRect(1.5, 1.5, W-3, H-3, [16,10,18,9]); x.save(); x.clip();
  x.fillStyle = '#f2eddc'; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(60,80,200,.22)'; for (let y = 23; y < H; y += 24) x.fillRect(0, y, W, 1);
  x.fillStyle = 'rgba(211,32,47,.4)'; x.fillRect(40, 0, 1.5, H);
  x.restore(); x.lineWidth = 3; x.strokeStyle = INK; x.stroke();
  x.save(); x.translate(54, 30); x.scale(.58, .58); x.lineWidth = 4; x.lineCap = x.lineJoin = 'round';
  x.stroke(new Path2D('M18 66C30 24 62 14 84 30C70 32 56 42 50 62C44 80 28 88 18 66Z'));
  x.stroke(new Path2D('M30 56L44 42M38 64L56 46'));
  x.fillStyle = RED; x.beginPath(); x.arc(76, 72, 7, 0, 7); x.fill(); x.restore();
  x.fillStyle = INK; x.font = '40px "Gochi Hand"'; x.fillText(CONFIG.first, 54, 148); x.fillText(CONFIG.last, 54, 190);
  x.save(); x.translate(54, 213); x.scale(1.3, 1.3); x.strokeStyle = RED; x.lineWidth = 2; x.lineCap = 'round';
  x.stroke(new Path2D('M2 6Q10 0 18 6T34 6T50 6T66 6T82 6T98 6')); x.restore();
  x.fillStyle = RED; x.font = '22px "Patrick Hand"'; x.fillText(CONFIG.title, 54, 252);
  x.fillStyle = INK; x.font = '16px "Patrick Hand"'; x.fillText(CONFIG.phone, 54, H-66); x.fillText(CONFIG.email, 54, H-42);
  const qs = 54, qx = W-24-qs, qy = H-30-qs;
  x.fillStyle = '#fff'; x.fillRect(qx-4, qy-4, qs+8, qs+8); x.lineWidth = 1.5; x.strokeRect(qx-4, qy-4, qs+8, qs+8);
  x.drawImage(qr, qx, qy, qs, qs);
  return c;
}

function drawKraft(qr) {
  const CU = '#c9a468', [c, x] = mk();
  x.beginPath(); x.roundRect(0, 0, W, H, 6); x.clip();
  x.fillStyle = '#38383a'; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 5000; i++) { x.fillStyle = `rgba(255,255,255,${Math.random()*.07})`; x.fillRect(Math.random()*W, Math.random()*H, .8, .8); }
  x.strokeStyle = 'rgba(201,164,104,.4)'; x.lineWidth = .6;
  for (let d = 0; d < 110; d += 4) { x.beginPath(); x.moveTo(d, 0); x.lineTo(0, d); x.stroke(); }
  const blocks = (X, Y, s) => { x.fillStyle = '#c9a468'; x.fillRect(X, Y, s/2, s/2); x.fillStyle = '#a87a45'; x.fillRect(X+s/2, Y, s/2, s/2); x.fillStyle = '#b58a63'; x.fillRect(X, Y+s/2, s/2, s/2); };
  blocks(W-120, H-120, 120);
  x.strokeStyle = CU; x.lineWidth = 1.8; x.beginPath(); x.arc(W-46, 48, 19, 0, 7); x.stroke();
  x.fillStyle = CU; x.textAlign = 'center'; x.font = '700 19px "Chakra Petch"'; x.fillText(CONFIG.first.charAt(0).toUpperCase(), W-46, 55); x.textAlign = 'left';
  x.fillStyle = '#fff'; x.font = '700 21px "Chakra Petch"'; x.letterSpacing = '1.7px';
  x.fillText(CONFIG.first.toUpperCase(), 24, 170); x.fillText(CONFIG.last.toUpperCase(), 24, 197); x.letterSpacing = '0px';
  x.fillStyle = CU; x.font = '13px "Chakra Petch"'; x.fillText(CONFIG.title, 24, 223); x.fillText(CONFIG.phone, 24, 267); x.fillText(CONFIG.email, 24, 289);
  const qs = 62, qy = 318;
  x.fillStyle = '#fff'; x.fillRect(24, qy, qs, qs); x.drawImage(qr, 27, qy+3, qs-6, qs-6);
  x.fillStyle = '#fff'; x.font = '12px "Chakra Petch"'; x.fillText(CONFIG.siteUrl.replace(/^https?:\/\//, ''), 24, H-28);
  return c;
}

function drawGallery(qr) {
  const [c, x] = mk(), [wc, w] = mk();
  x.fillStyle = '#faf7f2'; x.fillRect(0, 0, W, H);
  [[35,165,100,'86,92,170,.6'],[150,135,115,'70,150,160,.75'],[190,40,105,'232,186,92,.8'],[70,58,120,'214,110,78,.85']].forEach(([cx,cy,r,col]) => {
    const g = w.createRadialGradient(cx,cy,0,cx,cy,r); g.addColorStop(0,`rgba(${col})`); g.addColorStop(1,`rgba(${col.replace(/[\d.]+$/,'0')})`);
    w.fillStyle = g; w.fillRect(0, 0, W, 205);
  });
  const m = w.createLinearGradient(0,0,0,205); m.addColorStop(.6,'#000'); m.addColorStop(1,'rgba(0,0,0,0)');
  w.globalCompositeOperation = 'destination-in'; w.fillStyle = m; w.fillRect(0, 0, W, 205);
  x.drawImage(wc, 0, 0, W, H);
  x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.beginPath(); x.arc(43, 43, 19, 0, 7); x.stroke();
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = 'italic 500 22px "Cormorant Garamond"'; x.fillText(CONFIG.first.charAt(0).toUpperCase(), 43, 51); x.textAlign = 'left';
  x.fillStyle = '#2b2b2b'; x.font = '600 38px "Cormorant Garamond"'; x.fillText(CONFIG.first, 24, 240);
  x.font = 'italic 500 38px "Cormorant Garamond"'; x.fillText(CONFIG.last, 24, 280);
  x.fillStyle = '#6b5f55'; x.font = '10.5px Jost'; x.letterSpacing = '2.5px'; x.fillText(CONFIG.title.toUpperCase(), 24, 305); x.letterSpacing = '0px';
  x.fillStyle = '#2b2b2b'; x.fillRect(24, 322, 44, 1);
  x.font = '12.5px Jost'; x.fillText(CONFIG.phone, 24, 348); x.fillText(CONFIG.email, 24, 369);
  ['#d66e4e','#e8ba5c','#4696a0','#565caa','#2b2b2b'].forEach((col, i) => { x.fillStyle = col; x.beginPath(); x.arc(31 + i*21, H-31, 7, 0, 7); x.fill(); });
  const qs = 56, qx = W-24-qs, qy = H-28-qs;
  x.fillStyle = '#fff'; x.fillRect(qx-4, qy-4, qs+8, qs+8); x.drawImage(qr, qx, qy, qs, qs);
  return c;
}
          /* --- png's end here ----*/

/* ---- keep card + buttons together and fit the screen (also when zoomed) ---- */
const stage = document.querySelector('.stage');
function fit() {
  stage.style.transform = 'none';
  const k = Math.min(1, (innerHeight - 40) / (stage.offsetHeight + 8), (innerWidth - 24) / stage.offsetWidth);
  stage.style.transform = `scale(${k})`;
}
addEventListener('resize', fit);
addEventListener('load', fit);
fit();
card.addEventListener('animationend', e => {
  if (e.animationName === 'pop') flt.classList.add('on');
});


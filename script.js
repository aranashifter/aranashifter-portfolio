const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- video link → embed ---- */
function parse(url){
  if(!url) return null;
  let m;
  if(m=url.match(/youtube\.com\/shorts\/([\w-]{11})/)) return {embed:`https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`,thumb:`https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,v:true};
  if(m=url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)) return {embed:`https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`,thumb:`https://img.youtube.com/vi/${m[1]}/sddefault.jpg`};
  if(m=url.match(/vimeo\.com\/(?:video\/)?(\d+)/)) return {embed:`https://player.vimeo.com/video/${m[1]}?autoplay=1`};
  if(m=url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)) return {embed:`https://drive.google.com/file/d/${m[1]}/preview`};
  if(/\.(mp4|webm)(\?|$)/i.test(url)) return {file:url};
  return {embed:url};
}

/* ---- project grid ---- */
const cats=['All',...new Set(PROJECTS.map(p=>p.category))];
$('#filters').innerHTML=cats.map((c,i)=>`<button class="${i?'':'on'}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
const PER=(typeof PER_PAGE!=='undefined'&&PER_PAGE>0)?PER_PAGE:6;
let curCat='All',shown=PER;
const list=()=>PROJECTS.map((p,i)=>({p,i,v:parse(p.url)})).filter(x=>curCat=='All'||x.p.category==curCat);
const card=({p,i,v},d)=>`
  <button class="card rv" style="transition-delay:${d*90}ms" data-i="${i}" ${v?'':'aria-disabled="true"'}>
    <div class="thumb">${v&&v.thumb?`<img src="${v.thumb}" alt="${esc(p.title)}" loading="lazy" decoding="async" onerror="this.src=this.src.replace('sddefault','hqdefault')">`:`<div class="ph">${v?'Video':'Your video here'}</div>`}
    ${v?'<span class="play">▶</span>':''}</div>
    <h3>${esc(p.title)}</h3><p>${esc(p.note||'')} <small>${esc(p.category)}</small></p></button>`;
function bar(){
  const n=list().length,m=$('#more');
  if(n<=PER){m.innerHTML='';return}
  const all=shown>=n,left=Math.min(PER,n-shown);
  m.innerHTML=`<div class="count"><b>${String(Math.min(shown,n)).padStart(2,'0')}</b> / ${String(n).padStart(2,'0')} videos</div>
  <div class="prog"><i style="width:${Math.min(shown,n)/n*100}%"></i></div>
  <button class="btn ghost" type="button">${all?'Show less':`Show ${left} more`}</button>`;
}
function render(cat='All'){
  curCat=cat;shown=PER;
  $('#grid').innerHTML=list().slice(0,shown).map((x,k)=>card(x,k)).join('');
  bar();reveal();
}
function more(){
  const l=list(),next=l.slice(shown,shown+PER);
  $('#grid').insertAdjacentHTML('beforeend',next.map((x,k)=>card(x,k)).join(''));
  shown+=PER;bar();reveal();
}
$('#more').onclick=e=>{
  if(!e.target.closest('button'))return;
  if(shown>=list().length){render(curCat);$('#work').scrollIntoView({behavior:'smooth'})}else more();
};
$('#filters').onclick=e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('on',x==b));render(b.dataset.c)};

/* ---- video modal ---- */
const modal=$('#modal'),frame=$('#frame');
$('#grid').onclick=e=>{
  const c=e.target.closest('.card');if(!c)return;
  const v=parse(PROJECTS[c.dataset.i].url);if(!v)return;
  frame.className='frame'+(v.v?' v':'');
  frame.innerHTML=v.file?`<video src="${v.file}" controls autoplay playsinline></video>`:`<iframe src="${v.embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  modal.hidden=false;document.body.style.overflow='hidden';
};
function closeM(){modal.hidden=true;frame.innerHTML='';document.body.style.overflow=''}
modal.onclick=e=>{if(e.target==modal||e.target.closest('.close'))closeM()};
addEventListener('keydown',e=>{if(e.key=='Escape')closeM()});

/* ---- scroll reveal ---- */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
function reveal(){document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el))}
document.querySelectorAll('.sec h2,.sec .cols,.stats,.svc article,form').forEach(el=>el.classList.add('rv'));reveal();

/* ---- timeline playhead (scroll = timecode) ---- */
const ph=document.querySelector('.playhead'),tc=$('#tc');
function tick(){
  const max=document.documentElement.scrollHeight-innerHeight||1,p=scrollY/max;
  ph.style.transform=`translateX(${p*(innerWidth-2)}px)`;
  const f=Math.floor(p*90*25),pad=n=>String(n).padStart(2,'0');
  tc.textContent=`00:${pad(Math.floor(f/1500))}:${pad(Math.floor(f/25)%60)}:${pad(f%25)}`;
}
let tt=0;addEventListener('scroll',()=>{if(!tt){tt=1;requestAnimationFrame(()=>{tick();tt=0})}},{passive:true});addEventListener('resize',tick);tick();

/* ---- menu ---- */
const burger=$('.burger'),menu=$('#menu');
burger.onclick=()=>burger.setAttribute('aria-expanded',menu.classList.toggle('open'));
menu.onclick=e=>{if(e.target.tagName=='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}};

/* ---- contact + social ---- */
const mail=$('#mail');mail.href='mailto:'+SITE.email;mail.textContent=SITE.email;
$('#form').onsubmit=e=>{e.preventDefault();const f=e.target;
  location.href=`mailto:${SITE.email}?subject=${encodeURIComponent('Project inquiry from '+f.n.value)}&body=${encodeURIComponent(f.m.value+'\n\n— '+f.n.value+' ('+f.e.value+')')}`};
$('#social').innerHTML=[['Instagram',SITE.instagram],['YouTube',SITE.youtube],['Facebook',SITE.facebook],['WhatsApp',SITE.whatsapp]].filter(s=>s[1]).map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>`).join('');
$('#year').textContent=new Date().getFullYear();
render();

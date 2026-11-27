/* Animation effects — এই ফাইলে হাত দেওয়ার দরকার নেই */
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const B=document.body,Q=s=>document.querySelector(s);

/* 1. Loader: REC timecode counts up, then curtain lifts and the headline plays */
const L=Q('#loader');
if(L&&!calm){
  const tc=L.querySelector('b'),bar=L.querySelector('i'),t0=performance.now(),pad=n=>String(n).padStart(2,'0');
  (function s(t){
    const p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3),f=Math.floor(e*149);
    tc.textContent=`00:${pad(Math.floor(f/25))}:${pad(f%25)}`;bar.style.transform=`scaleX(${e})`;
    if(p<1)requestAnimationFrame(s);else{L.classList.add('done');B.classList.add('ready');setTimeout(()=>L.remove(),1300)}
  })(t0);
}else{if(L)L.remove();B.classList.add('ready')}

/* 2. Cursor ring: grows into a "Play" bubble over videos */
if(fine&&!calm){
  const c=document.createElement('div');c.className='cur';c.innerHTML='<span></span>';B.append(c);
  document.documentElement.classList.add('fine');
  let x=0,y=0,cx=0,cy=0,run=false,first=true;
  const loop=()=>{cx+=(x-cx)*.4;cy+=(y-cy)*.4;c.style.transform=`translate3d(${cx}px,${cy}px,0)`;
    if(Math.abs(x-cx)>.1||Math.abs(y-cy)>.1)requestAnimationFrame(loop);else run=false};
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(first){cx=x;cy=y;first=false}c.style.opacity=1;if(!run){run=true;requestAnimationFrame(loop)}},{passive:true});
  document.addEventListener('mouseleave',()=>c.style.opacity=0);
  document.addEventListener('mouseover',e=>{
    const card=e.target.closest('.card[data-i]'),ok=card&&!card.hasAttribute('aria-disabled');
    c.classList.toggle('play',!!ok);
    c.classList.toggle('link',!ok&&!!e.target.closest('a,button,input,textarea'));
  });
}

/* 3. Magnetic buttons */
if(fine&&!calm)document.querySelectorAll('.btn,.pill').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.4}px)`});
  b.addEventListener('mouseleave',()=>b.style.transform='');
});

/* 4. Logo tilts in 3D toward the mouse */
const hero=Q('.hero'),hl=Q('.hero-logo');
if(fine&&!calm&&hero&&hl){
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;hl.style.transform=`perspective(900px) rotateY(${px*22}deg) rotateX(${-py*22}deg)`});
  hero.addEventListener('mouseleave',()=>hl.style.transform='');
}

/* 5. About text lights up word by word as you scroll */
const big=Q('.about .big');
if(big&&!calm){
  big.innerHTML=big.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
  const ws=big.querySelectorAll('.w'),f=()=>{
    const r=big.getBoundingClientRect(),p=Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.3),0),1),k=p*ws.length;
    ws.forEach((s,i)=>s.style.opacity=i<k?1:.18);
  };
  let tk=0;addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(()=>{f();tk=0})}},{passive:true});f();
}

/* 6. Pause hero animations when off-screen (keeps scrolling smooth) */
if(hero)new IntersectionObserver(([e])=>B.classList.toggle('off',!e.isIntersecting)).observe(hero);

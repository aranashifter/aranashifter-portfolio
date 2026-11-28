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

/* 2. Viewfinder cursor: dot + camera brackets that lock onto videos and buttons */
if(fine&&!calm){
  const mk=(cl,h='')=>{const d=document.createElement('div');d.className=cl;d.innerHTML=h;B.append(d);return d};
  const dot=mk('cdot'),vf=mk('cvf','<div class="vfi"><i></i><i></i><i></i><i></i><span class="scrub"></span></div>'),
        lab=mk('clab','<em></em>Play <b>00:00:00:00</b>'),tcL=lab.querySelector('b'),scr=vf.querySelector('.scrub');
  const pad=n=>String(n).padStart(2,'0'),r={x:0,y:0,w:40,h:40};
  let mx=0,my=0,tgt=null,mode='free',run=false,seen=false,lastTc='';
  const frame=()=>{
    if(tgt&&!tgt.isConnected){tgt=null;mode='free';setMode()}
    let T;
    if(mode=='free')T={x:mx-20,y:my-20,w:40,h:40};
    else{const b=tgt.getBoundingClientRect(),p=mode=='lock'?10:6;T={x:b.left-p,y:b.top-p,w:b.width+p*2,h:b.height+p*2}}
    let d=0;for(const q in T){r[q]+=(T[q]-r[q])*.32;d+=Math.abs(T[q]-r[q])}
    vf.style.width=r.w+'px';vf.style.height=r.h+'px';vf.style.transform=`translate3d(${r.x}px,${r.y}px,0)`;
    if(mode=='lock'){
      scr.style.transform=`translateX(${Math.min(Math.max(mx-r.x,0),r.w)}px)`;
      const b=tgt.getBoundingClientRect(),s=Math.min(Math.max((mx-b.left)/b.width,0),1)*59,
            t=`00:${pad(Math.floor(s))}:${pad(Math.floor((s%1)*25))}`;
      if(t!==lastTc){lastTc=t;tcL.textContent=t}
    }
    if(d>.3||mode!='free')requestAnimationFrame(frame);else run=false;
  };
  const kick=()=>{if(!run){run=true;requestAnimationFrame(frame)}};
  const setMode=()=>{
    vf.classList.toggle('lock',mode=='lock');vf.classList.toggle('link',mode=='link');
    lab.classList.toggle('show',mode=='lock');dot.classList.toggle('red',mode=='link');dot.classList.toggle('hide',mode=='lock');
  };
  addEventListener('pointermove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate3d(${mx}px,${my}px,0)`;
    lab.style.transform=`translate3d(${mx>innerWidth-200?mx-170:mx+20}px,${my+22}px,0)`;
    if(!seen){seen=true;r.x=mx-20;r.y=my-20}
    B.classList.add('cur-on');kick();
  },{passive:true});
  addEventListener('scroll',kick,{passive:true});
  document.documentElement.addEventListener('mouseleave',()=>B.classList.remove('cur-on'));
  document.addEventListener('mouseover',e=>{
    const t=e.target,card=t.closest('.card[data-i]:not([aria-disabled])'),lk=t.closest('a,button,.tile,.clip');
    B.classList.toggle('cur-txt',!!t.closest('input,textarea'));
    if(card){tgt=card.querySelector('.thumb');mode='lock'}
    else if(lk&&!lk.closest('.card')){tgt=lk;mode='link'}
    else{tgt=null;mode='free'}
    setMode();kick();
  });
  document.addEventListener('pointerdown',()=>vf.classList.add('down'));
  document.addEventListener('pointerup',()=>vf.classList.remove('down'));
  document.addEventListener('click',()=>{vf.classList.add('flash');setTimeout(()=>vf.classList.remove('flash'),180)});
  const md=Q('#modal');if(md)new MutationObserver(()=>B.classList.toggle('mopen',!md.hidden)).observe(md,{attributes:true,attributeFilter:['hidden']});
  document.documentElement.classList.add('fine');
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

/* 7. Scene markers on the playhead + stat count-up */
(()=>{
  const names={home:'Intro',work:'Selected work',about:'About',services:'Services',contact:'Contact'};
  const secs=[...document.querySelectorAll('main section[id]')],head=Q('.playhead'),tag=Q('#scene');
  let cur=null,t,busy=0;
  function scene(){
    const y=scrollY+innerHeight*.4;let s=secs[0];secs.forEach(x=>{if(x.offsetTop<=y)s=x});
    if(s.id===cur)return;const first=cur===null;cur=s.id;if(first||!tag)return;
    tag.textContent='Scene: '+(names[cur]||cur);tag.classList.add('show');head.classList.add('cut');
    clearTimeout(t);t=setTimeout(()=>{tag.classList.remove('show');head.classList.remove('cut')},1400);
  }
  addEventListener('scroll',()=>{if(!busy){busy=1;requestAnimationFrame(()=>{scene();busy=0})}},{passive:true});scene();
  document.querySelectorAll('.stats b').forEach(b=>{
    const m=b.textContent.match(/(\d+)(.*)/);if(!m||calm)return;
    const n=+m[1],suf=m[2];b.textContent='0'+suf;
    new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();
      (function k(t){const p=Math.min((t-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(k)})(t0)}).observe(b);
  });
})();

/* 8. Heading wipe trigger: watch the heading's PARENT (a fully clipped element is never "visible" to the browser) */
(()=>{
  const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target._h.classList.add('in');io2.unobserve(e.target)}}),{threshold:.1});
  document.querySelectorAll('.sec h2').forEach(h=>{const p=h.parentElement;p._h=h;io2.observe(p)});
})();

/* 9. Toolkit tiles: spotlight + 3D tilt */
(()=>{
  if(!fine||calm)return;
  document.querySelectorAll('.tool').forEach(t=>{
    const tile=t.querySelector('.tile'),set=(k,v)=>tile.style.setProperty(k,v);
    t.addEventListener('pointermove',e=>{const r=tile.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      set('--mx',x*100+'%');set('--my',y*100+'%');set('--rx',(.5-y)*10+'deg');set('--ry',(x-.5)*12+'deg')});
    t.addEventListener('pointerleave',()=>{set('--rx','0deg');set('--ry','0deg')});
  });
})();

/* 10. Hero skills timeline: 3 tracks of clips. Scroll = faster, hover = smooth stop */
(()=>{
  const host=Q('#reel');if(!host)return;
  const T=[
   {lbl:'V1',color:'#8f8cff',v:40,dir:'normal',c:[['Video editing',250],['Storytelling',230],['Aranashifter',250],['Short-form',220],['Cinematic cuts',270],['Jump cuts',200]]},
   {lbl:'V2',color:'#d28bff',v:52,dir:'reverse',c:[['Motion graphics',270],['Color grading',240],['Titles & type',240],['Transitions',220],['Visual effects',250]]},
   {lbl:'A1',color:'#19e3b5',v:46,dir:'normal',a:1,c:[['Sound design',230],['Music sync',210],['Voice & mix',220],['Beat cuts',190]]}
  ];
  const hs=n=>{const s=Math.sin(n*91.7)*43758.5;return s-Math.floor(s)};
  const wf=(w,k)=>{let d='';for(let i=0;i<w/5;i++){const h=3+hs(i+k)*14;d+=`M${i*5+2} ${10-h/2}v${h}`}return `<svg viewBox="0 0 ${w} 20" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`};
  const anims=[];
  T.forEach((t,i)=>{
    const sum=t.c.reduce((s,x)=>s+x[1]+8,0),reps=Math.ceil(4200/sum),half=sum*reps;
    const seq=Array(reps).fill(t.c.map(([n,w],k)=>`<div class="clip" style="width:${w}px"><i></i>${t.a?wf(w-24,k*7+i):''}<span>${n}</span></div>`).join('')).join('');
    const trk=document.createElement('div');trk.className='trk'+(t.a?' a':'');trk.style.setProperty('--c',t.color);
    trk.innerHTML=`<span class="lbl">${t.lbl}</span><div class="lane"><div class="run">${seq}${seq}</div></div>`;host.append(trk);
    if(!calm&&trk.firstChild){
      const a=trk.querySelector('.run').animate([{transform:'translateX(0)'},{transform:`translateX(-${half}px)`}],{duration:half/t.v*1000,iterations:Infinity,direction:t.dir});
      a.currentTime=half/t.v*1000*(.2+i*.31);anims.push(a);
    }
  });
  if(calm)return;
  let rate=1,last=scrollY,hover=false,vis=true,raf=0;
  const tick=()=>{
    const dy=Math.abs(scrollY-last);last=scrollY;
    const target=hover?0:1+Math.min(dy/6,7);rate+=(target-rate)*.12;
    const done=Math.abs(target-rate)<.02&&!dy;if(done)rate=target;
    anims.forEach(a=>a.updatePlaybackRate(rate));
    raf=done?0:requestAnimationFrame(tick);
  };
  const kick=()=>{if(vis&&!raf)raf=requestAnimationFrame(tick)};
  addEventListener('scroll',kick,{passive:true});
  host.addEventListener('pointerenter',()=>{hover=true;kick()});
  host.addEventListener('pointerleave',()=>{hover=false;kick()});
  new IntersectionObserver(([e])=>{vis=e.isIntersecting;anims.forEach(a=>vis?a.play():a.pause());kick()}).observe(host);
})();

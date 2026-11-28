/* Aranashifter hero: living spider web + spider on a thread + glitch "shift" */
(()=>{
const cv=document.getElementById('web'),box=document.querySelector('.hero-logo'),fx=document.querySelector('.logo-fx'),hero=document.querySelector('.hero');
if(!cv||!box||!fx||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const g=cv.getContext('2d'),R_=7,S_=12,TAU=Math.PI*2,rnd=(a,b)=>a+Math.random()*(b-a);
let W=0,H=0,cx=0,cy=0,R=0,N=[],vis=true,raf=0,next=rnd(3500,6000),word='ARANA',scr=-1e5;
const P={x:0,y:0,in:false},sp={x:0,y:0,vx:0,vy:0};
const hash=n=>{const s=Math.sin(n*127.1)*43758.5453;return s-Math.floor(s)};

function build(){
  const dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;if(!W)return;
  cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);
  cx=W/2;cy=H/2;R=W*.44;N=[];
  for(let k=1;k<=R_;k++){N[k]=[];for(let j=0;j<S_;j++){
    const a=j/S_*TAU+(hash(j*3.1)-.5)*.18,r=R*Math.pow(k/R_,.92)*(1+(hash(k*9+j)-.5)*.06);
    const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;N[k][j]={rx:x,ry:y,x,y,vx:0,vy:0,k,a}}}
  sp.x=cx;sp.y=H*.13;
}
function shock(){for(let k=1;k<=R_;k++)setTimeout(()=>N[k]&&N[k].forEach(n=>{n.vx+=Math.cos(n.a)*9;n.vy+=Math.sin(n.a)*9}),k*55)}
function shift(){
  word=word=='ARANA'?'SHIFTER':'ARANA';scr=performance.now();shock();
  fx.classList.remove('glitch');void fx.offsetWidth;fx.classList.add('glitch');
}
fx.addEventListener('animationend',e=>{if(e.animationName=='shift')fx.classList.remove('glitch')});
box.addEventListener('click',shift);

hero.addEventListener('pointermove',e=>{
  const r=cv.getBoundingClientRect();if(!r.width)return;
  P.x=(e.clientX-r.left)*(W/r.width);P.y=(e.clientY-r.top)*(H/r.height);
  P.in=P.x>-90&&P.x<W+90&&P.y>-90&&P.y<H+90;
},{passive:true});
hero.addEventListener('pointerleave',()=>P.in=false);

function step(t){
  for(let k=1;k<=R_;k++)for(const n of N[k]){
    const ks=k===R_?.14:.055;
    n.vx+=(n.rx-n.x)*ks;n.vy+=(n.ry-n.y)*ks;
    if(P.in){const dx=P.x-n.x,dy=P.y-n.y,d=Math.hypot(dx,dy);
      if(d<150&&d>1){const f=(1-d/150)*1.5;n.vx+=dx/d*f;n.vy+=dy/d*f}}
    n.vx*=.86;n.vy*=.86;n.x+=n.vx;n.y+=n.vy;
  }
  const tx=P.in?P.x:cx+Math.sin(t/1800)*W*.08,ty=P.in?Math.max(50,P.y-36):H*.13+Math.sin(t/1300)*6;
  sp.vx+=(tx-sp.x)*.012;sp.vy+=(ty-sp.y)*.012;sp.vx*=.9;sp.vy*=.9;sp.x+=sp.vx;sp.y+=sp.vy;
}

function draw(t){
  g.clearRect(0,0,W,H);g.lineWidth=1;
  g.strokeStyle='rgba(255,255,255,.17)';g.beginPath();
  for(let j=0;j<S_;j++){g.moveTo(cx,cy);for(let k=1;k<=R_;k++)g.lineTo(N[k][j].x,N[k][j].y)}g.stroke();
  g.strokeStyle='rgba(255,255,255,.12)';g.beginPath();
  const hot=[];
  for(let k=1;k<=R_;k++)for(let j=0;j<S_;j++){
    const a=N[k][j],b=N[k][(j+1)%S_],mx=(a.x+b.x)/2,my=(a.y+b.y)/2,qx=mx+(cx-mx)*.1,qy=my+(cy-my)*.1;
    g.moveTo(a.x,a.y);g.quadraticCurveTo(qx,qy,b.x,b.y);
    const d=(Math.hypot(a.x-a.rx,a.y-a.ry)+Math.hypot(b.x-b.rx,b.y-b.ry))/2;
    if(d>5)hot.push([a,b,qx,qy,d]);
  }
  g.stroke();
  g.lineWidth=1.4;
  for(const [a,b,qx,qy,d] of hot){g.strokeStyle=`rgba(255,59,48,${Math.min(.9,d/34)})`;g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(qx,qy,b.x,b.y);g.stroke()}
  for(let k=1;k<=R_;k++)for(const n of N[k]){
    const d=Math.hypot(n.x-n.rx,n.y-n.ry);
    g.fillStyle=d>6?'rgba(255,59,48,.9)':`rgba(255,255,255,${.22+.2*Math.sin(t/700+n.a*5+k)})`;
    g.beginPath();g.arc(n.x,n.y,d>6?2:1.2,0,TAU);g.fill();
  }
  // spider on a thread
  const sx=sp.x,sy=sp.y,spd=Math.hypot(sp.vx,sp.vy);
  g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=1;g.beginPath();g.moveTo(cx,0);
  g.quadraticCurveTo(cx+(sx-cx)*.1+sp.vx*7,sy*.55,sx,sy-3);g.stroke();
  g.strokeStyle='rgba(255,255,255,.9)';
  for(const s of[-1,1])for(let i=0;i<4;i++){
    const yo=(i-1.5)*3.2,w=Math.sin(t/70+i*1.7+(s>0?1.1:0))*(1.2+spd*1.6);
    g.beginPath();g.moveTo(sx+s*2,sy+yo*.4);g.lineTo(sx+s*9,sy+yo-5+w);g.lineTo(sx+s*15,sy+yo+6+w*.6);g.stroke();
  }
  g.fillStyle='#fff';g.beginPath();g.ellipse(sx,sy,3.4,4.4,0,0,TAU);g.fill();
  g.beginPath();g.arc(sx,sy+5.2,2.1,0,TAU);g.fill();
  // editor HUD
  g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=1.5;const m=12,L=22;
  for(const[ax,ay,dx,dy]of[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]]){g.beginPath();g.moveTo(ax+dx*L,ay);g.lineTo(ax,ay);g.lineTo(ax,ay+dy*L);g.stroke()}
  g.font='500 11px Inter,sans-serif';g.textBaseline='middle';
  if(Math.floor(t/500)%2===0){g.fillStyle='#ff3b30';g.beginPath();g.arc(m+14,m+16,3.5,0,TAU);g.fill()}
  g.fillStyle='rgba(255,255,255,.6)';g.textAlign='left';g.fillText('REC',m+24,m+16);
  const f=Math.floor(t/40),pad=n=>String(n).padStart(2,'0');
  g.textAlign='right';g.fillText(`00:${pad(Math.floor(f/25)%60)}:${pad(f%25)}`,W-m-10,m+16);
  g.textAlign='left';g.fillStyle='rgba(255,255,255,.35)';g.fillText('25 FPS · A/S',m+10,H-m-14);
  g.textAlign='right';g.fillText('CLICK TO SHIFT',W-m-10,H-m-14);
  const e=t-scr,chars='!<>-_/[]{}=+*^?#';let label=word;
  if(e<800)label=[...word].map((c,i)=>e>i*90+150?c:chars[Math.floor(Math.random()*chars.length)]).join('');
  g.textAlign='center';g.font='700 13px Syne,sans-serif';g.fillStyle='rgba(255,255,255,.85)';g.fillText(label.split('').join(' '),cx,H-m-14);
}

function loop(t){
  if(!vis||document.hidden){raf=0;return}
  if(t>next){shift();next=t+rnd(4500,8000)}
  step(t);draw(t);raf=requestAnimationFrame(loop);
}
const start=()=>{if(!raf&&vis&&!document.hidden)raf=requestAnimationFrame(loop)};
new IntersectionObserver(([e])=>{vis=e.isIntersecting;start()}).observe(box);
document.addEventListener('visibilitychange',start);
new ResizeObserver(build).observe(cv);
build();start();
})();

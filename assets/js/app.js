const menuBtn=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    if(e.target.dataset.countup && !e.target.dataset.played){
      countValue(e.target);
      e.target.dataset.played='1';
    }
  }
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('[data-count]').forEach(el=>{
  el.dataset.countup='1';
  io.observe(el);
});

function countValue(el){
  const raw = parseFloat(el.dataset.count || '0');
  const hasNaira = el.textContent.includes('₦');
  const hasPercent = el.textContent.includes('%') || (!hasNaira && raw <= 100 && String(raw).includes('.')); 
  const isMoneyM = hasNaira;
  const duration = 1500;
  const start = performance.now();
  function frame(now){
    const progress = Math.min((now-start)/duration,1);
    const eased = 1 - Math.pow(1-progress,3);
    const value = raw * eased;
    if(isMoneyM){
      el.textContent = `₦${value.toFixed(1)}M`;
    }else if(el.dataset.count === '32'){
      el.textContent = `${Math.round(value)}%`;
    }else{
      el.textContent = `${Math.round(value)}`;
    }
    if(progress<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const missionBtn=document.querySelector('#missionBtn');
missionBtn?.addEventListener('click',()=>{
  const input=document.querySelector('#missionInput');
  const status=document.querySelector('#missionStatus');
  if(!input.value.trim()) return;
  status.textContent='Mission prepared · ICP → discovery → enrichment → research → outreach-ready';
  status.style.color='#12D6B2';
});

const tiltTargets=document.querySelectorAll('.tilt-card');
tiltTargets.forEach(card=>{
  card.addEventListener('mousemove',e=>{
    if(window.innerWidth < 900) return;
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width;
    const y=(e.clientY-rect.top)/rect.height;
    const rx=(.5-y)*8;
    const ry=(x-.5)*10;
    card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

window.addEventListener('scroll',()=>{
  const sc=window.scrollY;
  document.querySelectorAll('.orb').forEach((orb,i)=>{
    const speed=(i+1)*0.08;
    orb.style.transform=`translateY(${sc*speed}px)`;
  });
});

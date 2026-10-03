/* =====================================================================
   CONFIG — edit these 5 lines and the page is live.
   Get form IDs at https://formspree.io  (New Form -> copy the endpoint id)
   ===================================================================== */
const CONFIG = {
  WHATSAPP_GROUP_LINK : "https://chat.whatsapp.com/REPLACE_WITH_YOUR_GROUP_INVITE_CODE",
  FORM_CONTACT : "https://formspree.io/f/REPLACE_CONTACT_FORM_ID", // name + email + whatsapp
  FORM_POST    : "https://formspree.io/f/REPLACE_POST_FORM_ID",    // "post valuable info"
  FORM_COMMENT : "https://formspree.io/f/REPLACE_COMMENT_FORM_ID", // comments
  FORM_SESSION : "https://formspree.io/f/REPLACE_SESSION_FORM_ID"  // visitor-session tracking
};

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const store = {
  get:(k,d)=>{try{return JSON.parse(localStorage.getItem('mwc_'+k)) ?? d}catch(e){return d}},
  set:(k,v)=>{try{localStorage.setItem('mwc_'+k,JSON.stringify(v))}catch(e){}}
};
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200);}

/* wire endpoints from CONFIG */
$('#contactForm').action = CONFIG.FORM_CONTACT;
$('#postForm').action    = CONFIG.FORM_POST;
$('#commentForm').action = CONFIG.FORM_COMMENT;
$('#waLink').href        = CONFIG.WHATSAPP_GROUP_LINK;

/* ========== 1. HERO COUNTER ========== */
(function(){
  const el=$('#countMen'); let n=0; const target=42, step=target/60;
  const t=setInterval(()=>{n+=step; if(n>=target){n=target;clearInterval(t)}
    el.textContent=Math.round(n);},18);
})();

/* ========== 2. HERO PARTICLE CANVAS ========== */
(function(){
  const c=$('#fx'), x=c.getContext('2d'); let w,h,pts=[];
  function size(){w=c.width=c.offsetWidth*devicePixelRatio;h=c.height=c.offsetHeight*devicePixelRatio;
    const n=Math.min(70,Math.round(w*h/90000)); pts=[...Array(n)].map(()=>({
      x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,
      r:(Math.random()*2+1)*devicePixelRatio, m:Math.random()<.503}));}
  function loop(){x.clearRect(0,0,w,h);
    for(let i=0;i<pts.length;i++){const p=pts[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<120*devicePixelRatio){x.strokeStyle=`rgba(120,150,230,${.13*(1-d/(120*devicePixelRatio))})`;
          x.lineWidth=devicePixelRatio;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();}}
      x.fillStyle=p.m?'rgba(79,140,255,.85)':'rgba(255,111,174,.85)';
      x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();}
    requestAnimationFrame(loop);}
  size();addEventListener('resize',size);loop();
})();

/* ========== 3. 100-PEOPLE DOT GRID ========== */
(function(){
  const box=$('#dots'); let html='';
  for(let i=0;i<100;i++){const m=i<50;
    html+=`<span style="animation-delay:${i*14}ms">${m?'👨':'👩'}</span>`;}
  box.innerHTML=html;
})();

/* ========== 4. SCROLL REVEAL ========== */
(function(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
  $$('.reveal').forEach(e=>io.observe(e));
})();

/* ========== 5. SLIDER ========== */
(function(){
  const track=$('#slideTrack'), slides=$$('.slide'), nav=$('#dotsNav');
  slides.forEach((_,i)=>{const b=document.createElement('button');b.onclick=()=>go(i);nav.appendChild(b)});
  const btns=[...nav.children];
  function go(i){const s=slides[i];track.scrollTo({left:s.offsetLeft-track.offsetLeft-12,behavior:'smooth'})}
  function sync(){const c=track.scrollLeft+track.clientWidth/2;
    let best=0,bd=1e9;slides.forEach((s,i)=>{const d=Math.abs(s.offsetLeft+s.clientWidth/2-track.offsetLeft-c);
      if(d<bd){bd=d;best=i}});btns.forEach((b,i)=>b.classList.toggle('on',i===best));return best;}
  track.addEventListener('scroll',()=>{clearTimeout(track._t);track._t=setTimeout(sync,60)});
  $('#next').onclick=()=>go(Math.min(slides.length-1,sync()+1));
  $('#prev').onclick=()=>go(Math.max(0,sync()-1));
  addEventListener('keydown',e=>{if(e.key==='ArrowRight')$('#next').click();if(e.key==='ArrowLeft')$('#prev').click()});
  sync();
})();

/* ========== 6. "BARE BRANCHES" SIMULATOR ========== */
(function(){
  const c=$('#sim'), x=c.getContext('2d'); let w,h,agents=[];
  const rRatio=$('#rRatio'), rJobs=$('#rJobs');
  function size(){w=c.width=c.offsetWidth*devicePixelRatio;h=c.height=c.offsetHeight*devicePixelRatio;}
  function build(){
    const ratio=+rRatio.value, jobs=+rJobs.value, N=220;
    const males=Math.round(N*ratio/(ratio+100));
    agents=[...Array(N)].map((_,i)=>{
      const male=i<males;
      const bare=male && Math.random()*100 > jobs;
      return {x:Math.random()*w,y:Math.random()*h,
        vx:(Math.random()-.5)*(bare?1.8:.6)*devicePixelRatio,
        vy:(Math.random()-.5)*(bare?1.8:.6)*devicePixelRatio,
        r:(bare?3.2:2.4)*devicePixelRatio, male, bare};
    });
    const surplus=males-(N-males), bare=agents.filter(a=>a.bare).length;
    $('#oRatio').textContent=ratio; $('#oJobs').textContent=jobs;
    $('#mSurplus').textContent=Math.max(0,surplus);
    $('#mBare').textContent=bare;
    const score=bare/N*100 + Math.max(0,surplus)/N*60;
    const lab = score>42?'Severe':score>30?'High':score>18?'Elevated':'Low';
    const el=$('#mRisk'); el.textContent=lab;
    el.style.color = score>42?'#ff5d5d':score>30?'#ffa23d':score>18?'#ffc247':'#5be5a3';
  }
  function loop(){
    x.clearRect(0,0,w,h);
    agents.forEach(a=>{
      a.x+=a.vx;a.y+=a.vy;
      if(a.x<a.r||a.x>w-a.r)a.vx*=-1; if(a.y<a.r||a.y>h-a.r)a.vy*=-1;
      if(a.bare){x.shadowBlur=12*devicePixelRatio;x.shadowColor='#ff5d5d';x.fillStyle='#ff5d5d';}
      else {x.shadowBlur=0;x.fillStyle=a.male?'#4f8cff':'#ff6fae';}
      x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill();
    });
    x.shadowBlur=0;
    requestAnimationFrame(loop);
  }
  size();build();loop();
  addEventListener('resize',()=>{size();build()});
  [rRatio,rJobs].forEach(r=>r.addEventListener('input',build));
})();

/* ========== 7. LIKES ========== */
function likeBtn(id,key,countId){
  const b=$(id), cEl=$(countId);
  let n=store.get(key+'_n',Math.floor(Math.random()*40)+12);
  let on=store.get(key+'_on',false);
  const draw=()=>{cEl.textContent=n;b.classList.toggle('on',on)};
  b.onclick=()=>{on=!on;n+=on?1:-1;store.set(key+'_n',n);store.set(key+'_on',on);draw();
    if(on)toast('Thanks for the signal 🙌')};
  draw();
}
likeBtn('#likePage','like','#likeCount');
likeBtn('#heartPage','heart','#heartCount');
$('#sharePage').onclick=()=>{navigator.clipboard?.writeText(location.href);toast('Page link copied 🔗')};

/* ========== 8. CHAR COUNTER ========== */
(function(){
  const ta=$('#postForm textarea'), out=$('#countChars');
  ta.addEventListener('input',()=>out.textContent=`${ta.value.length} / 280`);
})();

/* ========== 9. FORMSPREE SUBMIT HELPER ========== */
async function sendForm(form,statusEl,onOk){
  const data=new FormData(form);
  statusEl.className='status'; statusEl.textContent='Sending… ⏳';
  if(form.action.includes('REPLACE_')){
    statusEl.className='status ok';
    statusEl.textContent='Demo mode: add your Formspree ID in script.js to send for real. ✅';
    onOk&&onOk(data); form.reset(); return;
  }
  try{
    const r=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
    if(r.ok){statusEl.className='status ok';statusEl.textContent='Sent. Thank you! ✅';onOk&&onOk(data);form.reset();}
    else {statusEl.className='status err';statusEl.textContent='Hmm, that did not go through. Try again? ❌';}
  }catch(e){statusEl.className='status err';statusEl.textContent='Network issue — try again. ❌';}
}

/* ========== 10. CONTACT -> INSTANT WHATSAPP LINK ========== */
$('#contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  sendForm(e.target,$('#contactStatus'),()=>{
    $('#waBox').hidden=false;
    $('#waBox').scrollIntoView({behavior:'smooth',block:'center'});
    toast('WhatsApp group link unlocked 💚');
    store.set('joined',true);
  });
});
$('#copyWa').onclick=()=>{navigator.clipboard?.writeText(CONFIG.WHATSAPP_GROUP_LINK);toast('Group link copied 📋')};
if(store.get('joined',false)) $('#waBox').hidden=false;

/* ========== 11. POST VALUABLE INFO ========== */
$('#postForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=e.target.name.value, info=e.target.info.value, link=e.target.link.value;
  sendForm(e.target,$('#postStatus'),()=>{
    addComment({name,text:info+(link?`\n🔗 ${link}`:''),mood:'📌 Posted info',t:Date.now(),likes:0},true);
    $('#countChars').textContent='0 / 280';
    toast('Posted to the community wall 📌');
  });
});

/* ========== 12. COMMENTS ========== */
const SEED=[
  {name:'Amara',mood:'📚 Source',text:'The Hudson & den Boer "bare branches" book is worth reading in full — it predicted a lot of this in 2004.',t:Date.now()-864e5*3,likes:14},
  {name:'Dmitri',mood:'🔥 Disagree',text:'Careful. Correlation is not biology. Plenty of societies with surplus men stayed peaceful because institutions held.',t:Date.now()-864e5*2,likes:21},
  {name:'Joy',mood:'💭 Thought',text:'The part that stays with me: the fix is boring. Jobs, housing, education. Not magic. 😔',t:Date.now()-864e5,likes:9}
];
function fmt(t){const d=(Date.now()-t)/6e4;
  if(d<1)return'just now';if(d<60)return Math.floor(d)+'m ago';
  if(d<1440)return Math.floor(d/60)+'h ago';return Math.floor(d/1440)+'d ago';}
function render(){
  const list=store.get('comments',SEED), box=$('#commentList');
  if(!list.length){box.innerHTML='<p class="empty">No comments yet — be the first 💬</p>';return}
  box.innerHTML=list.map((c,i)=>`<div class="cmt">
      <div class="top"><span class="who">${esc(c.name)}</span>
        <span class="tag">${esc(c.mood||'💭 Thought')}</span><span>· ${fmt(c.t)}</span></div>
      <p>${esc(c.text)}</p>
      <button class="clike ${c.liked?'on':''}" data-i="${i}">${c.liked?'❤️':'🤍'} ${c.likes||0}</button>
    </div>`).join('');
  $$('.clike').forEach(b=>b.onclick=()=>{
    const l=store.get('comments',SEED); const i=+b.dataset.i;
    l[i].liked=!l[i].liked; l[i].likes=(l[i].likes||0)+(l[i].liked?1:-1);
    store.set('comments',l); render();
  });
}
function esc(s){return String(s).replace(/[<>&]/g,m=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[m]))}
function addComment(c,top){
  const l=store.get('comments',SEED);
  top?l.unshift(c):l.push(c); store.set('comments',l); render();
}
$('#commentForm').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('#cName').value,text=$('#cText').value,mood=$('#cMood').value;
  sendForm(e.target,document.createElement('p'),()=>{});
  addComment({name,text,mood,t:Date.now(),likes:0},true);
  e.target.reset(); toast('Comment posted 💬');
});
render();

/* ========== 13. VISITOR SESSION TRACKING (Formspree, no UTM) ========== */
(function(){
  const id = store.get('sid',null) || (()=>{const v='s_'+Math.random().toString(36).slice(2,10)+Date.now().toString(36);store.set('sid',v);return v})();
  const visits = store.get('visits',0)+1; store.set('visits',visits);
  const start = Date.now();
  let maxScroll = 0;
  addEventListener('scroll',()=>{
    const p=Math.round((scrollY+innerHeight)/document.body.scrollHeight*100);
    if(p>maxScroll)maxScroll=Math.min(100,p);
  },{passive:true});

  function send(){
    if(CONFIG.FORM_SESSION.includes('REPLACE_')) return;           // demo mode: do nothing
    const payload={
      _subject:'Visitor session — The 42 Million Gap',
      session_id:id, visit_number:visits,
      seconds_on_page:Math.round((Date.now()-start)/1000),
      scroll_depth_percent:maxScroll,
      screen:`${innerWidth}x${innerHeight}`,
      device:innerWidth<760?'phone':'laptop/desktop',
      language:navigator.language,
      referrer:document.referrer||'direct',
      joined_whatsapp:!!store.get('joined',false),
      page:location.pathname
    };
    const blob=new Blob([JSON.stringify(payload)],{type:'application/json'});
    (navigator.sendBeacon && navigator.sendBeacon(CONFIG.FORM_SESSION,blob)) ||
      fetch(CONFIG.FORM_SESSION,{method:'POST',body:blob,keepalive:true});
  }
  addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')send()});
  addEventListener('pagehide',send);
})();

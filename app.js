(() => {
  const walk = document.getElementById('walk');
  const video = document.getElementById('walkVideo');
  const copy1 = document.getElementById('copy1');
  const copy2 = document.getElementById('copy2');
  const copy3 = document.getElementById('copy3');
  const hint = document.getElementById('scrollHint');
  const progress = document.getElementById('progress');

  const clamp = (v,a=0,b=1) => Math.min(b,Math.max(a,v));
  const smooth = t => t*t*(3-2*t);
  const range = (p,a,b) => clamp((p-a)/(b-a));

  let duration = 10;
  let targetTime = 0;
  let renderedTime = 0;
  let ready = false;

  video.muted = true;
  video.pause();

  function syncDuration(){
    if (Number.isFinite(video.duration) && video.duration > 0) {
      duration = Math.max(0.1, video.duration - 0.02);
      ready = true;
    }
  }

  video.addEventListener('loadedmetadata', syncDuration);
  video.addEventListener('canplay', syncDuration);

  function setText(p){
    const aOut = 1 - smooth(range(p,.10,.27));
    copy1.style.opacity = aOut;

    const bIn = smooth(range(p,.22,.34));
    const bOut = 1 - smooth(range(p,.47,.60));
    copy2.style.opacity = bIn * bOut;

    const cIn = smooth(range(p,.58,.72));
    copy3.style.opacity = cIn;

    const mobile = innerWidth < 780;
    if (!mobile) {
      copy1.style.transform = `translateY(calc(-50% - ${range(p,.10,.27)*16}px))`;
      copy2.style.transform = `translateY(calc(-50% + ${(1-bIn)*18 - range(p,.47,.60)*14}px))`;
      copy3.style.transform = `translateY(calc(-50% + ${(1-cIn)*20}px))`;
    } else {
      copy1.style.transform = `translateY(${-range(p,.10,.27)*12}px)`;
      copy2.style.transform = `translateY(${(1-bIn)*14 - range(p,.47,.60)*10}px)`;
      copy3.style.transform = `translateY(${(1-cIn)*14}px)`;
    }

    hint.style.opacity = `${1 - smooth(range(p,.03,.14))}`;
  }

  function updateTarget(){
    const y = window.scrollY;
    const docMax = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    progress.style.width = `${(y/docMax)*100}%`;

    const usable = Math.max(1, walk.offsetHeight - innerHeight);
    const p = clamp((y - walk.offsetTop) / usable);

    const videoProgress = smooth(clamp(p / .89));
    targetTime = videoProgress * duration;
    setText(p);
  }

  function render(){
    // Smooth enough to avoid jitter, responsive enough to feel attached to the finger.
    renderedTime += (targetTime - renderedTime) * 0.28;

    if (ready && video.readyState >= 2) {
      const t = clamp(renderedTime, 0, duration);
      if (Math.abs(video.currentTime - t) > 0.0035) {
        try { video.currentTime = t; } catch (_) {}
      }
    }
    requestAnimationFrame(render);
  }

  function prime(){
    try {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => {});
      }
    } catch (_) {}
  }

  window.addEventListener('scroll', updateTarget, {passive:true});
  window.addEventListener('resize', updateTarget);
  window.addEventListener('touchstart', prime, {passive:true, once:true});
  window.addEventListener('pointerdown', prime, {passive:true, once:true});

  updateTarget();
  render();
})();



// ===== Mobile navigation =====
(() => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  function setOpen(open){
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    nav.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('nav-locked', open);
  }

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  nav.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (innerWidth > 780 && nav.classList.contains('is-open')) setOpen(false);
  });
})();

// ===== Scroll reveal =====
(() => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => io.observe(el));
})();


// ===== Custom cursor (desktop only) =====
(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.body.classList.add('custom-cursor');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  let active = false;

  window.addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (!active) requestAnimationFrame(loop);
  }, { passive: true });

  function loop(){
    if (reduceMotion) { rx = x; ry = y; }
    else { rx += (x - rx) * 0.2; ry += (y - ry) * 0.2; }
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) {
      requestAnimationFrame(loop);
    } else {
      active = false;
    }
  }

  const hoverSelector = 'a, button, .projects article, .stack>div, .timeline article, [role="button"]';
  const fieldSelector = 'input, textarea';

  document.addEventListener('pointerover', e => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.add('is-active');
    if (e.target.closest && e.target.closest(fieldSelector)) {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    }
  });
  document.addEventListener('pointerout', e => {
    if (e.target.closest && e.target.closest(hoverSelector)) ring.classList.remove('is-active');
    if (e.target.closest && e.target.closest(fieldSelector)) {
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    }
  });
  window.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  window.addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.addEventListener('mouseleave', () => { dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); });
  document.addEventListener('mouseenter', () => { dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); });
})();

// ===== Terminal quote widget =====
(() => {
  const out = document.getElementById('terminalOutput');
  if (!out) return;

  const lines = [
    { text: 'Talk is cheap. Show me the code.', by: 'Linus Torvalds' },
    { text: 'Given enough eyeballs, all bugs are shallow.', by: "Linus's Law — Eric S. Raymond" },
    { text: 'Uptime is a feature. Documentation is a promise.', by: 'amal.log' }
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  let typingTimer = null;

  function renderLine(line){
    const full = `"${line.text}" — ${line.by}`;
    if (reduceMotion) { out.textContent = full; return; }

    clearTimeout(typingTimer);
    out.textContent = '';
    let idx = 0;
    (function type(){
      out.textContent = full.slice(0, idx);
      idx++;
      if (idx <= full.length) typingTimer = setTimeout(type, 18);
    })();
  }

  function cycle(){
    renderLine(lines[i]);
    i = (i + 1) % lines.length;
  }

  cycle();
  setInterval(cycle, 6500);
})();


// ===== Amal AI V12 — natural conversational portfolio assistant =====
(() => {
  const root = document.getElementById('amalAI');
  const launcher = document.getElementById('amalAILauncher');
  const panel = document.getElementById('amalAIPanel');
  const closeBtn = document.getElementById('amalAIClose');
  const messages = document.getElementById('amalAIMessages');
  const form = document.getElementById('amalAIForm');
  const input = document.getElementById('amalAIInput');

  if (!root || !launcher || !panel || !messages || !form || !input) return;

  let kb = null;
  let welcomed = false;
  let history = [];

  const normalize = (s='') => String(s).toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g,' ')
    .replace(/\s+/g,' ')
    .trim();

  const stopWords = new Set([
    'the','a','an','is','are','was','were','what','who','how','does','do','did',
    'tell','me','about','can','you','please','his','he','in','of','and','to','for',
    'with','on','at','any','show','give','has','have','i','want','know','more',
    'could','would','should','your','my'
  ]);

  function tokens(s=''){
    return normalize(s).split(' ').filter(w => w.length > 1 && !stopWords.has(w));
  }

  async function loadKB(){
    try{
      const res = await fetch('./data/amal-knowledge.json', {cache:'no-store'});
      if(!res.ok) throw new Error('knowledge load failed');
      kb = await res.json();
    }catch(e){
      kb = {out_of_scope_response:"I’m unable to load Amal’s portfolio data right now."};
    }
  }

  function setOpen(open){
    root.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));

    if(open){
      if(!welcomed){
        welcomed = true;
        setTimeout(() => {
          addBot("Hi, I’m Amal AI. I can tell you about Amal’s experience, technical skills, projects, certifications, and professional background.\n\nWhat would you like to know?");
        }, 180);
      }
      setTimeout(() => input.focus(), 220);
    }
  }

  launcher.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  closeBtn.addEventListener('click', () => setOpen(false));

  function addMessage(text, who='bot', extra=''){
    const div = document.createElement('div');
    div.className = `amal-msg ${who}${extra ? ' '+extra : ''}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function addBot(text){ return addMessage(text,'bot'); }
  function addUser(text){ return addMessage(text,'user'); }

  function addTyping(){
    const t = document.createElement('div');
    t.className = 'amal-msg bot amal-typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    return t;
  }

  function scoreText(query, text){
    const q = normalize(query);
    const t = normalize(text);
    let score = 0;

    if(q.length > 3 && t.includes(q)) score += 9;

    const qTokens = tokens(q);
    const tTokens = new Set(tokens(t));

    qTokens.forEach(tok => {
      if(tTokens.has(tok)) score += 3;
      else if([...tTokens].some(x => x.startsWith(tok) || tok.startsWith(x))) score += 1.2;
    });

    return score;
  }

  function bestFAQ(query){
    let best = {score:0,answer:null};
    (kb?.faq || []).forEach(item => {
      (item.questions || []).forEach(q => {
        const s = scoreText(query,q);
        if(s > best.score) best = {score:s,answer:item.answer};
      });
    });
    return best.score >= 3 ? best.answer : null;
  }

  function looksProfessional(query){
    const n = normalize(query);
    const terms = [
      'amal','experience','skill','network','linux','docker','red hat','rhcsa',
      'project','cctv','anpr','elv','av','fortigate','huawei','wifi','vlan',
      'n8n','xiaozhi','aryvik','raspberry','automation','ai','contact','email',
      'linkedin','github','job','role','company','presales','boq','engineer',
      'spectra','sp corporation','ktc','devops','certification','infrastructure',
      'electronics','system','career','work','technical','technology','hire',
      'background','specialize','specialise'
    ];
    return terms.some(t => n.includes(t));
  }

  function buildExperience(){
    const rows = (kb?.experience || []).map(x => {
      const detail = (x.highlights || []).slice(0,2).join('; ');
      return `${x.role} at ${x.company} (${x.period}) — ${detail}.`;
    });
    return `Amal has 4+ years of UAE engineering experience. ${rows.join(' ')}`;
  }

  function buildSkills(query){
    let ranked = Object.entries(kb?.skills || {}).map(([name,items]) => ({
      name,items,score:scoreText(query,`${name} ${items.join(' ')}`)
    })).sort((a,b)=>b.score-a.score);

    if(ranked[0]?.score >= 2){
      const top = ranked.slice(0,2).filter(x=>x.score >= 2);
      return top.map(x => `${x.name}: ${x.items.slice(0,6).join(', ')}.`).join(' ');
    }
    return null;
  }

  function buildProjects(query){
    const n = normalize(query);
    const projects = kb?.projects || [];

    const ranked = projects.map(p => ({
      p,
      score:scoreText(query,`${p.name} ${p.category} ${p.summary} ${(p.technologies||[]).join(' ')}`)
    })).sort((a,b)=>b.score-a.score);

    if(ranked[0]?.score >= 3 && !/\bprojects?\b/.test(n)){
      const p = ranked[0].p;
      return `${p.name}: ${p.summary} Technologies used include ${(p.technologies||[]).join(', ')}.`;
    }

    if(/\bprojects?\b|built|portfolio work|what has he done/.test(n)){
      const names = projects.slice(0,6).map(p => p.name);
      return `Some of Amal’s highlighted projects include ${names.join(', ')}. If you want, ask me about any one of these and I’ll explain it.`;
    }
    return null;
  }

  function buildContact(query){
    const n = normalize(query);
    if(!/(contact|email|linkedin|github|hire|reach|connect)/.test(n)) return null;
    const c = kb?.contact || {};
    return `You can reach Amal at ${c.email}. His LinkedIn is ${c.linkedin}, and his GitHub is ${c.github}.`;
  }

  function buildLearning(query){
    const n = normalize(query);
    if(!/(cert|rhcsa|red hat|devops|learning|study|huawei datacom)/.test(n)) return null;
    return (kb?.learning || []).map(x => `${x.name}: ${x.status}`).join(' ');
  }

  function buildProfile(query){
    const n = normalize(query);
    if(/who.*amal|about amal|profile|introduce|background|speciali|focus|what does amal do/.test(n)){
      const p = kb?.profile;
      if(!p) return null;
      return `${p.summary} His main focus areas include ${p.focus.join(', ')}.`;
    }
    return null;
  }

  function answer(query){
    if(!kb) return "I’m still loading Amal’s portfolio data. Please try again in a moment.";

    // Follow-up handling: short questions can use previous topic.
    const n = normalize(query);
    const lastTopic = history.length ? history[history.length-1]?.topic : null;

    if(!looksProfessional(query)){
      if(lastTopic && /more|details|explain|that|this|it/.test(n)){
        if(lastTopic === 'experience') return buildExperience();
        if(lastTopic === 'projects') return buildProjects('projects');
      }
      return kb.out_of_scope_response;
    }

    const contact = buildContact(query);
    if(contact) return {text:contact,topic:'contact'};

    const learning = buildLearning(query);
    if(learning) return {text:learning,topic:'learning'};

    if(/experience|employment|career|worked|company|job history|previous role/.test(n)){
      return {text:buildExperience(),topic:'experience'};
    }

    const project = buildProjects(query);
    if(project) return {text:project,topic:'projects'};

    const skill = buildSkills(query);
    if(skill) return {text:skill,topic:'skills'};

    const profile = buildProfile(query);
    if(profile) return {text:profile,topic:'profile'};

    const faq = bestFAQ(query);
    if(faq) return {text:faq,topic:'faq'};

    return {
      text:"I know this is about Amal, but I don’t have enough approved portfolio data to answer that confidently yet. You can ask about his experience, technical skills, projects, certifications, or contact details.",
      topic:'unknown'
    };
  }

  async function streamBot(text){
    const div = addMessage('', 'bot');
    const words = String(text).split(/(\s+)/);
    let out = '';
    for(let i=0;i<words.length;i++){
      out += words[i];
      div.textContent = out;
      messages.scrollTop = messages.scrollHeight;
      if(i % 3 === 0) await new Promise(r => setTimeout(r, 9));
    }
    return div;
  }

  async function ask(q){
    q = String(q || '').trim();
    if(!q) return;

    addUser(q);
    input.value = '';

    const typing = addTyping();
    await new Promise(r => setTimeout(r, 420 + Math.min(450,q.length*5)));

    let result = answer(q);
    if(typeof result === 'string') result = {text:result,topic:'general'};

    history.push({question:q,topic:result.topic});
    if(history.length > 8) history.shift();

    typing.remove();
    await streamBot(result.text);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    ask(input.value);
  });

  window.PortfolioAssistant = {
    open: () => setOpen(true),
    close: () => setOpen(false),
    ask,
    getKnowledge: () => kb
  };

  loadKB();
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── SPLASH ──
  const splash = document.getElementById('splash');

  document.body.style.overflow = 'hidden';

  // Logo y texto fade out suave
  setTimeout(() => {
    const logoWrap = document.querySelector('.splash-logo-wrap');
    logoWrap.style.transition = 'opacity 0.9s ease';
    logoWrap.style.opacity = '0';
    document.querySelector('.splash-text').style.transition = 'opacity 0.9s ease';
    document.querySelector('.splash-text').style.opacity = '0';

    setTimeout(() => {
      splash.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1000);
  }, 2800);

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ── NAV TOGGLE MOBILE ──
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity='1'; });
    });
  });

  // ── CARDS ANIMATION ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => el.classList.add('visible'), parseInt(el.dataset.delay||0));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.servicio-card,.vet-card').forEach(el => observer.observe(el));

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── ACTIVE NAV ──
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

  // ── PHONE PARALLAX ──
  const phoneWrap = document.querySelector('.hero-phone-wrap');
  if (phoneWrap) {
    window.addEventListener('mousemove', (e) => {
      const dx = (e.clientX - window.innerWidth/2)  / window.innerWidth;
      const dy = (e.clientY - window.innerHeight/2) / window.innerHeight;
      phoneWrap.style.transform = `perspective(800px) rotateY(${dx*8}deg) rotateX(${-dy*5}deg)`;
    }, { passive: true });
  }

  // ── HUELLITAS FLOTANTES ──
  if (!document.getElementById('pawFloatStyle')) {
    const s = document.createElement('style');
    s.id = 'pawFloatStyle';
    s.textContent = `@keyframes pawFloat{0%{opacity:0;transform:translateY(0) rotate(0deg);}10%{opacity:0.35;}90%{opacity:0.35;}100%{opacity:0;transform:translateY(-110vh) rotate(360deg);}}`;
    document.head.appendChild(s);
  }
  let pawCount = 0;
  setInterval(() => {
    if (pawCount >= 3) return;
    pawCount++;
    const paw = document.createElement('div');
    paw.innerHTML = '🐾';
    paw.style.cssText = `position:fixed;font-size:${Math.random()*20+12}px;left:${Math.random()*100}vw;top:110vh;opacity:0;pointer-events:none;z-index:0;animation:pawFloat ${Math.random()*4+6}s linear forwards;`;
    document.body.appendChild(paw);
    setTimeout(() => { paw.remove(); pawCount--; }, 10000);
  }, 4000);

  // ── FOOTER LOGO → top ──
  const fl = document.querySelector('.footer-brand img');
  if (fl) { fl.style.cursor='pointer'; fl.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); }

});
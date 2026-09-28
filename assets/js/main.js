/* L&D Ceramics — main.js dùng chung cho toàn bộ website.
   Mỗi khối tính năng tự kiểm tra phần tử liên quan có tồn tại trên trang
   hiện tại hay không trước khi chạy, nên file này an toàn để nhúng vào
   mọi trang mà không cần chỉnh sửa riêng. */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Lenis smooth scroll ---------- */
  let lenisInstance = null;
  try{
    if(typeof Lenis !== 'undefined'){
      lenisInstance = new Lenis({ duration:1.15, smoothWheel:true, easing:function(t){ return Math.min(1, 1.001 - Math.pow(2, -10*t)); } });
      window.__lenis = lenisInstance;
      if(window.gsap){
        lenisInstance.on('scroll', () => { if(window.ScrollTrigger) ScrollTrigger.update(); });
        gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        function rafLoop(time){ lenisInstance.raf(time); requestAnimationFrame(rafLoop); }
        requestAnimationFrame(rafLoop);
      }
    }
  } catch(e){ lenisInstance = null; }

  /* ---------- Smooth anchor links (same-page only) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(id.length > 1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          if(lenisInstance){ lenisInstance.scrollTo(target, {duration:1.2}); }
          else { target.scrollIntoView({behavior:'smooth'}); }
        }
      }
    });
  });

  /* ---------- Preloader (only runs if #preloader exists — homepage only) ---------- */
  const pre = document.getElementById('preloader');
  if(pre){
    const path = document.getElementById('preloaderPath');
    const pctEl = document.getElementById('preloaderPct');
    document.body.style.overflow = 'hidden';
    const finish = () => {
      pre.classList.add('done');
      document.body.style.overflow = '';
      animateHero();
      if(window.ScrollTrigger) ScrollTrigger.refresh();
    };
    if(window.gsap && path){
      const counter = {v:0};
      gsap.to(counter, {v:100, duration:1.5, delay:0.2, ease:'power2.inOut', onUpdate:()=>{ if(pctEl) pctEl.textContent = Math.round(counter.v) + '%'; }});
      gsap.to(path, {strokeDashoffset:0, duration:1.5, ease:'power2.inOut', delay:0.2, onComplete:()=>{ setTimeout(finish, 350); }});
    } else {
      setTimeout(finish, 900);
    }
  } else {
    animateHero();
  }

  function animateHero(){
    const words = document.querySelectorAll('.hero-headline .word span');
    if(words.length === 0) return;
    if(window.gsap){
      gsap.to(words, {y:0, duration:1, ease:'power3.out', stagger:0.045});
      gsap.fromTo('.hero-sub,.hero-cta-row', {opacity:0, y:20}, {opacity:1, y:0, duration:0.9, delay:0.4, stagger:0.15, ease:'power2.out'});
    } else {
      words.forEach(w => w.style.transform = 'translateY(0)');
    }
  }

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  if(header){
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));
  }

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scrollProgress');
  if(progressBar){
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      progressBar.style.width = pct + '%';
    });
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if(burger && navLinks){
    burger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      if(!open){
        navLinks.style.cssText += 'position:fixed; top:70px; left:0; right:0; background:#F8F3EA; flex-direction:column; padding:26px 40px; gap:22px; z-index:199;';
        navLinks.querySelectorAll('a').forEach(a => a.style.color = '#161110');
      }
    });
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if(dot && ring){
    const labelText = document.getElementById('cursorLabelText');
    let mx=0,my=0,rx=0,ry=0;
    window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
    function ringLoop(){ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(ringLoop); }
    ringLoop();
    document.querySelectorAll('a, button, .swatch, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
    document.querySelectorAll('.hpanel:not(.hpanel-end)').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.classList.add('hovering-label'); if(labelText) labelText.textContent = 'Xem dự án'; });
      el.addEventListener('mouseleave', () => { ring.classList.remove('hovering-label'); if(labelText) labelText.textContent = ''; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.28;
      const y = (e.clientY - r.top - r.height/2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
  }), {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Section dots ---------- */
  const dotLinks = document.querySelectorAll('.section-dots a');
  if(dotLinks.length){
    const dotSections = Array.from(dotLinks).map(a => document.querySelector(a.getAttribute('href')));
    const dotObserver = new IntersectionObserver(entries => entries.forEach(en => {
      if(en.isIntersecting){
        const idx = dotSections.indexOf(en.target);
        dotLinks.forEach(l => l.classList.remove('active'));
        if(dotLinks[idx]) dotLinks[idx].classList.add('active');
      }
    }), {threshold:0.5});
    dotSections.forEach(s => { if(s) dotObserver.observe(s); });
  }

  /* ---------- 3D tilt for swatches / project cards ---------- */
  document.querySelectorAll('.swatch, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX-r.left)/r.width - 0.5;
      const py = (e.clientY-r.top)/r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px*10}deg) rotateX(${-py*10}deg) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'; });
  });

  /* ---------- Stat counters ---------- */
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const obs = new IntersectionObserver(entries => entries.forEach(en => {
      if(en.isIntersecting){
        if(window.gsap){
          gsap.to({val:0}, {val:target, duration:1.6, ease:'power2.out', onUpdate:function(){ el.textContent = Math.round(this.targets()[0].val); }});
        } else { el.textContent = target; }
        obs.unobserve(el);
      }
    }), {threshold:0.4});
    obs.observe(el);
  });

  /* ---------- Horizontal pinned gallery (homepage only) ---------- */
  const hgalleryTrack = document.getElementById('hgalleryTrack');
  if(hgalleryTrack && window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width:981px)', () => {
      const getScrollAmount = () => hgalleryTrack.scrollWidth - window.innerWidth;
      const panelCount = document.querySelectorAll('.hpanel').length;
      const tween = gsap.to(hgalleryTrack, {
        x: () => -getScrollAmount(),
        ease:'none',
        scrollTrigger:{
          trigger:'.hgallery', start:'top top', end: () => '+=' + getScrollAmount(),
          pin:true, scrub:true, invalidateOnRefresh:true,
          snap:{
            snapTo: 1 / (panelCount - 1),
            duration:{min:0.5, max:0.9},
            ease:'power2.inOut'
          }
        }
      });
      document.querySelectorAll('.hpanel-bg').forEach(bg => {
        gsap.to(bg, {xPercent:-6, ease:'none', scrollTrigger:{
          trigger: bg.closest('.hpanel'), containerAnimation: tween, start:'left right', end:'right left', scrub:true
        }});
      });

      return () => { if(tween.scrollTrigger) tween.scrollTrigger.kill(); tween.kill(); };
    });
  }

  /* ---------- Hero 3D — Three.js (homepage only, graceful fallback) ---------- */
  function initHero3D(){
    if(typeof THREE === 'undefined') return;
    if(!window.matchMedia('(min-width:981px)').matches) return;
    const container = document.getElementById('heroOrnament');
    if(!container) return;
    try{
      const width = container.clientWidth, height = container.clientHeight;
      if(width < 10 || height < 10) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width/height, 0.1, 100);
      camera.position.set(0,0,7);
      const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      container.querySelectorAll('.facet').forEach(f => f.style.display = 'none');
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.1, 0.3, 160, 20, 2, 3),
        new THREE.MeshStandardMaterial({color:0xA8834A, metalness:0.85, roughness:0.32})
      );
      group.add(knot);
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.05, 0),
        new THREE.MeshBasicMaterial({color:0xDEBB7C, wireframe:true, transparent:true, opacity:0.22})
      );
      group.add(ico);
      scene.add(group);

      scene.add(new THREE.AmbientLight(0x6e5228, 1.1));
      const key = new THREE.PointLight(0xDEBB7C, 1.4, 20); key.position.set(4,3,5); scene.add(key);
      const fill = new THREE.PointLight(0x2F5449, 1.0, 20); fill.position.set(-4,-2,3); scene.add(fill);

      let tmx=0, tmy=0;
      container.addEventListener('mousemove', e => {
        const r = container.getBoundingClientRect();
        tmx = ((e.clientX-r.left)/r.width - 0.5) * 2;
        tmy = ((e.clientY-r.top)/r.height - 0.5) * 2;
      });

      function animate(){
        requestAnimationFrame(animate);
        group.rotation.y += 0.0035;
        group.rotation.x += 0.0011;
        camera.position.x += (tmx*1.1 - camera.position.x) * 0.04;
        camera.position.y += (-tmy*1.1 - camera.position.y) * 0.04;
        camera.lookAt(0,0,0);
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        if(!window.matchMedia('(min-width:981px)').matches) return;
        const w = container.clientWidth, h = container.clientHeight;
        if(w < 10 || h < 10) return;
        renderer.setSize(w, h);
        camera.aspect = w/h;
        camera.updateProjectionMatrix();
      });
    } catch(err){ /* WebGL unavailable — CSS facets remain visible as fallback */ }
  }
  initHero3D();

  /* ---------- Filter chips (Không gian listing page) ---------- */
  const filterChips = document.querySelectorAll('.filter-chip');
  if(filterChips.length){
    const cards = document.querySelectorAll('[data-category]');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.getAttribute('data-filter');
        cards.forEach(card => {
          const match = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Project detail page: render from ?id= using PROJECT_DATA ---------- */
  if(document.getElementById('detailRoot') && typeof PROJECT_DATA !== 'undefined'){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'meridian';
    const p = PROJECT_DATA[id] || PROJECT_DATA['meridian'];
    const renderProjectDetail = (lang) => {
      lang = lang || (window.getLang ? window.getLang() : 'vi');
      document.title = p.title[lang] + ' — L&D Ceramics';
      const setText = (sel, val) => { const el = document.querySelector(sel); if(el) el.textContent = val; };
      setText('#dNum', p.num);
      setText('#dTitle', p.title[lang]);
      setText('#dCategory', p.category[lang]);
      setText('#dIntro', p.intro[lang]);
      const bg = document.querySelector('.detail-hero-bg');
      if(bg){ bg.className = 'detail-hero-bg ' + p.texture; }
      const bodyEl = document.getElementById('dBody');
      if(bodyEl){ bodyEl.innerHTML = p.paragraphs.map(t => '<p>' + t[lang] + '</p>').join(''); }
      const specsEl = document.getElementById('dSpecs');
      if(specsEl){
        specsEl.innerHTML = p.specs.map(s => '<div class="spec-row"><span>' + s.k[lang] + '</span><span>' + s.v[lang] + '</span></div>').join('');
      }
      const swEl = document.getElementById('dSwatches');
      if(swEl){
        swEl.innerHTML = p.swatches.map(s => '<div class="detail-swatch ' + s + '"></div>').join('');
      }
    };
    renderProjectDetail();
    document.addEventListener('langchange', e => renderProjectDetail(e.detail.lang));
  }

  /* ---------- Contact form: client-side validation only (see form-note in the page) ---------- */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        const wrap = field.closest('.form-field');
        let fieldValid = field.value.trim().length > 0;
        if(field.type === 'email' && fieldValid){
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        if(wrap){ wrap.classList.toggle('invalid', !fieldValid); }
        if(!fieldValid) valid = false;
      });
      const successEl = document.getElementById('formSuccess');
      if(valid && successEl){
        successEl.classList.add('show');
        successEl.textContent = 'Đã ghi nhận thông tin trong trình duyệt. Lưu ý: form này cần được kết nối với dịch vụ gửi email hoặc backend trên VPS của bạn để thực sự nhận được yêu cầu — xem hướng dẫn trong README.';
      }
    });
  }

  window.addEventListener('load', () => { if(window.ScrollTrigger) ScrollTrigger.refresh(); });
});

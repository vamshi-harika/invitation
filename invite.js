(() => {
  const I = window.INVITE, T = I.text;
  const $ = (s, r = document) => r.querySelector(s);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const amp = s => esc(s).replace(/&amp;/g, '<span class="amp">&amp;</span>');
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------------------------------------- small parts */
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  const dateParts = iso => {
    const d = new Date(iso + 'T12:00:00+05:30'), f = o => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...o }).format(d);
    return { day: f({ day: 'numeric' }), month: f({ month: 'short' }), monthLong: f({ month: 'long' }), wd: f({ weekday: 'short' }), wdLong: f({ weekday: 'long' }) };
  };
  const clock = t => { const [h, m] = t.split(':').map(Number); return { time: `${h % 12 || 12}:${String(m).padStart(2, '0')}`, ap: h < 12 ? 'AM' : 'PM' }; };
  /* ---------------------------------------- build the page */
  const heart = '<svg viewBox="0 0 24 24"><path d="M12 20C5 15 3 11 5 7.500 7 4.500 10.500 5.500 12 8.500 13.500 5.500 17 4.500 19 7.500 21 11 19 15 12 20Z"/></svg>';
  const eventCard = e => {
    const p = dateParts(e.date), c = clock(e.time), pl = I.places[e.place];
    return `<article class="slide"><div class="ev${e.main ? ' ev-main' : ''}">
      <time class="ev-date a" style="--o:0" datetime="${e.date}"><span>${p.wdLong}</span><strong>${p.day}</strong><span>${p.monthLong}</span></time>
      <h3 class="a" style="--o:1">${amp(e.title)}</h3>
      <p class="telugu a" style="--o:2">${esc(e.telugu)}</p>
      <span class="ev-rule a" style="--o:3" aria-hidden="true">${heart}</span>
      ${e.line ? `<p class="ev-line a" style="--o:3">${esc(e.line)}</p>` : ''}
      ${e.wear ? `<p class="ev-wear a" style="--o:3">${esc(e.wear)}</p>` : ''}
      ${e.dress ? `<div class="ev-dress a" style="--o:3">${e.dress.map(([who, what]) => `<p><b>${esc(who)}</b>${esc(what)}</p>`).join('')}</div>` : ''}
      <p class="ev-when a" style="--o:4"><span class="ev-time">${c.time}<small>${c.ap}</small></span>${e.note ? `<span class="ev-note">${esc(e.note)}</span>` : ''}</p>
      <a class="ev-map a" style="--o:5" href="${esc(pl.map)}" target="_blank" rel="noreferrer">
        <span class="ev-pin">${pin}</span>
        <span class="ev-place"><b>${esc(pl.name)}</b>${pl.detail ? `<small>${esc(pl.detail)}</small>` : ''}</span>
        <span class="ev-go">Directions <span aria-hidden="true">→</span></span>
      </a>
    </div></article>`;
  };
  // A fine gold thread and a small heart link one card to the next.
  const thread = `<span class="thread" aria-hidden="true">${heart}</span>`;

  const mainEvent = I.events.find(e => e.main);
  const bigDay = { ...dateParts(mainEvent.date), year: mainEvent.date.slice(0, 4) }, bigClock = clock(mainEvent.time);

  $('#sheet').innerHTML = `
    <section class="hero">
      <p class="dear rv">${esc(T.salutation)}</p>
      <h1 class="names" id="names" tabindex="-1">
        <span class="sr">${esc(I.groom)} and ${esc(I.bride)}</span>
        <span aria-hidden="true">
          <span class="line">${esc(I.groom)}</span>
          <button class="and" id="and" type="button" tabindex="-1">&amp;</button>
          <span class="line second">${esc(I.bride)}</span>
        </span>
      </h1>
      <div class="hero-date rv" style="--d:1.7s">
        <span class="hd-side">${bigDay.wdLong}</span>
        <strong class="hd-day">${bigDay.day}</strong>
        <span class="hd-side">${bigDay.monthLong}<br>${bigDay.year}</span>
      </div>
      <p class="hd-where rv" style="--d:1.85s">${bigClock.time} ${bigClock.ap} · ${esc(I.places[mainEvent.place].name)}, ${esc(I.city)}</p>
      <div class="hero-stage">
        <div class="hero-photo"><img src="images/couple-photo.webp" alt="${esc(I.groom)} and ${esc(I.bride)} sitting close together, laughing" width="1000" height="1500" fetchpriority="high"></div>
      </div>
    </section>

    <section class="letter-sec">
      <p class="letter-copy rv">${esc(T.letter)}</p>
      <div class="count-panel rv">
        <p class="count-lead">The muhurtham is in</p>
        <div class="count" id="count" role="timer"></div>
      </div>
    </section>

    <section class="schedule" id="schedule">
      <div class="schedule-head rv">
        <h2 class="sec-title">${esc(T.scheduleTitle)}</h2>
      </div>
      <div class="deck">${I.events.map(eventCard).join(thread)}</div>
    </section>

    <section class="closing" id="closing">
      <h2 class="sec-title rv">${esc(T.closingTitle)}</h2>
      <p class="signoff rv">${esc(T.signoff)}</p>
      <p class="sign-names rv">${amp(I.shortNames)}</p>
      <button class="reseal rv" id="reseal" type="button">Seal it up and open it again</button>
    </section>
    ${I.music ? `<audio id="song" src="${esc(I.music)}" preload="auto"></audio><button class="music" id="musicBtn" type="button" aria-pressed="false" aria-label="Music">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg></button>` : ''}`;

  /* ---------------------------------------- envelope copy and seal */
  $('#whisper').textContent = T.whisper;
  $('#addressTo').textContent = T.addressTo;
  $('#hint').textContent = T.hint;
  $('#letterHello').textContent = T.letterHello;
  // Traced from the artwork, in image pixels. The pocket is the envelope minus the flap.
  const CUT = { x: 0, y: 165, w: 1230, h: 935 };
  const FLAP = [[0, 165], [0, 172], [340, 468], [590, 686], [600, 692], [610, 686], [870, 470], [1230, 172], [1230, 165]];
  const clipOf = pts => `polygon(${pts.map(([x, y]) => `${((x - CUT.x) / CUT.w * 100).toFixed(3)}% ${((y - CUT.y) / CUT.h * 100).toFixed(3)}%`).join(', ')})`;
  const POCKET = [...FLAP.slice(1, 8), [1230, 1100], [0, 1100]];
  $('#flapFront').style.clipPath = clipOf(FLAP);
  $('#flapLiner').style.clipPath = clipOf(FLAP);
  $('#pocket').style.clipPath = clipOf(POCKET);

  /* ---------------------------------------- the love */
  // White and red hearts only. One soft stream floats up out of the envelope, only after the tap.
  const LOVE = ['🤍', '❤️', '🤍', '🤍', '❤️', '🤍'];
  const canvas = $('#confetti'), ctx = canvas.getContext('2d');
  const SPRITE = 72;
  // Emojis are slow to draw as text, so each is painted once and reused as an image.
  const sprites = LOVE.map(e => {
    const c = document.createElement('canvas'); c.width = c.height = SPRITE;
    const x = c.getContext('2d'); x.font = `${SPRITE * .8}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(e, SPRITE / 2, SPRITE * .54);
    return c;
  });
  const MAX_BITS = 240;
  let bits = [], running = false, floodRate = 0, owed = 0;
  const size = () => { const r = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * r; canvas.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); };
  addEventListener('resize', size); size();
  const floatUp = () => {
    const box = $('#scene').getBoundingClientRect(), big = Math.random();
    bits.push({
      x: box.left + Math.random() * box.width, y: box.top + box.height * (.15 + Math.random() * .75),
      vy: -(1 + Math.random() * 1.8), rot: (Math.random() - .5) * .35, s: 18 + big * big * 26,
      img: sprites[Math.floor(Math.random() * sprites.length)], age: 0, life: 1, fade: .0055 + Math.random() * .003,
      sway: Math.random() * 6, swing: .35 + Math.random() * .7,
    });
  };
  let lastT = 0;
  const tick = t => {
    const dt = Math.min((t - lastT) / 16.67 || 1, 3); lastT = t;
    owed += floodRate * dt / 60;
    while (owed >= 1) { owed--; if (bits.length < MAX_BITS) floatUp(); }
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits = bits.filter(b => b.life > 0 && b.y > -60);
    for (const b of bits) {
      b.age += dt; b.life -= b.fade * dt; b.y += b.vy * dt;
      b.x += Math.sin(t / 650 + b.sway) * b.swing * dt;
      const g = Math.min(1, b.age / 20), pop = g * (2 - g) * (1 + .22 * Math.sin(g * Math.PI)); // grows in with a tiny bounce
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot + Math.sin(t / 800 + b.sway) * .14); ctx.scale(pop, pop); ctx.globalAlpha = Math.min(1, b.life * 2.5);
      ctx.drawImage(b.img, -b.s / 2, -b.s / 2, b.s, b.s); ctx.restore();
    }
    if (bits.length || floodRate > 0) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  };
  const flood = rate => { if (calm) return; floodRate = rate; if (rate > 0 && !running) { running = true; lastT = performance.now(); requestAnimationFrame(tick); } };

  /* ---------------------------------------- after opening */
  const arm = () => {
    document.body.classList.add('opened');
    const seen = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); }
    }), { threshold: .2 });
    document.querySelectorAll('.rv').forEach(el => seen.observe(el));
    // each card settles in once, as it comes up the screen, and then stays perfectly still
    const arrive = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('seen'); arrive.unobserve(e.target); }
    }), { threshold: .1, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.slide, .thread').forEach(el => arrive.observe(el));
  };

  /* ---------------------------------------- music */
  const song = $('#song'), musicBtn = $('#musicBtn');
  let musicOn = false;
  const showMusic = on => { musicOn = on; if (musicBtn) musicBtn.setAttribute('aria-pressed', String(on)); };
  const fadeTo = (target, ms) => {
    if (!song) return;
    const from = song.volume, t0 = performance.now();
    const step = t => { const k = Math.max(0, Math.min(1, (t - t0) / ms)); song.volume = Math.max(0, Math.min(1, from + (target - from) * k)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  // The song begins partway in, and loops back to that same moment rather than the start.
  const FROM = +I.musicStart || 0;
  const cue = () => { if (song.readyState >= 1) song.currentTime = FROM; else song.addEventListener('loadedmetadata', () => { song.currentTime = FROM; }, { once: true }); };
  if (song) song.addEventListener('ended', () => { song.currentTime = FROM; song.play().catch(() => {}); });
  const startMusic = () => {
    if (!song) return;
    cue();
    song.volume = 0;
    song.play().then(() => { showMusic(true); fadeTo(.6, 2500); }).catch(() => showMusic(false));
  };
  if (musicBtn) musicBtn.addEventListener('click', () => {
    if (musicOn) { song.pause(); showMusic(false); }
    else { song.volume = .6; song.play().then(() => showMusic(true)).catch(() => {}); }
  });
  // quiet while the guest is in another app or tab, and back when they return
  document.addEventListener('visibilitychange', () => {
    if (!song || !musicOn) return;
    if (document.hidden) song.pause(); else song.play().catch(() => {});
  });

  /* ---------------------------------------- slow drift down the letter */
  // Starts once the names have written themselves in, and stops for good at the first touch.
  const startDrift = () => {
    const speed = +I.autoScroll || 0;
    if (!speed || calm) return;
    let frame = 0, last = 0, y = 0, stopped = false;
    const stop = () => {
      stopped = true; cancelAnimationFrame(frame); clearTimeout(begin);
      ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(n => removeEventListener(n, stop));
    };
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(n => addEventListener(n, stop, { passive: true }));
    const step = t => {
      if (stopped) return;
      if (last) {
        y += speed * Math.min(t - last, 100) / 1000;
        scrollTo(0, y);
        if (y >= document.documentElement.scrollHeight - innerHeight - 1) { stop(); return; }
      }
      last = t; frame = requestAnimationFrame(step);
    };
    const begin = setTimeout(() => { y = scrollY; frame = requestAnimationFrame(step); }, 2600);
  };

  /* ---------------------------------------- the opening sequence */
  const stage = $('#stage'), scene = $('#scene'), seal = $('#seal'), flap = $('#flap'), letter = $('#letter'), sheet = $('#sheet');
  sheet.inert = true;
  const reveal = () => {
    document.body.classList.remove('sealed');
    sheet.inert = false; stage.remove();
    $('#themeColor').content = '#2e2e2e';
    scrollTo(0, 0); arm();
    $('#names').focus({ preventScroll: true });
    floodRate = 0; bits = []; // nothing floats over the letter
    startDrift();
  };
  let opening = false;
  const open = async () => {
    if (opening) return; opening = true;
    startMusic();
    if (calm) { reveal(); return; }
    navigator.vibrate?.(18);
    flood(42);
    seal.classList.add('wiggle');
    await wait(460);

    // crack the wax; the layers under it appear, identical to the picture
    stage.classList.add('opening');
    flap.classList.add('moving');
    seal.classList.remove('wiggle'); seal.classList.add('broken');
    navigator.vibrate?.([10, 30, 10]);
    await wait(260);

    // lift the flap; it passes behind the letter halfway over
    flap.classList.add('open');
    await wait(400); flap.style.zIndex = 1;
    await wait(420);

    // the letter climbs out
    const climb = letter.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-66%)', offset: .82 }, { transform: 'translateY(-60%)' }], { duration: 760, easing: 'cubic-bezier(.3, .7, .3, 1)', fill: 'forwards' });
    await climb.finished;
    await wait(240);

    // the letter unfolds to become the page while the picture fades away
    const lr = letter.getBoundingClientRect(), target = sheet.getBoundingClientRect();
    climb.cancel();
    stage.appendChild(letter);
    Object.assign(letter.style, { left: lr.left + 'px', top: lr.top + 'px', width: lr.width + 'px', height: lr.height + 'px', right: 'auto', bottom: 'auto' });
    letter.classList.add('fly');
    flood(0); bits.forEach(b => { b.fade = .035; });
    stage.classList.add('leaving');
    void letter.offsetWidth;
    Object.assign(letter.style, { left: target.left + 'px', top: target.top + 'px', width: target.width + 'px', height: innerHeight - target.top + 'px', borderRadius: getComputedStyle(sheet).borderTopLeftRadius });
    await wait(860);
    reveal();
  };
  seal.addEventListener('click', open);

  if (location.hash === '#open') reveal();

  /* ---------------------------------------- little games */
  sheet.addEventListener('click', e => {
    if (e.target.closest('#and')) { const a = $('#and'); a.classList.remove('spin'); void a.offsetWidth; a.classList.add('spin'); return; }
  });

  /* ---------------------------------------- countdown */
  const countEl = $('#count'), target = new Date(I.muhurtham).getTime();
  const renderCount = () => {
    const left = target - Date.now();
    if (left <= 0) { countEl.innerHTML = '<div><strong>Married!</strong></div>'; countEl.previousElementSibling.textContent = 'And just like that'; return false; }
    const parts = [[Math.floor(left / 864e5), 'Days'], [Math.floor(left / 36e5) % 24, 'hours'], [Math.floor(left / 6e4) % 60, 'mins'], [Math.floor(left / 1e3) % 60, 'secs']];
    countEl.innerHTML = parts.map(([v, l]) => `<div><strong>${String(v).padStart(2, '0')}</strong><span>${l}</span></div>`).join('');
    countEl.setAttribute('aria-label', `${parts[0][0]} days until the muhurtham`);
    return true;
  };
  if (renderCount()) { const t = setInterval(() => { if (!renderCount()) clearInterval(t); }, 1000); }

  $('#reseal').addEventListener('click', () => { history.replaceState(null, '', location.pathname); location.reload(); });

})();

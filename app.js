/* ==========================================================
   RADICAMENTO — il rito del custode · v3
   Pagine: attivazione → introduzione → storia → terreno → pianta → rituale
           → [tappa + rito] × 4 → annotazioni
   Navigazione: barra in basso (indietro + azione principale), indice a pannello,
   swipe orizzontale, tasto indietro del telefono (#hash).
   ========================================================== */
(() => {
  'use strict';

  /* =========================================================
     CONTENUTI
     ========================================================= */
  const TAPPE = [
    {
      name: 'Respira', glyph: 'assets/img/glifo-respira.png', palette: 'respira',
      orb: ['#FAF6EC', '#BFE0BC', 'rgba(191, 224, 188, .6)'], tint: 'linear-gradient(135deg, #E2F0DC, #FAF6EC)',
      lead: 'Qui accorderai il tuo respiro al suo.',
      intro: 'Rallenta. Puoi chiudere gli occhi: un suono segnerà ogni passaggio.',
      chip: 'A occhi chiusi',
      gestures: [
        { pre: 'Chiudi gli ', k: 'occhi', sub: 'Un suono ti guiderà.', dur: 6, fx: 'eyesClose' },
        { k: 'Inspira', post: ' profondamente', sub: 'Lascia entrare l’aria del Parco.', dur: 5, fx: 'inhale' },
        { pre: 'Gonfia l’', k: 'addome', sub: 'Come il suolo sotto la pioggia.', dur: 4, fx: 'expand' },
        { pre: 'Trattieni il ', k: 'respiro', sub: 'Resta sospeso.', dur: 5, fx: 'hold' },
        { k: 'Espira', post: ' lentamente', sub: 'Restituisci ciò che hai ricevuto.', dur: 7, fx: 'exhale' }
      ],
      doneTitle: 'Hai respirato con lei'
    },
    {
      name: 'Ascolta', glyph: 'assets/img/glifo-ascolta.png', palette: 'ascolta',
      orb: ['#F4EEFA', '#C7B5DD', 'rgba(199, 181, 221, .6)'], tint: 'linear-gradient(135deg, #E4DAF0, #F3EEF6)',
      lead: 'Qui ascolterai la voce della pianta.',
      intro: 'Avvicinati alla pianta. Il telefono renderà udibile la sua voce.',
      chip: 'Con il suono',
      gestures: [
        { pre: 'Inclina il ', k: 'capo', sub: 'Avvicinati alle foglie.', dur: 6, fx: 'tilt' },
        { pre: 'Chiudi le ', k: 'labbra', sub: 'Lascia che sia lei a parlare.', dur: 5, fx: 'quiet' },
        { pre: 'Porgi l’', k: 'orecchio', sub: 'Un suono basso: sta assorbendo i metalli.', dur: 8, fx: 'drone' },
        { pre: 'Sospendi il ', k: 'respiro', sub: 'Nel silenzio il suono si fa nitido.', dur: 5, fx: 'suspend' },
        { pre: 'Accogli il ', k: 'suono', sub: 'Un suono armonico: è in equilibrio.', dur: 9, fx: 'harmonic' }
      ],
      doneTitle: 'Hai ascoltato la sua voce'
    },
    {
      name: 'Tatto', glyph: 'assets/img/glifo-tatto.png', palette: 'tatto',
      orb: ['#F3EBD6', '#D9CBAE', 'rgba(217, 203, 174, .6)'], tint: 'linear-gradient(135deg, #E8DEC8, #D9CBAE)',
      lead: 'Qui toccherai la terra che si risana.',
      intro: 'Tieni il telefono in una mano. Con l’altra tocca la terra.',
      chip: 'Mani nella terra',
      gestures: [
        { pre: 'Affonda le ', k: 'dita', sub: 'Entra nella terra, senza fretta.', dur: 6, fx: 'sink' },
        { pre: 'Stringi la ', k: 'terra', sub: 'Sentine il peso e l’umidità.', dur: 5, fx: 'squeeze' },
        { pre: 'Sfiora le ', k: 'radici', sub: 'Trattengono i metalli.', dur: 6, fx: 'roots' },
        { pre: 'Premi i ', k: 'polpastrelli', sub: 'Tieni premuto il cerchio: senti il battito del suolo.', dur: 5, fx: 'press' },
        { pre: 'Segui il ', k: 'flusso', sub: 'Lascia scorrere la mano con la linfa.', dur: 7, fx: 'flow' }
      ],
      doneTitle: 'Hai toccato la sua terra'
    },
    {
      name: 'Osserva', glyph: 'assets/img/glifo-osserva.png', palette: 'osserva',
      orb: ['#F7F2CC', '#80C184', 'rgba(241, 235, 176, .7)'], tint: 'linear-gradient(135deg, #F1EBB0, #E2F0DC)',
      lead: 'Qui imparerai a vedere l’invisibile.',
      intro: 'Guarda la pianta come se fosse la prima volta.',
      chip: 'Occhi aperti',
      gestures: [
        { pre: 'Apri gli ', k: 'occhi', sub: 'Guarda la pianta, non lo schermo.', dur: 6, fx: 'open' },
        { k: 'Togli', post: ' le distrazioni', sub: 'Resta solo ciò che vive.', dur: 6, fx: 'declutter' },
        { pre: 'Sfoca i ', k: 'contorni', sub: 'Lascia che forme e colori si mescolino.', dur: 7, fx: 'blur' },
        { k: 'Focus', sub: 'Ora vedi ciò che prima non vedevi.', dur: 7, fx: 'focus' },
        { k: 'Ripeti', post: ' il rito', sub: 'Stagione dopo stagione.', dur: 6, fx: 'repeat' }
      ],
      doneTitle: 'Hai visto l’invisibile'
    }
  ];
  const durOf = t => Math.max(5, Math.round((t.gestures.reduce((s, g) => s + g.dur, 0) + 4) / 5) * 5);

  const SOIL_STAGES = [
    { from: 2027, name: 'La ferita', text: 'Gli impianti cedono. Metalli e idrocarburi scendono fino alla falda.' },
    { from: 2035, name: 'I primi semi', text: 'Attecchiscono le prime piante pioniere. Le radici restano in superficie.' },
    { from: 2050, name: 'Le radici scendono', text: 'Le radici vanno in profondità e sequestrano i metalli, sottraendoli alla falda.' },
    { from: 2075, name: 'Il suolo respira', text: 'Nasce il Parco Regina. Il suolo torna a vivere, ma la cura continua.' }
  ];

  /* ordine delle pagine */
  const SEQ = ['intro', 'storia', 'terreno', 'pianta', 'rituale', 't1', 'r1', 't2', 'r2', 't3', 'r3', 't4', 'r4', 'fine'];
  const LABEL = { intro: 'Introduzione', storia: 'Storia della fine', terreno: 'Il fattore terreno', pianta: 'La tua pianta', rituale: 'Il rituale', fine: 'Annotazioni' };
  TAPPE.forEach((t, i) => { LABEL['t' + (i + 1)] = `Tappa ${i + 1}: ${t.name}`; LABEL['r' + (i + 1)] = `Rito: ${t.name}`; });

  /* =========================================================
     STATO
     ========================================================= */
  const KEY = 'radicamento-rito-v3';
  const blank = () => ({ activated: false, route: 'intro', done: [], notes: {}, justDone: null });
  let state = blank();
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') state = Object.assign(blank(), s); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  const nextTodo = () => TAPPE.findIndex((_, i) => !state.done.includes(i));

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const vibrate = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = id => `<svg class="ico"><use href="#${id}"/></svg>`;

  /* =========================================================
     CIELO — gradienti in movimento (solo palette del progetto)
     ========================================================= */
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const PAL = {
    dawn:      { base: '#FAF6EC', b: ['#BFE0BC', '#C7B5DD', '#E8DEC8', '#80C184', '#F1EBB0'], sun: .8 },
    smog:      { base: '#CFC6B4', b: ['#8C8478', '#141215', '#B7AC98', '#4A4050', '#D9CBAE'], sun: .05 },
    bloom:     { base: '#FAF6EC', b: ['#80C184', '#C7B5DD', '#BFE0BC', '#F1EBB0', '#9373B1'], sun: .85 },
    earthDead: { base: '#D9CBAE', b: ['#141215', '#A89A82', '#4A4050', '#C9BBA0', '#2A2430'], sun: .08 },
    earthLive: { base: '#E8DEC8', b: ['#80C184', '#C7B5DD', '#D9CBAE', '#BFE0BC', '#F1EBB0'], sun: .65 },
    pianta:    { base: '#F3EEF6', b: ['#C7B5DD', '#BFE0BC', '#E8DEC8', '#9373B1', '#E2F0DC'], sun: .45 },
    rituale:   { base: '#F6F0D8', b: ['#F1EBB0', '#C7B5DD', '#BFE0BC', '#E8DEC8', '#E4DAF0'], sun: .7 },
    respira:   { base: '#EEF4EA', b: ['#BFE0BC', '#E2F0DC', '#E4DAF0', '#E8DEC8', '#F1EBB0'], sun: .6 },
    ascolta:   { base: '#EFE8F5', b: ['#C7B5DD', '#9373B1', '#E4DAF0', '#E8DEC8', '#BFE0BC'], sun: .35 },
    tatto:     { base: '#E8DEC8', b: ['#D9CBAE', '#B8A586', '#80C184', '#C7B5DD', '#5E9A68'], sun: .4 },
    osserva:   { base: '#F4EFCF', b: ['#F1EBB0', '#80C184', '#BFE0BC', '#C7B5DD', '#FAF6EC'], sun: .9 },
    night:     { base: '#121014', b: ['#2A2033', '#3B2E4A', '#1C2A20', '#0A090B', '#4A3A5C'], sun: 0 },
    fine:      { base: '#FAF6EC', b: ['#80C184', '#C7B5DD', '#F1EBB0', '#BFE0BC', '#9373B1'], sun: 1 }
  };
  Object.values(PAL).forEach(p => { p.baseC = hex(p.base); p.bC = p.b.map(hex); });

  const Sky = {
    cv: $('#sky'), ctx: null, w: 0, h: 0, t: 0, last: 0, cur: null, tgt: null, speed: 1.4, pulse: 1,
    blobs: [
      { x: .15, y: .12, ax: .22, ay: .10, r: .75, s: .11, p: 0 },
      { x: .85, y: .30, ax: .18, ay: .16, r: .65, s: .09, p: 1.7 },
      { x: .30, y: .70, ax: .25, ay: .12, r: .70, s: .07, p: 3.1 },
      { x: .80, y: .88, ax: .20, ay: .10, r: .60, s: .13, p: 4.4 },
      { x: .50, y: .45, ax: .30, ay: .22, r: .45, s: .05, p: 2.2 }
    ],
    init() {
      this.ctx = this.cv.getContext('2d');
      this.cur = this.copy(PAL.dawn); this.tgt = this.copy(PAL.dawn);
      const size = () => { this.w = 64; this.h = Math.round(64 * innerHeight / innerWidth); this.cv.width = this.w; this.cv.height = this.h; };
      size(); addEventListener('resize', size);
      requestAnimationFrame(this.frame.bind(this));
    },
    copy(p) { return { base: [...p.baseC], b: p.bC.map(c => [...c]), sun: p.sun }; },
    set(name) { this.tgt = this.copy(PAL[name]); },
    mix(a, b, t) {
      const A = PAL[a], B = PAL[b], L = (x, y) => x.map((v, i) => v + (y[i] - v) * t);
      this.tgt = { base: L(A.baseC, B.baseC), b: A.bC.map((c, i) => L(c, B.bC[i])), sun: A.sun + (B.sun - A.sun) * t };
    },
    frame(now) {
      const dt = Math.min((now - this.last) / 1000 || 0, .1); this.last = now;
      this.t += dt * (reduced ? 0 : 1);
      const k = 1 - Math.exp(-dt * this.speed), lerp = (c, g) => { for (let i = 0; i < 3; i++) c[i] += (g[i] - c[i]) * k; };
      lerp(this.cur.base, this.tgt.base); this.cur.b.forEach((c, i) => lerp(c, this.tgt.b[i]));
      this.cur.sun += (this.tgt.sun - this.cur.sun) * k;
      document.documentElement.style.setProperty('--sun', this.cur.sun.toFixed(3));
      const { ctx, w, h } = this, rgb = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
      ctx.fillStyle = rgb(this.cur.base, 1); ctx.fillRect(0, 0, w, h);
      this.blobs.forEach((b, i) => {
        const x = (b.x + Math.sin(this.t * b.s + b.p) * b.ax) * w;
        const y = (b.y + Math.cos(this.t * b.s * .8 + b.p) * b.ay) * h;
        const r = b.r * w * (1 + Math.sin(this.t * .2 + i) * .12) * (i === 4 ? this.pulse : 1);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, rgb(this.cur.b[i], .95)); g.addColorStop(1, rgb(this.cur.b[i], 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      });
      requestAnimationFrame(this.frame.bind(this));
    }
  };
  Sky.init();

  const pollen = $('#pollen');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('i'), s = 3 + Math.random() * 6;
    p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;--dx:${(Math.random() * 80 - 40).toFixed(0)}px;animation-duration:${16 + Math.random() * 18}s;animation-delay:${-Math.random() * 30}s`;
    pollen.appendChild(p);
  }

  /* =========================================================
     AUDIO — la voce della pianta (Web Audio, nessun file)
     ========================================================= */
  const Audio = {
    ctx: null, master: null, muted: false, bed: null, noiseBuf: null,
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain(); this.master.gain.value = this.muted ? 0 : .9; this.master.connect(this.ctx.destination);
        const len = this.ctx.sampleRate * 2; this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const d = this.noiseBuf.getChannelData(0); let last = 0;
        for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
    },
    get t() { return this.ctx ? this.ctx.currentTime : 0; },
    setMuted(m) { this.muted = m; if (this.master) this.master.gain.setTargetAtTime(m ? 0 : .9, this.t, .15); },
    tone(freq, { type = 'sine', attack = .01, decay = 2.4, peak = .2, at = 0 } = {}) {
      if (!this.ctx) return;
      const t0 = this.t + at, o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + attack); g.gain.exponentialRampToValueAtTime(.0001, t0 + attack + decay);
      o.connect(g); g.connect(this.master); o.start(t0); o.stop(t0 + attack + decay + .1);
    },
    chime() { this.tone(660, { peak: .15, decay: 2.6 }); this.tone(990, { peak: .06, decay: 1.8, at: .02 }); this.tone(1320, { peak: .03, decay: 1.2, at: .04 }); },
    awaken() { [196, 247, 294, 392, 494].forEach((f, i) => this.tone(f, { peak: .09, attack: .05, decay: 3.2, at: i * .12 })); },
    startBed() {
      if (!this.ctx || this.bed) return;
      const g = this.ctx.createGain(); g.gain.value = .0001;
      const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = .6;
      [98, 98.7, 49, 147.2].forEach((f, i) => {
        const o = this.ctx.createOscillator(); o.type = i === 2 ? 'triangle' : 'sine'; o.frequency.value = f;
        const og = this.ctx.createGain(); og.gain.value = [.5, .4, .35, .12][i]; o.connect(og); og.connect(lp); o.start();
      });
      const lfo = this.ctx.createOscillator(), lg = this.ctx.createGain(); lfo.frequency.value = .08; lg.gain.value = 160; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
      lp.connect(g); g.connect(this.master); this.bed = { g }; this.bedLevel(.035, 4);
    },
    bedLevel(v, time = 2) { if (this.bed) this.bed.g.gain.setTargetAtTime(Math.max(v, .0001), this.t, time / 3); },
    harmonic(len = 8, peak = .07) {
      if (!this.ctx) return;
      [196, 246.94, 293.66, 392, 587.33].forEach((f, i) => {
        const t0 = this.t, o = this.ctx.createOscillator(), g = this.ctx.createGain(), pk = peak / (1 + i * .4);
        o.frequency.value = f; g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(pk, t0 + 2.2 + i * .3);
        g.gain.setValueAtTime(pk, t0 + len - 2); g.gain.exponentialRampToValueAtTime(.0001, t0 + len + 1.5);
        o.connect(g); g.connect(this.master); o.start(t0); o.stop(t0 + len + 2);
      });
    },
    stress(len = 4) { for (let t = 0; t < len; t += .42) this.tone(1480 + Math.random() * 60, { type: 'triangle', peak: .06, attack: .005, decay: .12, at: t }); },
    breath(dir = 'in', dur = 4) {
      if (!this.ctx) return;
      const src = this.ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
      const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = .7;
      const g = this.ctx.createGain(), t0 = this.t;
      bp.frequency.setValueAtTime(dir === 'in' ? 380 : 900, t0); bp.frequency.linearRampToValueAtTime(dir === 'in' ? 900 : 300, t0 + dur);
      g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.09, t0 + (dir === 'in' ? dur * .8 : .6)); g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
      src.connect(bp); bp.connect(g); g.connect(this.master); src.start(t0); src.stop(t0 + dur + .1);
    },
    pulse() { this.tone(55, { peak: .35, attack: .01, decay: .45 }); this.tone(110, { peak: .08, attack: .01, decay: .3 }); }
  };

  async function keepAwake() { try { if ('wakeLock' in navigator && document.visibilityState === 'visible') await navigator.wakeLock.request('screen'); } catch (e) {} }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && state.activated) { keepAwake(); Audio.ctx && Audio.ctx.resume(); } });

  /* =========================================================
     ROUTER
     ========================================================= */
  let current = null, pending = null, pendingAnchor = null;

  function parse(r) {
    if (/^t[1-4]$/.test(r)) return { screen: 'cammino', n: +r[1] - 1 };
    if (/^r[1-4]$/.test(r)) return { screen: 'rito', n: +r[1] - 1 };
    if (['intro', 'storia', 'terreno', 'pianta', 'rituale', 'fine'].includes(r)) return { screen: r };
    return null;
  }
  function navigate(r) { if (location.hash === '#' + r) render(r); else location.hash = r; }

  function render(r) {
    const info = parse(r);
    if (!info) return navigate('intro');
    if (!state.activated) { pending = r; return showScreen('attiva'); }
    closeSheet(false);
    if (current === r) return;
    stopRun(); stopVoice();
    current = r; state.route = r; save();
    document.body.classList.remove('night', 'hide-ui');
    ({ intro: () => Sky.set('dawn'), storia: renderStoria, terreno: renderTerreno, pianta: () => Sky.set('pianta'),
       rituale: renderRituale, cammino: renderCammino, rito: renderRito, fine: renderFine })[info.screen](info.n);
    showScreen(info.screen);
    updateDock();
    if (pendingAnchor) { const a = document.getElementById(pendingAnchor); pendingAnchor = null; a && setTimeout(() => a.scrollIntoView({ behavior: 'smooth', block: 'start' }), 600); }
  }

  function showScreen(name) {
    $$('.screen').forEach(s => { const on = s.dataset.screen === name; s.classList.toggle('is-active', on); if (on) s.scrollTop = 0; });
    document.body.classList.toggle('is-attiva', name === 'attiva');
    document.body.classList.remove('scrolled');
    const s = $(`.screen[data-screen="${name}"]`);
    $('#barTitle').textContent = (s && s.dataset.title) || 'Radicamento';
  }
  addEventListener('hashchange', () => render(location.hash.slice(1)));

  // titolo grande che scorrendo passa nella barra (One UI)
  $$('.screen').forEach(s => s.addEventListener('scroll', () => {
    if (s.classList.contains('is-active')) document.body.classList.toggle('scrolled', s.scrollTop > 70);
  }, { passive: true }));

  /* =========================================================
     BARRA IN BASSO — indietro + azione principale
     ========================================================= */
  const backBtn = $('#backBtn'), mainBtn = $('#mainBtn');
  let mainAction = null, backAction = null;

  function setMain(small, big, action, { quiet = false } = {}) {
    $('#mainSmall').textContent = small || '';
    $('#mainBig').textContent = big;
    mainBtn.classList.toggle('is-solo', !small);
    mainBtn.classList.toggle('is-quiet', quiet);
    mainBtn.setAttribute('aria-label', (small ? small + ': ' : '') + big);
    mainAction = action;
  }
  function setBack(action, label, ico = 'i-back') {
    backAction = action; backBtn.disabled = !action;
    backBtn.setAttribute('aria-label', label || 'Indietro');
    $('#backIco').setAttribute('href', '#' + ico);
  }

  function updateDock() {
    const i = SEQ.indexOf(current), prev = SEQ[i - 1], next = SEQ[i + 1];
    $('#trailFill').style.width = (i / (SEQ.length - 1) * 100) + '%';
    setBack(prev ? () => navigate(prev) : (current === 'intro' ? restartIntro : null), prev ? 'Indietro: ' + LABEL[prev] : 'Torna all’inizio');
    const info = parse(current);

    if (info.screen === 'cammino') {
      setMain(`Tappa ${info.n + 1} di 4`, 'Sono arrivato', () => { Audio.init(); vibrate(20); navigate('r' + (info.n + 1)); });
    } else if (info.screen === 'rito') {
      if (run) {
        setBack(() => { stopRun(); renderRito(ritoN); updateDock(); }, 'Interrompi il rito', 'i-close');
        setMain('', 'Gesto successivo', () => run && endGesture(), { quiet: true });
      } else {
        setMain(`Circa ${durOf(TAPPE[info.n])} secondi`, 'Inizia il rito', startRito);
      }
    } else if (info.screen === 'fine') {
      const todo = nextTodo();
      if (todo === -1) setMain('Dalla prima tappa', 'Ripeti il rito', () => { state.done = []; save(); navigate('t1'); });
      else setMain(4 - state.done.length === 1 ? 'Manca 1 tappa' : 'Mancano ' + (4 - state.done.length) + ' tappe', `Vai alla tappa ${todo + 1}`, () => navigate('t' + (todo + 1)));
    } else if (info.screen === 'rituale') {
      const todo = nextTodo(), go = todo === -1 ? 0 : todo;
      setMain(state.done.length ? 'Continua' : 'Inizia', `Tappa ${go + 1}: ${TAPPE[go].name}`, () => navigate('t' + (go + 1)));
    } else {
      setMain('Avanti', LABEL[next], () => navigate(next));
    }
  }
  mainBtn.addEventListener('click', () => mainAction && mainAction());
  backBtn.addEventListener('click', () => backAction && backAction());

  // swipe orizzontale sulle pagine di lettura
  let sx = 0, sy = 0, st = 0;
  $('#app').addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now(); }, { passive: true });
  $('#app').addEventListener('touchend', e => {
    if (!current || run || e.target.closest('input, textarea, .soil, .sigil, .press')) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Date.now() - st > 600 || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    const i = SEQ.indexOf(current);
    if (dx > 0 && SEQ[i - 1]) navigate(SEQ[i - 1]);
    if (dx < 0 && SEQ[i + 1] && !/^t/.test(current) && !/^r/.test(current)) navigate(SEQ[i + 1]);
  }, { passive: true });

  /* =========================================================
     INDICE — pannello dal basso
     ========================================================= */
  const sheet = $('#sheet'), scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function statusPill(i) {
    if (state.done.includes(i)) return '<span class="status status--done">Fatta</span>';
    if (i === nextTodo()) return '<span class="status status--here">Prossima</span>';
    return '<span class="status status--todo">Da fare</span>';
  }
  function buildSheet() {
    const g = $('#sheetRite');
    $$('li.t-row', g).forEach(li => li.remove());
    TAPPE.forEach((t, i) => {
      const li = document.createElement('li'); li.className = 't-row';
      li.innerHTML = `<a href="#t${i + 1}" data-go="t${i + 1}"><span class="g-ico"><img src="${t.glyph}" alt=""></span><span class="g-txt"><b>${t.name}</b><span>Tappa ${i + 1}</span></span>${statusPill(i)}</a>`;
      g.appendChild(li);
    });
    $$('[data-go]', sheet).forEach(a => {
      const here = a.dataset.go === current || (a.dataset.go[0] === 't' && current === 'r' + a.dataset.go[1]);
      a.classList.toggle('is-here', here);
      if (here) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function openSheet() {
    buildSheet();
    scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-open'));
    sheet.classList.add('is-open'); sheet.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#sheetClose').focus(), 300);
  }
  function closeSheet(returnFocus = true) {
    if (!sheet.classList.contains('is-open')) return;
    sheet.classList.remove('is-open'); sheet.setAttribute('aria-hidden', 'true'); sheet.style.transform = '';
    scrim.classList.remove('is-open'); setTimeout(() => { scrim.hidden = true; }, 350);
    if (returnFocus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', openSheet);
  $('#sheetClose').addEventListener('click', () => closeSheet());
  scrim.addEventListener('click', () => closeSheet());
  addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  sheet.addEventListener('click', e => {
    const a = e.target.closest('a[data-go]'); if (!a) return;
    if (a.dataset.go === 'intro') { e.preventDefault(); closeSheet(false); restartIntro(); return; }
    if (a.dataset.anchor) pendingAnchor = a.dataset.anchor;
    if (a.dataset.go === current) { e.preventDefault(); closeSheet(); if (pendingAnchor) { $('#' + pendingAnchor).scrollIntoView({ behavior: 'smooth' }); pendingAnchor = null; } }
  });
  // trascina in basso per chiudere
  let dragY = null;
  ['#sheetGrab', '.sheet-head'].forEach(sel => {
    const el = $(sel);
    el.addEventListener('touchstart', e => { dragY = e.touches[0].clientY; sheet.style.transition = 'none'; }, { passive: true });
    el.addEventListener('touchmove', e => { if (dragY === null) return; const dy = Math.max(0, e.touches[0].clientY - dragY); sheet.style.transform = `translateY(${dy}px)`; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (dragY === null) return; const dy = e.changedTouches[0].clientY - dragY; dragY = null;
      sheet.style.transition = ''; sheet.style.transform = '';
      if (dy > 90) closeSheet();
    });
  });
  // ricomincia: doppia conferma
  let resetArmed = 0;
  $('#resetBtn').addEventListener('click', () => {
    const b = $('#resetBtn b'), s = $('#resetBtn .g-txt span');
    if (!resetArmed) {
      b.textContent = 'Tocca di nuovo per confermare'; s.textContent = 'Tappe e annotazioni verranno cancellate';
      resetArmed = setTimeout(() => { resetArmed = 0; b.textContent = 'Ricomincia da capo'; s.textContent = 'Azzera tappe e annotazioni'; }, 3500);
      return;
    }
    clearTimeout(resetArmed); resetArmed = 0;
    b.textContent = 'Ricomincia da capo'; s.textContent = 'Azzera tappe e annotazioni';
    state = Object.assign(blank(), { activated: true }); save();
    $$('textarea[data-note]').forEach(t => t.value = '');
    closeSheet(false); restartIntro();
  });

  /* =========================================================
     ATTIVAZIONE — tieni premuto il cerchio
     ========================================================= */
  const DOTS = 28, dotsG = $('#sigilDots');
  for (let i = 0; i < DOTS; i++) {
    const a = (i / DOTS) * Math.PI * 2 - Math.PI / 2, c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', 100 + Math.cos(a) * 84); c.setAttribute('cy', 100 + Math.sin(a) * 84); c.setAttribute('r', 4);
    dotsG.appendChild(c);
  }
  const dots = $$('circle', dotsG), sigil = $('#sigil'), HOLD = 2600;
  let holdStart = 0, holdRaf = 0, activating = false, lastLit = 0;
  const HINT = 'Tieni premuto il cerchio<br>per attivare il dispositivo';
  function holdTick(now) {
    const p = Math.min((now - holdStart) / HOLD, 1), n = Math.floor(p * DOTS);
    dots.forEach((d, i) => d.classList.toggle('on', i < n));
    if (n !== lastLit && n % 4 === 0) vibrate(8); lastLit = n;
    Sky.pulse = 1 + p * .6;
    if (p >= 1) return completeActivation();
    holdRaf = requestAnimationFrame(holdTick);
  }
  function holdDown(e) {
    if (activating) return; e && e.preventDefault();
    Audio.init(); holdStart = performance.now(); sigil.classList.add('holding');
    $('#sigilHint').innerHTML = 'Resta così…<br>il quadrante ti sta riconoscendo';
    holdRaf = requestAnimationFrame(holdTick);
  }
  function holdUp() {
    if (activating) return; cancelAnimationFrame(holdRaf); Sky.pulse = 1;
    sigil.classList.remove('holding'); dots.forEach(d => d.classList.remove('on')); $('#sigilHint').innerHTML = HINT;
  }
  // torna alla schermata iniziale: cerchio da tenere premuto, poi Introduzione
  function restartIntro() {
    stopRun(); stopVoice();
    document.body.classList.remove('night', 'hide-ui');
    cancelAnimationFrame(holdRaf); activating = false; Sky.pulse = 1;
    sigil.classList.remove('holding', 'done'); void sigil.offsetWidth;
    dots.forEach(d => d.classList.remove('on')); $('#sigilHint').innerHTML = HINT;
    current = null; pending = 'intro';
    history.replaceState(null, '', location.pathname);
    Sky.set('dawn'); showScreen('attiva');
  }
  function completeActivation() {
    activating = true; sigil.classList.remove('holding'); sigil.classList.add('done');
    vibrate([30, 60, 30, 60, 120]); Audio.init(); Audio.awaken(); Audio.startBed(); keepAwake();
    Sky.pulse = 1; state.activated = true; save();
    setTimeout(() => navigate(pending || 'intro'), 1400);
  }
  sigil.addEventListener('pointerdown', holdDown);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => sigil.addEventListener(ev, holdUp));
  sigil.addEventListener('contextmenu', e => e.preventDefault());
  sigil.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) holdDown(e); });
  sigil.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') holdUp(); });

  /* =========================================================
     STORIA — il cielo passa dallo smog alla fioritura
     ========================================================= */
  const storia = $('#storiaScreen');
  storia.addEventListener('scroll', () => {
    if (current !== 'storia') return;
    const max = storia.scrollHeight - storia.clientHeight;
    Sky.mix('smog', 'bloom', smooth(.1, .95, max > 0 ? storia.scrollTop / max : 0));
  }, { passive: true });
  function renderStoria() { Sky.mix('smog', 'bloom', 0); }

  /* =========================================================
     IL FATTORE TERRENO — spaccato del suolo
     ========================================================= */
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs, parent) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); parent && parent.appendChild(el); return el; };
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const PLANTS = [
    { x: 70, at: .12, depth: 150 }, { x: 150, at: .2, depth: 175 }, { x: 230, at: .3, depth: 160 },
    { x: 110, at: .45, depth: 120 }, { x: 280, at: .5, depth: 135 }, { x: 190, at: .62, depth: 110 }, { x: 35, at: .7, depth: 95 }
  ];
  const svg = $('#soilSvg'), gTox = $('#soilToxic'), gRoots = $('#soilRoots'), gSeq = $('#soilSeq'), gPlants = $('#soilPlants');
  const waterStain = mk('rect', { x: 0, y: 186, width: 320, height: 64, fill: '#141215', opacity: .6 }); svg.insertBefore(waterStain, gTox);
  const toxDots = Array.from({ length: 64 }, () => {
    const x = 6 + rnd() * 308, y = 60 + Math.pow(rnd(), .7) * 180, th = .25 + rnd() * .72, r = 1.2 + rnd() * 1.6;
    return { x, y, th, d: mk('circle', { cx: x, cy: y, r, class: 'tox' }, gTox), s: mk('circle', { cx: x, cy: y, r: r * .9, class: 'seq', opacity: 0 }, gSeq) };
  });
  PLANTS.forEach(pl => {
    pl.roots = [0, 1, 2].map(k => {
      let x = pl.x, y = 54, d = `M${x} ${y}`;
      const len = pl.depth * (k === 0 ? 1 : .55 + rnd() * .3), dir = k === 0 ? 0 : (k === 1 ? -1 : 1);
      for (let s = 1; s <= 6; s++) { const nx = x + dir * 6 + (rnd() - .5) * 14, ny = 54 + len * s / 6; d += ` Q${(x + nx) / 2 + (rnd() - .5) * 10} ${(y + ny) / 2} ${nx} ${ny}`; x = nx; y = ny; }
      return mk('path', { d, class: 'root', 'stroke-width': k === 0 ? 1.6 : 1, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, gRoots);
    });
    const g = mk('g', { class: 'plant', opacity: 0 }, gPlants);
    mk('path', { d: `M${pl.x} 53 Q${pl.x - 2} 40 ${pl.x} 28 M${pl.x} 36 Q${pl.x + 6} 30 ${pl.x + 10} 24 M${pl.x} 40 Q${pl.x - 7} 33 ${pl.x - 11} 29`, stroke: '#5E9A68', 'stroke-width': 1.2, fill: 'none' }, g);
    [[0, 26], [10, 22], [-11, 27], [4, 24], [-5, 25], [13, 25]].forEach(([dx, y], i) => mk('circle', { cx: pl.x + dx, cy: y, r: 1.9, fill: i % 2 ? '#C7B5DD' : '#9373B1' }, g));
    mk('path', { d: `M${pl.x - 6} 53 Q${pl.x - 9} 46 ${pl.x - 3} 44 Q${pl.x - 2} 50 ${pl.x} 53 Q${pl.x + 3} 47 ${pl.x + 8} 45 Q${pl.x + 7} 51 ${pl.x + 2} 53Z`, fill: '#80C184' }, g);
    pl.g = g;
  });
  const range = $('#soilRange');
  function updateSoil() {
    const year = +range.value, p = (year - 2027) / (2076 - 2027), cleaned = smooth(.18, 1, p) * .9;
    let maxGrow = 0;
    PLANTS.forEach(pl => {
      const g = clamp((p - pl.at) / (1 - pl.at) * 1.4);
      maxGrow = Math.max(maxGrow, g * pl.depth / 175);
      pl.g.setAttribute('opacity', g > 0 ? 1 : 0);
      pl.g.style.transform = `scale(${.3 + .7 * clamp(g * 2)})`;
      pl.roots.forEach(rt => rt.setAttribute('stroke-dashoffset', 1 - g));
      pl.depthNow = 54 + pl.depth * g;
    });
    toxDots.forEach(t => {
      const gone = 1 - t.th < cleaned;
      t.d.style.opacity = gone ? 0 : .85;
      t.s.style.opacity = gone && PLANTS.some(pl => pl.depthNow > t.y && Math.abs(pl.x - t.x) < 42) ? .95 : 0;
    });
    waterStain.setAttribute('opacity', (.6 * (1 - smooth(.3, 1, p))).toFixed(2));
    $('#mToxic').style.width = ((1 - cleaned) * 100).toFixed(0) + '%';
    $('#mRoots').style.width = (maxGrow * 100).toFixed(0) + '%';
    $('#mSpecies').textContent = Math.round(150 * smooth(.12, .98, p));
    $('#soilYear').textContent = year;
    range.setAttribute('aria-valuetext', year);
    const st = [...SOIL_STAGES].reverse().find(s => year >= s.from);
    if ($('#soilStage').textContent !== st.name) {
      $('#soilStage').textContent = st.name;
      const txt = $('#soilText'); txt.style.opacity = 0;
      setTimeout(() => { txt.textContent = st.text; txt.style.opacity = 1; }, 200);
    }
    if (current === 'terreno') Sky.mix('earthDead', 'earthLive', p);
  }
  range.addEventListener('input', updateSoil);
  $('#soilText').textContent = SOIL_STAGES[0].text;
  function renderTerreno() { updateSoil(); }

  /* =========================================================
     LA TUA PIANTA — i tre suoni
     ========================================================= */
  let voiceTimer = 0;
  function stopVoice() {
    clearTimeout(voiceTimer);
    $$('.voice').forEach(b => { b.classList.remove('is-playing'); $('use', b).setAttribute('href', '#i-play'); b.setAttribute('aria-pressed', 'false'); });
    Audio.bedLevel(.035, 1.5);
  }
  $$('.voice').forEach(btn => {
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      Audio.init(); const was = btn.classList.contains('is-playing'); stopVoice(); if (was) return;
      btn.classList.add('is-playing'); btn.setAttribute('aria-pressed', 'true'); $('use', btn).setAttribute('href', '#i-stop');
      const v = btn.dataset.voice;
      if (v === 'low') { Audio.startBed(); Audio.bedLevel(.22, 1.5); voiceTimer = setTimeout(stopVoice, 5000); }
      if (v === 'stress') { Audio.bedLevel(.01, .5); Audio.stress(4); voiceTimer = setTimeout(stopVoice, 4300); }
      if (v === 'harmonic') { Audio.bedLevel(.01, .5); Audio.harmonic(5); voiceTimer = setTimeout(stopVoice, 6500); }
    });
  });

  /* =========================================================
     IL RITUALE — elenco delle tappe
     ========================================================= */
  function renderRituale() {
    Sky.set('rituale');
    $('#riteList').innerHTML = TAPPE.map((t, i) => `
      <li><a class="card rite-row" href="#t${i + 1}" style="--tint:${t.tint}">
        <img src="${t.glyph}" alt="">
        <span class="rr-txt"><span class="rr-num">Tappa ${i + 1}</span><span class="rr-name">${t.name}</span><span class="rr-meta">${t.gestures.length} gesti, circa ${durOf(t)} secondi</span></span>
        ${statusPill(i)}
      </a></li>`).join('');
  }

  /* =========================================================
     TAPPA — verso la stazione
     ========================================================= */
  function renderCammino(n) {
    const t = TAPPE[n];
    Sky.set(t.palette);
    const toast = $('#doneToast');
    if (state.justDone === n - 1 && n > 0) {
      toast.hidden = false;
      $('#toastTitle').textContent = `Tappa ${n} completata`;
      $('#toastSub').textContent = TAPPE[n - 1].doneTitle;
    } else toast.hidden = true;
    state.justDone = null; save();
    $('#camminoKicker').textContent = `Tappa ${n + 1} di 4`;
    $('#camminoGlyph').src = t.glyph;
    $('#camminoName').textContent = t.name;
    $('#camminoLead').textContent = t.lead;
    $('#camminoStem').innerHTML = TAPPE.map((tp, i) => {
      const done = state.done.includes(i);
      return `<li class="${done ? 'done' : ''} ${i === n ? 'current' : ''}"><a href="#t${i + 1}" aria-label="Tappa ${i + 1}: ${tp.name}${done ? ', fatta' : ''}"${i === n ? ' aria-current="step"' : ''}><span class="node">${done && i !== n ? icon('i-check') : ''}</span>${tp.name}</a></li>`;
    }).join('');
  }

  /* =========================================================
     RITO — sfera respirante, cinque gesti
     ========================================================= */
  const ritoScreen = $('.screen--rito'), orbCore = $('#orbCore'), ringFg = $('#ringFg'), pad = $('#pressPad');
  let run = null, ritoN = 0, pulseTimer = 0;

  function setOrb(transform = '', filter = '', opacity = '', dur) {
    if (dur !== undefined) orbCore.style.transitionDuration = `${dur}s, 2.5s, 1.2s`;
    orbCore.style.transform = transform; orbCore.style.filter = filter; orbCore.style.opacity = opacity;
  }
  function renderRito(n) {
    ritoN = n; const t = TAPPE[n];
    Sky.set(t.palette);
    ritoScreen.classList.remove('is-running');
    ['o1', 'o2', 'o3'].forEach((k, i) => ritoScreen.style.setProperty('--' + k, t.orb[i]));
    $('#ritoKicker').textContent = `Tappa ${n + 1} di 4`;
    $('#ritoTitle').textContent = t.name;
    $('#ritoIntro').textContent = t.intro;
    $('#ritoGlyph').src = t.glyph;
    $('#ritoChips').innerHTML = `<span class="chip">${t.gestures.length} gesti</span><span class="chip">${t.chip}</span>`;
    $('#gDots').innerHTML = t.gestures.map(() => '<i></i>').join('');
    orbCore.style.transition = 'none'; setOrb(); void orbCore.offsetWidth; orbCore.style.transition = '';
    ringFg.style.strokeDashoffset = 1;
    keepAwake();
  }
  function startRito() {
    Audio.init(); Audio.startBed();
    ritoScreen.classList.add('is-running');
    run = { n: ritoN, idx: -1, elapsed: 0, last: 0, raf: 0, pressing: false };
    updateDock();
    nextGesture();
  }
  const gestureHTML = g => `${g.pre || ''}<span class="k">${g.k}</span>${g.post || ''}`;

  function nextGesture() {
    run.idx++;
    const t = TAPPE[run.n];
    if (run.idx >= t.gestures.length) return finishTappa();
    const g = t.gestures[run.idx], box = $('#gesture');
    box.classList.add('out');
    setTimeout(() => { if (!run) return; $('#gLine').innerHTML = gestureHTML(g); $('#gSub').textContent = g.sub || ''; box.classList.remove('out'); }, run.idx === 0 ? 0 : 420);
    $$('#gDots i').forEach((d, k) => { d.className = k < run.idx ? 'done' : (k === run.idx ? 'now' : ''); });
    run.elapsed = 0; run.last = performance.now(); ringFg.style.strokeDashoffset = 1;
    applyFx(g.fx, g.dur);
    cancelAnimationFrame(run.raf); run.raf = requestAnimationFrame(tick);
  }
  function tick(now) {
    if (!run) return;
    const g = TAPPE[run.n].gestures[run.idx], dt = (now - run.last) / 1000; run.last = now;
    if (g.fx !== 'press' || run.pressing) run.elapsed += dt;
    const p = Math.min(run.elapsed / g.dur, 1);
    ringFg.style.strokeDashoffset = 1 - p;
    if (p >= 1) return endGesture();
    run.raf = requestAnimationFrame(tick);
  }
  let advancing = false;
  function endGesture() {
    if (advancing || !run) return; advancing = true;
    cancelAnimationFrame(run.raf);
    clearFx(TAPPE[run.n].gestures[run.idx].fx);
    Audio.chime(); vibrate(25);
    setTimeout(() => { advancing = false; run && nextGesture(); }, 650);
  }
  function stopRun() {
    if (run) cancelAnimationFrame(run.raf);
    clearInterval(pulseTimer); run = null; advancing = false; pad.hidden = true; Sky.pulse = 1;
    document.body.classList.remove('night', 'hide-ui');
  }
  function applyFx(fx, dur) {
    const t = TAPPE[run.n];
    switch (fx) {
      case 'eyesClose': document.body.classList.add('night'); Sky.set('night'); setOrb('scale(.9)', '', '.8', 3); Audio.bedLevel(.02, 3); break;
      case 'inhale':    setOrb('scale(1.22)', '', '1', dur); Sky.pulse = 1.5; Audio.breath('in', dur); break;
      case 'expand':    setOrb('scale(1.32)', '', '1', dur); Sky.pulse = 1.7; Audio.breath('in', dur * .8); break;
      case 'hold':      setOrb('scale(1.33)', '', '1', .6); break;
      case 'exhale':    setOrb('scale(.86)', '', '1', dur); Sky.pulse = .8; Audio.breath('out', dur); break;
      case 'tilt':      setOrb('rotate(14deg)', '', '1', 3); break;
      case 'quiet':     setOrb('rotate(14deg) scale(.94)', '', '.75', 2); Audio.bedLevel(.06, 2); break;
      case 'drone':     setOrb('scale(1.12)', '', '1', dur); Sky.pulse = 1.4; Audio.bedLevel(.26, 3); break;
      case 'suspend':   setOrb('scale(1.04)', 'blur(1.5px)', '.55', 2); Sky.pulse = 1; Audio.bedLevel(.008, 1.2); break;
      case 'harmonic':  setOrb('scale(1.25)', '', '1', 4); Sky.pulse = 1.8; Audio.harmonic(dur); Audio.bedLevel(.05, 4); break;
      case 'sink':      setOrb('translateY(14px) scale(1.04)', '', '1', dur); vibrate([60, 200, 60]); break;
      case 'squeeze':   setOrb('translateY(14px) scale(.84, 1.06)', '', '1', 1.2); vibrate([120, 120, 120]); break;
      case 'roots':     setOrb('translateY(20px) scale(1.1) rotate(-6deg)', '', '.9', dur); vibrate(40); break;
      case 'press':
        setOrb('scale(.92)', '', '.7', 1); pad.hidden = false;
        pulseTimer = setInterval(() => { if (run && run.pressing) { Audio.pulse(); vibrate(70); Sky.pulse = Sky.pulse > 1.2 ? 1 : 1.5; } }, 900);
        break;
      case 'flow':      setOrb('translate(-10px, -8px) rotate(-12deg) scale(1.12)', '', '1', dur); Sky.pulse = 1.3; Audio.bedLevel(.08, 3); break;
      case 'open':      setOrb('scale(1.04)', '', '1', 2.5); Sky.set(t.palette); Audio.bedLevel(.035, 2); break;
      case 'declutter': document.body.classList.add('hide-ui'); break;
      case 'blur':      setOrb('scale(1.3)', 'blur(14px)', '.85', dur * .6); Sky.pulse = 1.9; break;
      case 'focus':     setOrb('scale(1.08)', 'blur(0)', '1', 2.4); Sky.pulse = 1; Audio.tone(784, { peak: .08, decay: 3 }); break;
      case 'repeat':    setOrb('rotate(360deg) scale(1)', '', '1', dur); document.body.classList.remove('hide-ui'); Audio.harmonic(dur, .05); break;
    }
  }
  function clearFx(fx) {
    if (fx === 'exhale') { document.body.classList.remove('night'); Sky.set(TAPPE[run.n].palette); Sky.pulse = 1; }
    if (fx === 'press') { pad.hidden = true; clearInterval(pulseTimer); run.pressing = false; pad.classList.remove('is-pressed'); Sky.pulse = 1; }
  }
  const press = on => e => {
    e.preventDefault(); if (!run) return;
    run.pressing = on; pad.classList.toggle('is-pressed', on);
    if (on) { Audio.init(); Audio.pulse(); vibrate(70); }
  };
  pad.addEventListener('pointerdown', press(true));
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => pad.addEventListener(ev, press(false)));
  pad.addEventListener('contextmenu', e => e.preventDefault());

  function finishTappa() {
    const n = run.n; stopRun();
    if (!state.done.includes(n)) state.done.push(n);
    state.justDone = n; save();
    setTimeout(() => navigate(n === TAPPE.length - 1 ? 'fine' : 't' + (n + 2)), 800);
  }

  /* =========================================================
     FINE — benvenuto + annotazioni
     ========================================================= */
  function renderFine() {
    Sky.set('fine');
    const all = state.done.length === TAPPE.length;
    $('#fineSub').textContent = all ? 'Il rito è compiuto' : `Tappe completate: ${state.done.length} di 4`;
    if (state.justDone === TAPPE.length - 1) { Audio.harmonic(10, .05); vibrate([40, 80, 40, 80, 40]); state.justDone = null; save(); }
  }
  $$('textarea[data-note]').forEach(ta => {
    ta.value = state.notes[ta.dataset.note] || '';
    const fit = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
    ta.addEventListener('input', () => { state.notes[ta.dataset.note] = ta.value; save(); fit(); });
  });

  /* =========================================================
     SUONO on/off
     ========================================================= */
  const soundBtn = $('#soundBtn');
  soundBtn.addEventListener('click', () => {
    Audio.init(); const on = soundBtn.getAttribute('aria-pressed') !== 'true';
    soundBtn.setAttribute('aria-pressed', String(on)); soundBtn.setAttribute('aria-label', on ? 'Disattiva il suono' : 'Attiva il suono');
    Audio.setMuted(!on); if (on) Audio.startBed();
  });

  /* =========================================================
     AVVIO   ?reset → ricomincia · ?tappa=2 → apre il rito della tappa 2
     ========================================================= */
  const params = new URLSearchParams(location.search);
  if (params.has('reset')) { state = blank(); save(); history.replaceState(null, '', location.pathname); }
  const q = parseInt(params.get('tappa'), 10);
  if (q >= 1 && q <= 4) history.replaceState(null, '', location.pathname + '#r' + q);

  document.addEventListener('pointerdown', () => { if (state.activated) { Audio.init(); Audio.startBed(); keepAwake(); } }, { once: true });

  const startRoute = location.hash.slice(1) || state.route || 'intro';
  if (!state.activated) { pending = parse(startRoute) ? startRoute : 'intro'; showScreen('attiva'); Sky.set('dawn'); }
  else render(parse(startRoute) ? startRoute : 'intro');
})();

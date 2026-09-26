(() => {
  const CARTAS = window.CARTAS;
  const TODAY = new Date();
  const todayIso = [
    TODAY.getFullYear(),
    String(TODAY.getMonth() + 1).padStart(2, "0"),
    String(TODAY.getDate()).padStart(2, "0"),
  ].join("-");

  const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const state = {
    monthKey: monthKeyFromIso(clampIso(todayIso)),
    type: "todas",
    openId: null,
    sound: false,
  };

  const els = {
    intro: document.getElementById("intro"),
    app: document.getElementById("app"),
    enterBtn: document.getElementById("enterBtn"),
    introVideo: document.getElementById("introVideo"),
    loveReel: document.getElementById("loveReel"),
    reelHit: document.getElementById("reelHit"),
    reelPlay: document.getElementById("reelPlay"),
    reelEnd: document.getElementById("reelEnd"),
    replayBtn: document.getElementById("replayBtn"),
    reelSeek: document.getElementById("reelSeek"),
    reelTime: document.getElementById("reelTime"),
    reelMute: document.getElementById("reelMute"),
    reelHearts: document.getElementById("reelHearts"),
    grid: document.getElementById("grid"),
    months: document.getElementById("months"),
    filters: document.getElementById("filters"),
    hero: document.getElementById("heroDay"),
    layer: document.getElementById("letterLayer"),
    meta: document.getElementById("letterMeta"),
    type: document.getElementById("letterType"),
    title: document.getElementById("letterTitle"),
    body: document.getElementById("letterBody"),
    closing: document.getElementById("letterClosing"),
    heartFill: document.getElementById("heartFill"),
    progressText: document.getElementById("progressText"),
    todayBtn: document.getElementById("todayBtn"),
    soundBtn: document.getElementById("soundBtn"),
    prev: document.getElementById("prevLetter"),
    next: document.getElementById("nextLetter"),
    toast: document.getElementById("lockedToast"),
    floatHearts: document.getElementById("floatHearts"),
  };

  function monthKeyFromIso(iso) {
    return iso.slice(0, 7);
  }

  function clampIso(iso) {
    const first = CARTAS[0].date;
    const last = CARTAS[CARTAS.length - 1].date;
    if (iso < first) return first;
    if (iso > last) return last;
    return iso;
  }

  function isUnlocked(letter) {
    return letter.date <= todayIso;
  }

  function readSet() {
    try {
      return new Set(JSON.parse(localStorage.getItem("mai-leidas") || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveRead(id) {
    const set = readSet();
    set.add(id);
    localStorage.setItem("mai-leidas", JSON.stringify([...set]));
    renderProgress();
  }

  function renderProgress() {
    const set = readSet();
    const n = [...set].filter((id) => CARTAS.some((c) => c.id === id)).length;
    const pct = Math.round((n / CARTAS.length) * 100);
    els.heartFill.style.height = `${pct}%`;
    els.progressText.textContent = `${n} / ${CARTAS.length}`;
  }

  function uniqueTypes() {
    const map = new Map();
    for (const c of CARTAS) {
      if (!map.has(c.type)) map.set(c.type, { id: c.type, label: c.typeLabel, emoji: c.emoji });
    }
    return [...map.values()];
  }

  function uniqueMonths() {
    const keys = [...new Set(CARTAS.map((c) => monthKeyFromIso(c.date)))];
    return keys.map((key) => {
      const [y, m] = key.split("-");
      return { key, label: `${MONTH_NAMES[Number(m) - 1]} ${y}` };
    });
  }

  function cartaHoy() {
    return CARTAS.find((c) => c.date === todayIso) || CARTAS.filter((c) => c.date <= todayIso).at(-1) || CARTAS[0];
  }

  function renderFilters() {
    const types = [{ id: "todas", label: "Todas", emoji: "💌" }, ...uniqueTypes()];
    els.filters.innerHTML = types
      .map(
        (t) =>
          `<button type="button" class="chip ${state.type === t.id ? "is-on" : ""}" data-type="${t.id}">${t.emoji} ${t.label}</button>`
      )
      .join("");
  }

  function renderMonths() {
    els.months.innerHTML = uniqueMonths()
      .map(
        (m) =>
          `<button type="button" class="month-chip ${state.monthKey === m.key ? "is-on" : ""}" data-month="${m.key}">${m.label}</button>`
      )
      .join("");
  }

  function renderHero() {
    const hoy = cartaHoy();
    const unlocked = isUnlocked(hoy);
    els.hero.innerHTML = `
      <p>Carta de hoy · ${hoy.humanDate}</p>
      <h2>${hoy.emoji} ${hoy.title}</h2>
      <p>${hoy.typeLabel} · número ${hoy.id} de ${CARTAS.length}</p>
      <button type="button" class="open-today" data-open="${hoy.id}">${unlocked ? "Abrir la de hoy" : "Todavía viaja"}</button>
    `;
  }

  function visibleLetters() {
    return CARTAS.filter((c) => {
      const monthOk = monthKeyFromIso(c.date) === state.monthKey;
      const typeOk = state.type === "todas" || c.type === state.type;
      return monthOk && typeOk;
    });
  }

  function renderGrid() {
    const list = visibleLetters();
    const reads = readSet();
    els.grid.innerHTML = list
      .map((c, i) => {
        const locked = !isUnlocked(c);
        const read = reads.has(c.id);
        return `
          <button type="button" class="envelope ${locked ? "is-locked" : ""} ${read ? "is-read" : ""}" data-id="${c.id}" style="animation-delay:${(i % 12) * 40}ms">
            <div class="envelope-card">
              <div class="flap"></div>
              <div class="stamp">${locked ? "✦" : c.emoji}</div>
              <div class="env-date">${c.humanDate.replace(/ de 20\d{2}$/, "")}</div>
              <h3 class="env-title">${locked ? "Sobre lacrado" : c.title}</h3>
              <div class="env-type">${c.typeLabel}</div>
              ${locked ? `<div class="lock-note">Llega el ${c.humanDate}</div>` : ""}
            </div>
          </button>`;
      })
      .join("");
  }

  function openLetter(id) {
    const letter = CARTAS.find((c) => c.id === id);
    if (!letter) return;
    if (!isUnlocked(letter)) {
      showLocked(letter);
      return;
    }
    state.openId = letter.id;
    saveRead(letter.id);
    els.meta.textContent = `${letter.humanDate} · carta ${letter.id} / ${CARTAS.length}`;
    els.type.textContent = `${letter.emoji} ${letter.typeLabel}`;
    els.title.textContent = letter.title;
    els.body.textContent = letter.body;
    els.closing.textContent = letter.closing;
    els.layer.hidden = false;
    document.body.style.overflow = "hidden";
    burst();
    if (state.sound) chime();
  }

  function closeLetter() {
    els.layer.hidden = true;
    document.body.style.overflow = "";
    state.openId = null;
    renderGrid();
  }

  function neighbor(delta) {
    if (!state.openId) return;
    const idx = CARTAS.findIndex((c) => c.id === state.openId);
    let next = idx + delta;
    while (next >= 0 && next < CARTAS.length) {
      if (isUnlocked(CARTAS[next])) {
        openLetter(CARTAS[next].id);
        return;
      }
      next += delta;
    }
  }

  function showLocked(letter) {
    els.toast.hidden = false;
    els.toast.querySelector("span").textContent = letter.humanDate;
    clearTimeout(showLocked._t);
    showLocked._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2800);
  }

  function burst() {
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.textContent = ["💗", "🌸", "✨", "☁️", "🎀"][i % 5];
      s.style.left = `${10 + Math.random() * 80}vw`;
      s.style.animationDuration = `${6 + Math.random() * 5}s`;
      s.style.fontSize = `${14 + Math.random() * 16}px`;
      els.floatHearts.appendChild(s);
      setTimeout(() => s.remove(), 9000);
    }
  }

  let audioCtx;
  function chime() {
    try {
      audioCtx = audioCtx || new AudioContext();
      const now = audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02 + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7 + i * 0.08);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + 1 + i * 0.08);
      });
    } catch {
      /* ignore */
    }
  }

  function sparkles() {
    const canvas = document.getElementById("sparkles");
    const ctx = canvas.getContext("2d");
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.4 + 0.1,
      a: Math.random(),
    }));
    function resize() {
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
    }
    resize();
    addEventListener("resize", resize);
    function tick() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s / 1000;
        if (d.y < 0) d.y = 1;
        d.a += 0.02;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.sin(d.a) * 0.25})`;
        ctx.arc(d.x * w, d.y * h, d.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  function seedHearts() {
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.textContent = ["💗", "🌸", "✨", "☁️"][i % 4];
      s.style.left = `${Math.random() * 100}vw`;
      s.style.animationDelay = `${Math.random() * 9}s`;
      s.style.animationDuration = `${8 + Math.random() * 6}s`;
      els.floatHearts.appendChild(s);
    }
  }

  function fmtTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function popReelHearts(x, y) {
    if (!els.reelHearts) return;
    for (let i = 0; i < 5; i++) {
      const h = document.createElement("span");
      h.textContent = ["💗", "✨", "🌸", "🤍"][i % 4];
      h.style.left = `${x + (Math.random() * 36 - 18)}px`;
      h.style.top = `${y + (Math.random() * 20 - 10)}px`;
      h.style.animationDelay = `${i * 40}ms`;
      els.reelHearts.appendChild(h);
      setTimeout(() => h.remove(), 1000);
    }
  }

  function syncReelUI() {
    const v = els.introVideo;
    if (!v || !els.loveReel) return;
    const playing = !v.paused && !v.ended;
    els.loveReel.classList.toggle("is-playing", playing);
    els.loveReel.classList.toggle("is-ended", v.ended);
    els.reelHit.setAttribute("aria-label", playing ? "Pausar el video" : "Reproducir el video de introducción");
    if (els.reelPlay) {
      els.reelPlay.querySelector(".reel-play-text").textContent = playing
        ? "Pausa"
        : v.currentTime > 0.4 && !v.ended
          ? "Sigue mirando"
          : "Toca para verme";
      els.reelPlay.querySelector(".reel-play-icon").textContent = playing ? "❚❚" : "▶";
    }
    els.reelEnd.hidden = !v.ended;
    const dur = v.duration || 0;
    if (dur && !els.reelSeek.dataset.dragging) {
      els.reelSeek.value = String(Math.round((v.currentTime / dur) * 1000));
    }
    els.reelTime.textContent = `${fmtTime(v.currentTime)} / ${fmtTime(dur)}`;
  }

  async function toggleIntroVideo(ev) {
    const v = els.introVideo;
    if (!v) return;
    if (v.ended) {
      v.currentTime = 0;
    }
    if (v.paused) {
      try {
        await v.play();
        const screen = els.loveReel.querySelector(".reel-screen");
        const r = screen.getBoundingClientRect();
        if (ev && Number.isFinite(ev.clientX)) {
          popReelHearts(ev.clientX - r.left, ev.clientY - r.top);
        } else {
          popReelHearts(screen.clientWidth / 2, screen.clientHeight / 2);
        }
        burst();
      } catch {
        /* autoplay bloqueado: espera otro toque */
      }
    } else {
      v.pause();
    }
    syncReelUI();
  }

  function bindIntroVideo() {
    const v = els.introVideo;
    if (!v) return;
    els.reelHit.addEventListener("click", (e) => {
      e.preventDefault();
      toggleIntroVideo(e);
    });
    els.replayBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      v.currentTime = 0;
      toggleIntroVideo(e);
    });
    v.addEventListener("play", syncReelUI);
    v.addEventListener("pause", syncReelUI);
    v.addEventListener("ended", () => {
      syncReelUI();
      burst();
      els.enterBtn.classList.add("is-ready");
    });
    v.addEventListener("timeupdate", syncReelUI);
    v.addEventListener("loadedmetadata", syncReelUI);
    els.reelSeek.addEventListener("pointerdown", () => {
      els.reelSeek.dataset.dragging = "1";
    });
    const seekTo = () => {
      if (!v.duration) return;
      v.currentTime = (Number(els.reelSeek.value) / 1000) * v.duration;
    };
    els.reelSeek.addEventListener("input", seekTo);
    els.reelSeek.addEventListener("change", () => {
      delete els.reelSeek.dataset.dragging;
      seekTo();
    });
    els.reelMute.addEventListener("click", () => {
      v.muted = !v.muted;
      els.reelMute.setAttribute("aria-pressed", String(v.muted));
      els.reelMute.textContent = v.muted ? "🔇" : "♪";
    });
    document.addEventListener("keydown", (e) => {
      if (els.intro.hidden) return;
      if (e.target && ["INPUT", "BUTTON", "TEXTAREA"].includes(e.target.tagName) && e.target !== els.reelHit) {
        if (e.target === els.reelSeek && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
        if (e.target !== els.reelSeek) return;
      }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggleIntroVideo();
      }
    });
    syncReelUI();
  }

  function enter() {
    if (els.introVideo) {
      els.introVideo.pause();
    }
    els.intro.classList.add("hidden");
    els.intro.hidden = true;
    els.app.hidden = false;
    els.app.classList.remove("hidden");
    renderAll();
    if (state.sound) chime();
  }

  function renderAll() {
    renderFilters();
    renderMonths();
    renderHero();
    renderGrid();
    renderProgress();
  }

  els.enterBtn.addEventListener("click", enter);
  els.filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-type]");
    if (!btn) return;
    state.type = btn.dataset.type;
    renderAll();
  });
  els.months.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-month]");
    if (!btn) return;
    state.monthKey = btn.dataset.month;
    renderAll();
  });
  els.grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    openLetter(Number(btn.dataset.id));
  });
  els.hero.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    openLetter(Number(btn.dataset.open));
  });
  els.layer.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeLetter();
  });
  els.prev.addEventListener("click", () => neighbor(-1));
  els.next.addEventListener("click", () => neighbor(1));
  els.todayBtn.addEventListener("click", () => {
    const hoy = cartaHoy();
    state.monthKey = monthKeyFromIso(hoy.date);
    state.type = "todas";
    renderAll();
    openLetter(hoy.id);
  });
  els.soundBtn.addEventListener("click", () => {
    state.sound = !state.sound;
    els.soundBtn.setAttribute("aria-pressed", String(state.sound));
    if (state.sound) chime();
  });
  document.addEventListener("keydown", (e) => {
    if (els.layer.hidden) return;
    if (e.key === "Escape") closeLetter();
    if (e.key === "ArrowLeft") neighbor(-1);
    if (e.key === "ArrowRight") neighbor(1);
  });

  sparkles();
  seedHearts();
  bindIntroVideo();
})();

/* ============================================================================
   Simulador CCST Cybersecurity — lógica da aplicação
   Depende de window.AREAS e window.QUESTIONS (assets/questions.js)
   ============================================================================ */
(function () {
  "use strict";

  const AREAS = window.AREAS;
  const QUESTIONS = window.QUESTIONS;
  const app = document.getElementById("app");
  const progEl = document.getElementById("qprogress");
  const progBar = progEl.querySelector("i");
  const timerEl = document.getElementById("timer");
  const LETTERS = ["A", "B", "C", "D", "E"];
  const STORE_KEY = "sim_ccst_stats_v1";
  const THEME_KEY = "sim_ccst_theme";
  const PASS = 70;

  let session = null; // {list, idx, answers[], flags{}, instant, mode, area, timed, endAt}
  let tick = null;

  /* --------------------------- histórico (localStorage) --------------------------- */
  function loadStats() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
  function saveStats(s) { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {} }
  function recordAnswer(area, correct) {
    const s = loadStats();
    s[area] = s[area] || { seen: 0, right: 0 };
    s[area].seen++; if (correct) s[area].right++;
    saveStats(s);
  }
  // registra a resposta no motor de estudo (agregado + por questão + agendamento)
  function rec(q, correct) {
    if (window.Study) Study.record(q.id, q.a, q.sub, correct);
    else recordAnswer(q.a, correct);
  }

  /* --------------------------- tema --------------------------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  window.toggleTheme = function () {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  };
  (function initTheme() { try { const t = localStorage.getItem(THEME_KEY); if (t) document.documentElement.setAttribute("data-theme", t); } catch (e) {} })();

  /* --------------------------- utilidades --------------------------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function countByArea() {
    const c = {}; Object.keys(AREAS).forEach(k => c[k] = 0);
    QUESTIONS.forEach(q => c[q.a]++); return c;
  }
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sa = a.slice().sort((x, y) => x - y), sb = b.slice().sort((x, y) => x - y);
    return sa.every((v, i) => v === sb[i]);
  }
  // embaralha as alternativas mantendo o mapeamento das corretas
  function prepareQuestion(q) {
    const order = shuffle(q.o.map((_, i) => i));
    const cset = Array.isArray(q.c) ? q.c : [q.c];
    return {
      a: q.a, sub: q.sub, q: q.q,
      id: q.__id || (window.Study ? Study.qid(q.q) : ""),
      o: order.map(i => q.o[i]),
      e: order.map(i => q.e[i]),
      c: cset.map(ci => order.indexOf(ci)).sort((x, y) => x - y),
      multi: cset.length > 1,
    };
  }

  /* =============================== HOME =============================== */
  window.goHome = function () {
    session = null; fc = null; stopTimer();
    progEl.classList.add("hidden");
    timerEl.classList.add("hidden");
    const cnt = countByArea();
    const stats = loadStats();
    const R = window.Study ? Study.readiness() : null;
    let planHTML = "";
    if (window.Plan) {
      const p = Plan.load();
      if (p) {
        const steps = Plan.routine(p, R);
        const pc = Plan.pace(p, R);
        const first = (steps.find(s => s.mode) || {}).mode || "adaptive";
        planHTML = `
        <div class="plan">
          <div class="plan-head">
            <div><div class="plan-eye">🧭 Seu plano de hoje</div><div class="plan-pace">${pc.recado}</div></div>
            <button class="btn primary" onclick="startMode('${first}')">Começar agora</button>
          </div>
          <ol class="plan-steps">
            ${steps.map(s => `<li class="${s.mode ? "clk" : ""}" ${s.mode ? `onclick="startMode('${s.mode}')"` : ""}><span class="pi">${s.icon}</span><span class="pl"><b>${s.label}</b><small>${s.why}</small></span>${s.mode ? '<span class="parrow">›</span>' : ""}</li>`).join("")}
          </ol>
          <div class="plan-foot"><button class="reset-link" onclick="showDiagnostic()">refazer diagnóstico</button></div>
        </div>`;
      } else {
        planHTML = `
        <button class="plan-cta" onclick="showDiagnostic()">
          <span class="pc-i">🧭</span>
          <span class="pc-t"><b>Monte seu plano de estudo (2 min)</b><small>Descubra o formato que grava melhor pra você e receba uma rotina diária sob medida.</small></span>
          <span class="parrow">›</span>
        </button>`;
      }
    }
    let readyHTML = "";
    if (R) {
      const col = R.pct >= 70 ? "var(--ok)" : R.pct >= 45 ? "var(--warn)" : "var(--bad)";
      const circ = 2 * Math.PI * 34;
      const enough = R.seen >= 15;
      const msg = !enough
        ? `Responda mais algumas questões para calibrar sua prontidão (${R.seen} até agora).`
        : (R.pct >= 70 ? "No caminho da aprovação. Mantenha a constância e feche os pontos fracos."
          : "Ainda abaixo do corte. Foque no ponto mais fraco e nos seus erros pendentes.");
      const weakName = R.weakest ? AREAS[R.weakest].nome : "—";
      readyHTML = `
      <div class="ready">
        <div class="ready-ring">
          <svg width="86" height="86" viewBox="0 0 86 86">
            <circle cx="43" cy="43" r="34" fill="none" stroke="var(--surface-2)" stroke-width="8"/>
            <circle cx="43" cy="43" r="34" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"
              transform="rotate(-90 43 43)" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - (enough ? R.pct : 0) / 100)}"/>
          </svg>
          <div class="ready-num">${enough ? R.pct + "<small>%</small>" : "—"}</div>
        </div>
        <div class="ready-info">
          <div class="ready-label">Prontidão para a prova</div>
          <div class="ready-sub">${msg}</div>
          <div class="ready-chips">
            <span class="rchip">🎯 corte 70%</span>
            <span class="rchip ${R.pending ? "warn" : ""}">🔁 ${R.pending} erro(s) pendente(s)</span>
            <span class="rchip ${R.due ? "acc" : ""}">🃏 ${R.due} p/ revisar hoje</span>
            ${R.streak > 1 ? `<span class="rchip">🔥 ${R.streak} dias seguidos</span>` : ""}
          </div>
          ${enough ? `<div class="ready-weak">Ponto mais fraco: <b>${weakName}</b> · <button class="linkbtn" onclick="startArea('${R.weakest}')">atacar agora →</button></div>` : ""}
        </div>
      </div>`;
    }

    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Cisco CCST Cybersecurity · Analista de Cibersegurança Jr</div>
      <h1>Simulador explicativo para o exame</h1>
      <p class="lead">Banco de ${QUESTIONS.length} questões em português, mapeadas aos 5 domínios oficiais do exame. Cada questão mostra a resposta certa <b>e por que cada alternativa está certa ou errada</b>. Há questões de resposta única e de múltipla escolha, como na prova real.</p>

      ${planHTML}
      ${readyHTML}

      <div class="modes">
        <button class="mode featured" onclick="startAdaptive()">
          <div class="mi">🎯</div>
          <div><h3>Treino inteligente <span class="badge">recomendado</span></h3><p>O app escolhe as questões: mistura seus <b>erros pendentes</b> com os <b>domínios em que você está mais fraco</b>. É onde o estudo rende mais.</p></div>
        </button>
        <button class="mode" onclick="startMissed()">
          <div class="mi">🔁</div>
          <div><h3>Meus erros ${R && R.pending ? `<span class="badge warn">${R.pending}</span>` : ""}</h3><p>Refaça só o que você já errou, até acertar cada questão duas vezes seguidas e ela sair da lista. Estudar o erro é o que mais aprova.</p></div>
        </button>
        <button class="mode" onclick="startExam()">
          <div class="mi">▶</div>
          <div><h3>Simulado cronometrado</h3><p>30 questões balanceadas pelos domínios, 40 min, correção só no final — nas mesmas condições da prova (corte 70%).</p></div>
        </button>
        <button class="mode" onclick="showPractice()">
          <div class="mi">◎</div>
          <div><h3>Praticar por domínio</h3><p>Escolha um dos 5 domínios e responda com explicação imediata. Ideal para reforçar pontos fracos.</p></div>
        </button>
        <button class="mode" onclick="startAll()">
          <div class="mi">∞</div>
          <div><h3>Maratona (todas as questões)</h3><p>Todas as ${QUESTIONS.length} questões embaralhadas, com correção imediata. Revisão geral completa.</p></div>
        </button>
        <button class="mode" onclick="showMaterial()">
          <div class="mi">📖</div>
          <div><h3>Material de estudo</h3><p>Resumão da teoria dos 5 domínios do CCST — leia e já treine em seguida. Definições, portas, criptografia, frameworks e mais.</p></div>
        </button>
        <button class="mode" onclick="showFlashcards()">
          <div class="mi">🃏</div>
          <div><h3>Flashcards</h3><p>Memorização rápida: veja a frente, tente lembrar, vire a carta. O que marcar como "revisar" volta no fim (repetição espaçada).</p></div>
        </button>
        <button class="mode" onclick="showPodcasts()">
          <div class="mi">🎧</div>
          <div><h3>Podcasts</h3><p>Ouça os episódios de cada domínio para estudar no trânsito ou na academia. Gerados por você no NotebookLM a partir dos roteiros incluídos.</p></div>
        </button>
      </div>

      <h2 style="margin-top:38px">Seu desempenho por domínio</h2>
      <div class="topics">
        ${Object.keys(AREAS).map(k => {
          const st = stats[k];
          const pct = st && st.seen ? Math.round(st.right / st.seen * 100) : null;
          const barColor = pct === null ? "var(--line)" : pct >= 70 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)";
          return `
          <button class="topic" onclick="startArea('${k}')">
            <div class="trow"><h3>${AREAS[k].nome}</h3><span class="cnt">${cnt[k]}q · ~${AREAS[k].peso}%</span></div>
            <div class="meter"><i style="width:${pct === null ? 0 : pct}%;background:${barColor}"></i></div>
            <span class="stat">${pct === null ? "ainda não praticado" : pct + "% de acerto · " + st.right + "/" + st.seen + " respondidas"}</span>
          </button>`;
        }).join("")}
      </div>
      <div style="text-align:center;margin-top:16px"><button class="reset-link" onclick="resetStats()">Zerar meu histórico de desempenho</button></div>
      <p class="footer-note">Atalhos: <span class="kbd">1</span>–<span class="kbd">5</span> marcar · <span class="kbd">Enter</span> avançar · <span class="kbd">←</span> <span class="kbd">→</span> navegar<br>Baseado no blueprint oficial CCST Cybersecurity (100-160) da Cisco</p>
    </div>`;
    window.scrollTo({ top: 0 });
  };
  window.resetStats = function () { if (confirm("Apagar todo o histórico de desempenho?")) { saveStats({}); if (window.Study) Study.reset(); goHome(); } };

  window.showPractice = function () {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    const cnt = countByArea();
    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Praticar por domínio</div>
      <h1 style="font-size:28px">Escolha o domínio para treinar</h1>
      <p class="lead">Correção e explicação imediatas após cada questão.</p>
      <div class="topics">
        ${Object.keys(AREAS).map(k => `
          <button class="topic" onclick="startArea('${k}')">
            <div class="trow"><h3>${AREAS[k].nome}</h3><span class="cnt">${cnt[k]}q</span></div>
            <span class="stat">~${AREAS[k].peso}% do exame</span>
          </button>`).join("")}
      </div>
      <div style="margin-top:22px"><button class="btn ghost" onclick="goHome()">← Voltar</button></div>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  /* =============================== MATERIAL DE ESTUDO =============================== */
  const MATERIAL = window.MATERIAL || {};
  window.showMaterial = function () {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Material de estudo</div>
      <h1 style="font-size:28px">Resumão dos 5 domínios do CCST</h1>
      <p class="lead">Leia a teoria e, ao final de cada domínio, treine com as questões daquele domínio. Baseado no blueprint oficial CCST Cybersecurity (100-160).</p>
      <div class="topics">
        ${Object.keys(AREAS).map(k => {
          const n = (MATERIAL[k] || []).length;
          return `<button class="topic" onclick="openMaterial('${k}')">
            <div class="trow"><h3>${AREAS[k].nome}</h3><span class="cnt">${n} tópicos</span></div>
            <span class="stat">${(MATERIAL[k] || []).map(s => s.sub).join(" · ")}</span>
          </button>`;
        }).join("")}
      </div>
      <div style="margin-top:22px"><button class="btn ghost" onclick="goHome()">← Voltar</button></div>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  window.openMaterial = function (area) {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    const secs = MATERIAL[area] || [];
    const keys = Object.keys(AREAS);
    const pos = keys.indexOf(area);
    const nextArea = pos >= 0 && pos < keys.length - 1 ? keys[pos + 1] : null;
    app.innerHTML = `
    <div class="fade">
      <div class="qhead">
        <span class="tag"><span class="dot" style="background:${AREAS[area].cor}"></span>${AREAS[area].nome}</span>
        <span class="spacer"></span>
        <button class="btn ghost" style="padding:7px 12px;font-size:13px" onclick="showMaterial()">← Domínios</button>
      </div>
      <div class="material">
        ${secs.map(s => `
          <article class="mcard">
            <div class="msub">${s.sub} · ${AREAS[area].sub[s.sub] || ""}</div>
            <h3>${s.t}</h3>
            ${s.html}
          </article>`).join("")}
      </div>
      <div class="qnav" style="justify-content:center;margin-top:26px">
        <button class="btn primary" onclick="startArea('${area}')">Treinar este domínio →</button>
        ${nextArea ? `<button class="btn" onclick="openMaterial('${nextArea}')">Próximo domínio: ${AREAS[nextArea].nome}</button>` : ""}
      </div>
      <div style="text-align:center;margin-top:18px"><button class="btn ghost" style="font-size:13px" onclick="goHome()">Início</button></div>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  /* =============================== FLASHCARDS =============================== */
  const FC = window.FLASHCARDS || {};
  let fc = null;

  window.showFlashcards = function () {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    const total = Object.keys(FC).reduce((n, k) => n + (FC[k] || []).length, 0);
    const due = window.Study ? Study.dueCards().length : 0;
    const macN = (FC.mac || []).length;
    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Flashcards</div>
      <h1 style="font-size:28px">Memorização rápida</h1>
      <p class="lead">Repetição espaçada: veja a frente, tente responder de cabeça e vire a carta. O que você marca como <b>"revisar"</b> volta cedo; o que você <b>"já sabe"</b> só reaparece dias depois — e o app lembra disso entre as sessões.</p>
      <div class="topics">
        <button class="topic" onclick="startFlashcards('due')" style="grid-column:1/-1;border-color:${due ? "var(--accent)" : "var(--line)"}">
          <div class="trow"><h3>🗓️ Revisar hoje ${due ? `<span class="badge acc">${due}</span>` : ""}</h3><span class="cnt">repetição espaçada</span></div>
          <span class="stat">${due ? `${due} carta(s) no ponto ideal de revisão hoje` : "nada pendente agora — volte amanhã ou estude um baralho abaixo"}</span>
        </button>
        <button class="topic" onclick="startFlashcards('mac')" style="grid-column:1/-1">
          <div class="trow"><h3>🧠 Macetes (mnemônicos)</h3><span class="cnt">${macN} cartas</span></div>
          <span class="stat">ganchos de memória p/ portas, CVSS, Kill Chain, fórmulas…</span>
        </button>
        <button class="topic" onclick="startFlashcards('all')" style="grid-column:1/-1">
          <div class="trow"><h3>Baralho completo — tudo</h3><span class="cnt">${total} cartas</span></div>
          <span class="stat">mistura todos os domínios + macetes</span>
        </button>
        ${Object.keys(AREAS).map(k => `
          <button class="topic" onclick="startFlashcards('${k}')">
            <div class="trow"><h3>${AREAS[k].nome}</h3><span class="cnt">${(FC[k] || []).length} cartas</span></div>
          </button>`).join("")}
      </div>
      <div style="margin-top:22px"><button class="btn ghost" onclick="goHome()">← Voltar</button></div>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  window.startFlashcards = function (area) {
    let src;
    if (area === "due") src = window.Study ? Study.dueCards() : [];
    else if (area === "all") src = [].concat.apply([], Object.keys(FC).map(k => (FC[k] || []).map(c => ({ f: c.f, b: c.b, area: k }))));
    else src = (FC[area] || []).map(c => ({ f: c.f, b: c.b, area: area }));
    // garante id para a repetição espaçada
    src = src.map(c => ({ f: c.f, b: c.b, area: c.area, id: c.id || (window.Study ? Study.cardId(c.area, c.f) : "") }));
    if (!src.length) { showFlashcards(); return; }
    fc = { area: area, queue: shuffle(src), total: src.length, known: 0, flipped: false };
    renderCard();
  };

  function renderCard() {
    progEl.classList.remove("hidden");
    const card = fc.queue[0];
    const done = fc.known;
    progBar.style.width = (done / fc.total * 100) + "%";
    if (!card) { renderFcDone(); return; }
    const a = card.area;
    app.innerHTML = `
    <div class="fade">
      <div class="qhead">
        <span class="tag"><span class="dot" style="background:${AREAS[a] ? AREAS[a].cor : "var(--accent)"}"></span>${AREAS[a] ? AREAS[a].nome : (a === "mac" ? "Macetes" : a === "due" ? "Revisar hoje" : "Flashcards")}</span>
        <span class="spacer"></span>
        <span class="qcount">Sabidas <b>${fc.known}</b>/${fc.total} · restam ${fc.queue.length}</span>
      </div>

      <button class="flashcard ${fc.flipped ? "flipped" : ""}" onclick="flipCard()" aria-label="Virar carta">
        <div class="fc-inner">
          <div class="fc-face fc-front"><span class="fc-hint">frente · clique para virar</span><div class="fc-text">${card.f}</div></div>
          <div class="fc-face fc-back"><span class="fc-hint">resposta</span><div class="fc-text">${card.b}</div></div>
        </div>
      </button>

      <div class="qnav" style="justify-content:center">
        ${fc.flipped
          ? `<button class="btn" style="border-color:var(--warn);color:var(--warn)" onclick="rateCard(false)">↻ Revisar de novo</button>
             <button class="btn primary" onclick="rateCard(true)">✓ Já sei</button>`
          : `<button class="btn primary" onclick="flipCard()">Mostrar resposta</button>`}
      </div>
      <div style="text-align:center;margin-top:16px">
        <button class="btn ghost" style="font-size:13px" onclick="showFlashcards()">Trocar baralho</button>
        <button class="btn ghost" style="font-size:13px" onclick="goHome()">Início</button>
      </div>
      <p class="footer-note">Atalhos: <span class="kbd">Espaço</span> virar · <span class="kbd">1</span> já sei · <span class="kbd">2</span> revisar</p>
    </div>`;
    window.scrollTo({ top: 0 });
  }
  window.flipCard = function () { fc.flipped = !fc.flipped; renderCard(); };
  window.rateCard = function (known) {
    const card = fc.queue.shift();
    if (window.Study && card && card.id) Study.srsRate(card.id, known); // agenda a próxima revisão
    if (known) fc.known++;
    else fc.queue.push(card); // volta para o fim desta sessão
    fc.flipped = false;
    renderCard();
  };
  function renderFcDone() {
    progBar.style.width = "100%";
    app.innerHTML = `
    <div class="fade scorehero">
      <div style="font-size:52px;margin:10px 0">🎉</div>
      <h1 style="font-size:26px">Baralho concluído!</h1>
      <p class="passline" style="color:var(--muted)">Você revisou todas as ${fc.total} cartas até acertar de cabeça.</p>
      <div class="qnav" style="justify-content:center;margin-top:22px">
        <button class="btn" onclick="startFlashcards('${fc.area}')">Repetir este baralho</button>
        <button class="btn" onclick="showFlashcards()">Outro baralho</button>
        <button class="btn primary" onclick="goHome()">Início</button>
      </div>
    </div>`;
    window.scrollTo({ top: 0 });
  }

  /* =============================== PODCASTS =============================== */
  const PODS = window.PODCASTS || [];
  window.showPodcasts = function () {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Podcasts</div>
      <h1 style="font-size:28px">Estude de ouvido</h1>
      <p class="lead">Um episódio por domínio, no estilo conversa entre professores. Você gera os áudios no <b>NotebookLM</b> a partir dos roteiros da pasta <span class="mono">podcasts/</span> e salva em <span class="mono">podcasts/audio/</span> — veja <span class="mono">COMO-USAR.md</span>. Aparecendo aqui, é só dar play.</p>
      <div class="pods">
        ${PODS.map(ep => `
          <div class="podcard">
            <div class="podtop">
              <span class="podnum" style="background:${ep.area && AREAS[ep.area] ? AREAS[ep.area].cor : "var(--accent)"}">${ep.num}</span>
              <div class="podmeta"><h3>${ep.titulo}</h3><p>${ep.desc}</p></div>
            </div>
            <div class="pod-player" id="pod-${ep.num}"><span class="pod-loading">verificando áudio…</span></div>
          </div>`).join("")}
      </div>
      <div style="margin-top:22px"><button class="btn ghost" onclick="goHome()">← Voltar</button></div>
    </div>`;
    PODS.forEach(checkAudio);
    window.scrollTo({ top: 0 });
  };
  function checkAudio(ep) {
    if (typeof fetch === "undefined") return;
    var el = document.getElementById("pod-" + ep.num);
    if (!el) return;
    var exts = ["mp3", "m4a", "wav", "ogg", "opus", "aac"];
    var base = "podcasts/audio/" + ep.num + ".";
    (function tryExt(i) {
      if (i >= exts.length) {
        el.innerHTML = '<div class="pod-hint">🔇 Áudio ainda não adicionado. Gere no NotebookLM (veja <span class="mono">podcasts/COMO-USAR.md</span>) e salve como <span class="mono">' + base + 'm4a</span> (ou .mp3) na pasta <span class="mono">podcasts/audio/</span>.</div>';
        return;
      }
      var url = base + exts[i];
      fetch(url, { method: "HEAD" }).then(function (r) {
        if (r && r.ok && String(r.headers.get("content-type") || "").indexOf("html") === -1) {
          el.innerHTML = '<audio controls preload="none" src="' + url + '"></audio>';
        } else { tryExt(i + 1); }
      }).catch(function () { tryExt(i + 1); });
    })(0);
  }

  /* =============================== DIAGNÓSTICO / PLANO =============================== */
  // roteia um "modo" recomendado para a ação certa
  window.startMode = function (mode) {
    if (mode === "flash-due") return startFlashcards("due");
    if (mode === "flash-mac") return startFlashcards("mac");
    if (mode === "adaptive") return startAdaptive();
    if (mode === "missed") return startMissed();
    if (mode === "exam") return startExam();
    if (mode === "podcasts") return showPodcasts();
    if (mode === "material") return showMaterial();
    return goHome();
  };

  var diag = {};
  window.diagPick = function (field, value, btn) {
    diag[field] = value;
    var group = btn.parentNode.querySelectorAll(".diagopt");
    for (var i = 0; i < group.length; i++) group[i].classList.remove("sel");
    btn.classList.add("sel");
    var b = document.getElementById("diag-go");
    if (b) b.disabled = !(diag.prazo && diag.minutos && diag.contexto && diag.formato);
  };
  window.submitDiagnostic = function () {
    if (!(diag.prazo && diag.minutos && diag.contexto && diag.formato)) return;
    var p = Plan.build({ prazo: diag.prazo, minutos: parseInt(diag.minutos, 10), contexto: diag.contexto, formato: diag.formato });
    Plan.save(p);
    goHome();
  };
  window.showDiagnostic = function () {
    stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
    diag = {};
    function group(field, opts) {
      return '<div class="diaggroup">' + opts.map(function (o) {
        return '<button class="diagopt" onclick="diagPick(\'' + field + '\',\'' + o[0] + '\',this)">' + o[1] + '</button>';
      }).join("") + '</div>';
    }
    app.innerHTML = `
    <div class="hero fade">
      <div class="eyebrow">Diagnóstico · 2 minutos</div>
      <h1 style="font-size:27px">Descubra o seu melhor jeito de estudar</h1>
      <p class="lead">Sem quiz de "estilo de aprendizagem" (isso é mito). Vou ajustar o plano ao seu <b>contexto</b> e ao formato que <b>gravou melhor</b> quando você experimentar de verdade, logo abaixo.</p>

      <div class="diagq"><h3>1. Quando é (ou pode ser) sua prova?</h3>
        ${group("prazo", [["semana", "Menos de 1 semana"], ["mes", "2–4 semanas"], ["dois", "1–2 meses"], ["sem_data", "Sem data ainda"]])}</div>

      <div class="diagq"><h3>2. Quanto tempo por dia você consegue estudar?</h3>
        ${group("minutos", [["15", "~15 min"], ["30", "~30 min"], ["60", "1h ou mais"]])}</div>

      <div class="diagq"><h3>3. Como costuma ser o seu momento de estudo?</h3>
        ${group("contexto", [["audio", "Em movimento / ocupado (áudio)"], ["foco", "Sentado, com foco"], ["misto", "Misto"]])}</div>

      <div class="diagq"><h3>4. Experimente o MESMO conceito em 4 formatos — depois diga qual gravou melhor</h3>
        <p class="diaghint">Conceito-teste: <b>as faixas de severidade do CVSS</b>. Leia os quatro:</p>
        <div class="fmtcards">
          <div class="fmtcard"><span class="fmttag">📖 Ler</span>O CVSS vai de 0 a 10: até 3,9 é baixa; de 4 a 6,9 é média; de 7 a 8,9 é alta; de 9 a 10 é crítica.</div>
          <div class="fmtcard"><span class="fmttag">🧠 Macete</span>Regra <b>4-7-9</b>: no 4 vira média, no 7 vira alta, no 9 vira crítica.</div>
          <div class="fmtcard"><span class="fmttag">🃏 Flashcard</span><b>Frente:</b> faixas do CVSS? · <b>Verso:</b> baixa &lt;4, média 4–6,9, alta 7–8,9, crítica 9–10.</div>
          <div class="fmtcard"><span class="fmttag">🗣️ Explicar</span>Sem olhar: a partir de que nota o CVSS vira "crítica"? (…) Confira: <b>9</b>.</div>
        </div>
        <p class="diaghint">Qual desses fez o conceito <b>clicar</b> mais rápido pra você?</p>
        ${group("formato", [["ler", "📖 Ler o resumo"], ["macete", "🧠 O macete"], ["flashcard", "🃏 O flashcard"], ["explicar", "🗣️ Explicar com minhas palavras"]])}</div>

      <div class="qnav" style="justify-content:center;margin-top:8px">
        <button class="btn primary" id="diag-go" disabled onclick="submitDiagnostic()">Gerar meu plano →</button>
        <button class="btn ghost" onclick="goHome()">Agora não</button>
      </div>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  /* =============================== INICIAR =============================== */
  window.startArea = function (area) {
    const list = shuffle(QUESTIONS.filter(q => q.a === area)).map(prepareQuestion);
    session = newSession(list, { instant: true, mode: "area", area });
    renderQuiz();
  };
  window.startAll = function () {
    const list = shuffle(QUESTIONS).map(prepareQuestion);
    session = newSession(list, { instant: true, mode: "all" });
    renderQuiz();
  };
  window.startExam = function () {
    const target = Math.min(QUESTIONS.length, 30);
    const byArea = {}; Object.keys(AREAS).forEach(k => byArea[k] = shuffle(QUESTIONS.filter(q => q.a === k)));
    let picks = [];
    Object.keys(AREAS).forEach(k => {
      const n = Math.max(1, Math.round(target * AREAS[k].peso / 100));
      picks.push(...byArea[k].slice(0, Math.min(n, byArea[k].length)));
    });
    let pool = shuffle(QUESTIONS.filter(q => picks.indexOf(q) === -1));
    while (picks.length < target && pool.length) picks.push(pool.pop());
    const list = shuffle(picks).slice(0, target).map(prepareQuestion);
    session = newSession(list, { instant: false, mode: "exam", timed: true, minutes: 40 });
    startTimer();
    renderQuiz();
  };
  function newSession(list, opts) {
    fc = null; // sai do modo flashcards ao iniciar um quiz
    return Object.assign({ list, idx: 0, answers: list.map(() => null), flags: {}, review: false }, opts);
  }

  // Treino inteligente: erros pendentes + domínios mais fracos, interleaved
  window.startAdaptive = function () {
    if (!window.Study) { startAll(); return; }
    const raw = Study.adaptiveSet(15);
    if (!raw.length) { startAll(); return; }
    const list = raw.map(prepareQuestion);
    session = newSession(list, { instant: true, mode: "adaptive" });
    renderQuiz();
  };

  // Meus erros: só as questões pendentes (erradas e não dominadas)
  window.startMissed = function () {
    if (!window.Study) { startAll(); return; }
    const raw = Study.missedSet();
    if (!raw.length) {
      stopTimer(); session = null; fc = null; progEl.classList.add("hidden"); timerEl.classList.add("hidden");
      app.innerHTML = `
      <div class="hero fade" style="text-align:center">
        <div style="font-size:48px;margin:24px 0 8px">✅</div>
        <h1 style="font-size:24px">Sem erros pendentes!</h1>
        <p class="lead" style="margin:0 auto 22px">Você não tem questões erradas para revisar. Faça um <b>Treino inteligente</b> ou um <b>Simulado</b> — os que você errar aparecem aqui para você dominar.</p>
        <div class="qnav" style="justify-content:center">
          <button class="btn primary" onclick="startAdaptive()">Treino inteligente</button>
          <button class="btn" onclick="goHome()">Início</button>
        </div>
      </div>`;
      window.scrollTo({ top: 0 });
      return;
    }
    const list = shuffle(raw).map(prepareQuestion);
    session = newSession(list, { instant: true, mode: "missed" });
    renderQuiz();
  };

  /* =============================== CRONÔMETRO =============================== */
  function startTimer() {
    session.endAt = perfNow() + session.minutes * 60 * 1000;
    timerEl.classList.remove("hidden");
    updateTimer();
    tick = setInterval(updateTimer, 500);
  }
  function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
  function perfNow() { return (typeof performance !== "undefined" && performance.now) ? performance.timeOrigin + performance.now() : new Date().getTime(); }
  function updateTimer() {
    if (!session || !session.endAt) return;
    let left = Math.max(0, Math.round((session.endAt - perfNow()) / 1000));
    const m = Math.floor(left / 60), s = left % 60;
    timerEl.textContent = "⏱ " + m + ":" + String(s).padStart(2, "0");
    timerEl.classList.toggle("low", left <= 60);
    if (left <= 0) { stopTimer(); finish(true); }
  }

  /* =============================== QUIZ =============================== */
  function renderQuiz() {
    progEl.classList.remove("hidden");
    const s = session, i = s.idx, q = s.list[i];
    const ans = s.answers[i];
    const answered = ans !== null;
    const showFeedback = s.instant && answered;
    progBar.style.width = (i / s.list.length * 100) + "%";

    app.innerHTML = `
    <div class="fade">
      <div class="qhead">
        <span class="tag"><span class="dot" style="background:${AREAS[q.a].cor}"></span>${AREAS[q.a].nome}</span>
        <span class="subtag">${q.sub} · ${AREAS[q.a].sub[q.sub] || ""}</span>
        <span class="spacer"></span>
        <span class="qcount">Questão <b>${i + 1}</b> / ${s.list.length}</span>
      </div>

      <div class="card">
        <div class="qtext">${q.q}</div>
        ${q.multi ? `<div class="multi-hint">Múltipla escolha — selecione ${q.c.length}</div>` : ""}
        <div class="options">
          ${q.o.map((opt, oi) => {
            let cls = "opt" + (q.multi ? " multi" : "");
            const selected = Array.isArray(ans) ? ans.indexOf(oi) !== -1 : ans === oi;
            if (showFeedback) {
              cls += " locked";
              if (q.c.indexOf(oi) !== -1) cls += " correct";
              else if (selected) cls += " wrong";
            } else if (selected) cls += " sel";
            let mark = "";
            if (showFeedback) {
              if (q.c.indexOf(oi) !== -1) mark = '<span class="mark" style="color:var(--ok)">✓</span>';
              else if (selected) mark = '<span class="mark" style="color:var(--bad)">✗</span>';
            }
            return `<button class="${cls}" ${showFeedback ? "" : `onclick="pick(${oi})"`}>
              <span class="key">${LETTERS[oi]}</span><span class="otext">${opt}</span>${mark}</button>`;
          }).join("")}
        </div>
        ${showFeedback ? feedbackHTML(q, ans) : (s.instant ? "" : (answered ? '<p style="color:var(--muted);font-size:13px;margin:16px 0 0">Resposta registrada. As explicações aparecem no resultado final.</p>' : ""))}
      </div>

      <div class="qnav">
        <button class="btn ghost" onclick="prevQ()" ${i === 0 ? "disabled" : ""}>← Anterior</button>
        <button class="flagbtn ${s.flags[i] ? "on" : ""}" onclick="toggleFlag()">${s.flags[i] ? "⚑ Sinalizada" : "⚐ Sinalizar"}</button>
        <span class="spacer"></span>
        ${nextBtnHTML()}
      </div>
      <div style="text-align:center;margin-top:18px"><button class="btn ghost" style="font-size:13px;padding:8px 14px" onclick="confirmQuit()">Sair para o início</button></div>
    </div>`;
    window.scrollTo({ top: 0 });
  }

  function isAnswered(a, multi) { return multi ? (Array.isArray(a) && a.length > 0) : a !== null; }

  function nextBtnHTML() {
    const s = session, q = s.list[s.idx], last = s.idx === s.list.length - 1;
    if (s.instant) {
      const answered = isAnswered(s.answers[s.idx], q.multi);
      const label = last ? "Ver resultado" : "Próxima →";
      const fn = last ? "finish()" : "nextQ()";
      // em múltipla escolha, o botão "confirmar" aparece antes do feedback
      if (q.multi && answered && !feedbackShown()) {
        return `<button class="btn primary" onclick="confirmMulti()">Confirmar resposta</button>`;
      }
      return `<button class="btn primary" onclick="${fn}" ${feedbackShown() ? "" : "disabled"}>${label}</button>`;
    } else {
      if (last) return `<button class="btn primary" onclick="finish()">Finalizar prova</button>`;
      return `<button class="btn primary" onclick="nextQ()">Próxima →</button>`;
    }
  }
  function feedbackShown() {
    const s = session, q = s.list[s.idx], a = s.answers[s.idx];
    if (!s.instant) return isAnswered(a, q.multi);
    if (q.multi) return s._mConfirmed === s.idx; // confirmado explicitamente
    return a !== null;
  }

  function feedbackHTML(q, ans) {
    const sel = Array.isArray(ans) ? ans : (ans === null ? [] : [ans]);
    const correct = arraysEqual(sel, q.c);
    const correctLetters = q.c.map(i => LETTERS[i]).join(", ");
    return `
    <div class="explain">
      <div class="verdict ${correct ? "ok" : "bad"}">${correct ? "✓ Você acertou" : "✗ Resposta incorreta"}</div>
      <div class="exp-block" style="border-color:var(--ok);background:var(--ok-soft)">
        <h4>Resposta correta — ${correctLetters}</h4>
        <div>${q.c.map(i => q.e[i]).join("<br>")}</div>
      </div>
      <div class="exp-block">
        <h4>Por que cada alternativa</h4>
        <div class="exp-why">
          ${q.o.map((opt, oi) => `
            <div class="row ${q.c.indexOf(oi) !== -1 ? "good" : "no"}">
              <span class="k">${LETTERS[oi]}</span><span>${q.e[oi]}</span></div>`).join("")}
        </div>
      </div>
    </div>`;
  }

  window.pick = function (oi) {
    const s = session, q = s.list[s.idx];
    if (feedbackShown() && s.instant) return; // já corrigida
    if (q.multi) {
      let cur = Array.isArray(s.answers[s.idx]) ? s.answers[s.idx].slice() : [];
      const pos = cur.indexOf(oi);
      if (pos === -1) { if (cur.length < q.c.length) cur.push(oi); } // limita à qtd de corretas
      else cur.splice(pos, 1);
      s.answers[s.idx] = cur;
      renderQuiz();
    } else {
      const already = s.answers[s.idx] !== null;
      s.answers[s.idx] = oi;
      if (s.instant && !already) rec(q, oi === q.c[0] && q.c.length === 1);
      renderQuiz();
    }
  };
  window.confirmMulti = function () {
    const s = session, q = s.list[s.idx];
    const sel = Array.isArray(s.answers[s.idx]) ? s.answers[s.idx] : [];
    s._mConfirmed = s.idx;
    if (s.instant) rec(q, arraysEqual(sel, q.c));
    renderQuiz();
  };
  window.nextQ = function () { if (session.idx < session.list.length - 1) { session.idx++; session._mConfirmed = restoreMConfirm(); renderQuiz(); } };
  window.prevQ = function () { if (session.idx > 0) { session.idx--; session._mConfirmed = restoreMConfirm(); renderQuiz(); } };
  function restoreMConfirm() {
    // ao voltar/avançar, considera confirmada se já respondida em modo instant
    const s = session, q = s.list[s.idx], a = s.answers[s.idx];
    if (s.instant && q.multi && Array.isArray(a) && a.length > 0) return s.idx;
    return -1;
  }
  window.toggleFlag = function () { session.flags[session.idx] = !session.flags[session.idx]; renderQuiz(); };
  window.confirmQuit = function () { if (confirm("Sair e descartar esta sessão?")) { stopTimer(); goHome(); } };

  /* =============================== RESULTADO =============================== */
  window.finish = function (byTime) {
    const s = session; stopTimer();
    if (!s.instant) {
      s.list.forEach((q, i) => { const a = s.answers[i]; const sel = Array.isArray(a) ? a : (a === null ? [] : [a]); rec(q, arraysEqual(sel, q.c)); });
    }
    progBar.style.width = "100%";
    timerEl.classList.add("hidden");

    let right = 0;
    const perArea = {};
    s.list.forEach((q, i) => {
      perArea[q.a] = perArea[q.a] || { right: 0, total: 0 };
      perArea[q.a].total++;
      const a = s.answers[i]; const sel = Array.isArray(a) ? a : (a === null ? [] : [a]);
      if (arraysEqual(sel, q.c)) { right++; perArea[q.a].right++; }
    });
    const total = s.list.length;
    const pct = Math.round(right / total * 100);
    const passed = pct >= PASS;
    const circ = 2 * Math.PI * 66;
    const ringColor = pct >= 70 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)";

    app.innerHTML = `
    <div class="fade">
      <div class="scorehero">
        <div class="ring">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <circle cx="75" cy="75" r="66" fill="none" stroke="var(--surface-2)" stroke-width="12"/>
            <circle cx="75" cy="75" r="66" fill="none" stroke="${ringColor}" stroke-width="12" stroke-linecap="round"
              stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - pct / 100)}"/>
          </svg>
          <div class="num"><b>${pct}%</b><span>${right}/${total}</span></div>
        </div>
        <h1 style="font-size:26px">${passed ? "Aprovado no simulado! 🎯" : "Ainda não passou — dá pra virar"}</h1>
        <p class="passline" style="color:var(--muted)">${byTime ? "<b style='color:var(--bad)'>Tempo esgotado.</b> " : ""}Corte de referência: <b style="color:var(--ink)">${PASS}%</b>. ${passed ? "Continue reforçando os domínios mais fracos abaixo." : "Foque nos domínios em vermelho e refaça."}</p>
      </div>

      <h2 style="margin-top:20px">Desempenho por domínio</h2>
      <div class="breakdown">
        ${Object.keys(perArea).sort((a, b) => (perArea[a].right / perArea[a].total) - (perArea[b].right / perArea[b].total)).map(k => {
          const pa = perArea[k]; const p = Math.round(pa.right / pa.total * 100);
          const col = p >= 70 ? "var(--ok)" : p >= 50 ? "var(--warn)" : "var(--bad)";
          const label = p >= 70 ? "sólido" : p >= 50 ? "reforçar" : "prioridade";
          return `
          <div class="bdrow">
            <div class="top"><h3>${AREAS[k].nome}</h3><span class="pct" style="color:${col}">${p}% · ${label}</span></div>
            <div class="meter"><i style="width:${p}%;background:${col}"></i></div>
            <div class="sub">${pa.right} de ${pa.total} corretas</div>
          </div>`;
        }).join("")}
      </div>

      <div class="qnav" style="justify-content:center">
        <button class="btn" onclick="reviewSession()">Revisar respostas com explicação</button>
        <button class="btn" onclick="retryWrong()" ${right === total ? "disabled" : ""}>Refazer só as que errei</button>
        <button class="btn primary" onclick="goHome()">Início</button>
      </div>
      <p class="footer-note">Seu histórico foi salvo neste navegador.</p>
    </div>`;
    window.scrollTo({ top: 0 });
  };

  window.reviewSession = function () {
    session.instant = true; session.idx = 0; session.review = true; session._mConfirmed = restoreMConfirm();
    // marca todas as múltiplas já respondidas como confirmadas na revisão
    session._reviewAll = true;
    renderReview();
  };
  function renderReview() { session._mConfirmed = session.idx; renderQuizReview(); }
  function renderQuizReview() {
    // reaproveita renderQuiz mas garante feedback visível em toda questão respondida
    const s = session, q = s.list[s.idx], a = s.answers[s.idx];
    if (q.multi && Array.isArray(a)) s._mConfirmed = s.idx;
    renderQuiz();
  }

  window.retryWrong = function () {
    const s = session;
    const wrong = [];
    s.list.forEach((q, i) => { const a = s.answers[i]; const sel = Array.isArray(a) ? a : (a === null ? [] : [a]); if (!arraysEqual(sel, q.c)) wrong.push(q); });
    if (!wrong.length) { goHome(); return; }
    const list = shuffle(wrong).map(q => {
      const order = shuffle(q.o.map((_, i) => i));
      return { a: q.a, sub: q.sub, q: q.q, o: order.map(i => q.o[i]), e: order.map(i => q.e[i]), c: q.c.map(ci => order.indexOf(ci)).sort((x, y) => x - y), multi: q.multi };
    });
    session = newSession(list, { instant: true, mode: "retry" });
    renderQuiz();
  };

  /* =============================== TECLADO =============================== */
  document.addEventListener("keydown", function (e) {
    if (fc && fc.queue) {
      if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); flipCard(); }
      else if (fc.flipped && (e.key === "1")) rateCard(true);
      else if (fc.flipped && (e.key === "2")) rateCard(false);
      return;
    }
    if (!session) return;
    const s = session, q = s.list[s.idx]; if (!q) return;
    if (["1", "2", "3", "4", "5"].indexOf(e.key) !== -1) {
      const oi = parseInt(e.key, 10) - 1;
      if (oi < q.o.length && !(s.instant && feedbackShown())) pick(oi);
    } else if (e.key === "Enter") {
      if (s.instant) {
        if (q.multi && isAnswered(s.answers[s.idx], true) && !feedbackShown()) { confirmMulti(); return; }
        if (!feedbackShown()) return;
      }
      if (s.idx === s.list.length - 1) finish(); else nextQ();
    } else if (e.key === "ArrowLeft") { prevQ(); }
    else if (e.key === "ArrowRight") { if (!(s.instant && !feedbackShown())) nextQ(); }
  });

  goHome();
})();

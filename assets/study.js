/* ============================================================================
   MOTOR DE ESTUDO — persistência, repetição espaçada, banco de erros,
   prática adaptativa e prontidão. Aplica princípios de ciência da aprendizagem.
   Exposto em window.Study. Carregar DEPOIS de questions/extra/flashcards e ANTES de app.js.
   ============================================================================ */
(function () {
  "use strict";
  var AREAS = window.AREAS || {};
  var QUESTIONS = window.QUESTIONS || [];

  var K_AREA = "sim_ccst_stats_v1";   // agregado por domínio {seen,right} (compat. com a home)
  var K_Q = "sim_ccst_q_v1";          // por questão {seen,right,streak,everWrong,last,box,due}
  var K_SRS = "sim_ccst_srs_v1";      // flashcards {box,reps,lapses,due}
  var K_META = "sim_ccst_meta_v1";    // {lastDay,streak}

  // intervalos de revisão por caixa (Leitner), em dias — ajustado para cenário de preparação
  var LEITNER = [0, 1, 2, 4, 8, 16];

  function load(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function today() { return Math.floor(Date.now() / 86400000); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // id estável a partir do texto (djb2/xor)
  function qid(s) { var h = 5381, i; s = s || ""; for (i = 0; i < s.length; i++) { h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; } return "q" + h.toString(36); }
  function cardId(deck, front) { return "f" + qid(deck + "::" + front); }

  // índice de questões por id
  var idToQ = {};
  QUESTIONS.forEach(function (q) { q.__id = qid(q.q); idToQ[q.__id] = q; });

  function touchStreak() {
    var m = load(K_META), t = today();
    if (m.lastDay !== t) { m.streak = (m.lastDay === t - 1 ? (m.streak || 0) + 1 : 1); m.lastDay = t; save(K_META, m); }
  }

  // ---- registro de respostas ----
  function record(id, area, sub, correct) {
    var a = load(K_AREA);
    a[area] = a[area] || { seen: 0, right: 0 };
    a[area].seen++; if (correct) a[area].right++;
    save(K_AREA, a);

    var q = load(K_Q);
    var e = q[id] || { seen: 0, right: 0, streak: 0, everWrong: false, last: 1, box: 1 };
    e.seen++;
    if (correct) { e.right++; e.streak++; e.last = 1; e.box = Math.min(5, (e.box || 1) + 1); }
    else { e.streak = 0; e.last = 0; e.everWrong = true; e.box = 1; }
    e.due = today() + LEITNER[e.box];
    q[id] = e; save(K_Q, q);
    touchStreak();
  }

  // ---- banco de erros (persistente) ----
  // "pendente" = já errou alguma vez E ainda não acertou 2x seguidas
  function pendingIds() {
    var q = load(K_Q);
    return Object.keys(q).filter(function (id) { var e = q[id]; return e.everWrong && e.streak < 2; });
  }
  function missedSet() {
    return pendingIds().map(function (id) { return idToQ[id]; }).filter(Boolean);
  }

  // ---- pontuação por domínio + prontidão ----
  function domainScores() {
    var a = load(K_AREA), out = {};
    Object.keys(AREAS).forEach(function (d) {
      var s = a[d] || { seen: 0, right: 0 };
      var acc = s.seen ? s.right / s.seen : 0;
      var cov = Math.min(1, s.seen / 12); // confiança na medida cresce até ~12 questões
      out[d] = { seen: s.seen, acc: acc, cov: cov, score: acc * cov };
    });
    return out;
  }
  function readiness() {
    var ds = domainScores(), overall = 0, wsum = 0, weakest = null, weak = 2;
    Object.keys(AREAS).forEach(function (d) {
      var w = AREAS[d].peso || 0; wsum += w; overall += w * ds[d].score;
      if (ds[d].score < weak) { weak = ds[d].score; weakest = d; }
    });
    overall = wsum ? overall / wsum : 0;
    var seenTotal = Object.keys(ds).reduce(function (n, d) { return n + ds[d].seen; }, 0);
    var m = load(K_META);
    return { pct: Math.round(overall * 100), byDomain: ds, weakest: weakest,
      due: dueCards().length, pending: pendingIds().length, seen: seenTotal, streak: m.streak || 0 };
  }

  // ---- seleção adaptativa (interleaving + foco no fraco + erros) ----
  function adaptiveSet(n) {
    n = n || 15;
    var picked = [], used = {};
    // ~40% erros pendentes (revisão de erro)
    shuffle(missedSet()).slice(0, Math.ceil(n * 0.4)).forEach(function (q) { if (q && !used[q.__id]) { used[q.__id] = 1; picked.push(q); } });
    // resto: domínios mais fracos primeiro, embaralhado
    var ds = domainScores();
    var order = Object.keys(AREAS).sort(function (x, y) { return ds[x].score - ds[y].score; });
    var byDom = {}; order.forEach(function (d) { byDom[d] = shuffle(QUESTIONS.filter(function (q) { return q.a === d; })); });
    var guard = 0;
    while (picked.length < n && guard++ < 5000) {
      var progressed = false;
      for (var oi = 0; oi < order.length && picked.length < n; oi++) {
        // domínios mais fracos recebem mais itens por rodada
        var quota = order.length - oi;
        for (var t = 0; t < quota && picked.length < n; t++) {
          var arr = byDom[order[oi]], q;
          while (arr.length) { q = arr.pop(); if (!used[q.__id]) { used[q.__id] = 1; picked.push(q); progressed = true; break; } }
        }
      }
      if (!progressed) break;
    }
    return shuffle(picked).slice(0, n);
  }

  // ---- repetição espaçada dos flashcards ----
  function srsRate(id, known) {
    var s = load(K_SRS);
    var e = s[id] || { box: 1, reps: 0, lapses: 0 };
    if (known) { e.box = Math.min(5, (e.box || 1) + 1); e.reps = (e.reps || 0) + 1; }
    else { e.box = 1; e.lapses = (e.lapses || 0) + 1; }
    e.due = today() + LEITNER[e.box];
    s[id] = e; save(K_SRS, s); touchStreak();
  }
  function srsInfo(id) { var s = load(K_SRS); return s[id] || null; }
  function srsDue(id) { var e = srsInfo(id); return !e || (e.due || 0) <= today(); }
  function dueCards() {
    var FC = window.FLASHCARDS || {}, due = [];
    Object.keys(FC).forEach(function (d) {
      (FC[d] || []).forEach(function (c) { var id = cardId(d, c.f); if (srsDue(id)) due.push({ f: c.f, b: c.b, area: d, id: id }); });
    });
    return due;
  }

  function reset() { [K_Q, K_SRS, K_META].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} }); }

  window.Study = {
    qid: qid, cardId: cardId,
    record: record, missedSet: missedSet, pendingIds: pendingIds,
    adaptiveSet: adaptiveSet, readiness: readiness, domainScores: domainScores,
    srsRate: srsRate, srsDue: srsDue, srsInfo: srsInfo, dueCards: dueCards,
    reset: reset,
  };
})();

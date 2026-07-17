/* ============================================================================
   PLANO PERSONALIZADO — diagnóstico de contexto + preferência de formato
   (experimentada, não autorrótulo) → rotina diária sob medida.
   Base honesta: técnicas universais (recuperação + espaçamento) para todos;
   contexto/meta e o formato que "clicou" definem a porta de entrada.
   Exposto em window.Plan.
   ============================================================================ */
(function () {
  var K = "sim_ccst_plan_v1";
  function load() { try { return JSON.parse(localStorage.getItem(K)) || null; } catch (e) { return null; } }
  function save(p) { try { localStorage.setItem(K, JSON.stringify(p)); } catch (e) {} }
  function clear() { try { localStorage.removeItem(K); } catch (e) {} }

  // prazo -> dias estimados (para ritmo)
  var PRAZO_DIAS = { "semana": 7, "mes": 25, "dois": 55, "sem_data": 30 };

  function build(ans) {
    return {
      prazo: ans.prazo || "sem_data",
      minutos: ans.minutos || 30,
      contexto: ans.contexto || "misto",
      formato: ans.formato || "flashcard",
      created: Date.now(),
    };
  }

  // rotina diária ordenada e adaptada ao contexto/formato + estado atual (readiness)
  function routine(p, R) {
    var steps = [];
    // 1) espaçamento — sempre primeiro (fixa antes de esquecer)
    steps.push({ icon: "🗓️", label: "Revisar hoje (flashcards espaçados)", mode: "flash-due",
      why: (R && R.due ? R.due + " carta(s) no ponto de revisão" : "consolida o que já viu") });
    // 2) recuperação ativa no ponto fraco — o coração do estudo
    steps.push({ icon: "🎯", label: "Treino inteligente — 15 questões", mode: "adaptive",
      why: "mira seu domínio mais fraco" + (R && R.weakest ? "" : "") });
    // 3) erros pendentes, se houver
    if (R && R.pending) steps.push({ icon: "🔁", label: "Zerar Meus erros (" + R.pending + ")", mode: "missed",
      why: "estudar o próprio erro é o que mais aprova" });
    // 4) formato preferido (porta de entrada do conteúdo novo) — honra o que gravou melhor
    var f = p.formato;
    if (f === "audio") steps.push({ icon: "🎧", label: "Ouvir 1 podcast do domínio do dia", mode: "podcasts", why: "o formato que gravou melhor pra você" });
    else if (f === "macete") steps.push({ icon: "🧠", label: "Repassar os Macetes do domínio", mode: "flash-mac", why: "os ganchos que gravaram melhor pra você" });
    else if (f === "ler") steps.push({ icon: "📖", label: "Ler o material do domínio do dia", mode: "material", why: "o formato que gravou melhor pra você" });
    else if (f === "explicar") steps.push({ icon: "🗣️", label: "Explicar em voz alta o que acabou de ver", mode: null, why: "efeito de geração: ensinar = fixar" });
    else steps.push({ icon: "🃏", label: "Estudar um baralho de flashcards", mode: "flash-mac", why: "seu formato de entrada preferido" });
    // 4b) contexto em movimento adiciona o áudio como reforço (sem substituir o formato)
    if (p.contexto === "audio" && f !== "audio") steps.push({ icon: "🎧", label: "No trajeto: ouvir um podcast", mode: "podcasts", why: "aproveita seus deslocamentos" });
    // 5) 1x/semana simulado (quando sobra tempo)
    if (p.minutos >= 60) steps.push({ icon: "▶", label: "Simulado cronometrado (peso semanal)", mode: "exam", why: "treina sob pressão de tempo" });
    return steps;
  }

  function pace(p, R) {
    var dias = PRAZO_DIAS[p.prazo] || 30;
    var pct = R ? R.pct : 0;
    var falta = Math.max(0, 70 - pct);
    return { dias: dias, faltaPontos: falta,
      recado: pct >= 70 ? "Você já está no nível de aprovação — mantenha o ritmo até a prova."
        : (dias <= 7 ? "Reta final: priorize Treino inteligente + Meus erros todo dia."
          : "Constância diária fecha a diferença até o corte de 70%.") };
  }

  window.Plan = { load: load, save: save, clear: clear, build: build, routine: routine, pace: pace, key: K };
})();

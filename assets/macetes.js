/* ============================================================================
   MACETES (mnemônicos) — ganchos de memória para os fatos que mais caem.
   Injeta uma seção "Macetes para gravar" em cada domínio do MATERIAL e cria
   um baralho de flashcards dedicado (FLASHCARDS.mac).
   Carregar DEPOIS de material.js e flashcards.js, ANTES de app.js.
   ============================================================================ */
(function () {
  var M = window.MATERIAL || {};
  var FC = window.FLASHCARDS || {};

  var secoes = {
    d1: {t: "🧠 Macetes para gravar", sub: "1.1", html: `
      <ul>
        <li><b>CIA</b> = pense num <b>cofre</b>: <b>C</b>onfidencial (só quem tem a chave lê), <b>Í</b>ntegro (ninguém mexe sem avisar), <b>A</b>berto quando você precisa (disponível).</li>
        <li><b>AAA</b> = as 3 perguntas na porta: <b>Quem é você?</b> (Autenticação) → <b>O que pode fazer?</b> (Autorização) → <b>O que você fez?</b> (Accounting).</li>
        <li><b>Fatores de MFA</b> = <b>SÊ-TÊ-É</b>: algo que você <b>SÊ</b>abe, <b>TÊ</b>m, <b>É</b>.</li>
        <li><b>Vírus x Worm x Trojan</b>: o <b>Vírus pega carona</b> (anexa em arquivo), o <b>Worm anda sozinho</b> (se espalha na rede), o <b>Trojan se fantasia</b> (disfarce de app bom).</li>
        <li><b>Hash x Criptografia</b>: <b>hash é picadeira</b> (não dá pra remontar), <b>cripto é cadeado</b> (abre com a chave).</li>
        <li><b>Estados dos dados</b>: <b>Trânsito</b>→TLS/VPN, <b>Repouso</b>→disco, <b>Uso</b>→memória.</li>
      </ul>`},
    d2: {t: "🧠 Macetes para gravar", sub: "2.1", html: `
      <ul>
        <li><b>Portas gêmeas 22/23</b>: <b>22 é Seguro (SSH)</b>, <b>23 é Sujo (Telnet, texto claro)</b>.</li>
        <li><b>80 x 443</b>: <b>80 anda nu (HTTP)</b>, <b>443 usa cadeado (HTTPS)</b>.</li>
        <li>Outras: <b>53</b>=DNS (resolve nomes), <b>3389</b>=RDP (<b>R</b>emoto <b>D</b>o painel), <b>445</b>=SMB (arquivos, alvo de ransomware), <b>389</b>=LDAP.</li>
        <li><b>IPs privados</b> (decore o trio): <b>10 · 172 · 192.168</b>.</li>
        <li><b>IDS x IPS</b>: o <b>P de IPS é de Parar</b> (bloqueia); o <b>D de IDS é de Denunciar</b> (só alerta).</li>
        <li><b>Firewall stateful</b> = tem <b>memória</b> (lembra a conversa e libera a resposta).</li>
        <li><b>Wi-Fi</b>: <b>WEP fraco &lt; WPA2 forte &lt; WPA3 mais forte</b>. <b>Personal</b>=1 senha pra todos; <b>Enterprise</b>=RADIUS (1 login por pessoa).</li>
      </ul>`},
    d3: {t: "🧠 Macetes para gravar", sub: "3.1", html: `
      <ul>
        <li><b>Permissões (números)</b>: <b>4=ler, 2=escrever, 1=executar</b> (soma). <b>7=tudo</b>, <b>5=ler+executar</b>. Então <b>755</b> = "dono manda (7), o resto olha e roda (5)".</li>
        <li><b>chmod x chown</b>: <b>MOD</b> muda o <b>modo</b> (permissão), <b>OWN</b> muda o <b>owner</b> (dono).</li>
        <li><b>Backup 3-2-1</b>: <b>3</b> cópias, <b>2</b> mídias, <b>1</b> fora de casa.</li>
        <li><b>Ferramentas</b>: <b>netstat</b> vê conexões, <b>nslookup</b> vê nomes, <b>tcpdump</b> vê pacotes.</li>
        <li><b>Windows</b>: <b>UAC</b> pergunta antes de virar admin, <b>BitLocker</b> tranca o disco, <b>Defender</b> caça malware.</li>
      </ul>`},
    d4: {t: "🧠 Macetes para gravar", sub: "4.3", html: `
      <ul>
        <li><b>Risco = Probabilidade × Impacto</b>.</li>
        <li><b>SLE x ALE</b>: <b>SLE = uma vez</b> (AV × EF); <b>ALE = o ano inteiro</b> (SLE × ARO). "L de aLE = Longo prazo (anual)".</li>
        <li><b>CVSS (regra 4-7-9)</b>: até 3,9 baixa; <b>no 4 vira média</b>, <b>no 7 vira alta</b>, <b>no 9 vira crítica</b>.</li>
        <li><b>CVE x CVSS x CWE</b>: <b>CVE</b>=nome/etiqueta da falha, <b>CVSS</b>=nota (Score), <b>CWE</b>=tipo/classe (Weakness).</li>
        <li><b>Estratégias de risco</b> = <b>MATE</b> o risco: <b>M</b>itigar, <b>A</b>ceitar, <b>T</b>ransferir, <b>E</b>vitar.</li>
        <li><b>Controles</b>: <b>P</b>reventivo (antes), <b>D</b>etectivo (durante), <b>C</b>orretivo (depois), <b>D</b>issuasório (assusta).</li>
        <li><b>RTO x RPO</b>: <b>RTO</b> = <b>T</b>empo pra voltar; <b>RPO</b> = <b>P</b>onto (quantos dados aceito perder).</li>
      </ul>`},
    d5: {t: "🧠 Macetes para gravar", sub: "5.2", html: `
      <ul>
        <li><b>Cyber Kill Chain (7 fases)</b> — iniciais <b>R-A-E-E-I-C-A</b>: <b>R</b>econhece, <b>A</b>rma, <b>E</b>ntrega, <b>E</b>xplora, <b>I</b>nstala, <b>C</b>omanda (C2), <b>A</b>ge. Frase: "<i>Rato Ansioso Entrega Explosivo, Instala, Comanda e Ataca</i>".</li>
        <li><b>Diamond Model</b> = <b>A-C-I-V</b>: <b>A</b>dversário, <b>C</b>apacidade, <b>I</b>nfraestrutura, <b>V</b>ítima.</li>
        <li><b>SIEM x SOAR</b>: <b>SIEM vê e avisa</b>; <b>SOAR age sozinho</b> (automatiza).</li>
        <li><b>IOC x IOA</b>: <b>IOC = pegada</b> (o ataque já passou); <b>IOA = flagrante</b> (está acontecendo).</li>
        <li><b>Ordem de volatilidade</b>: colete o que <b>some primeiro</b> — <b>RAM antes do disco</b>.</li>
        <li><b>NIST (4 fases)</b>: <b>Prepara → Detecta → Contém/Erradica/Recupera → aPrende</b>. Versão SANS = <b>PICERL</b>.</li>
        <li><b>GDPR</b>: avisar em <b>72 horas</b> (3 dias).</li>
      </ul>`},
  };

  Object.keys(secoes).forEach(function (d) {
    if (M[d]) M[d].push(secoes[d]);
  });

  // baralho de flashcards de macetes (frente = fato; verso = gancho de memória)
  FC.mac = [
    {f: "Ordem das fases da Cyber Kill Chain", b: "R-A-E-E-I-C-A: Reconhece, Arma, Entrega, Explora, Instala, Comanda (C2), Age. Frase: 'Rato Ansioso Entrega Explosivo, Instala, Comanda e Ataca'."},
    {f: "Faixas de severidade do CVSS", b: "Regra 4-7-9: até 3,9 = baixa; no 4 vira MÉDIA; no 7 vira ALTA; no 9 vira CRÍTICA."},
    {f: "As 4 estratégias de tratamento de risco", b: "MATE o risco: Mitigar, Aceitar, Transferir, Evitar."},
    {f: "SLE x ALE (cálculo de risco)", b: "SLE = uma vez (AV × EF). ALE = o ano inteiro (SLE × ARO). 'L de aLE = Longo prazo/anual'."},
    {f: "CVE x CVSS x CWE", b: "CVE = nome da falha; CVSS = a nota (Score, 0-10); CWE = o tipo/classe (Weakness)."},
    {f: "Fatores da autenticação multifator (MFA)", b: "SÊ-TÊ-É: algo que você SABE, TEM e É. (senha, token, biometria)."},
    {f: "Vírus x Worm x Trojan", b: "Vírus pega carona (anexa), Worm anda sozinho (rede), Trojan se fantasia (disfarce)."},
    {f: "IDS x IPS", b: "P do IPS = Parar (bloqueia). D do IDS = Denunciar (só alerta)."},
    {f: "IOC x IOA", b: "IOC = pegada (já passou); IOA = flagrante (acontecendo agora)."},
    {f: "SIEM x SOAR", b: "SIEM vê e avisa; SOAR age sozinho (automatiza a resposta)."},
    {f: "Diamond Model — os 4 vértices", b: "A-C-I-V: Adversário, Capacidade, Infraestrutura, Vítima."},
    {f: "Portas 22 e 23", b: "22 é Seguro (SSH); 23 é Sujo (Telnet, texto claro)."},
    {f: "Portas 80 e 443", b: "80 anda nu (HTTP); 443 usa cadeado (HTTPS)."},
    {f: "Faixas de IP privado (RFC 1918)", b: "Decore o trio: 10 · 172 (.16-.31) · 192.168."},
    {f: "Permissão Linux 755", b: "4=ler, 2=escrever, 1=executar. 7=tudo, 5=ler+executar. 755 = dono manda, o resto olha e roda."},
    {f: "Regra de backup 3-2-1", b: "3 cópias, 2 mídias diferentes, 1 fora do local (offsite)."},
    {f: "Tipos de controle de segurança", b: "Preventivo (antes), Detectivo (durante), Corretivo (depois), Dissuasório (assusta)."},
    {f: "RTO x RPO", b: "RTO = Tempo pra voltar ao ar; RPO = Ponto no tempo (quantos dados aceito perder)."},
    {f: "Ciclo NIST de resposta a incidentes", b: "Prepara → Detecta → Contém/Erradica/Recupera → aPrende. (SANS = PICERL)."},
    {f: "Prazo de notificação do GDPR", b: "72 horas (3 dias) para avisar a autoridade."},
    {f: "Hashing x Criptografia", b: "Hash é picadeira (não volta); cripto é cadeado (abre com a chave)."},
    {f: "Estados dos dados e proteção", b: "Trânsito → TLS/VPN; Repouso → disco (BitLocker); Uso → memória."},
    {f: "AAA", b: "3 perguntas na porta: Quem é? (Autenticação) → O que pode? (Autorização) → O que fez? (Accounting)."},
    {f: "Ordem de volatilidade na forense", b: "Colete o que some primeiro: RAM antes do disco."},
  ];

  window.MATERIAL = M;
  window.FLASHCARDS = FC;
})();

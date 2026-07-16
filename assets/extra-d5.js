/* Domínio 5 — Tratamento de Incidentes: questões e material EXTRA (avançado) */
(function () {
  var Q = window.QUESTIONS, M = window.MATERIAL;

  var perguntas = [
    {a:"d5", sub:"5.2", q:"Na Cyber Kill Chain, em qual fase o atacante ainda está coletando informações sobre o alvo (e-mails, tecnologias, funcionários)?", o:["Reconhecimento","Entrega","Exploração","Ações no objetivo"], c:[0], e:["Correta. Reconhecimento é a 1ª fase: coleta de informações sobre o alvo.","Errada. Entrega é o envio da arma (ex.: e-mail com anexo).","Errada. Exploração é quando a vulnerabilidade é acionada.","Errada. Ações no objetivo é a fase final (exfiltrar, destruir)."]},

    {a:"d5", sub:"5.2", q:"Um e-mail de phishing com anexo malicioso chega à caixa da vítima. A qual fase da Kill Chain isso corresponde?", o:["Armamento (weaponization)","Entrega (delivery)","Instalação","Comando e controle"], c:[1], e:["Errada. Armamento é preparar o artefato malicioso (acoplar exploit + payload), antes do envio.","Correta. Entrega é a transmissão da arma ao alvo (e-mail, USB, site).","Errada. Instalação é quando o malware se instala no host.","Errada. C2 é o canal de controle após a instalação."]},

    {a:"d5", sub:"5.2", q:"Após comprometer a máquina, o malware estabelece um canal para receber ordens do atacante. Essa fase é:", o:["Reconhecimento","Comando e Controle (C2)","Entrega","Armamento"], c:[1], e:["Errada. Reconhecimento é coleta inicial.","Correta. Command and Control (C2) é o canal pelo qual o atacante controla o host comprometido.","Errada. Entrega é o envio da arma.","Errada. Armamento é a preparação do artefato."]},

    {a:"d5", sub:"5.2", q:"Qual a diferença entre IOC e IOA?", o:["São sinônimos","IOC (indicador de comprometimento) é evidência de que um ataque já ocorreu (ex.: hash malicioso, IP de C2); IOA (indicador de ataque) foca no comportamento/intenção em andamento","IOA sempre vem depois do IOC","IOC é um tipo de firewall"], c:[1], e:["Errada. Têm focos diferentes.","Correta. IOC é forense/reativo (rastros do que já aconteceu); IOA é comportamental/proativo (detecta a ação enquanto acontece).","Errada. O IOA visa detectar antes ou durante, não só depois.","Errada. IOC não é dispositivo de rede."]},

    {a:"d5", sub:"5.2", q:"Ao coletar evidências de um sistema vivo, qual a 'ordem de volatilidade' correta (do mais volátil ao menos)?", o:["Disco → RAM → cache da CPU","Cache/registradores → RAM → disco → backups/arquivos","Backups → disco → RAM","Não importa a ordem"], c:[1], e:["Errada. Está invertido; o disco é menos volátil que a RAM.","Correta. Coleta-se primeiro o mais volátil (registradores/cache, memória RAM) e depois o mais persistente (disco, backups), para não perder evidências.","Errada. Backups são os menos voláteis; viriam por último.","Errada. A ordem é crucial para preservar dados que somem ao desligar."]},

    {a:"d5", sub:"5.2", q:"Por que se calcula um hash (ex.: SHA-256) da imagem forense de um disco?", o:["Para acelerar a cópia","Para comprovar que a evidência não foi alterada — qualquer mudança muda o hash, sustentando a integridade e a cadeia de custódia","Para criptografar o disco","Para apagar os dados"], c:[1], e:["Errada. Hash não acelera a cópia.","Correta. O hash da imagem funciona como 'impressão digital': se um bit mudar, o hash muda, provando integridade no processo legal.","Errada. Hash não é criptografia.","Errada. Hash não apaga nada."]},

    {a:"d5", sub:"5.1", q:"Em um SOC, qual costuma ser o papel do analista de Tier 1 (nível 1)?", o:["Liderar a resposta a grandes incidentes e fazer forense avançada","Fazer a triagem inicial dos alertas, filtrar falsos positivos e escalar o que for relevante","Desenvolver o SIEM","Definir o orçamento da empresa"], c:[1], e:["Errada. Isso é típico de tiers mais altos (2/3).","Correta. O Tier 1 monitora e triam os alertas, encerrando falsos positivos e escalando incidentes reais para o Tier 2/3.","Errada. Desenvolvimento do SIEM não é função do analista de triagem.","Errada. Orçamento é gestão, não SOC de linha."]},

    {a:"d5", sub:"5.1", q:"O que é 'alert fatigue' (fadiga de alertas) em um SOC?", o:["Cansaço físico por trabalhar em pé","O excesso de alertas (muitos falsos positivos) que leva analistas a ignorar ou demorar a tratar alertas, podendo deixar passar ameaças reais","Um tipo de malware","Um relatório mensal"], c:[1], e:["Errada. Não é sobre postura física.","Correta. Volume alto e ruidoso de alertas dessensibiliza a equipe; mitiga-se com tuning, priorização e automação (SOAR).","Errada. Não é malware.","Errada. Não é um documento."]},

    {a:"d5", sub:"5.1", q:"O que é 'threat hunting' (caça a ameaças)?", o:["Esperar passivamente os alertas do SIEM","Buscar proativamente sinais de comprometimento que passaram pelas defesas, com base em hipóteses e TTPs conhecidos","Instalar antivírus","Apagar logs antigos"], c:[1], e:["Errada. Threat hunting é proativo, não passivo.","Correta. O caçador de ameaças procura ativamente adversários já dentro do ambiente, sem depender só de alertas automáticos.","Errada. Instalar AV é controle preventivo, não hunting.","Errada. Apagar logs prejudica a investigação."]},

    {a:"d5", sub:"5.1", q:"O que significam as métricas MTTD e MTTR num SOC?", o:["Tipos de malware","MTTD = tempo médio para DETECTAR; MTTR = tempo médio para RESPONDER/remediar — quanto menores, melhor","Nomes de frameworks","Portas de rede"], c:[1], e:["Errada. Não são malwares.","Correta. MTTD (mean time to detect) e MTTR (mean time to respond/recover) medem a agilidade do SOC; reduzi-las limita o dano.","Errada. Não são frameworks.","Errada. Não são portas."]},

    {a:"d5", sub:"5.4", q:"Qual a relação entre o ciclo do NIST SP 800-61 (4 fases) e o modelo SANS PICERL (6 passos)?", o:["São contraditórios","Descrevem o mesmo processo com granularidades diferentes; o SANS detalha em Preparação, Identificação, Contenção, Erradicação, Recuperação e Lições Aprendidas","O NIST não inclui preparação","O SANS não inclui recuperação"], c:[1], e:["Errada. São compatíveis, não contraditórios.","Correta. Ambos cobrem o mesmo fluxo; o NIST agrupa contenção/erradicação/recuperação numa fase, enquanto o SANS (PICERL) as separa.","Errada. O NIST começa justamente pela Preparação.","Errada. O SANS inclui Recuperação (o R de PICERL)."]},

    {a:"d5", sub:"5.4", q:"O que representa a sigla PICERL do modelo SANS de resposta a incidentes?", o:["Preparação, Identificação, Contenção, Erradicação, Recuperação e Lições aprendidas","Proteger, Investigar, Conter, Escalar, Reportar, Liberar","Planejar, Implementar, Checar, Executar, Revisar, Lançar","Nenhuma das anteriores"], c:[0], e:["Correta. PICERL = Preparation, Identification, Containment, Eradication, Recovery, Lessons learned.","Errada. Não corresponde ao modelo.","Errada. Isso lembra um ciclo de melhoria genérico, não o PICERL.","Errada. A primeira alternativa está correta."]},

    {a:"d5", sub:"5.3", q:"Sob o GDPR, qual é o prazo de referência para notificar a autoridade sobre uma violação de dados pessoais?", o:["24 horas","72 horas","30 dias","1 ano"], c:[1], e:["Errada. Não é 24 horas.","Correta. O GDPR exige notificar a autoridade competente em até 72 horas após tomar conhecimento da violação, quando aplicável.","Errada. 30 dias é longo demais para essa notificação inicial.","Errada. Muito além do exigido."]},

    {a:"d5", sub:"5.3", q:"Uma equipe formalmente responsável por receber, analisar e responder a incidentes de segurança é chamada de:", o:["CSIRT / CERT","DBA","Help desk de vendas","Comitê de marketing"], c:[0], e:["Correta. CSIRT (Computer Security Incident Response Team), também chamado CERT, coordena a resposta a incidentes.","Errada. DBA administra bancos de dados.","Errada. Help desk de vendas não trata incidentes de segurança.","Errada. Marketing não é a equipe de resposta."]},

    {a:"d5", sub:"5.1", q:"O que é um 'playbook' de resposta a incidentes?", o:["Um jogo de tabuleiro","Um procedimento documentado, passo a passo, para responder a um tipo específico de incidente (ex.: phishing, ransomware)","Um tipo de firewall","Uma senha mestra"], c:[1], e:["Errada. Não é um jogo.","Correta. O playbook padroniza a resposta a um cenário, acelerando e dando consistência às ações (muitas vezes automatizado via SOAR).","Errada. Não é dispositivo de rede.","Errada. Não é credencial."]},

    {a:"d5", sub:"5.1", q:"Por que enviar os logs para um SIEM central em vez de mantê-los apenas em cada equipamento?", o:["Para ocupar mais disco","Para correlacionar eventos de várias fontes, detectar padrões de ataque distribuídos e preservar os logs mesmo se um host for comprometido","Porque a lei proíbe logs locais","Para deixar a rede mais lenta"], c:[1], e:["Errada. O objetivo não é gastar disco.","Correta. A centralização permite correlação, retenção segura e detecção de ataques que só aparecem ao cruzar fontes; também evita que o atacante apague os logs localmente.","Errada. Não há tal proibição.","Errada. Não visa degradar a rede."]},

    {a:"d5", sub:"5.2", q:"Como a MITRE ATT&CK e a Cyber Kill Chain se complementam?", o:["São a mesma coisa","A Kill Chain dá a visão macro (fases sequenciais do ataque); a ATT&CK detalha as táticas e técnicas específicas usadas em cada etapa","A ATT&CK é mais antiga e superficial","Nenhuma serve para defesa"], c:[1], e:["Errada. São modelos distintos e complementares.","Correta. A Kill Chain conta a 'história' em fases; a ATT&CK fornece o 'como' detalhado (TTPs), útil para detecção e mapeamento de defesas.","Errada. A ATT&CK é detalhada e amplamente usada.","Errada. Ambas apoiam fortemente a defesa."]},

    {a:"d5", sub:"5.3", q:"Qual framework de conformidade se aplica a organizações que processam pagamentos com cartão?", o:["FERPA","PCI DSS","FISMA","HIPAA"], c:[1], e:["Errada. FERPA trata de registros educacionais (EUA).","Correta. O PCI DSS rege a segurança de dados de cartões de pagamento e exige controles e notificação em incidentes.","Errada. FISMA é para sistemas do governo federal dos EUA.","Errada. HIPAA é para dados de saúde (EUA)."]},

    {a:"d5", sub:"5.4", q:"Elementos essenciais de um plano de resposta a incidentes incluem: (selecione três)", o:["Papéis e responsabilidades (quem faz o quê)","Procedimentos de comunicação e escalonamento","A senha do Wi-Fi dos visitantes","Playbooks por tipo de incidente"], c:[0,1,3], e:["Correta. Definir papéis evita confusão durante a crise.","Correta. Comunicação/escalonamento claros são vitais na resposta.","Errada. Senha de Wi-Fi de visitante não é elemento do plano.","Correta. Playbooks padronizam a resposta a cenários específicos."]},

    {a:"d5", sub:"5.2", q:"Ordene corretamente parte das fases da Cyber Kill Chain. Quais destas são fases legítimas? (selecione três)", o:["Reconhecimento","Armamento (weaponization)","Backup diário","Comando e Controle (C2)"], c:[0,1,3], e:["Correta. Reconhecimento é a 1ª fase.","Correta. Armamento é a 2ª fase (montar o artefato).","Errada. Backup é um controle de recuperação, não uma fase de ataque.","Correta. Comando e Controle é a 6ª fase."]},

    {a:"d5", sub:"5.1", q:"Quando um analista de SOC deve ESCALAR um alerta para o próximo nível?", o:["Nunca, deve resolver tudo sozinho","Quando o alerta indica um incidente real além do seu escopo/autoridade, exige competências avançadas ou tem alto impacto potencial","Somente no fim do expediente","Apenas se o chefe pedir"], c:[1], e:["Errada. Escalonamento faz parte do processo.","Correta. Escala-se quando o incidente é confirmado/relevante e ultrapassa a capacidade ou alçada do nível atual, seguindo o procedimento definido.","Errada. O momento é ditado pela gravidade, não pelo horário.","Errada. O critério é técnico/processual, não hierárquico informal."]},

    {a:"d5", sub:"5.2", q:"Interromper a 'entrega' de um e-mail malicioso com um filtro de e-mail é um exemplo de:", o:["Falha de segurança","Quebrar a Cyber Kill Chain em uma de suas fases, impedindo o ataque de progredir","Ataque de negação de serviço","Escalonamento de privilégio"], c:[1], e:["Errada. É o oposto de falha — é defesa eficaz.","Correta. Bloquear uma fase (aqui, a Entrega) interrompe toda a cadeia; por isso a Kill Chain orienta onde posicionar controles.","Errada. Não é DoS.","Errada. Não é escalonamento de privilégio."]},
  ];
  Array.prototype.push.apply(Q, perguntas);

  var material = [
    {t:"Cyber Kill Chain — as 7 fases", sub:"5.2", html:`
      <ol>
        <li><b>Reconhecimento</b> — coletar informações sobre o alvo.</li>
        <li><b>Armamento</b> — acoplar exploit + payload num artefato.</li>
        <li><b>Entrega</b> — enviar a arma (e-mail, USB, site).</li>
        <li><b>Exploração</b> — acionar a vulnerabilidade no alvo.</li>
        <li><b>Instalação</b> — instalar o malware/backdoor.</li>
        <li><b>Comando e Controle (C2)</b> — abrir canal de controle.</li>
        <li><b>Ações no objetivo</b> — exfiltrar, destruir, cifrar dados.</li>
      </ol>
      <p class="tip">Defesa: interromper QUALQUER fase quebra a cadeia. Ex.: filtro de e-mail bloqueia a Entrega.</p>`},

    {t:"Kill Chain × MITRE ATT&CK × Diamond Model", sub:"5.2", html:`
      <table>
        <tr><th>Modelo</th><th>Foco</th></tr>
        <tr><td>Cyber Kill Chain</td><td>Visão macro: fases sequenciais do ataque</td></tr>
        <tr><td>MITRE ATT&CK</td><td>Detalhe operacional: táticas, técnicas e procedimentos (TTPs)</td></tr>
        <tr><td>Diamond Model</td><td>Análise de intrusão: Adversário, Capacidade, Infraestrutura, Vítima</td></tr>
      </table>`},

    {t:"IOC × IOA", sub:"5.2", html:`
      <table>
        <tr><th></th><th>IOC (indicador de comprometimento)</th><th>IOA (indicador de ataque)</th></tr>
        <tr><td>Foco</td><td>Rastros do que já ocorreu</td><td>Comportamento/intenção em andamento</td></tr>
        <tr><td>Postura</td><td>Reativo/forense</td><td>Proativo</td></tr>
        <tr><td>Exemplos</td><td>Hash malicioso, IP de C2, domínio</td><td>Escalonamento de privilégio, movimento lateral</td></tr>
      </table>`},

    {t:"Forense: ordem de volatilidade e evidências", sub:"5.2", html:`
      <ol>
        <li>Registradores / cache da CPU (mais volátil)</li>
        <li>Memória RAM</li>
        <li>Estado da rede / conexões</li>
        <li>Disco</li>
        <li>Backups / arquivos (menos volátil)</li>
      </ol>
      <p class="tip">Colete do mais volátil ao menos volátil. Faça <b>imagem forense</b> (bit a bit) e calcule <b>hash</b> para provar integridade. Mantenha a <b>cadeia de custódia</b> documentada.</p>`},

    {t:"NIST 800-61 × SANS PICERL", sub:"5.4", html:`
      <table>
        <tr><th>NIST (4 fases)</th><th>SANS PICERL (6 passos)</th></tr>
        <tr><td>Preparação</td><td>Preparation</td></tr>
        <tr><td>Detecção e Análise</td><td>Identification</td></tr>
        <tr><td rowspan="3">Contenção, Erradicação e Recuperação</td><td>Containment</td></tr>
        <tr><td>Eradication</td></tr>
        <tr><td>Recovery</td></tr>
        <tr><td>Atividade Pós-Incidente</td><td>Lessons learned</td></tr>
      </table>
      <p>Mesmo processo, granularidades diferentes. A equipe responsável é o <b>CSIRT/CERT</b>; os passos por cenário ficam em <b>playbooks</b>.</p>`},

    {t:"SOC, métricas e conformidade", sub:"5.1", html:`
      <ul>
        <li><b>Tiers do SOC</b>: T1 triagem → T2 investigação → T3 forense/hunting.</li>
        <li><b>SIEM</b> correlaciona logs e alerta; <b>SOAR</b> automatiza a resposta (playbooks).</li>
        <li><b>MTTD/MTTR</b> — tempos médios para detectar/responder (quanto menores, melhor).</li>
        <li><b>Alert fatigue</b> — excesso de alertas dessensibiliza; combata com tuning e automação.</li>
        <li><b>Notificação</b>: GDPR ~72h; LGPD exige comunicar a ANPD e titulares em prazo razoável; PCI/HIPAA têm seus próprios requisitos.</li>
      </ul>`},
  ];
  if (M && M.d5) Array.prototype.push.apply(M.d5, material);
})();

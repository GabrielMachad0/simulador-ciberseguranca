/* Domínio 4 — Vulnerabilidades e Gestão de Riscos: questões e material EXTRA */
(function () {
  var Q = window.QUESTIONS, M = window.MATERIAL;

  var perguntas = [
    {a:"d4", sub:"4.3", q:"Um ativo vale R$ 200.000. Um incêndio destruiria 50% dele. Qual é o SLE (Single Loss Expectancy)?", o:["R$ 200.000","R$ 100.000","R$ 50.000","R$ 400.000"], c:[1], e:["Errada. Esse é o valor total do ativo (AV), não a perda de um evento.","Correta. SLE = AV × EF = 200.000 × 0,5 = R$ 100.000 (perda esperada por ocorrência).","Errada. Seria 25% de exposição, não 50%.","Errada. Não se multiplica o valor do ativo."]},

    {a:"d4", sub:"4.3", q:"Se o SLE é R$ 100.000 e o evento tende a ocorrer 2 vezes por ano (ARO = 2), qual é o ALE (Annual Loss Expectancy)?", o:["R$ 50.000","R$ 100.000","R$ 200.000","R$ 2.000.000"], c:[2], e:["Errada. Isso dividiria em vez de multiplicar.","Errada. Esse é o SLE de um único evento.","Correta. ALE = SLE × ARO = 100.000 × 2 = R$ 200.000 por ano.","Errada. Valor exagerado; o ARO é 2, não 20."]},

    {a:"d4", sub:"4.3", q:"O que significam AV, EF, SLE, ARO e ALE na análise quantitativa de risco?", o:["Termos sem relação entre si","AV = valor do ativo; EF = fator de exposição (%); SLE = AV × EF; ARO = frequência anual; ALE = SLE × ARO","ALE é o valor do ativo","EF é a frequência anual"], c:[1], e:["Errada. Formam uma cadeia de cálculo coerente.","Correta. É a sequência quantitativa: do valor e exposição chega-se à perda por evento (SLE) e, com a frequência (ARO), à perda anual (ALE).","Errada. ALE é a perda anual esperada, não o valor do ativo.","Errada. EF é o percentual de perda; a frequência é o ARO."]},

    {a:"d4", sub:"4.3", q:"Qual a diferença entre análise de risco qualitativa e quantitativa?", o:["São a mesma coisa","Qualitativa usa escalas subjetivas (baixo/médio/alto); quantitativa atribui valores numéricos/monetários (SLE, ALE)","Quantitativa não usa números","Qualitativa é sempre mais precisa"], c:[1], e:["Errada. São abordagens distintas e complementares.","Correta. A qualitativa classifica por níveis; a quantitativa calcula valores (ex.: R$/ano) para embasar decisões.","Errada. A quantitativa é justamente baseada em números.","Errada. A quantitativa tende a ser mais objetiva, embora dependa de bons dados."]},

    {a:"d4", sub:"4.2", q:"Na escala do CVSS v3, uma pontuação de 9,0 a 10,0 corresponde a qual severidade?", o:["Baixa","Média","Alta","Crítica"], c:[3], e:["Errada. Baixa é 0,1–3,9.","Errada. Média é 4,0–6,9.","Errada. Alta é 7,0–8,9.","Correta. 9,0–10,0 é Crítica — prioridade máxima de correção."]},

    {a:"d4", sub:"4.2", q:"O escore CVSS é composto por grupos de métricas. Quais são eles?", o:["Base, Temporal e Ambiental","Alto, Médio e Baixo","Rede, Host e Aplicação","Preventivo, Detectivo e Corretivo"], c:[0], e:["Correta. O CVSS tem as métricas Base (características intrínsecas), Temporal (evolui com o tempo/exploit) e Ambiental (contexto da organização).","Errada. Esses são níveis de severidade, não grupos de métricas.","Errada. Não é essa a divisão do CVSS.","Errada. Esses são tipos de controle de segurança."]},

    {a:"d4", sub:"4.2", q:"Qual é a base de dados pública dos EUA que enriquece os CVEs com escores CVSS e informações adicionais?", o:["NVD (National Vulnerability Database)","DNS","CRL","SIEM"], c:[0], e:["Correta. A NVD, mantida pelo NIST, complementa os CVEs com CVSS, referências e metadados.","Errada. DNS resolve nomes.","Errada. CRL lista certificados revogados.","Errada. SIEM correlaciona logs."]},

    {a:"d4", sub:"4.2", q:"Numa varredura de vulnerabilidades, o que é um FALSO POSITIVO?", o:["Uma vulnerabilidade real que passou despercebida","Um alerta de vulnerabilidade que, na verdade, não existe ou não é explorável naquele contexto","Um patch aplicado com sucesso","Um usuário legítimo bloqueado"], c:[1], e:["Errada. Isso descreve um falso NEGATIVO.","Correta. Falso positivo é um alarme incorreto — a ferramenta aponta algo que não é vulnerabilidade real; consome tempo da equipe.","Errada. Não tem relação com aplicar patch.","Errada. Isso seria um problema de controle de acesso."]},

    {a:"d4", sub:"4.1", q:"Qual a diferença entre pentest black box, white box e gray box?", o:["Só muda a cor do relatório","Black box: sem conhecimento prévio do alvo; white box: acesso total a informações/código; gray box: conhecimento parcial","White box não usa ferramentas","Black box é feito só por robôs"], c:[1], e:["Errada. Refere-se ao nível de informação fornecida ao testador.","Correta. Black = zero informação (simula atacante externo); White = informação completa (revisão profunda); Gray = parcial (ex.: credenciais de usuário comum).","Errada. White box também usa ferramentas.","Errada. Pentest tem forte componente humano."]},

    {a:"d4", sub:"4.1", q:"O que é um programa de bug bounty?", o:["Uma recompensa para quem espalhar malware","Um programa em que a organização recompensa pesquisadores por reportarem vulnerabilidades de forma responsável","Uma multa por usar senhas fracas","Um tipo de firewall"], c:[1], e:["Errada. Jamais se recompensa atividade maliciosa.","Correta. Bug bounty incentiva a divulgação responsável de falhas, pagando recompensas a quem as reporta corretamente.","Errada. Não é penalidade de senha.","Errada. Não é dispositivo de rede."]},

    {a:"d4", sub:"4.4", q:"Uma empresa define que, após um desastre, os sistemas críticos devem voltar em no máximo 4 horas. Esse parâmetro é o:", o:["RPO (Recovery Point Objective)","RTO (Recovery Time Objective)","SLE","ARO"], c:[1], e:["Errada. O RPO trata de quanta perda de DADOS é tolerável (tempo entre backups).","Correta. O RTO é o tempo máximo aceitável para restaurar o serviço após a interrupção.","Errada. SLE é perda por evento.","Errada. ARO é a frequência anual."]},

    {a:"d4", sub:"4.4", q:"O RPO (Recovery Point Objective) define:", o:["Quanto tempo para restaurar o serviço","Quanta perda de dados é tolerável, ou seja, até que ponto no tempo os dados precisam ser recuperados (frequência de backup)","O valor do ativo","O número de atacantes"], c:[1], e:["Errada. Tempo de restauração é o RTO.","Correta. O RPO indica o volume máximo de dados que se pode perder, medido no tempo desde o último backup — orienta a frequência dos backups.","Errada. Isso é AV.","Errada. Não tem relação."]},

    {a:"d4", sub:"4.4", q:"Qual site de recuperação permite retomar as operações em minutos/horas por já estar totalmente equipado, replicado e pronto?", o:["Cold site","Warm site","Hot site","Nenhum site"], c:[2], e:["Errada. O cold site tem só infraestrutura básica (espaço/energia); leva dias.","Errada. O warm site tem hardware parcial; leva horas a dias.","Correta. O hot site é um espelho pronto, com dados replicados — recuperação quase imediata (mais caro).","Errada. Existem, sim, opções de site alternativo."]},

    {a:"d4", sub:"4.3", q:"Depois de aplicar controles de mitigação, o risco que ainda permanece é chamado de:", o:["Risco inerente","Risco residual","Risco zero","Risco transferido"], c:[1], e:["Errada. Risco inerente é o que existe ANTES dos controles.","Correta. Risco residual é o que sobra após os controles; a organização decide aceitá-lo se estiver dentro do apetite a risco.","Errada. Risco zero praticamente não existe.","Errada. Transferir é uma estratégia, não o risco remanescente em si."]},

    {a:"d4", sub:"4.3", q:"O 'apetite a risco' (risk appetite) de uma organização é:", o:["A quantidade de ataques que ela sofre","O nível de risco que ela está disposta a aceitar na busca por seus objetivos","O número de firewalls instalados","A velocidade da internet"], c:[1], e:["Errada. Não é uma métrica de incidentes.","Correta. O apetite a risco define quanto risco é aceitável; guia quais riscos residuais podem ser aceitos e quais exigem tratamento.","Errada. Não tem relação com contagem de controles.","Errada. Não tem relação com banda."]},

    {a:"d4", sub:"4.3", q:"O que é um 'risk register' (registro de riscos)?", o:["Um log de firewall","Um documento que cataloga os riscos identificados, sua avaliação, responsáveis e as ações de tratamento","Uma lista de senhas","Um certificado digital"], c:[1], e:["Errada. Não é log de dispositivo.","Correta. O risk register centraliza os riscos, seus donos, níveis e planos de resposta — ferramenta central da gestão de risco.","Errada. Não é cofre de senhas.","Errada. Não é certificado."]},

    {a:"d4", sub:"4.4", q:"Um controle que DESENCORAJA um ataque (ex.: aviso de câmeras, banner de advertência) é classificado como:", o:["Dissuasório (deterrent)","Corretivo","Compensatório","De recuperação"], c:[0], e:["Correta. O controle dissuasório busca desestimular o atacante antes da ação (placa de câmera, aviso legal).","Errada. Corretivo age após o incidente.","Errada. Compensatório substitui um controle primário inviável.","Errada. Recuperação restaura operações."]},

    {a:"d4", sub:"4.1", q:"Por que priorizar (ranquear) vulnerabilidades é necessário, em vez de tentar corrigir tudo ao mesmo tempo?", o:["Porque corrigir é opcional","Porque os recursos são limitados; prioriza-se pela severidade (CVSS) e pelo impacto/criticidade do ativo para tratar primeiro o que traz maior risco","Porque vulnerabilidades não importam","Porque o CVSS proíbe corrigir mais de uma"], c:[1], e:["Errada. Corrigir é essencial.","Correta. Com tempo/equipe finitos, foca-se no maior risco real (severidade × exposição × valor do ativo).","Errada. Vulnerabilidades importam muito.","Errada. O CVSS apenas ajuda a priorizar."]},

    {a:"d4", sub:"4.3", q:"Por que o processo de gestão de mudanças (change management) é relevante para a segurança?", o:["Só gera burocracia inútil","Mudanças não controladas podem introduzir vulnerabilidades e indisponibilidade; o processo avalia, aprova, testa e documenta alterações","Ele substitui o antivírus","Ele elimina a necessidade de backups"], c:[1], e:["Errada. Tem valor real de segurança e estabilidade.","Correta. Alterar sistemas sem controle é fonte comum de incidentes; o change management reduz esse risco com avaliação e rastreabilidade.","Errada. Não substitui antivírus.","Errada. Backups continuam necessários."]},

    {a:"d4", sub:"4.4", q:"Qual a diferença entre desastres naturais e causados por humanos, no contexto de BCP/DRP?", o:["Só desastres naturais importam","Naturais (enchente, terremoto) e humanos (erro, sabotagem, ataque, incêndio) ambos ameaçam a continuidade e devem ser previstos no planejamento","Humanos nunca afetam TI","Naturais são sempre previsíveis"], c:[1], e:["Errada. Ambos importam.","Correta. O planejamento de continuidade deve considerar as duas origens de disrupção e seus impactos.","Errada. Erro humano e ataques afetam muito a TI.","Errada. Desastres naturais nem sempre são previsíveis."]},

    {a:"d4", sub:"4.1", q:"Quais atividades fazem parte da gestão de vulnerabilidades? (selecione três)", o:["Identificar vulnerabilidades (scans)","Priorizar/avaliar (ex.: por CVSS)","Ignorar as falhas encontradas","Remediar/mitigar e reavaliar"], c:[0,1,3], e:["Correta. A identificação (varreduras) inicia o ciclo.","Correta. Priorizar direciona os esforços ao maior risco.","Errada. Ignorar contraria todo o processo.","Correta. Remediar e revalidar fecha o ciclo (que é contínuo)."]},

    {a:"d4", sub:"4.4", q:"Quais são exemplos de controles corretivos (recuperação)? (selecione dois)", o:["Restaurar dados a partir de backup","Aviso de câmera de segurança","Aplicar patch para eliminar a causa após um incidente","Firewall de perímetro"], c:[0,2], e:["Correta. Restaurar backup repara o dano após o evento.","Errada. Aviso de câmera é controle dissuasório.","Correta. Aplicar o patch corrige a causa após o incidente.","Errada. Firewall é preventivo."]},

    {a:"d4", sub:"4.2", q:"Qual é uma boa fonte de threat intelligence para se manter atualizado sobre novas ameaças? (selecione dois)", o:["Feeds/serviços de assinatura de inteligência de ameaças","Boletins e catálogos de CVE","Ignorar notícias de segurança","Desativar os logs"], c:[0,1], e:["Correta. Feeds/serviços entregam indicadores e tendências atualizados.","Correta. Boletins e o catálogo de CVEs informam vulnerabilidades novas.","Errada. Ignorar notícias deixa a organização cega a ameaças.","Errada. Logs são essenciais, não devem ser desativados."]},
  ];
  Array.prototype.push.apply(Q, perguntas);

  var material = [
    {t:"Risco quantitativo: SLE, ARO e ALE", sub:"4.3", html:`
      <table>
        <tr><th>Sigla</th><th>Significado</th><th>Fórmula</th></tr>
        <tr><td>AV</td><td>Valor do ativo</td><td>—</td></tr>
        <tr><td>EF</td><td>Fator de exposição (% de perda)</td><td>—</td></tr>
        <tr><td>SLE</td><td>Perda por evento único</td><td>AV × EF</td></tr>
        <tr><td>ARO</td><td>Frequência anual do evento</td><td>—</td></tr>
        <tr><td>ALE</td><td>Perda anual esperada</td><td>SLE × ARO</td></tr>
      </table>
      <p class="tip">Exemplo: ativo R$ 200.000, EF 50% → SLE = R$ 100.000. Se ocorre 2×/ano (ARO=2) → ALE = R$ 200.000/ano. Se um controle custa menos que o ALE e reduz o risco, costuma valer a pena.</p>`},

    {t:"CVSS: faixas de severidade", sub:"4.2", html:`
      <table>
        <tr><th>Escore</th><th>Severidade</th></tr>
        <tr><td>0.0</td><td>Nenhuma</td></tr>
        <tr><td>0.1 – 3.9</td><td>Baixa</td></tr>
        <tr><td>4.0 – 6.9</td><td>Média</td></tr>
        <tr><td>7.0 – 8.9</td><td>Alta</td></tr>
        <tr><td>9.0 – 10.0</td><td>Crítica</td></tr>
      </table>
      <p>Grupos de métricas do CVSS: <b>Base</b> (intrínseca), <b>Temporal</b> (muda com exploit/patch) e <b>Ambiental</b> (contexto da organização). A <b>NVD</b> (NIST) publica CVSS para os CVEs.</p>`},

    {t:"Estratégias de risco e conceitos-chave", sub:"4.3", html:`
      <ul>
        <li><b>Evitar</b> · <b>Mitigar</b> · <b>Transferir</b> · <b>Aceitar</b> (as quatro respostas ao risco).</li>
        <li><b>Risco inerente</b> — antes dos controles. <b>Risco residual</b> — o que sobra depois.</li>
        <li><b>Apetite/tolerância a risco</b> — quanto de risco a organização aceita.</li>
        <li><b>Risk register</b> — catálogo de riscos, donos, níveis e ações.</li>
        <li>Priorizar pela combinação severidade (CVSS) × impacto × criticidade do ativo.</li>
      </ul>`},

    {t:"Continuidade: RTO, RPO e MTD", sub:"4.4", html:`
      <table>
        <tr><th>Métrica</th><th>Responde a</th></tr>
        <tr><td>RTO</td><td>Em quanto tempo o serviço precisa voltar?</td></tr>
        <tr><td>RPO</td><td>Quanta perda de dados é tolerável? (define a frequência de backup)</td></tr>
        <tr><td>MTD</td><td>Tempo máximo tolerável de indisponibilidade antes de dano grave</td></tr>
      </table>
      <p class="tip">Regra prática: RTO e RPO devem ser menores ou iguais ao MTD.</p>`},

    {t:"Sites alternativos de recuperação", sub:"4.4", html:`
      <table>
        <tr><th>Site</th><th>Preparo</th><th>Tempo de retomada</th><th>Custo</th></tr>
        <tr><td>Hot</td><td>Espelho pronto, dados replicados</td><td>Minutos/horas</td><td>Alto</td></tr>
        <tr><td>Warm</td><td>Hardware parcial, dados recentes</td><td>Horas/dias</td><td>Médio</td></tr>
        <tr><td>Cold</td><td>Só espaço/energia</td><td>Dias</td><td>Baixo</td></tr>
      </table>`},

    {t:"Tipos de teste e controles", sub:"4.1", html:`
      <ul>
        <li><b>Scan de vulnerabilidades</b> — lista falhas potenciais (automático).</li>
        <li><b>Pentest</b> — explora ativamente. Modalidades: <b>black box</b> (sem info), <b>white box</b> (info total), <b>gray box</b> (parcial).</li>
        <li><b>Recon</b> — <b>passivo</b> (sem tocar o alvo) × <b>ativo</b> (interage, detectável).</li>
        <li><b>Bug bounty</b> — recompensa por divulgação responsável de falhas.</li>
        <li><b>Falso positivo</b> (alarme falso) × <b>falso negativo</b> (falha real não detectada).</li>
      </ul>`},
  ];
  if (M && M.d4) Array.prototype.push.apply(M.d4, material);
})();

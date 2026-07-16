/* Domínio 3 — Segurança de Endpoint: questões e material EXTRA (avançado) */
(function () {
  var Q = window.QUESTIONS, M = window.MATERIAL;

  var perguntas = [
    {a:"d3", sub:"3.1", q:"Qual recurso do Windows exige um chip que armazena chaves de criptografia e apoia o BitLocker e o Secure Boot?", o:["TPM (Trusted Platform Module)","UAC","Registro do Windows","Gerenciador de Tarefas"], c:[0], e:["Correta. O TPM é um módulo de hardware que guarda chaves com segurança e sustenta BitLocker e Secure Boot.","Errada. O UAC controla elevação de privilégio.","Errada. O registro guarda configurações do sistema.","Errada. O Gerenciador de Tarefas mostra processos/desempenho."]},

    {a:"d3", sub:"3.1", q:"O que faz o Secure Boot?", o:["Acelera a inicialização","Garante que apenas software de inicialização assinado e confiável seja carregado, bloqueando bootkits/rootkits de boot","Criptografa e-mails","Faz backup automático"], c:[1], e:["Errada. O objetivo é segurança, não velocidade.","Correta. O Secure Boot verifica assinaturas dos componentes de boot, impedindo carregar código malicioso antes do SO.","Errada. Não tem relação com e-mail.","Errada. Não é ferramenta de backup."]},

    {a:"d3", sub:"3.1", q:"No Windows corporativo, qual recurso aplica políticas de segurança de forma centralizada a muitos computadores e usuários do domínio?", o:["GPO (Group Policy / Diretiva de Grupo)","Bloco de Notas","Paint","Windows Media Player"], c:[0], e:["Correta. A GPO (Group Policy Object) distribui configurações e políticas via Active Directory a máquinas e usuários.","Errada. Bloco de Notas é editor de texto.","Errada. Paint é editor de imagem.","Errada. Media Player toca mídia."]},

    {a:"d3", sub:"3.1", q:"No macOS, qual recurso verifica se aplicativos são assinados/confiáveis antes de permitir a execução?", o:["Gatekeeper","FileVault","Bcrypt","systemctl"], c:[0], e:["Correta. O Gatekeeper checa a assinatura/origem dos apps e bloqueia software não confiável.","Errada. O FileVault faz criptografia de disco no macOS.","Errada. Bcrypt é função de hash de senha.","Errada. systemctl é do Linux (systemd)."]},

    {a:"d3", sub:"3.1", q:"Qual é o equivalente do BitLocker no macOS (criptografia de disco completo)?", o:["FileVault","XProtect","Gatekeeper","Spotlight"], c:[0], e:["Correta. O FileVault criptografa todo o disco do macOS.","Errada. O XProtect é o antimalware do macOS.","Errada. O Gatekeeper valida apps.","Errada. O Spotlight é a busca do sistema."]},

    {a:"d3", sub:"3.1", q:"No Linux, quais tecnologias implementam controle de acesso obrigatório (MAC) para confinar processos?", o:["SELinux e AppArmor","apt e yum","grep e cat","ping e traceroute"], c:[0], e:["Correta. SELinux (Red Hat) e AppArmor (Debian/Ubuntu/SUSE) confinam processos por políticas, limitando o dano de uma invasão.","Errada. apt/yum são gerenciadores de pacotes.","Errada. grep/cat manipulam texto.","Errada. ping/traceroute são diagnóstico de rede."]},

    {a:"d3", sub:"3.1", q:"Qual a diferença entre um antivírus tradicional e uma solução de EDR?", o:["São idênticos","O antivírus foca em detectar malware conhecido por assinatura; o EDR monitora continuamente o endpoint, detecta comportamentos suspeitos, investiga e permite resposta","EDR só funciona em servidores","Antivírus é mais avançado que EDR"], c:[1], e:["Errada. Têm escopos diferentes.","Correta. O EDR (Endpoint Detection and Response) vai além das assinaturas: telemetria contínua, detecção comportamental, investigação e resposta.","Errada. EDR roda em estações e servidores.","Errada. O EDR é a evolução mais avançada."]},

    {a:"d3", sub:"3.1", q:"A técnica de 'application allowlisting' (lista de permissões de aplicativos) consiste em:", o:["Permitir qualquer aplicativo por padrão e bloquear os ruins","Permitir a execução apenas de aplicativos explicitamente aprovados, bloqueando todo o resto","Instalar o máximo de apps possível","Desativar o antivírus"], c:[1], e:["Errada. Isso é a abordagem de blocklist (mais fraca).","Correta. O allowlisting só deixa rodar o que está na lista aprovada — muito eficaz contra malware desconhecido.","Errada. Aumentar apps amplia a superfície de ataque.","Errada. Não tem relação com desativar defesas."]},

    {a:"d3", sub:"3.2", q:"No Linux moderno, qual comando é o substituto do netstat para exibir sockets e conexões?", o:["ss","ls","cd","echo"], c:[0], e:["Correta. O ss (socket statistics) mostra conexões/portas, sendo o sucessor mais rápido do netstat.","Errada. ls lista arquivos.","Errada. cd muda de diretório.","Errada. echo imprime texto."]},

    {a:"d3", sub:"3.2", q:"Qual comando lista os processos em execução e o uso de recursos em tempo real no Linux?", o:["top (ou htop)","chmod","nslookup","route"], c:[0], e:["Correta. O top (e o htop) mostra processos e consumo de CPU/memória em tempo real — útil para achar processos suspeitos.","Errada. chmod trata de permissões.","Errada. nslookup consulta DNS.","Errada. route exibe/edita a tabela de rotas."]},

    {a:"d3", sub:"3.2", q:"Para ver a configuração de IP das interfaces, quais comandos você usaria no Windows e no Linux, respectivamente?", o:["ipconfig e ifconfig/ip","netstat e nslookup","chmod e chown","tasklist e top"], c:[0], e:["Correta. ipconfig (Windows) e ifconfig ou ip addr (Linux) mostram a configuração das interfaces.","Errada. Esses mostram conexões/consultam DNS.","Errada. Esses tratam de permissões.","Errada. Esses listam processos."]},

    {a:"d3", sub:"3.2", q:"No Windows, qual comando verifica e repara arquivos de sistema corrompidos?", o:["sfc /scannow","chmod 777","apt update","tcpdump"], c:[0], e:["Correta. O sfc /scannow (System File Checker) verifica e restaura arquivos de sistema íntegros.","Errada. chmod é do Linux e não existe assim no Windows.","Errada. apt é gerenciador de pacotes do Debian/Ubuntu.","Errada. tcpdump captura pacotes."]},

    {a:"d3", sub:"3.3", q:"Na estratégia de backup 3-2-1, o que significam os números?", o:["3 senhas, 2 firewalls, 1 antivírus","3 cópias dos dados, em 2 tipos de mídia diferentes, sendo 1 fora do local (offsite)","3 servidores, 2 discos, 1 nuvem obrigatória","3 dias de retenção, 2 backups, 1 restauração"], c:[1], e:["Errada. Não se refere a credenciais/defesas.","Correta. 3-2-1 = 3 cópias, em 2 mídias distintas, com 1 cópia offsite (idealmente offline/imutável contra ransomware).","Errada. Nuvem é uma opção de offsite, não obrigatória.","Errada. Não são períodos de retenção."]},

    {a:"d3", sub:"3.3", q:"Qual a diferença entre backup incremental e diferencial?", o:["São iguais","Incremental copia o que mudou desde o ÚLTIMO backup (qualquer tipo); diferencial copia tudo que mudou desde o último backup COMPLETO","Diferencial é sempre menor que incremental","Incremental não pode ser restaurado"], c:[1], e:["Errada. Diferem na base de comparação.","Correta. Incremental = mudanças desde o último backup qualquer (mais rápido de gravar, restauração mais complexa); diferencial = mudanças desde o último full (grava mais, restaura mais simples).","Errada. Geralmente é o contrário: o diferencial cresce mais que o incremental.","Errada. Incremental é restaurável (precisa do full + cadeia de incrementais)."]},

    {a:"d3", sub:"3.3", q:"A gestão de configuração (configuration management) contribui para a segurança porque:", o:["Deixa a tela mais bonita","Mantém sistemas em um estado padronizado e seguro (baselines), detectando e corrigindo desvios não autorizados","Elimina a necessidade de antivírus","Aumenta o número de contas admin"], c:[1], e:["Errada. Não é questão estética.","Correta. Padronizar e monitorar configurações (baseline/hardening) reduz falhas e detecta mudanças indevidas.","Errada. Não substitui antivírus.","Errada. Mais admins aumentam o risco."]},

    {a:"d3", sub:"3.4", q:"Por que é recomendável testar patches em um ambiente controlado antes de aplicá-los amplamente?", o:["Para atrasar de propósito","Para reduzir o risco de que a atualização quebre sistemas em produção, equilibrando segurança e estabilidade","Porque patches nunca têm problemas","Para gastar mais tempo"], c:[1], e:["Errada. O objetivo não é atrasar.","Correta. Testar antes evita indisponibilidade causada por patches problemáticos — parte de um bom processo de patch management.","Errada. Patches podem, sim, introduzir regressões.","Errada. Não se trata de desperdiçar tempo."]},

    {a:"d3", sub:"3.5", q:"No Windows, em qual log do Visualizador de Eventos ficam registrados logins bem-sucedidos e falhos?", o:["Log de Segurança (Security)","Log de Aplicativos","Log do Sistema","Log de Configuração"], c:[0], e:["Correta. Eventos de autenticação (logon/logoff, falhas) ficam no log de Segurança.","Errada. O log de Aplicativos guarda eventos de programas.","Errada. O log do Sistema guarda eventos de componentes do SO/drivers.","Errada. Não é uma categoria padrão de log de eventos."]},

    {a:"d3", sub:"3.5", q:"Um analista percebe que os logs de um servidor pararam de ser gerados subitamente. Por que isso é suspeito?", o:["É normal e esperado","Atacantes frequentemente desativam ou apagam logs para encobrir rastros — a ausência de logs é, ela mesma, um indicador de comprometimento","Significa que o servidor está mais rápido","Quer dizer que não há mais usuários"], c:[1], e:["Errada. Parada abrupta de logs não é normal.","Correta. Silenciar/limpar logs é técnica anti-forense; a lacuna deve ser investigada (por isso logs vão para um servidor central protegido).","Errada. Não tem relação com desempenho.","Errada. Não indica ausência de usuários."]},

    {a:"d3", sub:"3.6", q:"Após conter uma infecção grave por malware, por que muitas vezes se opta por reimaginar (reinstalar) o sistema em vez de apenas limpar?", o:["Porque é mais barato deixar infectado","Porque rootkits/backdoors podem persistir de formas difíceis de detectar; a reimagem a partir de uma fonte confiável garante um estado limpo","Porque limpar é sempre impossível","Porque a lei proíbe limpar"], c:[1], e:["Errada. Deixar infectado não é opção.","Correta. Quando há risco de persistência oculta, reinstalar a partir de imagem confiável dá a maior garantia de erradicação.","Errada. Limpeza é possível em muitos casos, mas nem sempre confiável.","Errada. Não há tal proibição legal."]},

    {a:"d3", sub:"3.1", q:"Quais são práticas de hardening de endpoint? (selecione três)", o:["Desativar serviços e portas desnecessários","Aplicar o princípio do privilégio mínimo às contas","Deixar todas as contas como administrador","Manter o sistema e os aplicativos atualizados"], c:[0,1,3], e:["Correta. Menos serviços = menor superfície de ataque.","Correta. Privilégio mínimo limita o dano de uma conta comprometida.","Errada. Contas admin para todos é péssima prática.","Correta. Atualizações fecham vulnerabilidades conhecidas."]},

    {a:"d3", sub:"3.2", q:"Quais ferramentas ajudam a investigar atividade de rede suspeita em um endpoint? (selecione dois)", o:["netstat / ss (conexões e portas)","tcpdump (captura de pacotes)","chmod (permissões)","apt (pacotes)"], c:[0,1], e:["Correta. netstat/ss revelam conexões e portas em escuta suspeitas.","Correta. tcpdump captura o tráfego para análise.","Errada. chmod trata de permissões de arquivo.","Errada. apt instala pacotes."]},
  ];
  Array.prototype.push.apply(Q, perguntas);

  var material = [
    {t:"Recursos de segurança por sistema operacional", sub:"3.1", html:`
      <table>
        <tr><th>Recurso</th><th>Windows</th><th>macOS</th><th>Linux</th></tr>
        <tr><td>Antimalware nativo</td><td>Microsoft Defender</td><td>XProtect</td><td>ClamAV (3º)</td></tr>
        <tr><td>Cripto de disco</td><td>BitLocker</td><td>FileVault</td><td>LUKS</td></tr>
        <tr><td>Controle de apps</td><td>SmartScreen / AppLocker</td><td>Gatekeeper</td><td>SELinux / AppArmor</td></tr>
        <tr><td>Elevação</td><td>UAC</td><td>sudo</td><td>sudo</td></tr>
      </table>
      <p><b>TPM</b> guarda chaves em hardware; <b>Secure Boot</b> só carrega boot assinado; <b>GPO</b> aplica políticas centralizadas via Active Directory.</p>`},

    {t:"Comandos de diagnóstico do endpoint", sub:"3.2", html:`
      <table>
        <tr><th>Comando</th><th>Função</th></tr>
        <tr><td class="mono">netstat / ss</td><td>Conexões ativas e portas em escuta</td></tr>
        <tr><td class="mono">nslookup / dig</td><td>Consultas DNS</td></tr>
        <tr><td class="mono">tcpdump</td><td>Captura de pacotes</td></tr>
        <tr><td class="mono">ps / top / htop</td><td>Processos e uso de recursos</td></tr>
        <tr><td class="mono">tasklist</td><td>Processos no Windows</td></tr>
        <tr><td class="mono">ipconfig / ifconfig / ip</td><td>Configuração de IP</td></tr>
        <tr><td class="mono">sfc /scannow</td><td>Repara arquivos de sistema (Windows)</td></tr>
      </table>`},

    {t:"Antivírus × EDR × HIDS", sub:"3.1", html:`
      <ul>
        <li><b>Antivírus</b> — detecta malware conhecido por assinatura.</li>
        <li><b>EDR</b> — telemetria contínua, detecção comportamental, investigação e resposta no endpoint.</li>
        <li><b>HIDS</b> — sistema de detecção de intrusão baseado em host (monitora logs, integridade de arquivos, atividades locais).</li>
        <li><b>Application allowlisting</b> — só executa o que está aprovado (forte contra ameaças desconhecidas).</li>
      </ul>`},

    {t:"Tipos de backup e a regra 3-2-1", sub:"3.3", html:`
      <table>
        <tr><th>Tipo</th><th>O que copia</th><th>Restauração</th></tr>
        <tr><td>Completo (full)</td><td>Todos os dados</td><td>Mais simples</td></tr>
        <tr><td>Incremental</td><td>Mudanças desde o último backup (qualquer)</td><td>Full + todos os incrementais</td></tr>
        <tr><td>Diferencial</td><td>Mudanças desde o último full</td><td>Full + último diferencial</td></tr>
      </table>
      <p class="tip">Regra <b>3-2-1</b>: 3 cópias, em 2 mídias diferentes, 1 offsite. Contra ransomware, mantenha ao menos uma cópia offline/imutável.</p>`},

    {t:"Hardening do endpoint", sub:"3.1", html:`
      <ul>
        <li>Desativar serviços, portas e contas desnecessários (menor superfície).</li>
        <li>Privilégio mínimo; evitar uso diário de conta administrativa.</li>
        <li>Atualizar SO, aplicativos, drivers e firmware.</li>
        <li>Criptografar o disco (BitLocker/FileVault/LUKS).</li>
        <li>Ativar firewall de host e EDR/antivírus.</li>
        <li>Padronizar via baseline/gestão de configuração e monitorar desvios.</li>
      </ul>`},

    {t:"Logs: onde olhar e sinais de alerta", sub:"3.5", html:`
      <ul>
        <li><b>Windows — Event Viewer</b>: log de <b>Segurança</b> (logins), <b>Sistema</b> (SO/drivers), <b>Aplicativos</b>.</li>
        <li><b>Linux</b>: /var/log (auth.log, syslog); centralização via <b>syslog</b>.</li>
        <li>Sinais de alerta: rajadas de logins falhos, logins fora de hora/origem incomum, criação de contas, e <b>parada/limpeza súbita de logs</b> (anti-forense).</li>
        <li>Envie logs para um servidor central protegido, fora do alcance do atacante.</li>
      </ul>`},
  ];
  if (M && M.d3) Array.prototype.push.apply(M.d3, material);
})();

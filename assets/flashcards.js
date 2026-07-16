/* ============================================================================
   FLASHCARDS — Simulador CCST Cybersecurity
   Baralho de conceitos-chave por domínio (frente = termo/pergunta, verso = resposta).
   FLASHCARDS[dominio] = [ { f: frente, b: verso } ]
   ============================================================================ */

const FLASHCARDS = {

d1: [
 {f:"Tríade CIA", b:"Confidencialidade, Integridade e Disponibilidade — os três pilares da segurança da informação."},
 {f:"Diferença: ameaça × vulnerabilidade × risco", b:"Vulnerabilidade = fraqueza; Ameaça = o que pode explorá-la; Risco = probabilidade × impacto dessa exploração."},
 {f:"Vetor de ataque × superfície de ataque", b:"Vetor = o caminho de entrada (e-mail, USB, porta aberta). Superfície = a soma de todos os pontos expostos."},
 {f:"Defesa em profundidade", b:"Várias camadas independentes de controle ('cebola'); a falha de uma não compromete o todo."},
 {f:"Privilégio mínimo", b:"Cada conta recebe apenas o acesso estritamente necessário à sua função."},
 {f:"Zero Trust", b:"'Nunca confie, sempre verifique' — todo acesso é autenticado/autorizado, mesmo vindo de dentro da rede."},
 {f:"Não repúdio", b:"Garantir que alguém não possa negar uma ação realizada (logs assinados, assinatura digital)."},
 {f:"Worm × Vírus × Trojan", b:"Worm se auto-replica pela rede sozinho; Vírus se anexa a arquivos e replica ao executar; Trojan se disfarça e NÃO se auto-replica."},
 {f:"Ransomware ataca qual pilar da CIA?", b:"Disponibilidade — bloqueia o acesso aos dados até o pagamento do resgate."},
 {f:"Phishing × Spear phishing × Whaling", b:"Phishing = em massa; Spear phishing = direcionado e personalizado; Whaling = mira executivos de alto escalão."},
 {f:"Vishing × Smishing × Tailgating", b:"Vishing = golpe por voz/telefone; Smishing = por SMS; Tailgating = seguir alguém autorizado para entrar fisicamente."},
 {f:"O que é uma APT?", b:"Advanced Persistent Threat: ataque furtivo, sofisticado e prolongado (espionagem), que mantém acesso por muito tempo."},
 {f:"AAA", b:"Authentication (quem é), Authorization (o que pode) e Accounting (registro do que foi feito)."},
 {f:"O que é MFA (de verdade)?", b:"Combinar fatores de categorias diferentes: algo que você sabe + tem + é. Duas senhas NÃO é MFA."},
 {f:"Hashing × Criptografia", b:"Hashing é de mão única (irreversível) e garante integridade; criptografia é reversível com a chave e garante confidencialidade."},
 {f:"Simétrica × Assimétrica", b:"Simétrica usa uma chave secreta única (AES, rápida); assimétrica usa par pública/privada (RSA/ECC)."},
 {f:"Cripto forte × fraca", b:"Forte: AES, SHA-256. Fraca/obsoleta: DES, WEP, MD5, SHA-1."},
 {f:"O que é a CRL numa PKI?", b:"Certificate Revocation List: lista de certificados revogados. Alternativa em tempo real: OCSP."},
 {f:"Estados dos dados e proteção", b:"Em trânsito → TLS/VPN/SSH; Em repouso → criptografia de disco (BitLocker/LUKS); Em uso → proteção de memória."},
],

d2: [
 {f:"ARP spoofing explora o quê?", b:"O ARP não autentica respostas → o atacante associa seu MAC ao IP de outro host (base de MITM na LAN)."},
 {f:"SYN flood", b:"Ataque que abusa do handshake TCP, deixando conexões meio-abertas para esgotar os recursos do servidor."},
 {f:"DHCP starvation", b:"Esgota o pool de endereços do servidor DHCP com pedidos falsos, negando IP a hosts legítimos."},
 {f:"Porta 22 / 23 / 443", b:"22 = SSH (seguro); 23 = Telnet (texto claro, inseguro); 443 = HTTPS (HTTP+TLS)."},
 {f:"Porta 53 / 80 / 389 / 3389", b:"53 = DNS; 80 = HTTP; 389 = LDAP; 3389 = RDP."},
 {f:"Faixas IPv4 privadas (RFC 1918)", b:"10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16 — não roteáveis na internet."},
 {f:"O que significa /24 em CIDR?", b:"24 bits de rede = máscara 255.255.255.0 (~254 hosts utilizáveis)."},
 {f:"NAT", b:"Traduz endereços IP privados para um IP público compartilhado."},
 {f:"Para que serve uma DMZ?", b:"Sub-rede intermediária que hospeda serviços públicos (web, e-mail), isolando-os da rede interna (LAN)."},
 {f:"IDS × IPS", b:"IDS detecta e alerta (passivo); IPS fica inline e bloqueia ativamente (ativo)."},
 {f:"O que é um honeypot?", b:"Sistema-isca monitorado, propositalmente vulnerável, para atrair e estudar atacantes."},
 {f:"WEP × WPA × WPA2 × WPA3", b:"Ordem de força: Aberta < WEP (quebrado) < WPA (TKIP) < WPA2 (AES) < WPA3 (SAE)."},
 {f:"WPA2-Personal × Enterprise", b:"Personal usa senha compartilhada (PSK); Enterprise usa 802.1X/EAP com servidor RADIUS (credencial por usuário)."},
 {f:"Firewall stateful × stateless", b:"Stateful mantém tabela de conexões e libera o retorno de sessões estabelecidas; stateless avalia cada pacote isoladamente."},
 {f:"O que faz o NAC?", b:"Verifica a postura do dispositivo (patches, antivírus) antes de conceder acesso à rede; pode isolar em quarentena."},
 {f:"Responsabilidade compartilhada na nuvem", b:"Provedor protege a infraestrutura; o cliente protege dados, identidades/acessos e configurações."},
],

d3: [
 {f:"UAC (Windows)", b:"Controle de Conta de Usuário: pede confirmação/elevação antes de ações que exigem privilégio de administrador."},
 {f:"BitLocker", b:"Criptografia de disco completo do Windows — protege os dados em caso de perda/roubo do dispositivo."},
 {f:"Microsoft Defender", b:"Antivírus/antimalware nativo do Windows moderno."},
 {f:"chmod × chown", b:"chmod altera permissões (rwx); chown altera o dono do arquivo."},
 {f:"Permissão 755", b:"7=rwx (dono), 5=r-x (grupo), 5=r-x (outros): leitura e execução, sem escrita para grupo/outros."},
 {f:"sudo", b:"Executa um comando com privilégios de root de forma controlada e auditável."},
 {f:"systemctl × apt/yum", b:"systemctl gerencia serviços (start/stop/enable); apt (Debian/Ubuntu) e yum (Red Hat) gerenciam pacotes."},
 {f:"Escalonamento de privilégio", b:"Obter permissões acima das autorizadas (ex.: de usuário comum para root/admin)."},
 {f:"netstat", b:"Mostra conexões de rede ativas e portas em escuta — útil para achar conexões suspeitas."},
 {f:"nslookup", b:"Consulta registros DNS (resolve nomes em IPs)."},
 {f:"tcpdump", b:"Captura e analisa pacotes de rede (packet capture) pela linha de comando."},
 {f:"Asset management (por que importa)", b:"Não se protege o que não se sabe que existe; o inventário sustenta patching e controle de acesso."},
 {f:"BYOD seguro", b:"Usar MDM: políticas, criptografia, perfil corporativo separado e remote wipe em caso de perda."},
 {f:"Por que aplicar patches rápido?", b:"Falhas conhecidas com correção publicada são alvos preferenciais; atualizar fecha a janela de exploração."},
 {f:"Event Viewer × syslog", b:"Event Viewer = logs do Windows (sistema/apps/segurança); syslog = padrão para centralizar logs de vários equipamentos."},
 {f:"Sequência de remoção de malware", b:"Isolar da rede → varrer (ferramenta atualizada) → revisar logs → remediar/limpar (ou reimaginar). Nunca pagar resgate nem apagar logs."},
],

d4: [
 {f:"Recon ativo × passivo", b:"Passivo coleta sem tocar o alvo (OSINT); ativo interage com o alvo (port scan) e pode ser detectado."},
 {f:"Scan de vulnerabilidades × pentest", b:"Scan lista falhas potenciais; pentest explora ativamente para provar o impacto real."},
 {f:"CVE", b:"Identificador único e padronizado de uma vulnerabilidade conhecida (ex.: CVE-2024-1234)."},
 {f:"CVSS", b:"Pontuação de severidade de 0 a 10 usada para priorizar a correção de vulnerabilidades."},
 {f:"CWE", b:"Catálogo de TIPOS/classes de fraqueza de software (ex.: injeção de SQL = CWE-89)."},
 {f:"Limitação das bases de vulnerabilidade", b:"Só contêm o que já foi descoberto e publicado — não cobrem zero-days."},
 {f:"Fórmula do risco", b:"Risco = Probabilidade × Impacto. Níveis: baixo, médio, alto, extremamente alto."},
 {f:"Estratégias de tratamento de risco", b:"Evitar (não fazer), Mitigar (reduzir com controles), Transferir (seguro/terceiro), Aceitar (conviver)."},
 {f:"Seguro cibernético = qual estratégia?", b:"Transferir o risco a um terceiro."},
 {f:"Vulnerabilidade × risco", b:"Vulnerabilidade é a fraqueza existente; risco é a probabilidade dela ser explorada e o dano resultante."},
 {f:"BCP × DRP", b:"BCP mantém as operações essenciais do negócio; DRP é a parte técnica de restaurar TI/sistemas e dados."},
 {f:"Controles: preventivo × detectivo × corretivo", b:"Preventivo age antes (firewall); Detectivo durante (IDS/logs); Corretivo depois (backup/restore, patch)."},
 {f:"Classificação da informação", b:"Público/interno/confidencial/restrito — define proteção proporcional à sensibilidade do dado."},
],

d5: [
 {f:"SIEM", b:"Coleta e correlaciona logs de várias fontes e gera alertas de segurança (coração do SOC)."},
 {f:"SOAR", b:"Orquestra e automatiza respostas (playbooks), acelerando e padronizando a reação a incidentes."},
 {f:"Cyber Kill Chain (o que é)", b:"Modelo de 7 fases de um ataque; interromper qualquer fase quebra a cadeia."},
 {f:"MITRE ATT&CK", b:"Base de conhecimento de TTPs (táticas, técnicas e procedimentos) reais de adversários, em nível operacional."},
 {f:"Diamond Model (4 vértices)", b:"Adversário, Capacidade, Infraestrutura e Vítima."},
 {f:"TTP", b:"Táticas, Técnicas e Procedimentos — o 'como' o adversário opera."},
 {f:"Cadeia de custódia", b:"Registro cronológico de quem coletou/manuseou cada evidência, preservando integridade e valor legal."},
 {f:"Por que preservar a evidência?", b:"Trabalhar sobre cópia/imagem forense (com hash) evita contaminar a prova original."},
 {f:"Ciclo NIST 800-61 (4 fases)", b:"Preparação → Detecção e Análise → Contenção/Erradicação/Recuperação → Atividade Pós-Incidente."},
 {f:"Contenção × Erradicação × Recuperação", b:"Contenção isola o afetado; Erradicação remove a causa raiz; Recuperação restaura a operação normal."},
 {f:"Objetivo das 'lições aprendidas'", b:"Analisar o ocorrido, avaliar a resposta e melhorar controles/processos — não punir."},
 {f:"Frameworks de conformidade", b:"GDPR (UE), LGPD/ANPD (Brasil), HIPAA (saúde EUA), PCI-DSS (cartões), FERPA (educação EUA), FISMA (governo EUA)."},
 {f:"Obrigação do GDPR/LGPD em incidentes", b:"Notificar a autoridade (e titulares quando houver risco) sobre violações de dados dentro dos prazos exigidos."},
],
};

window.FLASHCARDS = FLASHCARDS;

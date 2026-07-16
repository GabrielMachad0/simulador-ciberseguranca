/* ============================================================================
   MATERIAL DE ESTUDO — Simulador CCST Cybersecurity
   Resumão dos 5 domínios oficiais (blueprint CCST 100-160), em pt-BR.
   Estrutura: MATERIAL[dominio] = [ { t: título, sub: '1.1', html: conteúdo } ]
   ============================================================================ */

const MATERIAL = {

/* =================== DOMÍNIO 1 — PRINCÍPIOS ESSENCIAIS =================== */
d1: [
 { t:"Tríade CIA", sub:"1.1", html:`
   <p>Os três pilares que toda decisão de segurança busca proteger:</p>
   <ul>
     <li><b>Confidencialidade</b> — só quem tem autorização acessa a informação. Protegida por criptografia, controle de acesso, MFA.</li>
     <li><b>Integridade</b> — o dado não é alterado indevidamente. Protegida por <b>hashing</b>, assinaturas digitais, controle de versão.</li>
     <li><b>Disponibilidade</b> — o dado/serviço está acessível quando necessário. Protegida por redundância, backup, proteção contra DoS.</li>
   </ul>
   <p class="tip">Ligação rápida com ataques: <b>ransomware</b> ataca a <b>Disponibilidade</b>; um <b>vazamento</b> ataca a <b>Confidencialidade</b>; adulterar um registro ataca a <b>Integridade</b>.</p>`},

 { t:"Conceitos base: ameaça, vulnerabilidade, risco", sub:"1.1", html:`
   <ul>
     <li><b>Ativo</b> — algo de valor a proteger (dados, sistema, pessoa, reputação).</li>
     <li><b>Vulnerabilidade</b> — fraqueza que pode ser explorada (falha de software, senha fraca, porta aberta).</li>
     <li><b>Ameaça</b> — o agente/evento que pode explorar a fraqueza (hacker, malware, desastre).</li>
     <li><b>Exploit</b> — a técnica/código que efetivamente aproveita a vulnerabilidade.</li>
     <li><b>Risco</b> = <b>Probabilidade × Impacto</b> — a chance de a ameaça explorar a vulnerabilidade e o dano resultante.</li>
     <li><b>Vetor de ataque</b> — o caminho de entrada (e-mail, USB, serviço exposto).</li>
     <li><b>Superfície de ataque</b> — a soma de todos os pontos expostos; o <b>hardening</b> a reduz.</li>
   </ul>`},

 { t:"Princípios de defesa", sub:"1.1", html:`
   <ul>
     <li><b>Defesa em profundidade</b> — várias camadas independentes ("cebola"); a falha de uma não derruba tudo.</li>
     <li><b>Privilégio mínimo</b> — cada conta recebe só o acesso necessário à função.</li>
     <li><b>Zero Trust</b> — "nunca confie, sempre verifique"; cada acesso é autenticado, mesmo vindo de dentro.</li>
     <li><b>Hardening</b> — desativar serviços/portas desnecessários e reforçar configurações.</li>
     <li><b>Não repúdio</b> — garantir que alguém não possa negar uma ação (logs assinados, assinatura digital).</li>
   </ul>`},

 { t:"Tipos de atacantes e ética", sub:"1.1", html:`
   <ul>
     <li><b>Script kiddie</b> — usa ferramentas prontas, pouca habilidade.</li>
     <li><b>Hacktivista</b> — motivação ideológica/política.</li>
     <li><b>Cibercriminoso</b> — lucro financeiro (ransomware, fraude).</li>
     <li><b>Ameaça interna (insider)</b> — alguém com acesso legítimo que abusa dele.</li>
     <li><b>Estado-nação / APT</b> — altamente capacitado, espionagem, persistente.</li>
   </ul>
   <p><b>Código de ética</b>: agir com integridade e legalidade, respeitar a privacidade, divulgar vulnerabilidades de forma responsável (avisar o fornecedor antes de tornar público).</p>`},

 { t:"Ameaças e malware comuns", sub:"1.2", html:`
   <table>
     <tr><th>Tipo</th><th>Característica</th></tr>
     <tr><td>Vírus</td><td>Anexa-se a arquivos; replica ao serem executados.</td></tr>
     <tr><td>Worm</td><td>Auto-replica pela rede <b>sem</b> ação do usuário.</td></tr>
     <tr><td>Trojan</td><td>Disfarça-se de app legítimo; <b>não</b> se auto-replica.</td></tr>
     <tr><td>Ransomware</td><td>Criptografa dados e exige resgate (ataca disponibilidade).</td></tr>
     <tr><td>Spyware</td><td>Coleta informações sorrateiramente.</td></tr>
     <tr><td>Rootkit</td><td>Esconde a presença e mantém acesso privilegiado.</td></tr>
     <tr><td>Botnet</td><td>Rede de máquinas infectadas sob comando (C2); usada em DDoS/spam.</td></tr>
   </table>
   <p><b>Negação de serviço</b>: DoS (uma origem) e <b>DDoS</b> (muitas origens/botnet) esgotam recursos e derrubam a disponibilidade.</p>`},

 { t:"Engenharia social", sub:"1.2", html:`
   <ul>
     <li><b>Phishing</b> — e-mail fraudulento em massa.</li>
     <li><b>Spear phishing</b> — direcionado e personalizado a um alvo.</li>
     <li><b>Whaling</b> — mira executivos de alto escalão.</li>
     <li><b>Vishing</b> — por voz/telefone.</li>
     <li><b>Smishing</b> — por SMS.</li>
     <li><b>Tailgating</b> — seguir alguém autorizado para entrar fisicamente.</li>
     <li><b>Pretexting</b> — criar um pretexto falso (ex.: "sou do suporte").</li>
   </ul>
   <p>Outras: <b>MITM</b> (interceptar a comunicação), ataques físicos, vulnerabilidades de <b>IoT</b>, <b>APT</b> (campanha furtiva e prolongada).</p>`},

 { t:"Gestão de acesso: AAA e MFA", sub:"1.3", html:`
   <ul>
     <li><b>AAA</b>: <b>A</b>utenticação (quem é você) · <b>A</b>utorização (o que pode fazer) · <b>A</b>ccounting (registro do que foi feito).</li>
     <li><b>RADIUS</b> — servidor que centraliza o AAA para acesso à rede (Wi-Fi, VPN, switches).</li>
     <li><b>MFA</b> — combina fatores de <b>categorias diferentes</b>:
       <ul><li>algo que você <b>sabe</b> (senha, PIN)</li><li>algo que você <b>tem</b> (token, app, cartão)</li><li>algo que você <b>é</b> (biometria)</li></ul>
       Duas senhas = mesmo fator, <b>não</b> é MFA.</li>
     <li><b>Política de senhas</b>: comprimento/complexidade adequados, bloqueio após tentativas (lockout), não reutilizar, não anotar à vista.</li>
   </ul>`},

 { t:"Criptografia, hashing e PKI", sub:"1.4", html:`
   <ul>
     <li><b>Simétrica</b> — mesma chave secreta cifra e decifra (ex.: <b>AES</b>, forte). Rápida.</li>
     <li><b>Assimétrica</b> — par de chaves pública/privada (ex.: RSA). Base de certificados e assinatura.</li>
     <li><b>Hashing</b> — função de <b>mão única</b> (irreversível); garante <b>integridade</b> (ex.: SHA-256). MD5 e SHA-1 estão quebrados.</li>
     <li>Cripto <b>forte</b>: AES, SHA-256. <b>Fraca/obsoleta</b>: DES, WEP, MD5.</li>
     <li><b>PKI</b> — infraestrutura de chaves públicas; a <b>CA</b> emite certificados. Validade verificada por <b>CRL</b> (lista de revogação) ou <b>OCSP</b> (tempo real).</li>
   </ul>
   <table>
     <tr><th>Estado do dado</th><th>Proteção típica</th></tr>
     <tr><td>Em trânsito</td><td>TLS/HTTPS, VPN/IPsec, SSH</td></tr>
     <tr><td>Em repouso</td><td>Criptografia de disco (BitLocker, LUKS)</td></tr>
     <tr><td>Em uso</td><td>Controles de memória/enclaves</td></tr>
   </table>`},
],

/* =================== DOMÍNIO 2 — SEGURANÇA DE REDES =================== */
d2: [
 { t:"Vulnerabilidades dos protocolos TCP/IP", sub:"2.1", html:`
   <ul>
     <li><b>TCP</b> — <b>SYN flood</b> abusa do handshake para esgotar conexões.</li>
     <li><b>ARP</b> — não autentica respostas → <b>ARP spoofing/poisoning</b> (base de MITM na LAN).</li>
     <li><b>ICMP</b> — usado em <b>ping flood</b> e amplificação <b>Smurf</b>.</li>
     <li><b>DHCP</b> — <b>starvation</b> (esgota o pool) e <b>rogue DHCP</b> (servidor falso).</li>
     <li><b>DNS</b> — <b>spoofing/cache poisoning</b> (respostas falsas) e <b>tunneling</b> (exfiltração).</li>
     <li><b>HTTP/Telnet</b> — texto claro; use HTTPS/SSH.</li>
   </ul>`},

 { t:"Portas essenciais (decorar!)", sub:"2.1", html:`
   <table>
     <tr><th>Porta</th><th>Serviço</th><th>Seguro?</th></tr>
     <tr><td>20/21</td><td>FTP</td><td>Não (texto claro)</td></tr>
     <tr><td>22</td><td>SSH / SFTP</td><td>Sim (criptografado)</td></tr>
     <tr><td>23</td><td>Telnet</td><td>Não (texto claro)</td></tr>
     <tr><td>25</td><td>SMTP (envio)</td><td>—</td></tr>
     <tr><td>53</td><td>DNS</td><td>—</td></tr>
     <tr><td>67/68</td><td>DHCP</td><td>—</td></tr>
     <tr><td>80</td><td>HTTP</td><td>Não</td></tr>
     <tr><td>110 / 143</td><td>POP3 / IMAP</td><td>—</td></tr>
     <tr><td>389</td><td>LDAP</td><td>Não (636 = LDAPS)</td></tr>
     <tr><td>443</td><td>HTTPS (HTTP+TLS)</td><td>Sim</td></tr>
     <tr><td>3389</td><td>RDP</td><td>—</td></tr>
   </table>`},

 { t:"Endereçamento e segmentação", sub:"2.2", html:`
   <ul>
     <li><b>IPv4 privados (RFC 1918)</b>: <span class="mono">10.0.0.0/8</span>, <span class="mono">172.16.0.0/12</span>, <span class="mono">192.168.0.0/16</span> — não roteáveis na internet.</li>
     <li><b>MAC</b> — endereço físico da placa (camada 2); pode ser falsificado (spoofing).</li>
     <li><b>CIDR</b> — <span class="mono">/24</span> = 24 bits de rede = máscara 255.255.255.0 (~254 hosts).</li>
     <li><b>NAT</b> — traduz IPs privados para um IP público compartilhado.</li>
     <li><b>Segmentação / VLAN</b> — divide a rede em domínios isolados; limita o movimento lateral de um invasor.</li>
   </ul>`},

 { t:"Infraestrutura e tecnologias", sub:"2.3", html:`
   <ul>
     <li><b>DMZ</b> — sub-rede intermediária que hospeda serviços públicos (web, e-mail), isolando-os da LAN.</li>
     <li><b>Honeypot</b> — isca monitorada para atrair e estudar atacantes.</li>
     <li><b>Proxy</b> — intermedeia requisições; filtra, registra e oculta IPs internos.</li>
     <li><b>IDS</b> — <b>detecta e alerta</b> (passivo).</li>
     <li><b>IPS</b> — fica <b>inline</b> e <b>bloqueia</b> ativamente (ativo).</li>
     <li><b>Nuvem</b> — <b>responsabilidade compartilhada</b>: o provedor protege a infraestrutura; o cliente protege dados, acessos e configurações.</li>
   </ul>`},

 { t:"Wi-Fi SoHo seguro", sub:"2.4", html:`
   <ul>
     <li>Força dos padrões: <b>Aberta &lt; WEP &lt; WPA (TKIP) &lt; WPA2 (AES) &lt; WPA3</b>. WEP é quebrado.</li>
     <li><b>WPA2-Personal (PSK)</b> — uma senha compartilhada para todos (casa/SoHo).</li>
     <li><b>WPA2-Enterprise</b> — 802.1X/EAP com <b>servidor RADIUS</b>; cada usuário tem credencial própria.</li>
     <li><b>SSID oculto</b> e <b>filtragem de MAC</b> ajudam pouco (SSID é detectável, MAC é clonável) — <b>não</b> substituem criptografia forte.</li>
   </ul>`},

 { t:"Tecnologias de acesso seguro", sub:"2.5", html:`
   <ul>
     <li><b>ACL</b> — regras ordenadas que permitem/negam tráfego por IP, porta e protocolo.</li>
     <li><b>Firewall stateless</b> — avalia cada pacote isoladamente.</li>
     <li><b>Firewall stateful</b> — mantém tabela de conexões e libera o retorno de sessões estabelecidas.</li>
     <li><b>VPN</b> — túnel criptografado sobre rede pública (protege dados em trânsito).</li>
     <li><b>NAC</b> — verifica a postura do dispositivo (patches, antivírus) antes de conceder acesso; pode colocar em quarentena.</li>
   </ul>`},
],

/* =================== DOMÍNIO 3 — ENDPOINT =================== */
d3: [
 { t:"Segurança do sistema operacional", sub:"3.1", html:`
   <p><b>Windows:</b> Microsoft <b>Defender</b> (antimalware), <b>UAC</b> (pede elevação antes de ações privilegiadas), <b>BitLocker</b> (criptografia de disco), firewall de host, <b>PowerShell</b> (automação).</p>
   <p><b>Linux:</b></p>
   <table>
     <tr><th>Comando</th><th>Função</th></tr>
     <tr><td class="mono">chmod</td><td>Altera permissões (rwx)</td></tr>
     <tr><td class="mono">chown</td><td>Altera o dono</td></tr>
     <tr><td class="mono">sudo</td><td>Executa como root (elevação controlada)</td></tr>
     <tr><td class="mono">systemctl</td><td>Gerencia serviços (start/stop/enable)</td></tr>
     <tr><td class="mono">apt / yum</td><td>Gerenciador de pacotes (Debian/Ubuntu · Red Hat)</td></tr>
   </table>
   <p><b>Permissões (ex.: 755)</b>: 7=rwx dono, 5=r-x grupo, 5=r-x outros. <b>Escalonamento de privilégio</b> = obter permissões acima do autorizado.</p>`},

 { t:"Ferramentas de avaliação do endpoint", sub:"3.2", html:`
   <table>
     <tr><th>Ferramenta</th><th>Para quê</th></tr>
     <tr><td class="mono">netstat</td><td>Conexões ativas e portas em escuta (achar conexões suspeitas)</td></tr>
     <tr><td class="mono">nslookup</td><td>Consultar registros DNS (resolver nomes)</td></tr>
     <tr><td class="mono">tcpdump</td><td>Capturar e analisar pacotes da rede</td></tr>
   </table>`},

 { t:"Conformidade do endpoint", sub:"3.3", html:`
   <ul>
     <li><b>Inventário de HW/SW (asset management)</b> — "não se protege o que não se sabe que existe".</li>
     <li><b>Backups</b> e <b>deploy</b> controlado de programas.</li>
     <li><b>BYOD</b> — usar <b>MDM</b>: políticas, criptografia, perfil corporativo separado e <b>remote wipe</b>.</li>
     <li>Regulações: <b>PCI DSS</b> (cartões), <b>HIPAA</b> (saúde/EUA), <b>GDPR</b> (dados na UE) / <b>LGPD</b> (Brasil).</li>
   </ul>`},

 { t:"Atualizações e patching", sub:"3.4", html:`
   <p>Aplicar patches rápido fecha a janela de exploração de falhas conhecidas. Manter atualizados: <b>SO</b> (Windows Update), <b>aplicativos</b>, <b>drivers</b> e <b>firmware</b> (roteadores, BIOS/UEFI, IoT).</p>`},

 { t:"Interpretação de logs", sub:"3.5", html:`
   <ul>
     <li><b>Event Viewer</b> (Windows) — logs de sistema, aplicativos e segurança.</li>
     <li><b>syslog</b> — centraliza logs de vários equipamentos num servidor.</li>
     <li><b>Anomalia</b> — desvio do comportamento normal: picos de logins falhos, horários/origens atípicos, volumes incomuns.</li>
   </ul>`},

 { t:"Remoção de malware", sub:"3.6", html:`
   <p>Sequência recomendada: <b>isolar</b> a máquina da rede → <b>varrer</b> com ferramenta atualizada → <b>revisar</b> os logs da varredura → <b>remediar/limpar</b> (ou <b>reimaginar</b> o sistema em casos graves). Defesas: manter SO/apps atualizados e antivírus ativo. <b>Nunca</b> pagar resgate nem apagar logs.</p>`},
],

/* =================== DOMÍNIO 4 — VULNERABILIDADES E RISCO =================== */
d4: [
 { t:"Gestão de vulnerabilidades", sub:"4.1", html:`
   <ul>
     <li><b>Recon passivo</b> — coleta sem tocar o alvo (OSINT, dados públicos).</li>
     <li><b>Recon ativo</b> — interage com o alvo (port scan) e pode ser detectado.</li>
     <li><b>Port scanning</b> — descobre portas/serviços abertos (possíveis pontos de entrada).</li>
     <li><b>Varredura (scan)</b> — lista vulnerabilidades potenciais. <b>Pentest</b> — explora ativamente para provar o impacto real.</li>
   </ul>`},

 { t:"Threat intelligence: CVE, CVSS, CWE", sub:"4.2", html:`
   <ul>
     <li><b>CVE</b> — <b>identificador único</b> de uma vulnerabilidade conhecida (ex.: CVE-2024-1234).</li>
     <li><b>CVSS</b> — <b>pontuação 0–10</b> de severidade, para priorizar a correção.</li>
     <li><b>CWE</b> — catálogo de <b>tipos/classes</b> de fraqueza (ex.: injeção de SQL = CWE-89).</li>
     <li><b>Limitação</b>: bases só contêm o que já foi descoberto/publicado — não cobrem <b>zero-days</b>.</li>
     <li>Manter documentação atualizada antes/durante/depois de incidentes garante coordenação e rastreabilidade.</li>
   </ul>`},

 { t:"Gestão de riscos", sub:"4.3", html:`
   <p><b>Risco = Probabilidade × Impacto.</b> Níveis: baixo, médio, alto, extremamente alto.</p>
   <p><b>Estratégias de tratamento:</b></p>
   <table>
     <tr><th>Estratégia</th><th>O que é</th><th>Exemplo</th></tr>
     <tr><td>Evitar</td><td>Eliminar a atividade que gera o risco</td><td>Não lançar o recurso</td></tr>
     <tr><td>Mitigar</td><td>Reduzir probabilidade/impacto com controles</td><td>Firewall, criptografia, treino</td></tr>
     <tr><td>Transferir</td><td>Repassar a terceiros</td><td>Seguro cibernético</td></tr>
     <tr><td>Aceitar</td><td>Conviver com o risco residual</td><td>Risco baixo dentro do apetite</td></tr>
   </table>
   <p><b>Classificação da informação</b> (pública/interna/confidencial/restrita) define o nível de proteção proporcional à sensibilidade.</p>`},

 { t:"Continuidade e recuperação (DRP/BCP)", sub:"4.4", html:`
   <ul>
     <li><b>BCP</b> (continuidade de negócios) — abrangente; mantém as operações essenciais durante/após uma disrupção.</li>
     <li><b>DRP</b> (recuperação de desastres) — parte focada em restaurar TI/sistemas e dados.</li>
   </ul>
   <table>
     <tr><th>Controle</th><th>Momento</th><th>Exemplo</th></tr>
     <tr><td>Preventivo</td><td>Antes</td><td>Firewall, treinamento</td></tr>
     <tr><td>Detectivo</td><td>Durante</td><td>IDS, logs, câmeras</td></tr>
     <tr><td>Corretivo</td><td>Depois</td><td>Backup/restore, patch</td></tr>
   </table>`},
],

/* =================== DOMÍNIO 5 — INCIDENTES =================== */
d5: [
 { t:"Monitoramento: SIEM e SOAR", sub:"5.1", html:`
   <ul>
     <li><b>SIEM</b> — coleta e <b>correlaciona</b> logs de várias fontes e gera <b>alertas</b> (coração do SOC).</li>
     <li><b>SOAR</b> — <b>orquestra e automatiza</b> respostas (playbooks), acelerando a reação.</li>
     <li><b>Packet capture</b> — inspeciona o tráfego para achar C2, exfiltração e anomalias.</li>
     <li>Saber <b>quando escalar</b>: ex.: centenas de logins falhos seguidos de sucesso = investigar e escalar.</li>
   </ul>`},

 { t:"Forense e atribuição", sub:"5.2", html:`
   <ul>
     <li><b>Cyber Kill Chain</b> (7 fases): reconhecimento → armamento → entrega → exploração → instalação → comando e controle (C2) → ações no objetivo. Interromper uma fase quebra a cadeia.</li>
     <li><b>MITRE ATT&CK</b> — base de <b>TTPs</b> reais (táticas, técnicas e procedimentos), nível operacional.</li>
     <li><b>Diamond Model</b> — 4 vértices: <b>Adversário, Capacidade, Infraestrutura, Vítima</b>.</li>
     <li><b>Cadeia de custódia</b> — registro cronológico de quem coletou/manuseou cada evidência, preservando integridade e valor legal.</li>
     <li>Preservar evidência: trabalhar sobre <b>cópia/imagem forense</b> (com hash), nunca no original.</li>
   </ul>`},

 { t:"Frameworks de conformidade", sub:"5.3", html:`
   <table>
     <tr><th>Framework</th><th>Escopo</th></tr>
     <tr><td>GDPR</td><td>Dados pessoais na União Europeia</td></tr>
     <tr><td>LGPD (ANPD)</td><td>Dados pessoais no Brasil</td></tr>
     <tr><td>HIPAA</td><td>Dados de saúde (EUA)</td></tr>
     <tr><td>PCI-DSS</td><td>Dados de cartão de pagamento</td></tr>
     <tr><td>FERPA</td><td>Registros educacionais (EUA)</td></tr>
     <tr><td>FISMA</td><td>Sistemas do governo federal (EUA)</td></tr>
   </table>
   <p>GDPR/LGPD exigem <b>notificar</b> violações de dados à autoridade (e aos titulares quando houver risco) dentro dos prazos. Logs são evidência — preserve.</p>`},

 { t:"Ciclo de resposta a incidentes (NIST 800-61)", sub:"5.4", html:`
   <ol>
     <li><b>Preparação</b> — plano, equipe (CSIRT), ferramentas, playbooks e contatos <b>antes</b> do incidente.</li>
     <li><b>Detecção e Análise</b> — confirmar e dimensionar o incidente (logs, alertas).</li>
     <li><b>Contenção, Erradicação e Recuperação</b> — isolar o afetado → remover a causa raiz → restaurar a operação.</li>
     <li><b>Atividade Pós-Incidente</b> — lições aprendidas: analisar, documentar e melhorar (não punir).</li>
   </ol>`},
],
};

window.MATERIAL = MATERIAL;

/* Domínio 2 — Segurança de Redes: questões e material EXTRA (avançado) */
(function () {
  var Q = window.QUESTIONS, M = window.MATERIAL;

  var perguntas = [
    {a:"d2", sub:"2.1", q:"Um ataque de SYN flood explora qual mecanismo do TCP?", o:["A criptografia do TCP","O handshake de três vias, enviando muitos SYN sem completar a conexão para esgotar a tabela de conexões do servidor","A resolução de nomes","A tradução de endereços"], c:[1], e:["Errada. O TCP em si não criptografa.","Correta. O atacante envia SYN em massa sem responder ao SYN-ACK, deixando conexões meio-abertas até esgotar os recursos (uma forma de DoS).","Errada. Resolução de nomes é DNS.","Errada. Tradução de endereços é NAT."]},

    {a:"d2", sub:"2.1", q:"Inundar um switch com endereços MAC falsos para estourar sua tabela CAM, fazendo-o encaminhar tudo como um hub, é o ataque de:", o:["MAC flooding","DNS tunneling","Smurf","Phishing"], c:[0], e:["Correta. MAC flooding satura a tabela CAM; sem espaço, o switch passa a inundar todas as portas, permitindo escuta do tráfego. Defesa: port security.","Errada. DNS tunneling exfiltra dados via DNS.","Errada. Smurf usa ICMP com broadcast.","Errada. Phishing é engenharia social."]},

    {a:"d2", sub:"2.1", q:"Qual porta é usada pelo SMB (compartilhamento de arquivos Windows), muito visado por ransomware?", o:["445","110","123","161"], c:[0], e:["Correta. O SMB usa a porta TCP 445 (alvo de ameaças como o WannaCry).","Errada. 110 é POP3.","Errada. 123 é NTP.","Errada. 161 é SNMP."]},

    {a:"d2", sub:"2.1", q:"Associe as portas: SNMP, NTP e Kerberos usam respectivamente:", o:["161, 123 e 88","445, 53 e 25","22, 23 e 80","389, 443 e 3389"], c:[0], e:["Correta. SNMP = 161 (gerência de rede), NTP = 123 (sincronização de hora), Kerberos = 88 (autenticação).","Errada. Essas são SMB/DNS/SMTP.","Errada. São SSH/Telnet/HTTP.","Errada. São LDAP/HTTPS/RDP."]},

    {a:"d2", sub:"2.1", q:"O envenenamento de cache DNS (DNS cache poisoning) é mitigado principalmente por:", o:["Desligar o DNS","DNSSEC, que assina digitalmente as respostas DNS garantindo sua autenticidade e integridade","Trocar a porta para 8080","Usar Telnet"], c:[1], e:["Errada. Desligar o DNS inviabiliza a navegação.","Correta. O DNSSEC adiciona assinaturas às respostas, impedindo que registros falsificados sejam aceitos.","Errada. Mudar porta não resolve o problema.","Errada. Telnet é inseguro e não tem relação."]},

    {a:"d2", sub:"2.1", q:"Exfiltrar dados escondendo-os dentro de consultas e respostas DNS é a técnica de:", o:["DNS tunneling","ARP spoofing","SYN flood","MAC flooding"], c:[0], e:["Correta. DNS tunneling encapsula dados no tráfego DNS, que costuma ser liberado, para exfiltração/C2.","Errada. ARP spoofing atua na camada 2 local.","Errada. SYN flood é DoS.","Errada. MAC flooding satura o switch."]},

    {a:"d2", sub:"2.2", q:"Qual é uma diferença de segurança entre IPv6 e IPv4?", o:["IPv6 não pode ser roteado","IPv6 tem espaço de endereços gigantesco (dificulta varredura completa) e o IPsec foi projetado como parte do protocolo; não usa NAT da mesma forma","IPv6 é sempre inseguro","IPv6 elimina a necessidade de firewall"], c:[1], e:["Errada. IPv6 é roteável.","Correta. O espaço imenso do IPv6 torna a varredura exaustiva impraticável e o IPsec é nativo; a ausência de NAT muda o modelo de exposição (exige boa filtragem).","Errada. IPv6 não é inerentemente inseguro.","Errada. Firewalls continuam necessários."]},

    {a:"d2", sub:"2.2", q:"O ataque de VLAN hopping permite que um atacante:", o:["Aumente a velocidade da rede","Alcance tráfego de uma VLAN à qual não deveria ter acesso, driblando a segmentação","Troque a senha do Wi-Fi","Desligue o roteador"], c:[1], e:["Errada. Não tem relação com desempenho.","Correta. Por double tagging ou switch spoofing, o atacante salta para outra VLAN, quebrando o isolamento. Defesa: desativar trunk automático, mudar a VLAN nativa.","Errada. Não é ataque de credencial Wi-Fi.","Errada. Não é sobre desligar equipamento."]},

    {a:"d2", sub:"2.2", q:"Qual recurso de switch limita quais endereços MAC podem usar uma porta, mitigando MAC flooding e conexões não autorizadas?", o:["Port security","NAT","DHCP","QoS"], c:[0], e:["Correta. Port security restringe/associa MACs por porta e pode desativar a porta diante de violação.","Errada. NAT traduz endereços.","Errada. DHCP distribui IPs.","Errada. QoS prioriza tráfego."]},

    {a:"d2", sub:"2.2", q:"Qual proteção de switch bloqueia servidores DHCP não autorizados (rogue DHCP) na rede?", o:["DHCP snooping","Proxy reverso","Honeypot","VPN"], c:[0], e:["Correta. O DHCP snooping define portas confiáveis e descarta respostas DHCP vindas de portas não confiáveis.","Errada. Proxy reverso protege servidores web.","Errada. Honeypot é isca.","Errada. VPN cria túnel criptografado."]},

    {a:"d2", sub:"2.2", q:"Qual recurso valida os pares IP-MAC para impedir ARP spoofing na rede comutada?", o:["Dynamic ARP Inspection (DAI)","NAT","SSID broadcast","Wildcard mask"], c:[0], e:["Correta. O DAI (apoiado no DHCP snooping) inspeciona pacotes ARP e descarta associações IP-MAC inválidas.","Errada. NAT traduz endereços.","Errada. SSID broadcast anuncia o nome do Wi-Fi.","Errada. Wildcard mask é usada em ACLs."]},

    {a:"d2", sub:"2.3", q:"Nos modelos de nuvem, em qual deles o cliente tem MAIS responsabilidade de segurança (gerencia SO, apps e dados)?", o:["SaaS","PaaS","IaaS","Nenhum, o provedor faz tudo"], c:[2], e:["Errada. Em SaaS o provedor gerencia quase tudo; o cliente cuida de dados/acessos.","Errada. Em PaaS o provedor cuida da plataforma; o cliente cuida de apps e dados.","Correta. Em IaaS o cliente gerencia SO, patches, apps e dados; o provedor cuida do hardware/virtualização.","Errada. Sempre há responsabilidade compartilhada."]},

    {a:"d2", sub:"2.3", q:"Qual a diferença entre proxy direto (forward) e proxy reverso?", o:["São a mesma coisa","O proxy direto representa os CLIENTES ao acessar a internet (filtra saída); o proxy reverso representa os SERVIDORES (recebe requisições externas, faz balanceamento, TLS, WAF)","O reverso só serve para acelerar downloads","O direto fica na frente dos servidores web"], c:[1], e:["Errada. Têm posições e papéis distintos.","Correta. Forward proxy = saída dos clientes; reverse proxy = entrada para os servidores (protege e distribui a carga).","Errada. Reverso faz muito mais que cache.","Errada. Está invertido."]},

    {a:"d2", sub:"2.3", q:"Um dispositivo que filtra especificamente tráfego HTTP/HTTPS de aplicações web, protegendo contra ataques como injeção de SQL e XSS, é um:", o:["WAF (Web Application Firewall)","Switch de camada 2","Honeypot","Servidor DHCP"], c:[0], e:["Correta. O WAF inspeciona requisições web e bloqueia ataques a nível de aplicação (SQLi, XSS, etc.).","Errada. Switch L2 encaminha quadros, não inspeciona aplicação.","Errada. Honeypot é isca.","Errada. DHCP distribui IPs."]},

    {a:"d2", sub:"2.4", q:"O que é um ataque 'evil twin' em redes Wi-Fi?", o:["Um vírus que se duplica","Um ponto de acesso falso que imita o SSID de uma rede legítima para capturar credenciais/tráfego das vítimas","Dois roteadores redundantes","Um cabo defeituoso"], c:[1], e:["Errada. Não é malware autorreplicante.","Correta. O 'gêmeo do mal' é um AP falso com o mesmo nome da rede real; a vítima se conecta e o atacante intercepta.","Errada. Redundância é outra coisa.","Errada. Não é problema físico de cabo."]},

    {a:"d2", sub:"2.4", q:"Um ataque de 'deauthentication' (deauth) contra Wi-Fi tem como efeito:", o:["Descriptografar o WPA3 instantaneamente","Forçar a desconexão de clientes da rede, causando negação de serviço e podendo induzir reconexão a um AP falso","Aumentar o alcance do sinal","Trocar o canal automaticamente"], c:[1], e:["Errada. Não quebra a criptografia diretamente.","Correta. Quadros de deauth derrubam os clientes; além do DoS, favorecem captura de handshake e ataques evil twin.","Errada. Não amplia sinal.","Errada. Não é sobre troca de canal."]},

    {a:"d2", sub:"2.4", q:"O que o WPA3 introduziu em relação ao WPA2 para redes pessoais?", o:["Voltou a usar WEP","O handshake SAE (Simultaneous Authentication of Equals), que protege melhor contra ataques offline à senha","Removeu toda a criptografia","Passou a exigir cabo"], c:[1], e:["Errada. WEP é obsoleto e inseguro.","Correta. O WPA3-Personal usa SAE (Dragonfly), resistente a ataques de dicionário offline sobre o handshake.","Errada. WPA3 fortalece a criptografia.","Errada. Wi-Fi é sem fio."]},

    {a:"d2", sub:"2.5", q:"Qual a diferença entre VPN site-to-site e VPN de acesso remoto (remote-access)?", o:["Não há diferença","Site-to-site conecta redes inteiras (ex.: matriz e filial) de forma permanente; remote-access conecta um usuário/dispositivo individual à rede da empresa","Remote-access só funciona com cabo","Site-to-site é para uma única pessoa"], c:[1], e:["Errada. São topologias distintas.","Correta. Site-to-site liga gateways de duas redes; remote-access dá a um usuário isolado acesso seguro à rede corporativa.","Errada. VPN é sobre rede, não exige cabo específico.","Errada. Está invertido."]},

    {a:"d2", sub:"2.5", q:"No IPsec, qual a diferença entre AH e ESP?", o:["AH oferece confidencialidade (criptografia); ESP só integridade","AH fornece autenticação/integridade sem criptografar; ESP fornece confidencialidade (criptografia) além de autenticação/integridade","São idênticos","Nenhum é usado em VPN"], c:[1], e:["Errada. Está invertido — AH não cifra.","Correta. AH (Authentication Header) autentica e garante integridade, mas NÃO cifra; ESP (Encapsulating Security Payload) cifra o conteúdo (confidencialidade) e também autentica.","Errada. Têm funções diferentes.","Errada. Ambos são componentes centrais do IPsec."]},

    {a:"d2", sub:"2.5", q:"Um servidor intermediário reforçado, usado como ponto único e controlado para administrar servidores internos, é chamado de:", o:["Bastion host / jump host","Honeypot","Access point","Servidor DNS"], c:[0], e:["Correta. O bastion/jump host é um ponto de acesso endurecido e monitorado por onde passam as conexões administrativas, reduzindo a exposição.","Errada. Honeypot é isca.","Errada. AP é ponto de acesso Wi-Fi.","Errada. DNS resolve nomes."]},

    {a:"d2", sub:"2.4", q:"Ao configurar um Wi-Fi SoHo seguro, quais práticas são recomendadas? (selecione três)", o:["Usar WPA2/WPA3 com senha forte","Manter o WEP por compatibilidade","Trocar as credenciais padrão de administração do roteador","Manter o firmware do roteador atualizado"], c:[0,2,3], e:["Correta. WPA2/WPA3 com senha robusta é a base da proteção.","Errada. WEP é quebrado; jamais mantê-lo.","Correta. Credenciais padrão são amplamente conhecidas e devem ser trocadas.","Correta. Firmware atualizado corrige vulnerabilidades do roteador."]},

    {a:"d2", sub:"2.5", q:"Quais afirmações sobre um firewall stateful estão corretas? (selecione dois)", o:["Mantém uma tabela de estado das conexões","Analisa cada pacote isoladamente, sem contexto","Permite automaticamente o tráfego de retorno de sessões legítimas já estabelecidas","Não consegue distinguir uma resposta de uma nova conexão"], c:[0,2], e:["Correta. O stateful acompanha o estado de cada conexão.","Errada. Isso descreve o firewall stateless.","Correta. Ele libera o retorno de sessões que ele mesmo viu serem iniciadas.","Errada. Justamente por manter estado, ele distingue resposta de nova conexão."]},

    {a:"d2", sub:"2.3", q:"Um conjunto de honeypots interligados que simula uma rede inteira para atrair e estudar atacantes é chamado de:", o:["Honeynet","Botnet","Extranet","Darknet"], c:[0], e:["Correta. Uma honeynet é uma rede de iscas monitoradas, ampliando o valor de inteligência de um honeypot único.","Errada. Botnet é rede de máquinas comprometidas do atacante.","Errada. Extranet é acesso controlado a parceiros.","Errada. Darknet refere-se a redes anônimas/ocultas."]},

    {a:"d2", sub:"2.3", q:"Um firewall de próxima geração (NGFW) diferencia-se de um firewall tradicional por:", o:["Só filtrar por IP e porta","Adicionar inspeção profunda (aplicação), reconhecimento de usuários e IPS integrado","Não inspecionar tráfego","Substituir a necessidade de segmentação"], c:[1], e:["Errada. Filtrar só por IP/porta é o firewall tradicional.","Correta. O NGFW entende aplicações (camada 7), integra IPS, identidade de usuário e inteligência de ameaças.","Errada. Ele inspeciona a fundo.","Errada. Não elimina a necessidade de segmentar a rede."]},
  ];
  Array.prototype.push.apply(Q, perguntas);

  var material = [
    {t:"Tabela de portas expandida", sub:"2.1", html:`
      <table>
        <tr><th>Porta</th><th>Serviço</th></tr>
        <tr><td>22</td><td>SSH / SFTP</td></tr>
        <tr><td>25 / 587</td><td>SMTP / submissão autenticada</td></tr>
        <tr><td>53</td><td>DNS</td></tr>
        <tr><td>67/68</td><td>DHCP</td></tr>
        <tr><td>80 / 443</td><td>HTTP / HTTPS</td></tr>
        <tr><td>88</td><td>Kerberos</td></tr>
        <tr><td>110 / 143</td><td>POP3 / IMAP</td></tr>
        <tr><td>123</td><td>NTP</td></tr>
        <tr><td>161/162</td><td>SNMP</td></tr>
        <tr><td>389 / 636</td><td>LDAP / LDAPS</td></tr>
        <tr><td>445</td><td>SMB</td></tr>
        <tr><td>3389</td><td>RDP</td></tr>
      </table>`},

    {t:"Ataques de camada 2 e defesas", sub:"2.2", html:`
      <table>
        <tr><th>Ataque</th><th>Defesa</th></tr>
        <tr><td>MAC flooding (estoura CAM)</td><td>Port security</td></tr>
        <tr><td>Rogue DHCP</td><td>DHCP snooping</td></tr>
        <tr><td>ARP spoofing</td><td>Dynamic ARP Inspection (DAI)</td></tr>
        <tr><td>VLAN hopping</td><td>Desativar trunk automático, mudar VLAN nativa</td></tr>
      </table>
      <p class="tip">Camada 2 é frequentemente esquecida — a segmentação por VLAN só protege se essas defesas estiverem ativas.</p>`},

    {t:"Ataques e defesas TCP/IP e DNS", sub:"2.1", html:`
      <ul>
        <li><b>SYN flood</b> — abusa do handshake TCP (SYN sem completar). Defesa: SYN cookies.</li>
        <li><b>DNS cache poisoning</b> — injeta respostas falsas. Defesa: <b>DNSSEC</b>.</li>
        <li><b>DNS tunneling</b> — exfiltra dados dentro do tráfego DNS.</li>
        <li><b>Smurf / ping flood</b> — abusam de ICMP.</li>
      </ul>`},

    {t:"Modelos de nuvem e responsabilidade compartilhada", sub:"2.3", html:`
      <table>
        <tr><th>Modelo</th><th>Provedor gerencia</th><th>Cliente gerencia</th></tr>
        <tr><td>IaaS</td><td>Hardware, virtualização</td><td>SO, patches, apps, dados</td></tr>
        <tr><td>PaaS</td><td>+ SO e runtime</td><td>Apps e dados</td></tr>
        <tr><td>SaaS</td><td>Quase tudo</td><td>Dados, contas e acessos</td></tr>
      </table>
      <p class="tip">Em TODOS os modelos, a segurança dos <b>dados e das identidades/acessos</b> é responsabilidade do cliente.</p>`},

    {t:"VPN e IPsec", sub:"2.5", html:`
      <ul>
        <li><b>Site-to-site</b> — liga redes inteiras (matriz-filial), permanente.</li>
        <li><b>Remote-access</b> — liga um usuário/dispositivo à rede corporativa.</li>
        <li><b>IPsec — AH</b>: autentica e garante integridade (NÃO cifra).</li>
        <li><b>IPsec — ESP</b>: cifra (confidencialidade) + autentica.</li>
        <li><b>SSL/TLS VPN</b> — acesso via navegador, útil sem cliente dedicado.</li>
      </ul>`},

    {t:"Segurança Wi-Fi: padrões e ataques", sub:"2.4", html:`
      <ul>
        <li>Força: <b>Aberta &lt; WEP &lt; WPA (TKIP) &lt; WPA2 (AES) &lt; WPA3 (SAE)</b>.</li>
        <li><b>WPA2-Personal</b> = senha compartilhada (PSK); <b>WPA2-Enterprise</b> = 802.1X/EAP + RADIUS.</li>
        <li><b>Evil twin</b> — AP falso com o mesmo SSID.</li>
        <li><b>Deauth attack</b> — derruba clientes (DoS + captura de handshake).</li>
        <li><b>Rogue AP</b> — ponto de acesso não autorizado plugado na rede.</li>
      </ul>`},
  ];
  if (M && M.d2) Array.prototype.push.apply(M.d2, material);
})();

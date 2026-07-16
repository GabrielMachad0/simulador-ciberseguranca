/* ============================================================================
   BANCO DE QUESTÕES — Simulador CCST Cybersecurity / Analista de Cibersegurança Jr
   Fundamentado no blueprint oficial da Cisco (CCST Cybersecurity 100-160):
   5 domínios de objetivos. Questões em pt-BR, estilo NetAcad/CCST.

   Modelo de dado por questão:
     { a: 'd1',            // domínio (área)
       sub: '1.1',         // subtópico oficial
       q: 'enunciado',
       o: ['alt A', ...],  // alternativas
       c: [0],             // índice(s) da(s) correta(s) — array => múltipla escolha
       e: ['exp A', ...] } // explicação por alternativa
   ============================================================================ */

const AREAS = {
  d1: { nome: "Princípios Essenciais de Segurança", cor: "#0E92A3", peso: 26,
        sub: { "1.1":"Princípios essenciais", "1.2":"Ameaças e vulnerabilidades comuns",
               "1.3":"Gestão de acesso (AAA/MFA)", "1.4":"Criptografia e PKI" } },
  d2: { nome: "Segurança de Redes", cor: "#2F6BFF", peso: 24,
        sub: { "2.1":"Vulnerabilidades TCP/IP", "2.2":"Endereçamento e segmentação",
               "2.3":"Infraestrutura e tecnologias", "2.4":"Wireless SoHo seguro",
               "2.5":"Acesso seguro (ACL/Firewall/VPN/NAC)" } },
  d3: { nome: "Segurança de Endpoint", cor: "#7A5AF8", peso: 18,
        sub: { "3.1":"Segurança do sistema operacional", "3.2":"Ferramentas de endpoint",
               "3.3":"Conformidade do endpoint", "3.4":"Atualizações e patching",
               "3.5":"Interpretação de logs", "3.6":"Remoção de malware" } },
  d4: { nome: "Vulnerabilidades e Gestão de Riscos", cor: "#B5811A", peso: 18,
        sub: { "4.1":"Gestão de vulnerabilidades", "4.2":"Threat intelligence",
               "4.3":"Gestão de riscos", "4.4":"Continuidade e recuperação (DRP/BCP)" } },
  d5: { nome: "Tratamento de Incidentes", cor: "#1F9D57", peso: 14,
        sub: { "5.1":"Monitoramento (SIEM/SOAR)", "5.2":"Forense e atribuição",
               "5.3":"Frameworks de conformidade", "5.4":"Resposta a incidentes (NIST)" } },
};

const QUESTIONS = [

/* ===================== DOMÍNIO 1 — PRINCÍPIOS ESSENCIAIS ===================== */

{a:"d1", sub:"1.1", q:"A tríade CIA da segurança da informação é composta por:",
 o:["Confidencialidade, Integridade e Disponibilidade","Controle, Identidade e Auditoria","Criptografia, Integridade e Autenticação","Confidencialidade, Identidade e Acesso"],
 c:[0], e:[
 "Correta. CIA = Confidentiality (Confidencialidade), Integrity (Integridade) e Availability (Disponibilidade).",
 "Errada. São conceitos reais, mas não formam a tríade CIA.",
 "Errada. Criptografia e autenticação são mecanismos de apoio, não os pilares.",
 "Errada. Identidade e Acesso pertencem ao IAM, não à tríade."]},

{a:"d1", sub:"1.1", q:"Qual afirmação distingue corretamente ameaça, vulnerabilidade e risco?",
 o:["São sinônimos","Vulnerabilidade é a fraqueza; ameaça é o que pode explorá-la; risco é a probabilidade de a ameaça explorar a fraqueza e causar impacto","Ameaça é a fraqueza e risco é o atacante","Risco é sempre um malware"],
 c:[1], e:[
 "Errada. São conceitos distintos e complementares.",
 "Correta. Vulnerabilidade = fraqueza; ameaça = agente/evento que pode explorá-la; risco = probabilidade × impacto dessa exploração.",
 "Errada. Está invertido: a fraqueza é a vulnerabilidade.",
 "Errada. Malware é um exemplo de ameaça, não a definição de risco."]},

{a:"d1", sub:"1.1", q:"O que descreve a estratégia de defesa em profundidade (defense-in-depth)?",
 o:["Usar um único firewall muito robusto","Aplicar várias camadas de controles de segurança independentes, de modo que a falha de uma não comprometa todo o sistema","Confiar em todos os dispositivos internos","Criptografar apenas os backups"],
 c:[1], e:[
 "Errada. Depender de um único controle é justamente o que a defesa em profundidade evita.",
 "Correta. É a analogia da 'cebola': múltiplas camadas de defesa; um atacante precisa vencer todas para chegar ao ativo.",
 "Errada. Isso descreve o modelo de perímetro confiável, não defesa em profundidade.",
 "Errada. Criptografar só backups é um controle pontual, não a estratégia em camadas."]},

{a:"d1", sub:"1.1", q:"'Hardening' (endurecimento) de um sistema significa:",
 o:["Instalar o máximo de aplicativos possível","Reduzir a superfície de ataque desativando serviços/portas desnecessários e aplicando configurações seguras","Aumentar a RAM do servidor","Criar mais contas de administrador"],
 c:[1], e:[
 "Errada. Mais aplicativos aumentam a superfície de ataque.",
 "Correta. Hardening minimiza o que pode ser explorado: desativa o desnecessário e reforça configurações.",
 "Errada. Adicionar RAM é upgrade de desempenho.",
 "Errada. Mais contas admin aumentam o risco."]},

{a:"d1", sub:"1.1", q:"Um administrador com a mais alta credencial não consegue abrir certos documentos, mesmo com login válido. Qual princípio explica isso?",
 o:["Certificado PKI revogado","Regra de firewall conflitante","Chave PKI inválida","Aplicação do princípio do privilégio mínimo"],
 c:[3], e:[
 "Errada. Revogação de certificado afeta autenticação/TLS, não permissões de documento por função.",
 "Errada. Firewall filtra tráfego de rede, não acesso a arquivos por papel.",
 "Errada. Chave inválida também é questão de PKI, não de autorização por função.",
 "Correta. Privilégio mínimo concede só o acesso necessário à função — ter alta credencial não dá acesso a tudo."]},

{a:"d1", sub:"1.1", q:"O ransomware que criptografa os arquivos da empresa e exige resgate ataca MAIS diretamente qual pilar da CIA?",
 o:["Confidencialidade","Integridade","Disponibilidade","Não repúdio"],
 c:[2], e:[
 "Errada. O problema imediato não é o vazamento dos dados.",
 "Errada. Integridade seria violada por alteração sorrateira; aqui os dados ficam inacessíveis.",
 "Correta. O bloqueio de acesso aos dados/sistemas atinge a Disponibilidade.",
 "Errada. Não repúdio não é um dos três pilares da tríade."]},

{a:"d1", sub:"1.1", q:"Registrar logs assinados de cada ação de cada usuário garante principalmente qual propriedade?",
 o:["Disponibilidade","Não repúdio","Confidencialidade","Tolerância a falhas"],
 c:[1], e:[
 "Errada. Disponibilidade trata de manter o serviço acessível.",
 "Correta. Registros assinados impedem que alguém negue ter feito uma ação — isso é não repúdio.",
 "Errada. Confidencialidade trata de impedir acesso não autorizado ao conteúdo.",
 "Errada. Tolerância a falhas mantém a operação apesar de defeitos."]},

{a:"d1", sub:"1.1", q:"Um 'attack vector' (vetor de ataque) é:",
 o:["O prejuízo financeiro de um ataque","O caminho ou meio pelo qual um atacante obtém acesso ao alvo (e-mail, USB, porta aberta, etc.)","A lei que pune crimes cibernéticos","O nome do grupo atacante"],
 c:[1], e:[
 "Errada. Prejuízo é impacto, não vetor.",
 "Correta. O vetor é o caminho de entrada usado para explorar uma vulnerabilidade (phishing, mídia removível, serviço exposto...).",
 "Errada. Não é uma norma jurídica.",
 "Errada. Isso seria a atribuição/identidade do adversário."]},

{a:"d1", sub:"1.1", q:"Um funcionário insatisfeito, com acesso legítimo, copia dados sigilosos para vendê-los. Que tipo de atacante/ameaça é esse?",
 o:["Script kiddie","Hacktivista","Ameaça interna (insider threat)","Estado-nação"],
 c:[2], e:[
 "Errada. Script kiddie usa ferramentas prontas, sem grande habilidade, e é externo.",
 "Errada. Hacktivista age por motivação ideológica, tipicamente de fora.",
 "Correta. Alguém de dentro, com acesso autorizado, que abusa dele configura uma ameaça interna.",
 "Errada. Estado-nação é ator externo altamente capacitado (ligado a APTs)."]},

{a:"d1", sub:"1.2", q:"Qual malware se disfarça de software legítimo para enganar o usuário a instalá-lo, mas NÃO se auto-replica?",
 o:["Worm","Vírus","Cavalo de Troia (Trojan)","Rootkit"],
 c:[2], e:[
 "Errada. Worm se auto-replica pela rede sem ação do usuário.",
 "Errada. Vírus se anexa a arquivos e se replica ao serem executados.",
 "Correta. O Trojan se passa por algo legítimo para ser instalado; não se auto-replica.",
 "Errada. Rootkit oculta a presença do atacante e mantém acesso privilegiado."]},

{a:"d1", sub:"1.2", q:"Qual malware se auto-replica e se espalha automaticamente pela rede, sem precisar de ação do usuário?",
 o:["Worm","Trojan","Spyware","Adware"],
 c:[0], e:[
 "Correta. O worm se propaga sozinho pela rede explorando vulnerabilidades, sem intervenção humana.",
 "Errada. O Trojan depende de o usuário executá-lo.",
 "Errada. Spyware coleta informações do usuário sorrateiramente.",
 "Errada. Adware exibe anúncios; não é definido por auto-replicação em rede."]},

{a:"d1", sub:"1.2", q:"Um atacante fica atrás de um funcionário e entra numa área restrita aproveitando a porta que a pessoa acabou de abrir com o crachá. Esse ataque físico/social é:",
 o:["Phishing","Tailgating (carona)","Vishing","Smishing"],
 c:[1], e:[
 "Errada. Phishing usa mensagens fraudulentas, não entrada física.",
 "Correta. Tailgating é seguir alguém autorizado para transpor um controle de acesso físico.",
 "Errada. Vishing é fraude por voz/telefone.",
 "Errada. Smishing é phishing por SMS."]},

{a:"d1", sub:"1.2", q:"Uma mensagem fraudulenta chega por SMS pedindo que a vítima clique em um link para 'regularizar sua encomenda'. Esse ataque é:",
 o:["Vishing","Smishing","Spear phishing","Whaling"],
 c:[1], e:[
 "Errada. Vishing é por voz/ligação telefônica.",
 "Correta. Smishing = phishing via SMS (mensagem de texto).",
 "Errada. Spear phishing é direcionado e personalizado, geralmente por e-mail.",
 "Errada. Whaling mira executivos de alto escalão."]},

{a:"d1", sub:"1.2", q:"O que caracteriza uma APT (Advanced Persistent Threat)?",
 o:["Um ataque rápido e barulhento de negação de serviço","Um ataque furtivo, sofisticado e prolongado, geralmente para espionagem, que mantém acesso por longo tempo","Um vírus que se apaga sozinho em minutos","Um golpe de phishing genérico em massa"],
 c:[1], e:[
 "Errada. APT não é rápida nem barulhenta; DoS é que é ruidoso.",
 "Correta. APT é uma campanha avançada, persistente e discreta, muitas vezes patrocinada por estados, focada em permanência e coleta.",
 "Errada. A persistência (permanecer no alvo) é justamente a marca da APT.",
 "Errada. APTs são altamente direcionadas, não campanhas genéricas."]},

{a:"d1", sub:"1.2", q:"Em um ataque man-in-the-middle (MITM), o atacante:",
 o:["Sobrecarrega o servidor com tráfego","Se posiciona entre duas partes para interceptar/alterar a comunicação sem que elas percebam","Criptografa os arquivos da vítima","Envia currículos falsos"],
 c:[1], e:[
 "Errada. Sobrecarregar o servidor descreve um DoS.",
 "Correta. No MITM o atacante intercepta (e pode modificar) o tráfego entre duas partes que julgam falar diretamente.",
 "Errada. Criptografar arquivos por resgate é ransomware.",
 "Errada. Isso não descreve MITM."]},

{a:"d1", sub:"1.2", q:"Uma botnet é:",
 o:["Um firewall de próxima geração","Uma rede de dispositivos infectados e controlados remotamente por um atacante, usada para ataques como DDoS ou spam","Um protocolo seguro de e-mail","Um tipo de backup incremental"],
 c:[1], e:[
 "Errada. Não é um dispositivo de defesa.",
 "Correta. Botnet é um conjunto de máquinas comprometidas (bots) sob comando de um atacante (C2), usadas em massa para DDoS, spam, mineração etc.",
 "Errada. Não é um protocolo de e-mail.",
 "Errada. Não tem relação com backups."]},

{a:"d1", sub:"1.2", q:"Um ataque de negação de serviço distribuído (DDoS) tem como objetivo principal:",
 o:["Roubar senhas silenciosamente","Tornar um serviço indisponível sobrecarregando-o com tráfego a partir de muitas fontes","Criptografar dados para pedir resgate","Modificar registros de banco de dados"],
 c:[1], e:[
 "Errada. Roubo furtivo de credenciais não é o alvo do DDoS.",
 "Correta. O DDoS esgota recursos (banda, conexões, CPU) usando muitas origens, derrubando a disponibilidade.",
 "Errada. Isso é ransomware.",
 "Errada. Alteração de dados atacaria integridade, não é o objetivo do DDoS."]},

{a:"d1", sub:"1.3", q:"No modelo AAA, os três 'A' significam:",
 o:["Acesso, Auditoria e Autorização","Autenticação, Autorização e Accounting (contabilização/auditoria)","Análise, Alerta e Ação","Autenticação, Acesso e Auditoria"],
 c:[1], e:[
 "Errada. Falta a Autenticação, primeiro passo do AAA.",
 "Correta. AAA = Authentication (quem é), Authorization (o que pode) e Accounting (registro do que foi feito).",
 "Errada. São etapas de resposta, não do AAA.",
 "Errada. 'Acesso' não é um dos três A's; o terceiro é Accounting."]},

{a:"d1", sub:"1.3", q:"Qual opção representa corretamente autenticação multifator (MFA)?",
 o:["Duas senhas diferentes","Senha (algo que você sabe) + código do app autenticador (algo que você tem)","Senha + PIN","Duas perguntas de segurança"],
 c:[1], e:[
 "Errada. Duas senhas são o mesmo fator (conhecimento).",
 "Correta. MFA combina fatores de categorias diferentes: conhecimento, posse e/ou inerência (biometria).",
 "Errada. Senha e PIN são ambos 'algo que você sabe'.",
 "Errada. Duas perguntas também são o mesmo fator (conhecimento)."]},

{a:"d1", sub:"1.3", q:"Qual é a função do protocolo RADIUS?",
 o:["Criptografar discos","Fornecer autenticação, autorização e accounting (AAA) centralizados para acesso à rede","Traduzir nomes de domínio","Fazer varredura de portas"],
 c:[1], e:[
 "Errada. Criptografia de disco é papel do BitLocker/LUKS.",
 "Correta. RADIUS centraliza o AAA — clientes (switches, APs, VPN) consultam o servidor RADIUS para validar usuários.",
 "Errada. Resolução de nomes é o DNS.",
 "Errada. Varredura de portas é feita por ferramentas como Nmap."]},

{a:"d1", sub:"1.3", q:"Qual destas é uma boa prática de política de senhas? (selecione dois)",
 o:["Exigir comprimento mínimo e complexidade adequados","Reutilizar a mesma senha em todos os sistemas","Bloquear a conta após várias tentativas malsucedidas","Anotar a senha em um bilhete no monitor"],
 c:[0,2], e:[
 "Correta. Comprimento e complexidade dificultam ataques de adivinhação e força bruta.",
 "Errada. Reutilizar senhas permite que o vazamento de uma comprometa várias contas.",
 "Correta. O bloqueio por tentativas (lockout) mitiga ataques de força bruta.",
 "Errada. Anotar a senha à vista anula qualquer política."]},

{a:"d1", sub:"1.4", q:"Qual é a diferença fundamental entre hashing e criptografia?",
 o:["Ambos são reversíveis com a chave","Hashing é de mão única (irreversível) e verifica integridade; criptografia é reversível com a chave e garante confidencialidade","Criptografia é irreversível e hashing é reversível","Não há diferença"],
 c:[1], e:[
 "Errada. Hashing não é reversível.",
 "Correta. O hash produz um resumo irreversível (integridade); a criptografia embaralha de forma reversível com a chave (confidencialidade).",
 "Errada. Está invertido.",
 "Errada. São mecanismos com propósitos distintos."]},

{a:"d1", sub:"1.4", q:"Qual a principal diferença entre criptografia simétrica e assimétrica?",
 o:["A simétrica usa uma única chave compartilhada; a assimétrica usa um par de chaves (pública e privada)","A simétrica é sempre insegura","A assimétrica não usa chaves","A simétrica só criptografa e a assimétrica só descriptografa"],
 c:[0], e:[
 "Correta. Simétrica usa a mesma chave secreta para cifrar e decifrar; assimétrica usa par pública/privada.",
 "Errada. A simétrica (ex.: AES) é forte e amplamente usada.",
 "Errada. A assimétrica é definida justamente pelo uso de chaves.",
 "Errada. Ambas fazem cifrar e decifrar; a diferença está no modelo de chaves."]},

{a:"d1", sub:"1.4", q:"Uma empresa precisa de criptografia FORTE para proteger comunicações confidenciais. Qual algoritmo é adequado?",
 o:["DES","WEP","AES","MD5"],
 c:[2], e:[
 "Errada. DES é obsoleto e considerado fraco (chave curta de 56 bits).",
 "Errada. WEP é um protocolo de Wi-Fi quebrado, não recomendado.",
 "Correta. AES é o padrão simétrico forte e atual para confidencialidade.",
 "Errada. MD5 é função de hash (e já quebrada), não cifra de confidencialidade."]},

{a:"d1", sub:"1.4", q:"Qual tecnologia garante a INTEGRIDADE dos dados durante a transmissão?",
 o:["VPN","Hashing","NAT","DHCP"],
 c:[1], e:[
 "Errada. A VPN garante confidencialidade (e integridade via seus protocolos), mas o mecanismo específico de integridade é o hash.",
 "Correta. Um hash (ex.: SHA-256) calculado e verificado no destino detecta qualquer alteração dos dados — garantindo integridade.",
 "Errada. NAT traduz endereços; não protege integridade.",
 "Errada. DHCP atribui endereços IP."]},

{a:"d1", sub:"1.4", q:"Numa PKI, o que uma entidade usa para verificar se um certificado digital foi revogado?",
 o:["SSID","CRL (Certificate Revocation List) ou OCSP","MAC","TTL"],
 c:[1], e:[
 "Errada. SSID é o nome de uma rede Wi-Fi.",
 "Correta. A CRL (lista de revogação) — ou o OCSP em tempo real — informa se um certificado deixou de ser válido antes do vencimento.",
 "Errada. MAC é endereço físico de placa de rede.",
 "Errada. TTL é o tempo de vida de um pacote/registro."]},

{a:"d1", sub:"1.4", q:"Uma VPN IPsec protege qual estado dos dados?",
 o:["Dados em repouso (at rest)","Dados em trânsito (in transit)","Dados em uso (in use)","Dados apagados"],
 c:[1], e:[
 "Errada. Dados em repouso são protegidos por criptografia de disco (ex.: BitLocker).",
 "Correta. A VPN cifra os dados enquanto trafegam pela rede — protege dados em trânsito.",
 "Errada. Dados em uso estão na memória sendo processados; exigem outras técnicas.",
 "Errada. Dados apagados não são um 'estado' protegido por VPN."]},

{a:"d1", sub:"1.4", q:"Qual protocolo adiciona criptografia ao HTTP para proteger a navegação web?",
 o:["FTP","TLS (formando o HTTPS)","Telnet","SNMPv1"],
 c:[1], e:[
 "Errada. FTP transfere arquivos, na forma básica sem criptografia.",
 "Correta. O TLS cifra a sessão HTTP, resultando no HTTPS (porta 443).",
 "Errada. Telnet é texto claro, sem criptografia.",
 "Errada. SNMPv1 não oferece criptografia (o SNMPv3 é que adiciona segurança)."]},

{a:"d1", sub:"1.1", q:"O 'código de ética' de um profissional de cibersegurança orienta principalmente a:",
 o:["Explorar qualquer sistema sem autorização para provar habilidade","Agir com integridade, legalidade e responsabilidade, protegendo dados e respeitando a privacidade","Compartilhar vulnerabilidades publicamente antes de avisar o fornecedor","Ignorar leis quando for conveniente"],
 c:[1], e:[
 "Errada. Acessar sistemas sem autorização é ilegal e antiético.",
 "Correta. O código de ética exige conduta íntegra, legal e responsável, com respeito à privacidade e ao interesse público.",
 "Errada. A divulgação responsável avisa o fornecedor antes (coordinated disclosure).",
 "Errada. Cumprir a lei é parte central da ética profissional."]},

/* ===================== DOMÍNIO 2 — SEGURANÇA DE REDES ===================== */

{a:"d2", sub:"2.1", q:"O ataque de 'ARP spoofing/poisoning' explora qual característica do protocolo ARP?",
 o:["ARP criptografa todas as mensagens","ARP não autentica as respostas, então um atacante pode associar seu MAC ao IP de outra máquina (ex.: o gateway)","ARP usa a porta 443","ARP resolve nomes de domínio"],
 c:[1], e:[
 "Errada. O ARP não tem criptografia — esse é justamente o problema.",
 "Correta. Como o ARP aceita respostas sem autenticação, o atacante forja associações IP↔MAC para interceptar tráfego (base para MITM).",
 "Errada. ARP opera na Lan (camada 2), não usa porta 443.",
 "Errada. Resolver nomes é função do DNS."]},

{a:"d2", sub:"2.1", q:"Qual porta TCP é usada por padrão pelo HTTPS?",
 o:["80","443","22","23"],
 c:[1], e:[
 "Errada. A porta 80 é do HTTP sem criptografia.",
 "Correta. HTTPS (HTTP sobre TLS) usa a porta 443.",
 "Errada. A porta 22 é do SSH.",
 "Errada. A porta 23 é do Telnet."]},

{a:"d2", sub:"2.1", q:"Você precisa administrar remotamente um servidor Linux com a sessão criptografada. Qual protocolo/porta usar?",
 o:["Telnet — porta 23","SSH — porta 22","FTP — porta 21","HTTP — porta 80"],
 c:[1], e:[
 "Errada. Telnet (23) transmite tudo em texto claro.",
 "Correta. SSH (porta 22) criptografa toda a sessão de administração remota.",
 "Errada. FTP (21) é transferência de arquivos, sem criptografia na forma básica.",
 "Errada. HTTP é para páginas web."]},

{a:"d2", sub:"2.1", q:"Qual porta é usada pelo serviço DNS?",
 o:["53","25","110","389"],
 c:[0], e:[
 "Correta. DNS usa a porta 53 (UDP para consultas comuns, TCP para transferência de zona).",
 "Errada. 25 é do SMTP.",
 "Errada. 110 é do POP3.",
 "Errada. 389 é do LDAP."]},

{a:"d2", sub:"2.1", q:"Um ataque em que o servidor DHCP é sobrecarregado com pedidos falsos, esgotando o pool de endereços, é chamado de:",
 o:["DHCP starvation","DNS tunneling","SYN flood","Smurf"],
 c:[0], e:[
 "Correta. DHCP starvation esgota os endereços disponíveis com requisições forjadas, negando IP a hosts legítimos.",
 "Errada. DNS tunneling exfiltra dados dentro de consultas DNS.",
 "Errada. SYN flood abusa do handshake TCP para esgotar conexões.",
 "Errada. Smurf usa ICMP com broadcast para amplificar tráfego."]},

{a:"d2", sub:"2.1", q:"O 'ping flood' e ataques de amplificação Smurf abusam de qual protocolo?",
 o:["ICMP","SMTP","LDAP","RDP"],
 c:[0], e:[
 "Correta. Esses ataques abusam do ICMP (usado pelo ping) para saturar o alvo.",
 "Errada. SMTP é de e-mail.",
 "Errada. LDAP é de diretórios.",
 "Errada. RDP é de área de trabalho remota."]},

{a:"d2", sub:"2.2", q:"Qual tecnologia permite que vários dispositivos de uma rede interna compartilhem um único endereço IP público?",
 o:["DHCP","NAT","DNS","VLAN"],
 c:[1], e:[
 "Errada. DHCP distribui IPs internos automaticamente.",
 "Correta. O NAT traduz endereços privados para um IP público compartilhado.",
 "Errada. DNS resolve nomes em IPs.",
 "Errada. VLAN segmenta logicamente a rede."]},

{a:"d2", sub:"2.2", q:"Qual destes é um endereço IPv4 PRIVADO (não roteável na internet)?",
 o:["8.8.8.8","192.168.1.10","172.9.0.1","200.150.10.1"],
 c:[1], e:[
 "Errada. 8.8.8.8 é público (DNS do Google).",
 "Correta. 192.168.0.0/16 é uma faixa privada (RFC 1918), como 10.0.0.0/8 e 172.16.0.0/12.",
 "Errada. 172.9.x.x está fora da faixa privada (a privada é 172.16–172.31).",
 "Errada. 200.150.10.1 é um endereço público."]},

{a:"d2", sub:"2.2", q:"Na notação CIDR, o que significa /24 em 192.168.10.0/24?",
 o:["24 hosts na rede","Os primeiros 24 bits são a parte de rede (máscara 255.255.255.0)","24 sub-redes","Tempo de concessão de 24 horas"],
 c:[1], e:[
 "Errada. /24 não indica número de hosts diretamente.",
 "Correta. /24 = 24 bits de rede → máscara 255.255.255.0 (deixa 8 bits para hosts, ~254 endereços utilizáveis).",
 "Errada. Não indica quantidade de sub-redes.",
 "Errada. Não tem relação com tempo de lease do DHCP."]},

{a:"d2", sub:"2.2", q:"Por que a segmentação de rede melhora a segurança?",
 o:["Aumenta a velocidade da internet","Limita a propagação lateral de ameaças e reduz a superfície de ataque, isolando grupos de hosts","Elimina a necessidade de senhas","Substitui o antivírus"],
 c:[1], e:[
 "Errada. Segmentar não tem como objetivo aumentar a banda de internet.",
 "Correta. Ao dividir a rede em segmentos (VLANs, sub-redes), o comprometimento de um host não alcança facilmente os demais.",
 "Errada. Não elimina a necessidade de autenticação.",
 "Errada. Não substitui controles de endpoint."]},

{a:"d2", sub:"2.3", q:"O que é uma DMZ (zona desmilitarizada) em uma arquitetura de rede?",
 o:["Uma rede sem acesso à internet","Uma sub-rede intermediária que hospeda serviços públicos, isolando-os da rede interna","Um túnel criptografado entre filiais","Uma VLAN só para administradores"],
 c:[1], e:[
 "Errada. A DMZ existe justamente para expor serviços à internet de forma controlada.",
 "Correta. A DMZ fica entre a internet e a LAN, abrigando servidores públicos (web, e-mail) sem dar acesso direto à rede interna.",
 "Errada. Túnel entre sites é uma VPN site-to-site.",
 "Errada. Isso seria segmentação por VLAN."]},

{a:"d2", sub:"2.3", q:"Qual é o propósito de um honeypot?",
 o:["Acelerar o tráfego legítimo","Servir de isca — um sistema falso e monitorado para atrair atacantes e estudar suas técnicas","Criptografar backups","Distribuir endereços IP"],
 c:[1], e:[
 "Errada. Honeypot não tem função de desempenho.",
 "Correta. É um alvo-isca deliberadamente vulnerável e vigiado, para detectar, distrair e analisar atacantes.",
 "Errada. Não faz criptografia de backups.",
 "Errada. Distribuição de IP é do DHCP."]},

{a:"d2", sub:"2.3", q:"Qual dispositivo apenas DETECTA e alerta sobre atividade suspeita, sem bloquear o tráfego por conta própria?",
 o:["IPS","IDS","Firewall","Proxy"],
 c:[1], e:[
 "Errada. O IPS detecta e bloqueia ativamente.",
 "Correta. O IDS monitora e gera alertas, mas não interrompe o tráfego automaticamente.",
 "Errada. Firewall filtra por regras, mas não é definido por 'só alertar'.",
 "Errada. Proxy intermedeia requisições."]},

{a:"d2", sub:"2.3", q:"Um IPS difere de um IDS porque:",
 o:["O IPS apenas gera relatórios","O IPS opera inline e pode bloquear/descartar automaticamente o tráfego malicioso; o IDS apenas detecta e alerta","O IDS bloqueia e o IPS observa","São idênticos"],
 c:[1], e:[
 "Errada. Só relatar aproxima-se do IDS.",
 "Correta. O IPS age (bloqueia, descarta, reseta) inline; o IDS é passivo (detecta e alerta).",
 "Errada. Está invertido.",
 "Errada. Há diferença clara entre ativo e passivo."]},

{a:"d2", sub:"2.3", q:"Um proxy web posicionado entre usuários e a internet oferece qual benefício de segurança?",
 o:["Aumenta a CPU dos clientes","Filtra e registra acessos, pode bloquear conteúdo malicioso e ocultar os IPs internos","Substitui o antivírus","Criptografa o disco dos servidores"],
 c:[1], e:[
 "Errada. Não tem relação com CPU dos clientes.",
 "Correta. O proxy intermedeia requisições, permitindo filtragem, registro, políticas de acesso e ocultação dos IPs internos.",
 "Errada. Não substitui antivírus.",
 "Errada. Criptografia de disco é outra ferramenta."]},

{a:"d2", sub:"2.4", q:"Qual protocolo de segurança sem fio é o MAIS recomendado entre as opções (mais forte)?",
 o:["WEP","WPA","WPA2 (com AES)","Rede aberta"],
 c:[2], e:[
 "Errada. WEP está quebrado e é trivial de romper.",
 "Errada. WPA (com TKIP) é melhor que WEP, mas superado.",
 "Correta. WPA2 com AES é forte e amplamente adotado (WPA3 é ainda mais novo, quando disponível).",
 "Errada. Rede aberta não tem criptografia."]},

{a:"d2", sub:"2.4", q:"Qual método de autenticação Wi-Fi usa um servidor RADIUS para validar cada usuário individualmente?",
 o:["WPA2-Personal (PSK)","WPA2-Enterprise","WEP","Rede aberta"],
 c:[1], e:[
 "Errada. WPA2-Personal usa uma chave pré-compartilhada única (PSK) para todos.",
 "Correta. WPA2-Enterprise usa 802.1X/EAP com um servidor RADIUS, autenticando cada usuário com credenciais próprias.",
 "Errada. WEP é inseguro e não usa RADIUS.",
 "Errada. Rede aberta não autentica."]},

{a:"d2", sub:"2.4", q:"Ocultar o SSID e usar filtragem de endereço MAC:",
 o:["São controles fortes que dispensam criptografia","Aumentam um pouco a barreira, mas são fracos isoladamente (SSID pode ser descoberto e MAC pode ser falsificado) — não substituem WPA2/WPA3","Impedem qualquer ataque de força bruta","Criptografam o tráfego"],
 c:[1], e:[
 "Errada. Não dispensam criptografia; são medidas complementares fracas.",
 "Correta. SSID oculto ainda é detectável e MAC pode ser clonado; ajudam pouco e nunca substituem criptografia forte.",
 "Errada. Não impedem força bruta contra a senha.",
 "Errada. Não criptografam nada."]},

{a:"d2", sub:"2.5", q:"O que é uma ACL (Access Control List) em um roteador/firewall?",
 o:["Uma lista de administradores","Um conjunto ordenado de regras que permite ou nega tráfego com base em IP, porta e protocolo","Um cofre de senhas","Um log de eventos"],
 c:[1], e:[
 "Errada. Não é uma lista de administradores.",
 "Correta. A ACL filtra pacotes conforme critérios (origem/destino, porta, protocolo), aplicando permit/deny em ordem.",
 "Errada. Isso seria um cofre de credenciais.",
 "Errada. Log é registro, não regra."]},

{a:"d2", sub:"2.5", q:"Qual a principal diferença entre firewall com estado (stateful) e sem estado (stateless)?",
 o:["O stateful só filtra por IP","O stateful mantém uma tabela de conexões e libera automaticamente o tráfego de retorno de sessões já estabelecidas; o stateless avalia cada pacote isoladamente","O stateless acompanha o estado das conexões","Não há diferença"],
 c:[1], e:[
 "Errada. O stateful faz muito mais que filtrar por IP.",
 "Correta. O stateful acompanha o estado das sessões; o stateless decide pacote a pacote, sem contexto de conexão.",
 "Errada. Quem acompanha o estado é o stateful.",
 "Errada. A diferença é relevante para segurança e desempenho."]},

{a:"d2", sub:"2.5", q:"Qual é a função de uma VPN?",
 o:["Acelerar downloads","Criar um túnel criptografado sobre uma rede pública, protegendo os dados em trânsito","Bloquear anúncios","Distribuir IPs na LAN"],
 c:[1], e:[
 "Errada. VPN não visa acelerar downloads.",
 "Correta. A VPN estabelece um túnel cifrado sobre a internet, garantindo confidencialidade e integridade do tráfego.",
 "Errada. Bloqueio de anúncios é outra ferramenta.",
 "Errada. Distribuição de IP é do DHCP."]},

{a:"d2", sub:"2.5", q:"O que faz uma solução de NAC (Network Access Control)?",
 o:["Traduz nomes de domínio","Avalia a postura/conformidade de um dispositivo (patches, antivírus) antes de permitir seu acesso à rede","Cria backups automáticos","Criptografa e-mails"],
 c:[1], e:[
 "Errada. Tradução de nomes é DNS.",
 "Correta. O NAC verifica se o dispositivo atende às políticas (atualizado, com AV, autorizado) antes de conceder acesso, podendo colocá-lo em quarentena.",
 "Errada. NAC não é ferramenta de backup.",
 "Errada. Criptografia de e-mail é outro controle."]},

{a:"d2", sub:"2.1", q:"Por que o Telnet é considerado inseguro para administração remota?",
 o:["É muito lento","Transmite dados, incluindo credenciais, em texto claro (sem criptografia)","Só funciona no Windows","Usa uma porta bloqueada"],
 c:[1], e:[
 "Errada. O problema não é velocidade.",
 "Correta. O Telnet envia tudo em texto claro; credenciais podem ser capturadas por quem escuta a rede — por isso o SSH o substituiu.",
 "Errada. Telnet é multiplataforma.",
 "Errada. A porta 23 não é o problema, e sim a ausência de criptografia."]},

{a:"d2", sub:"2.3", q:"Qual benefício de segurança a virtualização e a computação em nuvem exigem que se considere?",
 o:["Que a responsabilidade de segurança some completamente para o cliente","O modelo de responsabilidade compartilhada: provedor protege a infraestrutura, cliente protege dados, acessos e configurações","Que dados na nuvem nunca precisam de criptografia","Que a nuvem elimina a necessidade de IAM"],
 c:[1], e:[
 "Errada. Segurança não some; ela é dividida.",
 "Correta. Na nuvem vale a responsabilidade compartilhada: o provedor cuida da infraestrutura e o cliente cuida de dados, identidades e configurações.",
 "Errada. Dados sensíveis na nuvem também devem ser criptografados.",
 "Errada. IAM continua essencial (muitas vezes ainda mais)."]},

/* ===================== DOMÍNIO 3 — ENDPOINT ===================== */

{a:"d3", sub:"3.1", q:"No Linux, qual comando altera as permissões de um arquivo?",
 o:["chown","chmod","chgrp","passwd"],
 c:[1], e:[
 "Errada. chown altera o dono (owner).",
 "Correta. chmod (change mode) define permissões de leitura, escrita e execução.",
 "Errada. chgrp altera o grupo.",
 "Errada. passwd altera a senha do usuário."]},

{a:"d3", sub:"3.1", q:"No Linux, a permissão 755 em um arquivo significa:",
 o:["Todos podem ler, escrever e executar","Dono: ler/escrever/executar; grupo e outros: ler/executar","Ninguém tem acesso","Só o dono pode ler"],
 c:[1], e:[
 "Errada. 777 é que daria tudo a todos.",
 "Correta. 7=rwx (dono), 5=r-x (grupo), 5=r-x (outros) — leitura e execução, sem escrita para grupo/outros.",
 "Errada. 000 seria nenhum acesso.",
 "Errada. Grupo e outros também têm leitura/execução em 755."]},

{a:"d3", sub:"3.1", q:"Qual comando executa uma ação com privilégios de administrador (root) de forma controlada no Linux?",
 o:["sudo","ls","grep","cd"],
 c:[0], e:[
 "Correta. sudo (superuser do) eleva privilégios de forma pontual e auditável.",
 "Errada. ls lista arquivos.",
 "Errada. grep busca texto.",
 "Errada. cd muda de diretório."]},

{a:"d3", sub:"3.1", q:"O que é 'escalonamento de privilégios' (privilege escalation)?",
 o:["Fazer backup de dados","Um atacante ou processo obter permissões acima das que deveria ter (ex.: de usuário comum para administrador/root)","Aumentar a velocidade da CPU","Trocar a senha periodicamente"],
 c:[1], e:[
 "Errada. Isso é continuidade de dados.",
 "Correta. Escalonamento é ganhar privilégios maiores que os autorizados, explorando falhas ou configurações — objetivo comum após uma invasão inicial.",
 "Errada. Não tem relação com desempenho.",
 "Errada. Trocar senha é higiene de credenciais."]},

{a:"d3", sub:"3.1", q:"Qual recurso é o antivírus/antimalware nativo do Windows moderno?",
 o:["Windows Update","Microsoft Defender","BitLocker","PowerShell"],
 c:[1], e:[
 "Errada. Windows Update cuida de atualizações.",
 "Correta. O Microsoft Defender é a proteção antimalware integrada ao Windows.",
 "Errada. BitLocker faz criptografia de disco.",
 "Errada. PowerShell é shell/automação."]},

{a:"d3", sub:"3.1", q:"Um firewall baseado em host (host-based firewall):",
 o:["Protege toda a rede corporativa de uma vez","Controla o tráfego de entrada e saída no próprio dispositivo/endpoint","Só existe em roteadores","Substitui a necessidade de patches"],
 c:[1], e:[
 "Errada. Firewall de rede/perímetro é que protege o conjunto.",
 "Correta. O host firewall roda no próprio endpoint, filtrando o tráfego daquela máquina — uma camada de defesa em profundidade.",
 "Errada. Também existe em servidores e estações.",
 "Errada. Não substitui atualização de software."]},

{a:"d3", sub:"3.2", q:"Qual ferramenta de linha de comando mostra as conexões de rede ativas e as portas em escuta em um endpoint?",
 o:["nslookup","netstat","chmod","ipconfig"],
 c:[1], e:[
 "Errada. nslookup consulta registros DNS.",
 "Correta. netstat lista conexões ativas, portas em escuta e estatísticas de rede — útil para achar conexões suspeitas.",
 "Errada. chmod trata de permissões de arquivo.",
 "Errada. ipconfig mostra a configuração IP das interfaces (não as conexões)."]},

{a:"d3", sub:"3.2", q:"Qual ferramenta é usada para consultar registros do DNS (ex.: descobrir o IP de um domínio)?",
 o:["tcpdump","nslookup","netstat","chkdsk"],
 c:[1], e:[
 "Errada. tcpdump captura pacotes de rede.",
 "Correta. nslookup consulta o DNS, resolvendo nomes e inspecionando registros.",
 "Errada. netstat mostra conexões, não faz consulta DNS.",
 "Errada. chkdsk verifica o disco no Windows."]},

{a:"d3", sub:"3.2", q:"Qual ferramenta captura e analisa pacotes que trafegam pela rede (packet capture) na linha de comando?",
 o:["tcpdump","chmod","systemctl","nslookup"],
 c:[0], e:[
 "Correta. tcpdump captura e exibe pacotes de rede, essencial para análise de tráfego e detecção de anomalias.",
 "Errada. chmod trata de permissões.",
 "Errada. systemctl gerencia serviços.",
 "Errada. nslookup consulta DNS."]},

{a:"d3", sub:"3.3", q:"Manter um inventário de hardware e software atualizado (asset management) é importante para a segurança porque:",
 o:["Deixa os relatórios mais bonitos","Não se pode proteger o que não se sabe que existe — o inventário permite aplicar patches, detectar itens não autorizados e avaliar exposição","Substitui o firewall","Elimina a necessidade de backups"],
 c:[1], e:[
 "Errada. Não é questão estética.",
 "Correta. Sem saber quais ativos existem, não há como protegê-los; o inventário sustenta patching, controle de acesso e resposta.",
 "Errada. Não substitui firewall.",
 "Errada. Backups continuam necessários."]},

{a:"d3", sub:"3.3", q:"No contexto de BYOD (traga seu próprio dispositivo), qual controle ajuda a proteger dados corporativos em aparelhos pessoais?",
 o:["Proibir qualquer criptografia","Gerenciamento de dispositivos (MDM) com criptografia de dados, políticas de configuração e capacidade de apagar dados remotamente","Dar acesso administrativo total a todos","Desligar a autenticação"],
 c:[1], e:[
 "Errada. Criptografia é desejável, não proibida.",
 "Correta. BYOD seguro usa MDM: aplica políticas, criptografa dados, separa perfil corporativo e permite remote wipe em caso de perda/roubo.",
 "Errada. Acesso admin irrestrito aumenta o risco.",
 "Errada. Desligar autenticação é o oposto de proteger."]},

{a:"d3", sub:"3.3", q:"Qual regulamento trata especificamente da proteção de dados de cartões de pagamento?",
 o:["HIPAA","PCI DSS","FERPA","FISMA"],
 c:[1], e:[
 "Errada. HIPAA trata de dados de saúde (EUA).",
 "Correta. O PCI DSS é o padrão de segurança para dados de cartões de pagamento.",
 "Errada. FERPA trata de registros educacionais (EUA).",
 "Errada. FISMA trata de segurança de sistemas do governo federal dos EUA."]},

{a:"d3", sub:"3.4", q:"Por que aplicar patches de segurança rapidamente é importante?",
 o:["Para deixar o sistema mais bonito","Porque falhas conhecidas, com correção disponível, são alvos preferenciais — atualizar fecha a janela de exploração","Só para liberar espaço em disco","Porque a lei obriga atualizar todo dia"],
 c:[1], e:[
 "Errada. Estética não é o motivo.",
 "Correta. Assim que uma vulnerabilidade e seu patch são divulgados, atacantes miram quem não atualizou; aplicar rápido reduz o risco.",
 "Errada. Liberar espaço não é o objetivo de um patch.",
 "Errada. Não há obrigação legal diária; o motivo é técnico/risco."]},

{a:"d3", sub:"3.4", q:"Qual item também deve ser mantido atualizado por conter falhas exploráveis, além do sistema operacional e dos aplicativos?",
 o:["O papel de parede","Firmware de dispositivos e drivers","O nome do computador","A cor do tema"],
 c:[1], e:[
 "Errada. Papel de parede não afeta segurança.",
 "Correta. Firmware (roteadores, BIOS/UEFI, IoT) e drivers têm vulnerabilidades e precisam de atualização.",
 "Errada. Nome do host não é vetor de patch.",
 "Errada. Tema visual não é questão de segurança."]},

{a:"d3", sub:"3.5", q:"No Windows, qual ferramenta centraliza a visualização de logs do sistema, aplicativos e segurança?",
 o:["Visualizador de Eventos (Event Viewer)","Bloco de Notas","Painel de Controle de Som","Gerenciador de Tarefas"],
 c:[0], e:[
 "Correta. O Event Viewer reúne os logs (sistema, aplicativos, segurança) para análise e detecção de anomalias.",
 "Errada. Bloco de Notas é um editor de texto.",
 "Errada. Controle de som não tem logs de segurança.",
 "Errada. O Gerenciador de Tarefas mostra processos/desempenho, não os logs de eventos."]},

{a:"d3", sub:"3.5", q:"Qual protocolo/serviço é amplamente usado para centralizar logs de vários equipamentos em um servidor único?",
 o:["syslog","SMTP","DHCP","ARP"],
 c:[0], e:[
 "Correta. O syslog envia mensagens de log de dispositivos para um servidor central, facilitando correlação e retenção.",
 "Errada. SMTP é para e-mail.",
 "Errada. DHCP atribui IPs.",
 "Errada. ARP resolve IP↔MAC na LAN."]},

{a:"d3", sub:"3.5", q:"Analisando logs, o que caracteriza uma 'anomalia' que merece investigação?",
 o:["Um login bem-sucedido no horário comercial","Um padrão fora do normal, como centenas de tentativas de login falhas ou acesso de madrugada de um país incomum","Uma atualização de antivírus","O desligamento programado de um servidor"],
 c:[1], e:[
 "Errada. Login normal no horário esperado é comportamento comum.",
 "Correta. Anomalia é o desvio do comportamento de base (baseline): picos de falhas, horários/origens atípicas, volumes incomuns.",
 "Errada. Atualização de AV é evento rotineiro.",
 "Errada. Desligamento programado é esperado."]},

{a:"d3", sub:"3.6", q:"Ao remover malware de um endpoint, qual sequência é mais adequada?",
 o:["Pagar o resgate e reiniciar","Isolar a máquina da rede, executar varredura com ferramenta atualizada, revisar os logs da varredura e remediar/limpar (ou reimaginar) o sistema","Ignorar e continuar usando","Apenas trocar o papel de parede"],
 c:[1], e:[
 "Errada. Pagar não garante nada e financia o crime.",
 "Correta. Isola-se para conter, varre-se com assinaturas atualizadas, analisam-se os logs da varredura e remedia-se — em casos graves, reinstala-se o sistema.",
 "Errada. Ignorar deixa a ameaça ativa.",
 "Errada. Não tem qualquer efeito sobre o malware."]},

{a:"d3", sub:"3.1", q:"Duas defesas eficazes contra malware em endpoints são: (selecione dois)",
 o:["Manter o sistema operacional e aplicativos atualizados","Instalar e manter o antivírus atualizado","Implementar RAID no servidor","Usar um nome de usuário longo"],
 c:[0,1], e:[
 "Correta. Patches fecham as falhas que o malware explora.",
 "Correta. Antivírus atualizado detecta e bloqueia ameaças conhecidas.",
 "Errada. RAID trata de redundância/disponibilidade de disco, não de malware.",
 "Errada. O tamanho do nome de usuário não protege contra malware."]},

/* ===================== DOMÍNIO 4 — VULNERABILIDADES E RISCO ===================== */

{a:"d4", sub:"4.1", q:"Qual a diferença entre reconhecimento (reconnaissance) ativo e passivo?",
 o:["Ativo não interage com o alvo; passivo interage diretamente","Ativo interage diretamente com o alvo (ex.: port scan), podendo ser detectado; passivo coleta informações sem interagir diretamente (ex.: dados públicos, OSINT)","Ambos exigem invadir o sistema","Não há diferença"],
 c:[1], e:[
 "Errada. Está invertido.",
 "Correta. Recon ativo toca o alvo (varreduras) e pode gerar alertas; recon passivo observa fontes indiretas/públicas sem contato direto.",
 "Errada. Reconhecimento é fase anterior à exploração; não exige invadir.",
 "Errada. São abordagens distintas."]},

{a:"d4", sub:"4.1", q:"Uma varredura de portas (port scanning) tem como objetivo:",
 o:["Criptografar o tráfego","Descobrir quais portas/serviços estão abertos e acessíveis em um host, identificando possíveis pontos de entrada","Fazer backup automático","Bloquear anúncios"],
 c:[1], e:[
 "Errada. Port scan não criptografa nada.",
 "Correta. Mapeia portas/serviços expostos — usado tanto por defensores (avaliação) quanto por atacantes (reconhecimento).",
 "Errada. Não faz backup.",
 "Errada. Não bloqueia anúncios."]},

{a:"d4", sub:"4.1", q:"Qual a diferença entre uma varredura de vulnerabilidades e um teste de intrusão (pentest)?",
 o:["São a mesma coisa","O scan identifica e lista vulnerabilidades potenciais; o pentest tenta explorá-las ativamente para provar o impacto real","O pentest só roda automático e o scan é manual","O scan invade e o pentest só lista"],
 c:[1], e:[
 "Errada. São atividades diferentes em profundidade.",
 "Correta. A varredura aponta possíveis falhas; o pentest simula um ataque real, explorando-as para demonstrar o impacto.",
 "Errada. O pentest tem forte componente manual.",
 "Errada. Está invertido — quem explora é o pentest."]},

{a:"d4", sub:"4.2", q:"O que é o CVE (Common Vulnerabilities and Exposures)?",
 o:["Uma nota de gravidade de 0 a 10","Um identificador único e padronizado para uma vulnerabilidade conhecida (ex.: CVE-2024-1234)","Um tipo de firewall","Uma lei de proteção de dados"],
 c:[1], e:[
 "Errada. A nota de 0 a 10 é o CVSS.",
 "Correta. O CVE é um catálogo público que dá ID único a cada vulnerabilidade divulgada.",
 "Errada. Não é dispositivo de rede.",
 "Errada. Não é uma lei."]},

{a:"d4", sub:"4.2", q:"O que o CVSS (Common Vulnerability Scoring System) fornece?",
 o:["Um identificador único da falha","Uma pontuação de severidade (0 a 10) para priorizar a correção de vulnerabilidades","O nome do fabricante afetado","A data de descoberta"],
 c:[1], e:[
 "Errada. O ID único é o CVE.",
 "Correta. O CVSS atribui nota de 0 a 10 (baixa a crítica) para medir gravidade e priorizar remediação.",
 "Errada. Não indica fabricante.",
 "Errada. Mede severidade, não a data."]},

{a:"d4", sub:"4.2", q:"Qual é uma LIMITAÇÃO importante das bases de dados de vulnerabilidades (como o catálogo de CVEs)?",
 o:["Elas listam todas as falhas existentes, inclusive as ainda desconhecidas","Elas só contêm vulnerabilidades já conhecidas e divulgadas — não cobrem falhas de dia zero (zero-day) ainda não descobertas/publicadas","Elas substituem a necessidade de patches","Elas impedem qualquer ataque automaticamente"],
 c:[1], e:[
 "Errada. Nenhuma base conhece falhas ainda não descobertas.",
 "Correta. As bases refletem o que já foi identificado e publicado; zero-days ficam de fora até serem descobertos e catalogados.",
 "Errada. Conhecer a falha não a corrige; ainda é preciso aplicar patch/mitigação.",
 "Errada. São fontes de informação, não mecanismos de bloqueio."]},

{a:"d4", sub:"4.2", q:"Por que manter a documentação atualizada antes, durante e depois de um incidente é importante?",
 o:["Apenas para cumprir burocracia","Garante decisões consistentes, comunicação clara entre as equipes, rastreabilidade das ações e base para as lições aprendidas","Substitui a necessidade de ferramentas de segurança","Serve só para punir os culpados"],
 c:[1], e:[
 "Errada. Não é mera burocracia; tem valor operacional.",
 "Correta. Documentação atual e segura sustenta a resposta coordenada, a comunicação, a auditoria e a melhoria contínua.",
 "Errada. Não substitui controles técnicos.",
 "Errada. O foco é aprendizado e coordenação, não punição."]},

{a:"d4", sub:"4.3", q:"Qual é a fórmula conceitual mais comum para estimar o risco?",
 o:["Risco = Ameaça + Ativo","Risco = Probabilidade × Impacto","Risco = Vulnerabilidade − Controle","Risco = Custo × Tempo"],
 c:[1], e:[
 "Errada. Somar ameaça e ativo não expressa risco.",
 "Correta. Risco costuma ser estimado como Probabilidade (chance) × Impacto (consequência).",
 "Errada. Não é a fórmula padrão, ainda que controles reduzam risco.",
 "Errada. Custo e tempo não definem risco."]},

{a:"d4", sub:"4.3", q:"Contratar um seguro cibernético para cobrir eventuais perdas é exemplo de qual estratégia de tratamento de risco?",
 o:["Mitigar (reduzir)","Transferir","Aceitar","Evitar"],
 c:[1], e:[
 "Errada. Mitigar seria aplicar controles para reduzir probabilidade/impacto.",
 "Correta. Transferir é repassar o risco a terceiros — o seguro é o exemplo clássico.",
 "Errada. Aceitar seria conviver com o risco sem ação adicional.",
 "Errada. Evitar seria deixar de realizar a atividade que gera o risco."]},

{a:"d4", sub:"4.3", q:"Uma empresa decide NÃO lançar um recurso porque o risco de vazamento é inaceitável. Qual estratégia é essa?",
 o:["Aceitar","Mitigar","Evitar","Transferir"],
 c:[2], e:[
 "Errada. Aceitar seria seguir em frente convivendo com o risco.",
 "Errada. Mitigar seria lançar com controles adicionais.",
 "Correta. Evitar é eliminar a atividade que gera o risco — não lançar.",
 "Errada. Transferir seria repassar a um terceiro."]},

{a:"d4", sub:"4.3", q:"Aplicar controles adicionais (firewall, criptografia, treinamento) para reduzir a probabilidade ou o impacto de um risco é:",
 o:["Aceitar o risco","Mitigar (reduzir) o risco","Transferir o risco","Ignorar o risco"],
 c:[1], e:[
 "Errada. Aceitar é não agir além do que já existe.",
 "Correta. Mitigar é reduzir o risco por meio de controles.",
 "Errada. Transferir é repassar a terceiros.",
 "Errada. Ignorar não é uma estratégia formal (e é imprudente)."]},

{a:"d4", sub:"4.3", q:"Qual afirmação distingue corretamente vulnerabilidade de risco?",
 o:["São sinônimos","Vulnerabilidade é uma fraqueza existente; risco é a probabilidade de essa fraqueza ser explorada e causar dano","Risco é a fraqueza e vulnerabilidade é o dano","Vulnerabilidade só existe em software"],
 c:[1], e:[
 "Errada. Não são sinônimos.",
 "Correta. A vulnerabilidade é a fraqueza; o risco mede a chance de exploração e o impacto resultante.",
 "Errada. Está invertido.",
 "Errada. Vulnerabilidades existem em pessoas, processos e ambientes físicos também."]},

{a:"d4", sub:"4.3", q:"Por que a classificação da informação (pública, interna, confidencial, restrita) é importante para a gestão de risco?",
 o:["Para deixar documentos mais bonitos","Permite aplicar controles proporcionais à sensibilidade — dados mais críticos recebem proteção mais forte","Para comprimir arquivos","Para escolher a cor das pastas"],
 c:[1], e:[
 "Errada. Não tem finalidade estética.",
 "Correta. Classificar orienta o nível de proteção e priorização: quanto mais sensível o dado, maior o controle e o cuidado.",
 "Errada. Não comprime arquivos.",
 "Errada. Não é organização visual."]},

{a:"d4", sub:"4.4", q:"Qual a diferença entre Plano de Recuperação de Desastres (DRP) e Plano de Continuidade de Negócios (BCP)?",
 o:["São a mesma coisa","O BCP é abrangente e visa manter as operações essenciais do negócio durante/após uma disrupção; o DRP é uma parte focada em restaurar TI/sistemas e dados","O DRP é mais amplo que o BCP","Nenhum envolve backups"],
 c:[1], e:[
 "Errada. São planos relacionados, mas distintos em escopo.",
 "Correta. O BCP cobre a continuidade do negócio como um todo; o DRP é o componente técnico de restauração de TI/dados.",
 "Errada. É o BCP que é mais amplo.",
 "Errada. Backups são elemento central de ambos."]},

{a:"d4", sub:"4.4", q:"Restaurar sistemas a partir de backups após um incidente é um controle de recuperação do tipo:",
 o:["Preventivo","Detectivo","Corretivo","Dissuasório"],
 c:[2], e:[
 "Errada. Preventivo age antes, para impedir o evento (ex.: firewall).",
 "Errada. Detectivo identifica que algo ocorreu (ex.: IDS, logs).",
 "Correta. Corretivo restaura/repara após o evento — o backup/restore é o exemplo típico.",
 "Errada. Dissuasório desencoraja o ataque (ex.: aviso de câmeras)."]},

{a:"d4", sub:"4.4", q:"Um IDS que gera alertas ao identificar atividade suspeita é um controle de qual tipo?",
 o:["Preventivo","Detectivo","Corretivo","Físico"],
 c:[1], e:[
 "Errada. Preventivo impede o evento antes de ocorrer.",
 "Correta. O IDS detecta e alerta sobre o que está acontecendo — é um controle detectivo.",
 "Errada. Corretivo repara após o incidente.",
 "Errada. Físico trata de barreiras materiais (portas, catracas)."]},

{a:"d4", sub:"4.4", q:"São exemplos de controles de recuperação/continuidade: (selecione dois)",
 o:["Clusterização de servidores","Firewall de perímetro","Operações de backup e restauração","Sistema de detecção de intrusão"],
 c:[0,2], e:[
 "Correta. O cluster mantém o serviço disponível diante de falha de um nó (recuperação/redundância).",
 "Errada. Firewall é controle preventivo de acesso, não de recuperação.",
 "Correta. Backup/restore restaura os dados após um desastre (controle corretivo/recuperação).",
 "Errada. O IDS é detectivo, não de recuperação."]},

{a:"d4", sub:"4.3", q:"No processo de gestão de risco, qual é normalmente o PRIMEIRO passo?",
 o:["Monitorar o risco","Responder ao risco","Enquadrar/contextualizar o risco (frame) — definir o escopo, os ativos e o apetite a risco","Aceitar todos os riscos"],
 c:[2], e:[
 "Errada. O monitoramento é uma etapa contínua posterior.",
 "Errada. Responder vem depois de avaliar.",
 "Correta. Primeiro enquadra-se o risco (contexto, ativos, tolerância); depois avalia-se, responde-se e monitora-se.",
 "Errada. Aceitar cegamente não é gestão de risco."]},

/* ===================== DOMÍNIO 5 — INCIDENTES ===================== */

{a:"d5", sub:"5.1", q:"Qual é o papel de um SIEM (Security Information and Event Management)?",
 o:["Criptografar discos dos servidores","Coletar, correlacionar e analisar logs/eventos de várias fontes para detectar e alertar sobre incidentes de segurança","Distribuir endereços IP","Fazer backup automático"],
 c:[1], e:[
 "Errada. Criptografia de disco é outra ferramenta.",
 "Correta. O SIEM agrega logs de múltiplas origens, correlaciona eventos e gera alertas — base do monitoramento no SOC.",
 "Errada. Distribuição de IP é do DHCP.",
 "Errada. Backup é outra função."]},

{a:"d5", sub:"5.1", q:"O que o SOAR (Security Orchestration, Automation and Response) acrescenta em relação ao SIEM?",
 o:["Apenas armazena logs por mais tempo","Orquestra e automatiza respostas (playbooks), reduzindo o trabalho manual e acelerando a reação a incidentes","Substitui a necessidade de analistas","Só serve para relatórios financeiros"],
 c:[1], e:[
 "Errada. Retenção de logs não é o diferencial do SOAR.",
 "Correta. O SOAR automatiza fluxos de resposta (playbooks) e integra ferramentas, tornando a reação mais rápida e consistente.",
 "Errada. Apoia os analistas, não os elimina.",
 "Errada. Nada a ver com finanças."]},

{a:"d5", sub:"5.2", q:"O modelo Cyber Kill Chain descreve:",
 o:["As leis de proteção de dados","As etapas sequenciais de um ataque (reconhecimento, armamento, entrega, exploração, instalação, comando e controle, ações no objetivo)","Os tipos de criptografia","As portas TCP mais usadas"],
 c:[1], e:[
 "Errada. Não trata de legislação.",
 "Correta. A Kill Chain (Lockheed Martin) modela o ataque em fases; interromper qualquer etapa quebra a cadeia.",
 "Errada. Não trata de algoritmos de cripto.",
 "Errada. Não é uma lista de portas."]},

{a:"d5", sub:"5.2", q:"O que é a MITRE ATT&CK?",
 o:["Uma base de conhecimento detalhada de táticas, técnicas e procedimentos (TTPs) reais usados por adversários","Um antivírus gratuito","Um protocolo de VPN","Uma norma de cabeamento"],
 c:[0], e:[
 "Correta. A ATT&CK cataloga TTPs observados no mundo real, em nível operacional, apoiando detecção e defesa.",
 "Errada. Não é um produto antivírus.",
 "Errada. Não é protocolo de VPN.",
 "Errada. Não é norma de cabeamento."]},

{a:"d5", sub:"5.2", q:"Quais são os quatro vértices do Diamond Model de análise de intrusão?",
 o:["Adversário, Capacidade, Infraestrutura e Vítima","Entrada, Processo, Saída e Feedback","Confidencialidade, Integridade, Disponibilidade e Autenticidade","Detectar, Responder, Recuperar e Aprender"],
 c:[0], e:[
 "Correta. O Diamond Model relaciona Adversário, Capacidade (ferramenta/malware), Infraestrutura e Vítima em cada evento de intrusão.",
 "Errada. Isso descreve um sistema genérico, não o modelo.",
 "Errada. Isso é a tríade CIA acrescida de autenticidade.",
 "Errada. Isso lembra fases de resposta, não o Diamond Model."]},

{a:"d5", sub:"5.2", q:"O que significa TTP em análise de ameaças?",
 o:["Total de Tentativas de Phishing","Táticas, Técnicas e Procedimentos — o 'como' um adversário opera","Tempo Total de Processamento","Teste de Transferência de Pacotes"],
 c:[1], e:[
 "Errada. Não é uma métrica de phishing.",
 "Correta. TTPs descrevem o comportamento do adversário (táticas = objetivos, técnicas = meios, procedimentos = execução específica).",
 "Errada. Não é medida de desempenho.",
 "Errada. Não é um teste de rede."]},

{a:"d5", sub:"5.2", q:"O que é a 'cadeia de custódia' (chain of custody) no tratamento de evidências digitais?",
 o:["A ordem de reinício dos servidores","O registro documentado e cronológico de quem coletou, manuseou, transferiu e armazenou cada evidência, preservando sua integridade e admissibilidade","Uma técnica de criptografia","Uma lista de portas abertas"],
 c:[1], e:[
 "Errada. Não tem relação com reinício de sistemas.",
 "Correta. A cadeia de custódia comprova que a evidência não foi alterada, documentando cada posse e transferência — essencial no âmbito legal.",
 "Errada. Não é criptografia.",
 "Errada. Não é varredura de portas."]},

{a:"d5", sub:"5.2", q:"Ao responder a um incidente, por que se deve preservar a evidência digital (ex.: fazer imagem forense) antes de mexer no sistema?",
 o:["Porque não faz diferença","Porque ações no sistema original podem alterar/destruir evidências; trabalhar sobre uma cópia preserva a integridade para análise e uso legal","Para liberar espaço em disco","Para acelerar o computador"],
 c:[1], e:[
 "Errada. Faz muita diferença para a validade da evidência.",
 "Correta. Preservar (imagem bit a bit, hashes) evita contaminar a prova; a análise ocorre sobre a cópia, mantendo o original intacto.",
 "Errada. Não é questão de espaço.",
 "Errada. Não tem a ver com desempenho."]},

{a:"d5", sub:"5.4", q:"Qual é a ordem correta das fases do ciclo de resposta a incidentes (base NIST 800-61)?",
 o:["Detecção, Preparação, Recuperação, Contenção","Preparação; Detecção e Análise; Contenção, Erradicação e Recuperação; Atividade Pós-Incidente","Contenção, Preparação, Detecção, Erradicação","Recuperação, Detecção, Preparação, Contenção"],
 c:[1], e:[
 "Errada. A Preparação vem primeiro; a ordem está trocada.",
 "Correta. NIST 800-61: Preparação → Detecção e Análise → Contenção, Erradicação e Recuperação → Atividade Pós-Incidente (lições aprendidas).",
 "Errada. Não se contém antes de preparar e detectar.",
 "Errada. A recuperação não é a primeira fase."]},

{a:"d5", sub:"5.4", q:"Adquirir ferramentas, treinar a equipe e definir o plano ANTES de qualquer incidente pertence a qual fase?",
 o:["Detecção e Análise","Preparação","Contenção","Atividade Pós-Incidente"],
 c:[1], e:[
 "Errada. Detecção e Análise é confirmar e dimensionar um incidente em andamento.",
 "Correta. A Preparação reúne tudo que se faz antes: plano, equipe (CSIRT), ferramentas, playbooks e contatos.",
 "Errada. Contenção limita o alcance de um incidente já em curso.",
 "Errada. Pós-incidente é a revisão após o encerramento."]},

{a:"d5", sub:"5.4", q:"Isolar imediatamente uma máquina infectada da rede para impedir a propagação do malware corresponde a qual fase?",
 o:["Detecção e Análise","Contenção","Erradicação","Recuperação"],
 c:[1], e:[
 "Errada. Detecção e Análise é confirmar/dimensionar o incidente.",
 "Correta. Conter é limitar o alcance — isolar/desconectar o host afetado é ação típica de contenção.",
 "Errada. Erradicação remove a causa raiz (malware, contas comprometidas).",
 "Errada. Recuperação restaura a operação normal."]},

{a:"d5", sub:"5.4", q:"Remover completamente o malware e eliminar a causa raiz do incidente corresponde a qual fase?",
 o:["Contenção","Erradicação","Recuperação","Preparação"],
 c:[1], e:[
 "Errada. Contenção só limita o alcance.",
 "Correta. A Erradicação elimina a ameaça e sua origem (malware, backdoors, credenciais comprometidas).",
 "Errada. Recuperação vem depois, restaurando a operação.",
 "Errada. Preparação é anterior ao incidente."]},

{a:"d5", sub:"5.4", q:"A revisão pós-incidente ('lições aprendidas') serve principalmente para:",
 o:["Punir o responsável","Analisar o que ocorreu, avaliar a resposta e melhorar controles e processos para reduzir recorrência","Comprar servidores novos","Restaurar os backups"],
 c:[1], e:[
 "Errada. O foco é aprendizado, não punição.",
 "Correta. Documenta-se causas e eficácia da resposta e implementam-se melhorias — fecha o ciclo do NIST.",
 "Errada. Aquisição de hardware não é o propósito.",
 "Errada. Restaurar backups é parte da Recuperação."]},

{a:"d5", sub:"5.1", q:"Durante o monitoramento, um analista percebe centenas de tentativas de login falhas seguidas de um sucesso, vindas do mesmo IP externo. Qual é a ação mais adequada?",
 o:["Ignorar, pois pode ser normal","Tratar como evento suspeito, investigar e escalar conforme o procedimento (possível ataque de força bruta bem-sucedido)","Desligar toda a empresa imediatamente","Apagar os logs"],
 c:[1], e:[
 "Errada. Esse padrão é um forte indicador de comprometimento.",
 "Correta. É sinal clássico de força bruta com possível sucesso; deve-se investigar, conter a conta/IP e escalar segundo o playbook.",
 "Errada. Reação desproporcional; a resposta deve ser dimensionada.",
 "Errada. Apagar logs destrói evidências — jamais."]},

{a:"d5", sub:"5.3", q:"O GDPR (e, no Brasil, a LGPD) impõe qual obrigação relevante ao tratamento de incidentes?",
 o:["Nunca comunicar vazamentos a ninguém","Notificar a autoridade competente (e, quando aplicável, os titulares) sobre violações de dados pessoais dentro dos prazos exigidos","Pagar multa a qualquer atacante","Excluir todos os logs após um incidente"],
 c:[1], e:[
 "Errada. É o oposto: há dever de comunicar violações relevantes.",
 "Correta. GDPR/LGPD exigem notificação de violações de dados pessoais à autoridade (e aos titulares quando houver risco), em prazos definidos.",
 "Errada. Não se paga o atacante; isso é extorsão.",
 "Errada. Logs são evidências e devem ser preservados."]},

{a:"d5", sub:"5.3", q:"Qual framework de conformidade trata da proteção de dados de saúde nos EUA?",
 o:["PCI DSS","HIPAA","FERPA","FISMA"],
 c:[1], e:[
 "Errada. PCI DSS trata de dados de cartão de pagamento.",
 "Correta. O HIPAA regula a privacidade e segurança de informações de saúde (PHI) nos EUA.",
 "Errada. FERPA trata de registros educacionais.",
 "Errada. FISMA trata de sistemas de informação do governo federal dos EUA."]},

{a:"d5", sub:"5.3", q:"No contexto brasileiro, qual é a autoridade responsável por fiscalizar a aplicação da LGPD?",
 o:["ANPD (Autoridade Nacional de Proteção de Dados)","ANATEL","Banco Central","Receita Federal"],
 c:[0], e:[
 "Correta. A ANPD fiscaliza, orienta e aplica sanções relativas à LGPD.",
 "Errada. A ANATEL regula telecomunicações.",
 "Errada. O Banco Central regula o sistema financeiro.",
 "Errada. A Receita Federal cuida de tributos."]},

{a:"d5", sub:"5.1", q:"Uma captura de pacotes (packet capture) é útil no monitoramento porque:",
 o:["Criptografa o tráfego automaticamente","Permite inspecionar o conteúdo/metadados do tráfego para identificar comunicações maliciosas, exfiltração ou C2","Aumenta a velocidade da rede","Substitui o SIEM"],
 c:[1], e:[
 "Errada. Capturar pacotes não cifra nada.",
 "Correta. A análise de pacotes revela padrões suspeitos (conexões a C2, exfiltração, protocolos anômalos), apoiando a detecção.",
 "Errada. Não melhora desempenho.",
 "Errada. Complementa o SIEM, não o substitui."]},

];

/* Exporta para o app (script clássico — funciona até via file://) */
window.AREAS = AREAS;
window.QUESTIONS = QUESTIONS;

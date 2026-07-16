/* Domínio 1 — Princípios Essenciais: questões e material EXTRA (avançado) */
(function () {
  var Q = window.QUESTIONS, M = window.MATERIAL;

  var perguntas = [
    {a:"d1", sub:"1.4", q:"Como funciona uma assinatura digital?", o:["O remetente assina com sua chave pública e o destinatário verifica com a privada","O remetente assina (cifra o hash) com sua chave privada e qualquer um verifica com a chave pública dele","Usa a mesma chave simétrica dos dois lados","É apenas um hash sem chave"], c:[1], e:["Errada. Está invertido: a chave privada é secreta e usada para assinar.","Correta. Assina-se o hash da mensagem com a chave PRIVADA do remetente; a verificação usa a chave PÚBLICA dele — garante autenticidade, integridade e não repúdio.","Errada. Assinatura digital é assimétrica, não simétrica.","Errada. O hash sozinho não prova autoria; a assinatura acrescenta a chave privada."]},

    {a:"d1", sub:"1.4", q:"Para que serve o algoritmo Diffie-Hellman?", o:["Criptografar arquivos em repouso","Trocar/estabelecer uma chave secreta de forma segura por um canal público","Gerar hashes de senha","Assinar certificados"], c:[1], e:["Errada. Isso é papel de cifras como AES.","Correta. Diffie-Hellman permite que duas partes estabeleçam uma chave compartilhada sobre um canal inseguro, sem transmiti-la.","Errada. Hash de senha usa funções como bcrypt/PBKDF2.","Errada. Assinatura de certificados é feita pela CA com sua chave privada."]},

    {a:"d1", sub:"1.4", q:"Qual a diferença entre codificação (encoding), criptografia e hashing?", o:["São sinônimos","Encoding (ex.: Base64) só transforma o formato e é reversível sem chave; criptografia é reversível com chave; hashing é irreversível","Encoding é o mais seguro dos três","Hashing usa chave pública"], c:[1], e:["Errada. Têm propósitos distintos.","Correta. Encoding não protege nada (reversível sem segredo); criptografia protege confidencialidade (reversível com chave); hashing garante integridade (irreversível).","Errada. Encoding não oferece segurança alguma.","Errada. Hashing não usa chaves."]},

    {a:"d1", sub:"1.4", q:"Numa PKI, qual é o papel da Autoridade Certificadora (CA)?", o:["Distribuir endereços IP","Emitir e assinar digitalmente certificados, atestando que uma chave pública pertence a determinada entidade","Criptografar o disco dos servidores","Bloquear tráfego malicioso"], c:[1], e:["Errada. Isso é o DHCP.","Correta. A CA é a terceira parte confiável que valida identidades e assina os certificados; sua assinatura é o que os torna confiáveis.","Errada. Criptografia de disco é outra função.","Errada. Bloqueio de tráfego é do firewall/IPS."]},

    {a:"d1", sub:"1.4", q:"Um certificado digital no padrão X.509 contém tipicamente:", o:["A chave privada do titular","A chave pública do titular, dados de identificação, validade e a assinatura da CA","A senha do usuário","O histórico de navegação"], c:[1], e:["Errada. A chave privada NUNCA vai no certificado — fica só com o titular.","Correta. O X.509 traz a chave pública, identificação do titular, período de validade, emissor e a assinatura digital da CA.","Errada. Certificado não guarda senhas.","Errada. Não tem relação com histórico."]},

    {a:"d1", sub:"1.3", q:"O que é um ataque de 'rainbow table' e como o 'salt' o mitiga?", o:["É um phishing colorido; o salt bloqueia e-mails","É uma tabela pré-computada de hashes para reverter senhas; o salt (valor aleatório único por senha) torna essas tabelas inúteis","É um DDoS; o salt aumenta a banda","É um vírus; o salt é um antivírus"], c:[1], e:["Errada. Nada a ver com e-mail.","Correta. Rainbow tables mapeiam hashes para senhas; adicionar um salt único por usuário faz o mesmo texto gerar hashes diferentes, anulando a tabela.","Errada. Não é ataque de disponibilidade.","Errada. Salt não é antivírus."]},

    {a:"d1", sub:"1.3", q:"Qual a diferença entre força bruta, dicionário e password spraying?", o:["São idênticos","Força bruta testa todas as combinações; dicionário testa uma lista de senhas prováveis; password spraying testa poucas senhas comuns contra MUITAS contas para evitar bloqueio","Só o dicionário usa computador","Password spraying testa milhões de senhas numa só conta"], c:[1], e:["Errada. São técnicas distintas.","Correta. Spraying inverte a lógica: poucas senhas (ex.: 'Senha123') em muitas contas, contornando o bloqueio por tentativas.","Errada. Todos são automatizados.","Errada. Isso descreveria força bruta em uma conta, não spraying."]},

    {a:"d1", sub:"1.3", q:"Um vazamento de outro site expôs e-mails e senhas, e o atacante testa essas mesmas credenciais no seu sistema. Esse ataque é:", o:["Credential stuffing","Man-in-the-middle","Tailgating","SQL injection"], c:[0], e:["Correta. Credential stuffing reutiliza credenciais vazadas em outros serviços, explorando a reutilização de senhas.","Errada. MITM intercepta comunicação.","Errada. Tailgating é acesso físico.","Errada. SQLi ataca banco de dados."]},

    {a:"d1", sub:"1.3", q:"Qual a principal diferença entre RADIUS e TACACS+?", o:["RADIUS é da Microsoft e TACACS+ da Apple","RADIUS combina autenticação e autorização e criptografa só a senha; TACACS+ separa as funções AAA e criptografa o pacote inteiro","São exatamente iguais","TACACS+ não faz accounting"], c:[1], e:["Errada. Não é questão de fabricante desse jeito.","Correta. TACACS+ (Cisco) separa autenticação, autorização e accounting e cifra o payload inteiro; o RADIUS junta autenticação/autorização e cifra apenas a senha.","Errada. Há diferenças relevantes.","Errada. TACACS+ também faz accounting."]},

    {a:"d1", sub:"1.2", q:"Um malware registra tudo o que a vítima digita para capturar senhas. Ele é um:", o:["Keylogger","Adware","Worm","Rootkit"], c:[0], e:["Correta. Keylogger captura as teclas digitadas (um tipo de spyware).","Errada. Adware exibe anúncios.","Errada. Worm se auto-replica pela rede.","Errada. Rootkit oculta a presença do atacante."]},

    {a:"d1", sub:"1.2", q:"Um código malicioso que permanece inativo até uma condição específica (data, evento) para então executar sua carga é um(a):", o:["Logic bomb (bomba lógica)","CAPTCHA","Honeypot","Proxy"], c:[0], e:["Correta. A bomba lógica dispara quando uma condição é satisfeita (ex.: demissão de um funcionário, uma data).","Errada. CAPTCHA distingue humano de bot.","Errada. Honeypot é isca de defesa.","Errada. Proxy intermedeia requisições."]},

    {a:"d1", sub:"1.2", q:"Um malware usa sorrateiramente os recursos da máquina da vítima para minerar criptomoedas. Isso é:", o:["Cryptojacking","Phishing","Sniffing","Spoofing"], c:[0], e:["Correta. Cryptojacking sequestra CPU/GPU da vítima para mineração, geralmente deixando a máquina lenta.","Errada. Phishing é engano por mensagem.","Errada. Sniffing é captura de tráfego.","Errada. Spoofing é falsificação de identidade/endereço."]},

    {a:"d1", sub:"1.2", q:"O que caracteriza um malware 'fileless' (sem arquivo)?", o:["Ele sempre grava um .exe no disco","Ele opera na memória e abusa de ferramentas legítimas do sistema (ex.: PowerShell), dificultando a detecção por antivírus tradicional","Ele só afeta impressoras","Ele é inofensivo"], c:[1], e:["Errada. Justamente evita gravar arquivos no disco.","Correta. O fileless vive na memória e usa binários confiáveis do próprio SO (living off the land), driblando defesas baseadas em assinatura de arquivo.","Errada. Não é restrito a impressoras.","Errada. É perigoso e furtivo."]},

    {a:"d1", sub:"1.2", q:"O atacante compromete o DNS/redirecionamento para levar a vítima a um site falso mesmo digitando o endereço correto. Esse ataque é:", o:["Pharming","Vishing","Tailgating","Whaling"], c:[0], e:["Correta. Pharming redireciona a vítima para um site fraudulento manipulando DNS/hosts, sem precisar de clique em link.","Errada. Vishing é por voz.","Errada. Tailgating é acesso físico.","Errada. Whaling mira executivos."]},

    {a:"d1", sub:"1.2", q:"O atacante infecta um site legítimo que o grupo-alvo costuma visitar, para comprometer quem o acessa. Esse ataque é:", o:["Watering hole","Baiting","Smishing","Brute force"], c:[0], e:["Correta. No ataque de 'poço de água', compromete-se um site frequentado pelo alvo e espera-se as vítimas chegarem.","Errada. Baiting usa uma isca física/digital (ex.: pendrive abandonado).","Errada. Smishing é por SMS.","Errada. Força bruta adivinha credenciais."]},

    {a:"d1", sub:"1.2", q:"Um fornecedor de software confiável é comprometido e distribui uma atualização com backdoor a todos os seus clientes. Esse tipo de ataque é conhecido como:", o:["Ataque à cadeia de suprimentos (supply chain)","Shoulder surfing","Ataque de dicionário","Evil twin"], c:[0], e:["Correta. O ataque de supply chain compromete um elo confiável (fornecedor/dependência) para atingir muitos alvos de uma vez.","Errada. Shoulder surfing é espiar a tela por cima do ombro.","Errada. Dicionário é adivinhação de senha.","Errada. Evil twin é um ponto de acesso Wi-Fi falso."]},

    {a:"d1", sub:"1.2", q:"Quais destas são técnicas de engenharia social? (selecione três)", o:["Phishing","SYN flood","Pretexting","Tailgating"], c:[0,2,3], e:["Correta. Phishing manipula a vítima com mensagem fraudulenta.","Errada. SYN flood é um ataque técnico de negação de serviço, não engenharia social.","Correta. Pretexting cria um pretexto falso para enganar a vítima.","Correta. Tailgating explora a boa-fé para transpor um acesso físico."]},

    {a:"d1", sub:"1.1", q:"Um pesquisador de segurança contratado, autorizado a testar sistemas para encontrar falhas antes dos criminosos, é um:", o:["Black hat","White hat (hacker ético)","Script kiddie","Insider malicioso"], c:[1], e:["Errada. Black hat age de forma ilegal, com intenção maliciosa.","Correta. O white hat atua com autorização e para o bem (pentester, hacker ético).","Errada. Script kiddie usa ferramentas prontas sem grande habilidade.","Errada. Insider malicioso abusa de acesso legítimo com má intenção."]},

    {a:"d1", sub:"1.1", q:"O que é uma vulnerabilidade de 'dia zero' (zero-day)?", o:["Uma falha já corrigida há anos","Uma falha ainda desconhecida do fornecedor e sem correção disponível, que pode ser explorada antes de qualquer defesa","Um vírus que expira em 24h","Uma senha padrão de fábrica"], c:[1], e:["Errada. Zero-day é o oposto de algo já corrigido.","Correta. É uma falha sem patch e, muitas vezes, desconhecida do fornecedor — daí ser tão perigosa.","Errada. Não tem relação com tempo de vida de vírus.","Errada. Senha padrão é outra classe de fraqueza."]},

    {a:"d1", sub:"1.1", q:"Um sistema calcula e compara o hash de um arquivo baixado com o valor publicado pelo fornecedor. Qual pilar da CIA isso protege?", o:["Confidencialidade","Integridade","Disponibilidade","Nenhum"], c:[1], e:["Errada. Confidencialidade seria proteção contra leitura não autorizada.","Correta. Comparar hashes detecta se o arquivo foi alterado/corrompido — verifica a integridade.","Errada. Disponibilidade trata de acesso ao serviço.","Errada. É um controle claro de integridade."]},

    {a:"d1", sub:"1.4", q:"Qual afirmação sobre criptografia de dados EM USO (in use) está correta?", o:["É protegida por TLS/VPN","É protegida por criptografia de disco","Refere-se a dados ativos na memória sendo processados, os mais difíceis de proteger (ex.: enclaves seguros)","Não existe esse estado"], c:[2], e:["Errada. TLS/VPN protegem dados em trânsito.","Errada. Criptografia de disco protege dados em repouso.","Correta. Dados em uso estão descriptografados na memória durante o processamento; exigem técnicas como enclaves/confidential computing.","Errada. É um dos três estados dos dados."]},

    {a:"d1", sub:"1.4", q:"Entre os pares abaixo, qual identifica corretamente algoritmos simétricos e assimétricos?", o:["Simétrico: RSA · Assimétrico: AES","Simétrico: AES e 3DES · Assimétrico: RSA e ECC","Ambos são assimétricos","AES é uma função de hash"], c:[1], e:["Errada. Está invertido.","Correta. AES e 3DES são simétricos (chave única); RSA e ECC são assimétricos (par de chaves).","Errada. AES/3DES são simétricos.","Errada. AES é cifra de bloco, não hash."]},

    {a:"d1", sub:"1.3", q:"Qual é uma vantagem e um risco do Single Sign-On (SSO)?", o:["Vantagem: uma credencial para vários sistemas; risco: se essa credencial for comprometida, o atacante acessa tudo","Não tem vantagem alguma","Elimina a necessidade de senhas","Só funciona offline"], c:[0], e:["Correta. O SSO melhora a experiência e o controle (uma identidade), mas concentra risco: a conta única vira alvo de alto valor — por isso combina-se com MFA.","Errada. Tem vantagens claras de usabilidade e gestão.","Errada. Ainda há autenticação/credencial.","Errada. É usado sobretudo em serviços online."]},

    {a:"d1", sub:"1.1", q:"Quais são exemplos de controles que sustentam a Confidencialidade? (selecione dois)", o:["Criptografia dos dados","Balanceamento de carga","Controle de acesso / permissões","Servidores redundantes"], c:[0,2], e:["Correta. Criptografia impede a leitura por quem não tem a chave.","Errada. Balanceamento visa disponibilidade/desempenho.","Correta. Restringir quem pode acessar protege a confidencialidade.","Errada. Redundância protege a disponibilidade."]},
  ];
  Array.prototype.push.apply(Q, perguntas);

  var material = [
    {t:"Assinatura digital, hashing e criptografia (não confunda!)", sub:"1.4", html:`
      <table>
        <tr><th>Mecanismo</th><th>Garante</th><th>Reversível?</th><th>Chave</th></tr>
        <tr><td>Hashing</td><td>Integridade</td><td>Não</td><td>Nenhuma</td></tr>
        <tr><td>Criptografia</td><td>Confidencialidade</td><td>Sim, com a chave</td><td>Simétrica ou par</td></tr>
        <tr><td>Assinatura digital</td><td>Autenticidade + integridade + não repúdio</td><td>—</td><td>Assina com privada, verifica com pública</td></tr>
        <tr><td>Encoding (Base64)</td><td>Só muda o formato (NÃO é segurança)</td><td>Sim, sem segredo</td><td>Nenhuma</td></tr>
      </table>
      <p class="tip">Assinar = cifrar o <b>hash</b> da mensagem com a <b>chave privada</b> do remetente. Quem tiver a chave pública dele confirma a origem e que nada mudou.</p>`},

    {t:"PKI e certificados X.509", sub:"1.4", html:`
      <ul>
        <li><b>CA (Autoridade Certificadora)</b> — terceira parte confiável que assina certificados.</li>
        <li><b>Certificado X.509</b> contém: chave <b>pública</b> do titular, identificação, validade, emissor e a <b>assinatura da CA</b>. A chave privada nunca está nele.</li>
        <li><b>Cadeia de confiança</b> — CA raiz → CAs intermediárias → certificado final.</li>
        <li><b>Revogação</b>: <b>CRL</b> (lista) ou <b>OCSP</b> (consulta em tempo real).</li>
        <li><b>Diffie-Hellman</b> — troca segura de chave por canal público (não transmite a chave).</li>
      </ul>`},

    {t:"Ataques a senhas e defesas", sub:"1.3", html:`
      <table>
        <tr><th>Ataque</th><th>Como funciona</th></tr>
        <tr><td>Força bruta</td><td>Testa todas as combinações possíveis</td></tr>
        <tr><td>Dicionário</td><td>Testa uma lista de senhas prováveis</td></tr>
        <tr><td>Rainbow table</td><td>Usa hashes pré-calculados para reverter senhas</td></tr>
        <tr><td>Credential stuffing</td><td>Reutiliza credenciais vazadas de outros sites</td></tr>
        <tr><td>Password spraying</td><td>Poucas senhas comuns contra muitas contas (evita bloqueio)</td></tr>
      </table>
      <p><b>Defesas:</b> <b>salt</b> único por senha, hash lento (bcrypt/PBKDF2/Argon2), MFA, bloqueio por tentativas, senhas longas e únicas.</p>`},

    {t:"RADIUS × TACACS+", sub:"1.3", html:`
      <table>
        <tr><th>Aspecto</th><th>RADIUS</th><th>TACACS+</th></tr>
        <tr><td>Funções AAA</td><td>Junta autenticação + autorização</td><td>Separa as três (A/A/A)</td></tr>
        <tr><td>Criptografia</td><td>Só a senha</td><td>O pacote inteiro</td></tr>
        <tr><td>Transporte</td><td>UDP</td><td>TCP</td></tr>
        <tr><td>Uso típico</td><td>Acesso à rede (Wi-Fi, VPN)</td><td>Administração de dispositivos (Cisco)</td></tr>
      </table>`},

    {t:"Catálogo de malware", sub:"1.2", html:`
      <table>
        <tr><th>Malware</th><th>Marca registrada</th></tr>
        <tr><td>Keylogger</td><td>Registra as teclas digitadas</td></tr>
        <tr><td>Logic bomb</td><td>Dispara ao satisfazer uma condição (data/evento)</td></tr>
        <tr><td>Cryptojacking</td><td>Usa a máquina da vítima para minerar cripto</td></tr>
        <tr><td>Fileless</td><td>Vive na memória, abusa de ferramentas legítimas (PowerShell)</td></tr>
        <tr><td>Rootkit</td><td>Esconde presença e mantém acesso privilegiado</td></tr>
        <tr><td>Spyware / Adware</td><td>Espiona / exibe anúncios</td></tr>
      </table>`},

    {t:"Engenharia social e ataques ao humano", sub:"1.2", html:`
      <ul>
        <li><b>Phishing / Spear phishing / Whaling</b> — e-mail em massa / direcionado / a executivos.</li>
        <li><b>Vishing (voz) · Smishing (SMS)</b>.</li>
        <li><b>Pretexting</b> — inventar um cenário falso.</li>
        <li><b>Baiting</b> — isca (pendrive abandonado).</li>
        <li><b>Pharming</b> — redirecionar via DNS para site falso.</li>
        <li><b>Watering hole</b> — infectar site que o alvo frequenta.</li>
        <li><b>Tailgating · Shoulder surfing · Dumpster diving</b> — físicos: carona, espiar a tela, vasculhar o lixo.</li>
        <li><b>Supply chain</b> — comprometer um fornecedor confiável para atingir muitos.</li>
      </ul>
      <p class="tip">Tipos de hacker por intenção: <b>white hat</b> (ético, autorizado), <b>black hat</b> (malicioso), <b>gray hat</b> (age sem autorização, mas sem intenção claramente maliciosa).</p>`},
  ];
  if (M && M.d1) Array.prototype.push.apply(M.d1, material);
})();

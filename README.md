# Simulador CCST Cybersecurity — Analista de Cibersegurança Júnior

Webapp de estudo (offline, sem dependências) para treinar para o exame **Cisco CCST Cybersecurity (100-160)**, que conclui a *Trilha Profissionalizante do Analista de Cibersegurança Júnior* da Cisco NetAcad.

Cada questão mostra a resposta certa **e explica por que cada alternativa está certa ou errada** — a forma mais eficaz de fixar o conteúdo.

## Como rodar

```bash
cd ~/Documentos/simulador-ciberseguranca
python3 serve.py
```

Abre sozinho em `http://localhost:8099`. Para outra porta: `python3 serve.py 9000`.

> Também funciona abrindo o `index.html` direto no navegador (duplo clique), mas rodar pelo `serve.py` é mais confiável.

## Modos

- **Simulado cronometrado** — 30 questões balanceadas pelos domínios, 40 min, correção só no final, corte 70% (condições da prova real).
- **Praticar por domínio** — escolhe um dos 5 domínios e recebe explicação imediata a cada questão.
- **Maratona** — todas as questões embaralhadas com correção imediata.

Suporta questões de **resposta única** e de **múltipla escolha** ("selecione dois/três"), como no exame. O desempenho por domínio fica salvo no navegador (localStorage).

Atalhos de teclado: `1`–`5` marcam alternativas · `Enter` avança · `←`/`→` navegam.

## Estrutura

```
index.html            # página + topbar
assets/styles.css     # tema claro/escuro
assets/app.js         # lógica (modos, cronômetro, correção, histórico)
assets/questions.js   # BANCO DE QUESTÕES  ← edite aqui para adicionar/ajustar
serve.py              # servidor local (Python puro)
```

## Domínios oficiais do exame (blueprint CCST Cybersecurity 100-160)

1. **Essential Security Principles** — CIA, defesa em profundidade, ameaças/vulnerabilidades, ataques (malware, ransomware, DoS, engenharia social, MITM, APT…), AAA/RADIUS/MFA, criptografia/hashing/PKI, estados dos dados.
2. **Basic Network Security Concepts** — vulnerabilidades TCP/IP (TCP, UDP, HTTP, ARP, ICMP, DHCP, DNS), endereçamento/CIDR/NAT/segmentação, DMZ/honeypot/proxy/IDS/IPS, Wi-Fi seguro (WPA2/WPA2-Enterprise/RADIUS, SSID, MAC filtering), ACL/firewall/VPN/NAC.
3. **Endpoint Security Concepts** — Windows/macOS/Linux, Defender, host firewall, CLI/PowerShell, permissões, escalonamento de privilégio; `netstat`/`nslookup`/`tcpdump`; conformidade (PCI DSS/HIPAA/GDPR, BYOD); patching; logs (Event Viewer/syslog); remoção de malware.
4. **Vulnerability Assessment and Risk Management** — gestão de vulnerabilidades, recon ativo/passivo, port scanning; CVE/CVSS e bases de vulnerabilidades; risco (probabilidade × impacto, estratégias, classificação de dados); DRP/BCP e controles (preventivo/detectivo/corretivo).
5. **Incident Handling** — SIEM/SOAR, packet capture; Cyber Kill Chain, MITRE ATT&CK, Diamond Model, TTPs, cadeia de custódia; frameworks (GDPR, HIPAA, PCI-DSS, FERPA, FISMA / LGPD-ANPD no Brasil); ciclo de resposta a incidentes (NIST 800-61).

## Adicionar/editar questões

Edite `assets/questions.js`. Cada questão segue o modelo:

```js
{ a: "d2",           // domínio: d1..d5
  sub: "2.5",        // subtópico oficial
  q: "enunciado da pergunta",
  o: ["alt A", "alt B", "alt C", "alt D"],
  c: [0],            // índice(s) da(s) correta(s); 2+ itens => múltipla escolha
  e: ["por que A", "por que B", "por que C", "por que D"] }
```

## Fontes

Blueprint oficial de objetivos do **Cisco Certified Support Technician: Cybersecurity** e materiais públicos da trilha Junior Cybersecurity Analyst da Cisco NetAcad. Conteúdo pedagógico próprio, em português; não reproduz o banco oficial do exame.

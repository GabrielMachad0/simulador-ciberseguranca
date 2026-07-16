/* ============================================================================
   PODCASTS — episódios de estudo (áudio gerado no NotebookLM)
   Coloque os arquivos de áudio em podcasts/audio/ com os nomes indicados em `file`.
   Enquanto o áudio não existir, o player mostra instruções de como gerá-lo.
   ============================================================================ */
const PODCASTS = [
  { area: null, num: "00", file: "podcasts/audio/00.mp3", fonte: "podcasts/00-visao-geral.md",
    titulo: "Visão geral do exame CCST", desc: "O mapa completo: o que é o exame, os 5 domínios e como estudar." },
  { area: "d1", num: "01", file: "podcasts/audio/01.mp3", fonte: "podcasts/01-principios-essenciais.md",
    titulo: "Princípios Essenciais de Segurança", desc: "Tríade CIA, ameaça x vulnerabilidade x risco, AAA/MFA, criptografia e PKI." },
  { area: "d2", num: "02", file: "podcasts/audio/02.mp3", fonte: "podcasts/02-seguranca-de-redes.md",
    titulo: "Segurança de Redes", desc: "Portas, ataques TCP/IP, DMZ, IDS x IPS, Wi-Fi seguro, firewall e VPN." },
  { area: "d3", num: "03", file: "podcasts/audio/03.mp3", fonte: "podcasts/03-seguranca-de-endpoint.md",
    titulo: "Segurança de Endpoint", desc: "Windows/macOS/Linux, comandos, backups 3-2-1, patching, logs e malware." },
  { area: "d4", num: "04", file: "podcasts/audio/04.mp3", fonte: "podcasts/04-vulnerabilidades-e-risco.md",
    titulo: "Vulnerabilidades e Gestão de Riscos", desc: "CVE/CVSS/CWE, cálculo SLE/ALE/ARO, estratégias de risco, DRP/BCP." },
  { area: "d5", num: "05", file: "podcasts/audio/05.mp3", fonte: "podcasts/05-tratamento-de-incidentes.md",
    titulo: "Tratamento de Incidentes", desc: "SIEM/SOAR, Cyber Kill Chain, MITRE ATT&CK, forense e ciclo NIST." },
];
window.PODCASTS = PODCASTS;

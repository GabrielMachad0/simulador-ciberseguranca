# Como transformar estes textos em podcasts no NotebookLM

Estes 6 arquivos são **documentos-fonte** prontos para o NotebookLM gerar os áudios (Resumo em Áudio / Audio Overview). Você não precisa escrever o roteiro da conversa — o NotebookLM cria os dois apresentadores e o diálogo a partir do texto que você fornecer.

## Arquivos

| Arquivo | Episódio |
|---|---|
| `00-visao-geral.md` | Visão geral do exame CCST |
| `01-principios-essenciais.md` | Domínio 1 — Princípios Essenciais |
| `02-seguranca-de-redes.md` | Domínio 2 — Segurança de Redes |
| `03-seguranca-de-endpoint.md` | Domínio 3 — Endpoint |
| `04-vulnerabilidades-e-risco.md` | Domínio 4 — Vulnerabilidades e Risco |
| `05-tratamento-de-incidentes.md` | Domínio 5 — Incidentes |

## Passo a passo

1. Acesse **notebooklm.google.com** e crie um **novo notebook** (sugestão: um notebook por episódio, para o áudio focar só naquele tema).
2. Em **Fontes → Adicionar**, escolha **"Texto colado"** e cole o conteúdo do arquivo `.md` correspondente (ou faça upload do arquivo).
3. Clique em **Resumo em Áudio** (Audio Overview) → **Personalizar** (Customize) e cole o prompt de customização abaixo.
4. Clique em **Gerar**. Em alguns minutos o episódio fica pronto.
5. Use o botão de **download** para salvar o áudio (arquivo `.wav`/`.mp3`).
6. Renomeie e salve os áudios na pasta `podcasts/audio/` do projeto, com os nomes: `00.mp3`, `01.mp3`, `02.mp3`, `03.mp3`, `04.mp3`, `05.mp3`. A seção **Podcasts** do simulador vai tocá-los automaticamente.

## Prompt de customização (cole no "Personalizar" do NotebookLM)

> Gere o episódio inteiramente em **português do Brasil**, com tom didático, leve e motivador, como dois professores conversando para preparar um aluno para o exame **Cisco CCST Cybersecurity (Analista de Cibersegurança Júnior)**. O público é iniciante. Explique cada conceito com clareza, use analogias simples do dia a dia e destaque as **pegadinhas de prova** e as diferenças que os alunos costumam confundir (por exemplo: vírus x worm x trojan; IDS x IPS; hashing x criptografia; CVE x CVSS x CWE). Mantenha os termos técnicos em inglês quando forem os nomes oficiais (ex.: phishing, firewall, hashing), mas explique cada um em português. Ao final, faça um resumo rápido dos pontos mais importantes para revisar.

## Dicas

- Duração: peça episódios de aproximadamente **10 a 15 minutos**; se o NotebookLM permitir escolher o tamanho, escolha "mais longo" para o Domínio 1, 2 e 4, que têm mais conteúdo.
- Se quiser um único podcast em vez de seis, junte todos os arquivos num só notebook — mas o áudio fica mais raso. O ideal é um episódio por domínio.
- Você pode adicionar outras fontes ao mesmo notebook (por exemplo, os textos do Material de Estudo do app) para enriquecer o episódio.
- O idioma de saída também pode ser definido nas configurações do NotebookLM (Idioma de saída → Português do Brasil).

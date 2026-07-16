#!/usr/bin/env python3
"""Servidor do Simulador CCST Cybersecurity, com tela de senha.

Uso local:
    python3 serve.py            # http://localhost:8099
    python3 serve.py 9000       # outra porta

Variáveis de ambiente (usadas no deploy / EasyPanel):
    PORT           porta de escuta (padrão 8099)
    APP_PASSWORD   senha de acesso (padrão: haduken)

Sem dependências — só a biblioteca padrão do Python.
"""
import http.server
import socketserver
import sys
import os
import hashlib
import html
from http.cookies import SimpleCookie
from urllib.parse import parse_qs

PORT = int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 8099))
ROOT = os.path.dirname(os.path.abspath(__file__))
PASSWORD = os.environ.get("APP_PASSWORD", "haduken")
COOKIE = "sim_auth"
# token determinístico: sobrevive a reinícios sem expor a senha em texto claro
TOKEN = hashlib.sha256(("sim-ccst-v1::" + PASSWORD).encode()).hexdigest()

LOGIN_PAGE = """<!doctype html><html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Simulador CCST — acesso</title>
<style>
  :root{{color-scheme:dark}}
  *{{box-sizing:border-box}}
  body{{margin:0;min-height:100vh;display:grid;place-items:center;background:#0E1420;
    color:#E6ECF3;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:24px}}
  .card{{width:100%;max-width:380px;background:#161E2C;border:1px solid #2A3547;border-radius:18px;
    padding:34px 28px;box-shadow:0 10px 40px rgba(0,0,0,.4);text-align:center}}
  .logo{{width:52px;height:52px;border-radius:14px;background:#22C3D6;margin:0 auto 18px;position:relative}}
  .logo::before{{content:"";position:absolute;inset:0;margin:auto;width:22px;height:22px;
    border:4px solid #04262b;border-top:none;border-radius:4px 4px 9px 9px;top:6px}}
  .logo::after{{content:"";position:absolute;left:0;right:0;margin:auto;top:10px;width:15px;height:13px;
    border:4px solid #04262b;border-bottom:none;border-radius:9px 9px 0 0}}
  h1{{font-size:20px;margin:0 0 6px;letter-spacing:-.3px}}
  p{{color:#8A97A8;font-size:13.5px;margin:0 0 22px;line-height:1.5}}
  input{{width:100%;padding:13px 15px;border-radius:11px;border:1.5px solid #2A3547;background:#0E1420;
    color:#E6ECF3;font-size:16px;font-family:inherit;margin-bottom:12px;text-align:center;letter-spacing:2px}}
  input:focus{{outline:none;border-color:#22C3D6}}
  button{{width:100%;padding:13px;border-radius:11px;border:none;background:#22C3D6;color:#04262b;
    font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}}
  button:hover{{filter:brightness(1.07)}}
  .err{{color:#F27484;font-size:13px;margin:0 0 14px;min-height:16px}}
  .foot{{color:#5B6675;font-size:11px;margin-top:20px;font-family:ui-monospace,monospace}}
</style></head><body>
  <form class="card" method="POST" action="/__login">
    <div class="logo"></div>
    <h1>Simulador CCST Cybersecurity</h1>
    <p>Preparação para o exame de Analista de Cibersegurança Júnior. Digite a senha para entrar.</p>
    <div class="err">{erro}</div>
    <input type="password" name="senha" placeholder="senha" autofocus autocomplete="current-password">
    <button type="submit">Entrar</button>
    <div class="foot">acesso privado</div>
  </form>
</body></html>"""


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".m4a": "audio/mp4", ".mp3": "audio/mpeg", ".wav": "audio/wav",
        ".ogg": "audio/ogg", ".opus": "audio/opus", ".aac": "audio/aac", ".mp4": "video/mp4",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    # ---------- autenticação ----------
    def is_authed(self):
        raw = self.headers.get("Cookie")
        if not raw:
            return False
        try:
            c = SimpleCookie(raw)
            return COOKIE in c and c[COOKIE].value == TOKEN
        except Exception:
            return False

    def send_login(self, erro=""):
        body = LOGIN_PAGE.format(erro=html.escape(erro)).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def do_POST(self):
        if self.path.split("?")[0] == "/__login":
            length = int(self.headers.get("Content-Length") or 0)
            data = self.rfile.read(length).decode("utf-8", "replace") if length else ""
            senha = (parse_qs(data).get("senha") or [""])[0]
            if senha == PASSWORD:
                self.send_response(303)
                self.send_header("Location", "/")
                c = SimpleCookie()
                c[COOKIE] = TOKEN
                c[COOKIE]["path"] = "/"
                c[COOKIE]["max-age"] = 60 * 60 * 24 * 30
                c[COOKIE]["httponly"] = True
                c[COOKIE]["samesite"] = "Lax"
                self.send_header("Set-Cookie", c[COOKIE].OutputString())
                self.end_headers()
            else:
                self.send_login("Senha incorreta. Tente de novo.")
        else:
            self.send_error(404)

    def do_GET(self):
        if not self.is_authed():
            return self.send_login()
        return super().do_GET()

    def do_HEAD(self):
        if not self.is_authed():
            return self.send_login()
        return super().do_HEAD()

    # ---------- cabeçalhos ----------
    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    # ---------- suporte a Range (seek em áudios longos) ----------
    def send_head(self):
        range_header = self.headers.get("Range")
        if not range_header:
            return super().send_head()
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None
        try:
            st = os.fstat(f.fileno())
            size = st.st_size
            unit, _, spec = range_header.partition("=")
            if unit.strip() != "bytes":
                raise ValueError
            start_s, _, end_s = spec.partition("-")
            if start_s == "":
                start = max(0, size - int(end_s)); end = size - 1
            else:
                start = int(start_s); end = int(end_s) if end_s else size - 1
            if start >= size or start < 0:
                self.send_response(416)
                self.send_header("Content-Range", f"bytes */{size}")
                self.end_headers(); f.close(); return None
            end = min(end, size - 1)
        except (ValueError, TypeError):
            f.close()
            return super().send_head()
        length = end - start + 1
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(length))
        self.send_header("Last-Modified", self.date_time_string(st.st_mtime))
        self.end_headers()
        f.seek(start)
        self._range_remaining = length
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, "_range_remaining", None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        self._range_remaining = None
        while remaining > 0:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            try:
                outputfile.write(chunk)
            except (BrokenPipeError, ConnectionResetError):
                break
            remaining -= len(chunk)

    def log_message(self, fmt, *args):
        pass


class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def main():
    with Server(("0.0.0.0", PORT), Handler) as httpd:
        print(f"\n  Simulador CCST Cybersecurity rodando na porta {PORT}")
        print(f"  senha de acesso: {'(env APP_PASSWORD)' if os.environ.get('APP_PASSWORD') else PASSWORD}\n")
        # abre o navegador só em uso local (não no container/EasyPanel)
        if not os.environ.get("PORT") and sys.stdout.isatty():
            try:
                import webbrowser
                webbrowser.open(f"http://localhost:{PORT}/")
            except Exception:
                pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Encerrado.\n")


if __name__ == "__main__":
    main()

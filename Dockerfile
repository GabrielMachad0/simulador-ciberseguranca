FROM python:3.12-slim

WORKDIR /app
COPY . /app

# EasyPanel injeta a porta; usamos 8080 por padrão
ENV PORT=8080
# senha de acesso (pode ser sobrescrita nas variáveis de ambiente do EasyPanel)
ENV APP_PASSWORD=haduken

EXPOSE 8080

CMD ["python", "serve.py"]

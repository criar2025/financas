#!/bin/bash
echo "Iniciando finança.com - Seu site de análise financeira..."
# Detectar o sistema operacional
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "./financa/index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "./financa/index.html"
else
    # Fallback para outros sistemas
    echo "Por favor, abra manualmente o arquivo financa/index.html no seu navegador"
fi

#!/bin/bash

# Script Bash para iniciar a aplicacao CRUD Escolar (Linux/Mac)

echo "========================================"
echo "   CRUD Escolar - Iniciando Aplicacao"
echo "========================================"
echo ""

# Verificar se Python esta instalado
echo "[1/4] Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo "[ERRO] Python3 nao encontrado!"
    echo "Por favor, instale Python em: https://www.python.org/downloads/"
    exit 1
fi
python3 --version
echo "[OK] Python encontrado!"
echo ""

# Verificar se pip esta disponivel
echo "[2/4] Verificando pip..."
if ! command -v pip3 &> /dev/null; then
    echo "[ERRO] pip3 nao encontrado!"
    exit 1
fi
echo "[OK] pip encontrado!"
echo ""

# Instalar dependencias
echo "[3/4] Verificando e instalando dependencias..."
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "[ERRO] Falha ao instalar dependencias!"
    exit 1
fi
echo "[OK] Dependencias instaladas!"
echo ""

# Executar aplicacao
echo "[4/4] Iniciando aplicacao Flask..."
echo ""
echo "========================================"
echo "   Aplicacao rodando em:"
echo "   http://localhost:5000"
echo "========================================"
echo ""
echo "Pressione CTRL+C para parar o servidor"
echo ""

python3 app_laravel.py

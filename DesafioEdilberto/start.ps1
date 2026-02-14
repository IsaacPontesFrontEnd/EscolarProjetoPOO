# Script PowerShell para iniciar a aplicacao CRUD Escolar

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CRUD Escolar - Iniciando Aplicacao" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Python esta instalado
Write-Host "[1/4] Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host $pythonVersion -ForegroundColor Green
    Write-Host "[OK] Python encontrado!" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Python nao encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale Python em: https://www.python.org/downloads/" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host ""

# Verificar se pip esta disponivel
Write-Host "[2/4] Verificando pip..." -ForegroundColor Yellow
try {
    $pipVersion = pip --version 2>&1
    Write-Host "[OK] pip encontrado!" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] pip nao encontrado!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host ""

# Instalar dependencias
Write-Host "[3/4] Verificando e instalando dependencias..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt
    Write-Host "[OK] Dependencias instaladas!" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Falha ao instalar dependencias!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host ""

# Executar aplicacao
Write-Host "[4/4] Iniciando aplicacao Flask..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Aplicacao rodando em:" -ForegroundColor Cyan
Write-Host "   http://localhost:5000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione CTRL+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

python app_laravel.py

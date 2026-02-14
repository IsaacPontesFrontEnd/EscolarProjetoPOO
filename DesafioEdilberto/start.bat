@echo off
echo ========================================
echo   CRUD Escolar - Iniciando Aplicacao
echo   Banco: Neon PostgreSQL (Cloud)
echo ========================================
echo.

:: Verificar se Python esta instalado
echo [1/4] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python nao encontrado!
    echo Por favor, instale Python em: https://www.python.org/downloads/
    pause
    exit /b 1
)
python --version
echo [OK] Python encontrado!
echo.

:: Verificar se pip esta disponivel
echo [2/4] Verificando pip...
pip --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] pip nao encontrado!
    pause
    exit /b 1
)
echo [OK] pip encontrado!
echo.

:: Instalar dependencias (Flask + psycopg para PostgreSQL)
echo [3/4] Instalando dependencias (Flask + PostgreSQL)...
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas!
echo.

:: Executar aplicacao
echo [4/4] Iniciando aplicacao Flask...
echo.
echo ========================================
echo   Aplicacao rodando em:
echo   http://localhost:5000
echo.
echo   Banco de dados: Neon PostgreSQL
echo ========================================
echo.
echo Pressione CTRL+C para parar o servidor
echo.

python app_laravel.py

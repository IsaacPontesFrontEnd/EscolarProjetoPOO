# Arquivo de configuração e conexão com banco de dados
import psycopg

# String de conexão Neon PostgreSQL
DATABASE_URL = "postgresql://neondb_owner:npg_fwmzQkO9L2Rc@ep-misty-violet-aiabdlxt-pooler.c-4.us-east-1.aws.neon.tech/escola_db?sslmode=require"

# Função para conectar ao banco
def conectar():
    conexao = psycopg.connect(DATABASE_URL)
    return conexao

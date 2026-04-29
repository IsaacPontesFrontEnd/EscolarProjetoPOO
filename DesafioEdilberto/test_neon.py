# Script para testar conexão com Neon e criar tabelas
import psycopg

DATABASE_URL = "postgresql://neondb_owner:npg_fwmzQkO9L2Rc@ep-misty-violet-aiabdlxt-pooler.c-4.us-east-1.aws.neon.tech/escola_db?sslmode=require"

print("Testando conexão com Neon PostgreSQL...")

try:
    # Conectar ao banco
    conn = psycopg.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    print("✅ Conexão estabelecida com sucesso!")
    
    # Criar tabelas
    print("\nCriando tabelas...")
    
    # Ler e executar o SQL
    with open('database_postgres.sql', 'r', encoding='utf-8') as f:
        sql = f.read()
        cursor.execute(sql)
        conn.commit()
    
    print("✅ Tabelas criadas com sucesso!")
    
    # Verificar se há dados
    cursor.execute("SELECT COUNT(*) FROM aluno")
    count = cursor.fetchone()[0]
    print(f"✅ Total de alunos cadastrados: {count}")
    
    cursor.close()
    conn.close()
    
    print("\n🎉 Banco de dados configurado com sucesso!")
    
except Exception as e:
    print(f"❌ Erro: {e}")

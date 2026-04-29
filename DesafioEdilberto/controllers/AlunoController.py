# Controller de Alunos (tipo Laravel)
from flask import render_template, request, jsonify
from database.database import conectar

class AlunoController:
    
    # INDEX - Exibir página de listagem
    def index(self):
        return render_template('alunos/index.html')
    
    # CREATE - Exibir formulário de cadastro
    def create(self):
        return render_template('alunos/create.html')
    
    # STORE - Salvar novo aluno no banco
    def store(self):
        dados = request.get_json()
        
        banco = None
        try:
            banco = conectar()
            cursor = banco.cursor()
            
            sql = '''INSERT INTO aluno 
                     (nome, endereco, cidade, pais, cpf, email) 
                     VALUES (%s, %s, %s, %s, %s, %s)'''
            
            valores = (
                dados['nome'],
                dados['endereco'],
                dados['cidade'],
                dados['pais'],
                dados['cpf'],
                dados['email']
            )
            
            cursor.execute(sql, valores)
            banco.commit()
            cursor.close()
            
            return jsonify({'mensagem': 'Aluno criado com sucesso!'}), 201
            
        except Exception as e:
            if banco:
                banco.rollback()
            return jsonify({'erro': str(e)}), 500
            
        finally:
            if banco:
                banco.close()
    
    # SHOW - Exibir detalhes de um aluno
    def show(self, id):
        return render_template('alunos/show.html')
    
    # EDIT - Exibir formulário de edição
    def edit(self, id):
        return render_template('alunos/edit.html')
    
    # UPDATE - Atualizar aluno no banco
    def update(self, id):
        dados = request.get_json()
        
        banco = None
        try:
            banco = conectar()
            cursor = banco.cursor()
            
            sql = '''UPDATE aluno 
                     SET nome=%s, endereco=%s, cidade=%s, pais=%s, cpf=%s, email=%s 
                     WHERE id=%s'''
            
            valores = (
                dados['nome'],
                dados['endereco'],
                dados['cidade'],
                dados['pais'],
                dados['cpf'],
                dados['email'],
                id
            )
            
            cursor.execute(sql, valores)
            banco.commit()
            cursor.close()
            
            return jsonify({'mensagem': 'Aluno atualizado com sucesso!'})
            
        except Exception as e:
            if banco:
                banco.rollback()
            return jsonify({'erro': str(e)}), 500
            
        finally:
            if banco:
                banco.close()
    
    # DESTROY - Deletar aluno do banco
    def destroy(self, id):
        banco = None
        try:
            banco = conectar()
            cursor = banco.cursor()
            
            cursor.execute('DELETE FROM aluno WHERE id = %s', (id,))
            
            banco.commit()
            cursor.close()
            
            return jsonify({'mensagem': 'Aluno deletado com sucesso!'})
            
        except Exception as e:
            if banco:
                banco.rollback()
            return jsonify({'erro': str(e)}), 500
            
        finally:
            if banco:
                banco.close()
    
    # Métodos API para retornar dados JSON
    
    # API - Listar todos os alunos
    def listar(self):
        banco = conectar()
        cursor = banco.cursor()
        
        cursor.execute('SELECT * FROM aluno')
        colunas = [desc[0] for desc in cursor.description]
        resultados = cursor.fetchall()
        alunos = [dict(zip(colunas, row)) for row in resultados]
        
        cursor.close()
        banco.close()
        return jsonify(alunos)
    
    # API - Buscar um aluno específico
    def buscar(self, id):
        banco = conectar()
        cursor = banco.cursor()
        
        cursor.execute('SELECT * FROM aluno WHERE id = %s', (id,))
        resultado = cursor.fetchone()
        
        if resultado:
            colunas = [desc[0] for desc in cursor.description]
            aluno = dict(zip(colunas, resultado))
        else:
            aluno = None
        
        cursor.close()
        banco.close()
        return jsonify(aluno)

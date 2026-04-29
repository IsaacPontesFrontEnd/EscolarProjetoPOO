# Controller de Disciplinas (PARA OS ALUNOS DESENVOLVEREM)
from flask import render_template, request, jsonify
from database.database import conectar

class DisciplinaController:
    
    # INDEX - Exibir página de listagem
    def index(self):
        pass
    
    # CREATE - Exibir formulário de cadastro
    def create(self):
        pass
    
    # STORE - Salvar nova disciplina no banco
    def store(self):
        pass
    
    # SHOW - Exibir detalhes de uma disciplina
    def show(self, id):
        pass
    
    # EDIT - Exibir formulário de edição
    def edit(self, id):
        pass
    
    # UPDATE - Atualizar disciplina no banco
    def update(self, id):
        pass
    
    # DESTROY - Deletar disciplina do banco
    def destroy(self, id):
        pass
    
    # API - Listar todas as disciplinas
    def listar(self):
        pass
    
    # API - Buscar uma disciplina específica
    def buscar(self, id):
        pass

# Controller de Professores (PARA OS ALUNOS DESENVOLVEREM)
from flask import render_template, request, jsonify
from database.database import conectar

class ProfessorController:
    
    # INDEX - Exibir página de listagem
    def index(self):
        pass
    
    # CREATE - Exibir formulário de cadastro
    def create(self):
        pass
    
    # STORE - Salvar novo professor no banco
    def store(self):
        pass
    
    # SHOW - Exibir detalhes de um professor
    def show(self, id):
        pass
    
    # EDIT - Exibir formulário de edição
    def edit(self, id):
        pass
    
    # UPDATE - Atualizar professor no banco
    def update(self, id):
        pass
    
    # DESTROY - Deletar professor do banco
    def destroy(self, id):
        pass
    
    # API - Listar todos os professores
    def listar(self):
        pass
    
    # API - Buscar um professor específico
    def buscar(self, id):
        pass

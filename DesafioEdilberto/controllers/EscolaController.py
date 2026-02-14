# Controller de Escolas (PARA OS ALUNOS DESENVOLVEREM)
from flask import render_template, request, jsonify
from database.database import conectar

class EscolaController:
    
    # INDEX - Exibir página de listagem
    def index(self):
        pass
    
    # CREATE - Exibir formulário de cadastro
    def create(self):
        pass
    
    # STORE - Salvar nova escola no banco
    def store(self):
        pass
    
    # SHOW - Exibir detalhes de uma escola
    def show(self, id):
        pass
    
    # EDIT - Exibir formulário de edição
    def edit(self, id):
        pass
    
    # UPDATE - Atualizar escola no banco
    def update(self, id):
        pass
    
    # DESTROY - Deletar escola do banco
    def destroy(self, id):
        pass
    
    # API - Listar todas as escolas
    def listar(self):
        pass
    
    # API - Buscar uma escola específica
    def buscar(self, id):
        pass

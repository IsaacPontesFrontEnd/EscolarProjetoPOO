# Arquivo de rotas (tipo Laravel routes/web.php)
from controllers.AlunoController import AlunoController

# Instanciar o controller
aluno_controller = AlunoController()

def registrar_rotas(app):
    
    # Rotas de páginas (Views)
    app.add_url_rule('/', 'alunos.index', aluno_controller.index)
    app.add_url_rule('/alunos/create', 'alunos.create', aluno_controller.create)
    app.add_url_rule('/alunos/<int:id>', 'alunos.show', aluno_controller.show)
    app.add_url_rule('/alunos/<int:id>/edit', 'alunos.edit', aluno_controller.edit)
    
    # Rotas da API (JSON)
    app.add_url_rule('/api/alunos', 'api.alunos.index', aluno_controller.listar, methods=['GET'])
    app.add_url_rule('/api/alunos', 'api.alunos.store', aluno_controller.store, methods=['POST'])
    app.add_url_rule('/api/alunos/<int:id>', 'api.alunos.show', aluno_controller.buscar, methods=['GET'])
    app.add_url_rule('/api/alunos/<int:id>', 'api.alunos.update', aluno_controller.update, methods=['PUT'])
    app.add_url_rule('/api/alunos/<int:id>', 'api.alunos.destroy', aluno_controller.destroy, methods=['DELETE'])

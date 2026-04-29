# Arquivo principal da aplicação (tipo Laravel)
from flask import Flask
from routes.web import registrar_rotas

# Criar aplicação Flask
app = Flask(__name__)

# Registrar todas as rotas
registrar_rotas(app)

# Executar aplicação
if __name__ == '__main__':
    app.run(debug=True)

print ("Seja bem-vindo à biblioteca") 
livros = []
usuarios = []
int(input("Número de páginas: ")) 
titulo = input("Título do livro: ") 
autor = input("Autor do livro: ") 
páginas = int(input("Número de páginas: ")) 
editora = input("Editora: ")

livro = { 
        "titulo": titulo, 
        "autor": autor, 
        "paginas": paginas, 
        "editora": editora, 
        "alugado": False, 

         "usuario": None,
} 

         

livros.append(livro)
print('livro adicionado à sua biblioteca.') 

adicionar_livro()

def visualizar_livros(): 
 for i, livro in enumerate(livros): 
    print(f"{i+1}. {livro['titulo']} - {livro['autor']} ({livro['paginas']} páginas) - Editora {livro['editora']}")

def adicionar_usuario():
    identidade = input("Identidade: ") 
cpf = input("CPF: ") 
nome = input("Nome: ") 
endereco = input("Endereço: ") 
cep = input("CEP: ") 
bairro = input("Bairro: ") 
estado = input("Estado: ") 
capital = input("Capital: ") 
idade = int(input("Idade: ")) 

usuario = { 
        "identidade": identidade, 
        "cpf": cpf, 
        "nome": nome, 
        "endereco": endereco, 
        "cep": cep, 
        "bairro": bairro, 
        "estado": estado, 
        "capital": capital, 
        "idade": idade 
    }
usuarios.append(usuario) 
print("Usuário cadastrado com sucesso!")  
def alugar_livro(): 
    visualizar_livros()  # Mostramos os livros antes 
    indice = int(input("Escolha o número do livro para alugar: ")) - 1  

    if livros[indice]["alugado"]: 
        print("Esse livro já está alugado!") 
    else: 
         for i, usuario in enumerate(usuarios): 
            print(f"{i+1}. {usuario['nome']} - Registro: {usuario['identidade']}")
    usuario_indice = int(input("Escolha o usuário pelo número: ")) - 
    for i, usuario in enumerate(usuarios): 
        print(f"{i+1}. {usuario['nome']} - Registro: {usuario['identidade']}") 
        usuario_indice = int(input("Escolha o usuário pelo número: ")) - 
1  

livros[indice]["alugado"] = True 
livros[indice]["usuario"] = usuarios[usuario_indice]["nome"] 
livros[indice]["alugueis"] += 1 
print(f"O livro '{livros[indice]['titulo']}' foi alugado para 
{usuarios[usuario_indice]['nome']}.")

def devolver_livro(): 
    visualizar_livros() 
    indice = int(input("Escolha o número do livro para devolver: ")) - 1 
 
    if livros[indice]["alugado"]: 
        livros[indice]["alugado"] = False 
        livros[indice]["usuario"] = None 
        print("Livro devolvido com sucesso!") 
    else: 
        print("Esse livro não está alugado!")

        def menu(): 
    while True: 
        print("\n=== MENU ===") 
        print("1 - Adicionar Livro") 
        print("2 - Visualizar Livros") 
        print("3 - Adicionar Usuário") 
        print("4 - Alugar Livro") 
        print("5 - Devolver Livro") 
        print("6 - Sair")

        opcao = input("Escolha uma opção: ") 
 
        if opcao == "1": 
            adicionar_livro() 
        elif opcao == "2": 
            visualizar_livros() 
        elif opcao == "3": 
            adicionar_usuario() 
        elif opcao == "4": 
            alugar_livro() 
        elif opcao == "5": 
            devolver_livro() 
        elif opcao == "6": 
            print("Saindo do sistema...") 
            break 
        else: 
            print("Opção inválida, tente novamente.") 


            menu()
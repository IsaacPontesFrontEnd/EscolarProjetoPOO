class Conta:
    def __init__(self, contanome = "teste", contasenha = 123):
        self.__contanome = contanome;
        self.__contasenha = contasenha

    @property
    def modificar_nome(self):
        return self.__contanome;

    @modificar_nome.setter
    def modificar_nome(self, novo_nome):
        self.__contanome = novo_nome;       
    
    @property
    def alterar_senha(self):
        return self.__contasenha;

    @alterar_senha.setter
    def alterar_senha(self, nova_senha):
        if len(str(nova_senha)) < 4:
            print("Senha deve ter pelo menos 4 dígitos.");
        else:
            self.__contasenha = nova_senha;

conta2 = Conta("Isaac", 1234);

print("Seu nome da conta é: " + conta2.modificar_nome);
escolha = input("Digite 1 para mudar o nome ou 2 para não mudar o nome: ");

if escolha == "1":
    novo_nome = input("Digite seu novo nome: ")
    conta2.modificar_nome = novo_nome;
    print("seu novo nome é: " + conta2.modificar_nome);
elif escolha == "2":
    print("Seu nome permanece: " + conta2.modificar_nome);
else:
    print("Opção inválida.");


# print(conta2.modificar_nome);
# conta2.modificar_nome = "joao";
# print(conta2.modificar_nome);

# print(conta2.alterar_senha);
# conta2.alterar_senha = 4323;
# print(conta2.alterar_senha);


# class Conta:
#     def __init__(self, saldo = 0):
#         self.__saldo = saldo;
#     @property
#     def saldo(self):
#         return self.__saldo

#     @saldo.setter
#     def saldo(self, valor):
#         if valor < 0:
#             print("Saldo não pode ser negativo.")
#         else:
#             self.__saldo = valor;

#     def depositar(self, valor):
#         if valor > 0:
#             self.saldo += valor;

# conta2 = Conta(100);
# print(conta2.saldo);
# conta2.depositar(50);
# print(conta2.saldo);

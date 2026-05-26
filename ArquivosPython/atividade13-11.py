class exploracao:
    def __init__(self, colonizar= None, ocupar= None):
        self.colonizar= colonizar
        self.ocupar= ocupar

    def executar(self) -> str:
        return f"\nO {self.colonizar} quer colonizar {self.ocupar}"

class iluminismo(exploracao):
    def __init__(self, __pessoa = None, escolher = None):
        self.__pessoa = __pessoa
        self.escolher = escolher
        self.__pessoa = input("\nQual é o seu nome? ")

    @property
    def dar_nome(self):
        return self.__pessoa

    @dar_nome.setter
    def dar_nome(self, __pessoa):
        self.__pessoa = __pessoa

    def executar(self):
        return f"\na {self.__pessoa} Quer {self.escolher},"


class Pensamento(iluminismo):
    def __init__(self, pensar= None, imaginar= None):
        self.pensar= pensar
        self.imaginar= imaginar
    def executar(self):
        return f"Estou a {self.pensar} sobre mminha {self.imaginar}."

class Ideia(Pensamento):
    def __init__(self, viver= None, morrer= None, desisão= None):
        self.viver= viver
        self.morrer= morrer

    def executar(self):
        return f"Você quer."

print("Qual o nome do seu país")
pais = input();
print("Qual país voce quer colonizar?")
colonizar = input();
explorar = exploracao(pais, colonizar)

print("Qual o seu nome? ")
nome = input()
print("Gostaria de ser iluminado? 1 = sim 2 = não ");
escolha = input()

if escolha == 1:
    ilumunar =iluminismo(nome, "ser iluminada")
    print(escolha)

if escolha == 2:
    ilumunar =iluminismo(nome, "não ser iluminada")
    print(escolha)

iluminar= iluminismo(self, __pessoa= None) # type: ignore
iluminar(self.__pessoa)  = input("\nQual é o seu nome? ")


print("O que voê quer pensar? ")
pensando = input()
print("O que você quer imaginar? ")
imaginando = input()
Pensar = Pensamento(pensando, imaginando)

decisão= int(input(("Digite 1 para viver ou 2 para morrer: ")))

if decisão == 1:
    ideia = Ideia("Viver")
    print(decisão)

if decisão == 2:
    ideia = Ideia("Morrer")
    print(decisão)

objetos = [explorar, iluminismo, Pensar, decisão]
for obj in objetos:
    print(obj.executar())
class Jogos:
    def __init__(self, nome_jogo= None, datalan= None, genero= None, tipo= None):
        self.nome_jogo= nome_jogo
        self.datalan= datalan
        self.genero= genero
        self.tipo= tipo
    
    def apresentar(self):
        return f"O nome do jogo é {self.nome_jogo}, e foi lançado em {self.datalan},"

class Tipo(Jogos):
    def __init__(self, nome_jogo= None, datalan= None, genero= None, tipo= None):
        super().__init__(nome_jogo, datalan, genero, tipo)

    def apresentar(self):
        base= super().apresentar()
        return f"{base} O jogo é do tipo {self.tipo}, com o genêro {self.genero}."

class Jogador(Tipo):
    def __init__(self, nome_jogo= None, datalan= None, genero= None, tipo= None, nome_jogador= None, tipo_jogador= None, caracteristica_jogador= None):
        super().__init__(nome_jogo, datalan, genero, tipo)
        self.nome_jogador= nome_jogador
        self.tipo_jogador= tipo_jogador
        self.caracteristica_jogador= caracteristica_jogador

    def apresentar(self):
        return f"O nome do jogador é {self.nome_jogador}, o jogador é do tipo {self.tipo_jogador}, sua caracteristica é {self.caracteristica_jogador}"
    
class Gameplay(Jogador):
    def __init__(self, nome_jogo= None, datalan= None, genero= None, tipo= None, nome_jogador= None, tipo_jogador= None, caracteristica_jogador= None, partida= None):
        super().__init__(nome_jogo, datalan, genero, tipo, nome_jogador, tipo_jogador, caracteristica_jogador)
        self.partida= partida

    def apresentar(self):
        return f"A gameplay foi {self.partida}."
    
#Coleta de dados
print("Qual é seu nome real? ")
nome= input()

print("Em que ano o jogo foi lançado? ")
data_lançamento= input()

print("Qual o genêro do jogo? ")
genero= input()

print("Qual é o tipo de jogo? ")
tipo= input()

print("Qual é o seu nome de jogador? ")
nome_jogador= input()

print("Qual é seu tipo de jogador? ")
tipo_jogador= input()

print("Qual sua caracteristica de jogador? ")
caracteristica_jogador= input()

print("Como foi sua Gameplay? ")
gameplay= input()

#Exibição dos dados coletados
jogo= Jogos(nome, data_lançamento, genero, tipo)
tipo_jogo= Tipo(nome, data_lançamento, genero, tipo)
player= Jogador(nome, data_lançamento, genero, tipo, nome_jogador, tipo_jogador, caracteristica_jogador)
game= Gameplay(nome, data_lançamento, genero, tipo, nome_jogador, tipo_jogador, caracteristica_jogador, gameplay)

print(jogo.apresentar())
print(tipo_jogo.apresentar())
print(player.apresentar())
print(game.apresentar())
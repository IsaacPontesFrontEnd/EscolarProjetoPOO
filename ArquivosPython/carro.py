class Carro:
    def __init__(self, marca, modelo, ano, cor):
        self.marca = marca
        self.modelo = modelo
        self.ano = ano
        self.cor = cor
        self.velocidade = 0

    def acelerar(self, valor):
        self.velocidade += valor
        print(f"{self.modelo} acelerou para {self.velocidade} km/h!")

    def frear(self, valor):
        self.velocidade -= valor
        if self.velocidade < 0:
            self.velocidade = 0
            
        print(f"{self.modelo} reduziu para {self.velocidade} km/h.")
    def detalhes(self):
        return (f"{self.marca} {self.modelo} ({self.ano}) - "
                f"Cor: {self.cor}, Velocidade: {self.velocidade} km/h")

carro1 = Carro("Toyota", "Corolla", 2020, "Preto")
carro2 = Carro("Honda", "Civic", 2019, "Vermelho")

print(carro1.detalhes())
print(carro2.detalhes())
carro1.acelerar(50)
carro2.acelerar(30)
carro1.frear(20)
carro2.frear(15)
print(carro1.detalhes())
print(carro2.detalhes())

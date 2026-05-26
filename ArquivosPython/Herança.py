class Pessoa:
    def __init__(self, nome: str, cpf: str) -> None:
        self.nome = nome
        self.cpf = cpf

    def apresentar(self) -> str:
        return f"Olá, eu sou o {self.nome}, e meu CPF é {self.cpf}"

class Aluno(Pessoa):
    def __init__(self, nome: str, matricula: str, cpf: str) -> None:
        super().__init__(nome, cpf)
        self.matricula = matricula

    def apresentar(self) -> str:
        base= super().apresentar() 
        return f"{base}, eu sou o aluno da EEP Onelio porto, minha matrícula é {self.matricula}."

class Professor(Pessoa):
    def __init__(self, nome: str, cpf: str, matricula: str) -> None:
        super().__init__(nome, cpf)
        self.matricula = matricula

    def apresentar(self) -> str:
        base= super().apresentar() 
        return f"{base}, eu sou o professor da EEP Onelio porto, e minha matricula é {self.matricula}." 
        
# Programa principal
pessoa= Pessoa("José", "A123456789")  
aluno= Aluno("Samuel", "A123", "125.294.184-14")
professor = Professor("Henrique", "754.761.751-22", "A154") 

print(pessoa.apresentar())
print(aluno.apresentar())
print(professor.apresentar())
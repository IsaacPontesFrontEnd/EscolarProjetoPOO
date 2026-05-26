class Pessoa:
    def __init__(self, nome=None, cpf=None):
        self.nome = nome
        self.cpf = cpf

    def apresentar(self) -> str:
        return f"Olá, eu sou o {self.nome} e meu CPF é {self.cpf}."


class Aluno(Pessoa):
    def __init__(self, nome=None, matricula=None, cpf=None):
        super().__init__(nome, cpf)
        self.matricula = matricula

    def apresentar(self) -> str:
        base = super().apresentar()
        return f"{base} \nEu sou o aluno da EEP Onelio porto, minha matrícula é {self.matricula}."

class Professor(Aluno):
    def __init__(self, nome=None, matricula=None, cpf=None, disciplina=None):
        super().__init__(nome, matricula, cpf)
        self.disciplina = disciplina

    def apresentar(self) -> str:
        return f"Olá, eu sou o {self.nome} e meu CPF é {self.cpf}.\nEu sou o professor da EEP Onelio porto e minha matrícula é {self.matricula}."

# Progama principal 
print("Nome da pessoa:")
nome_pessoa = input()
print("CPF da pessoa:")
cpf_pessoa = input()
pessoa = Pessoa(nome_pessoa, cpf_pessoa)

print("Nome do aluno:")
nome_aluno = input()
print("Matrícula do aluno:")
matricula_aluno = input()
print("CPF do aluno:")
cpf_aluno = input()
aluno = Aluno(nome_aluno, matricula_aluno, cpf_aluno)

print("Nome do professor:")
nome_professor = input()
print("Matrícula do professor:")
matricula_professor = input()
print("CPF do professor:")
cpf_professor = input()
print("Disciplina do professor:")
disciplina_professor = input()
professor = Professor(nome_professor, matricula_professor, cpf_professor, disciplina_professor)

print(pessoa.apresentar())
print(aluno.apresentar())
print(professor.apresentar())
def main():
    print("=== Formulário de Notas ===")
    nome = input("Nome: ")
    matricula = input("Número de Matrícula: ")
    serie = input("Série: ")
    turno = input("Turno (Manhã/Tarde/Noite): ")

    notas = []
    for i in range(1, 5):
        while True:
            try:
                nota = float(input(f"Nota {i}º Bimestre: "))
                if 0 <= nota <= 10:
                    notas.append(nota)
                    break
                else:
                    print("Nota deve ser entre 0 e 10. Tente novamente.")
            except ValueError:
                print("Entrada inválida. Digite um número.")

    soma = sum(notas)
    media = soma / 4

    situacao = "Aprovado" if media >= 6 else "Recuperação"

    print("\n=== Resultado ===")
    print(f"Aluno: {nome}")
    print(f"Matrícula: {matricula}")
    print(f"Série: {serie}")
    print(f"Turno: {turno}")
    print(f"Soma das Notas: {soma:.2f}")
    print(f"Média: {media:.2f}")
    print(f"Situação: {situacao}")

if __name__ == "__main__":
    main()
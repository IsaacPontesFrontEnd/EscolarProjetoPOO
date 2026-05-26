import math

MAX_DIGITOS = 1000000
MAX_FATORIAL = 50000
MAX_LINHAS = 1000


def multiplicacao():

    try:
        n = int(input("Digite um valor: "))
        a = int(input("Até quanto quer multiplicar? "))

        if a > MAX_LINHAS:

            digitos_n = len(str(abs(n)))
            digitos_a = len(str(abs(a)))

            digitos_resultado = digitos_n + digitos_a

            if digitos_resultado > MAX_DIGITOS:

                print(f"\nO resultado teria aproximadamente {digitos_resultado} dígitos.")
                print("Número grande demais para multiplicar.")
                return

            print(f"\nA maior multiplicação terá aproximadamente {digitos_resultado} dígitos.")

            print(f"\nLimite máximo de linhas: {MAX_LINHAS}")
            print("Quantidade de operações muito alta.")
            return

        print(f"\nTabuada de multiplicação do {n}:")

        for b in range(1, a + 1):

            resultado = n * b

            print(f"{n} x {b} = {resultado}")

    except ValueError:
        print("Texto não é válido aqui.")

def divisao():

    try:
        n = float(input("Digite um valor: "))
        a = int(input("Até quanto quer dividir? "))

        if a > MAX_LINHAS:

            print(f"\nLimite máximo de linhas: {MAX_LINHAS}")
            print("Quantidade de operações muito alta.")
            return

        print(f"\nDivisão do {n}:")

        for b in range(1, a + 1):

            resultado = n / b

            print(f"{n} / {b} = {resultado}")

    except ValueError:
        print("Texto não é válido aqui.")

    except ZeroDivisionError:
        print("Não é possível dividir por zero.")

def soma():

    try:
        n = float(input("Digite um valor: "))
        a = int(input("Até quanto quer somar? "))

        if a > MAX_LINHAS:

            print(f"\nLimite máximo de linhas: {MAX_LINHAS}")
            print("Quantidade de operações muito alta.")
            return

        print(f"\nSoma do {n}:")

        for b in range(1, a + 1):

            resultado = n + b

            print(f"{n} + {b} = {resultado}")

    except ValueError:
        print("Texto não é válido aqui.")

def potenciacao():

    try:
        base = int(input("Digite a base: "))
        expoente = int(input("Digite o expoente: "))

        if base <= 0:
            print("A base precisa ser maior que zero.")
            return

        digitos = math.floor(expoente * math.log10(base)) + 1

        if digitos > MAX_DIGITOS:

            print(f"\nO resultado teria aproximadamente {digitos} dígitos.")
            print("Número grande demais para calcular.")
            return

        resultado = base ** expoente

        print(f"\n{base} elevado a {expoente} =")
        print(resultado)

    except ValueError:
        print("Texto não é válido aqui.")

def raiz_quadrada():

    try:
        numero = float(input("Digite um número: "))

        if numero < 0:
            print("Não existe raiz quadrada real de número negativo.")
        else:
            resultado = math.sqrt(numero)

            print(f"\nA raiz quadrada de {numero} é {resultado}")

    except ValueError:
        print("Texto não é válido aqui.")

def fatorial():

    try:
        numero = int(input("Digite um número inteiro: "))

        if numero < 0:
            print("Não existe fatorial de número negativo.")
            return

        if numero > MAX_FATORIAL:

            digitos_aprox = math.floor(
                numero * math.log10(numero / math.e)
                + math.log10(2 * math.pi * numero) / 2
            ) + 1

            print(f"\nO resultado teria aproximadamente {digitos_aprox} dígitos.")
            print("Número grande demais para calcular o fatorial.")
            return

        resultado = math.factorial(numero)

        digitos = len(str(resultado))

        print(f"\nO resultado possui {digitos} dígitos.")
        print(f"\n{numero}! =")
        print(resultado)

    except ValueError:
        print("Texto não é válido aqui.")

while True:

    print("\n MENU ")
    print("1 - Multiplicação")
    print("2 - Divisão")
    print("3 - Soma")
    print("4 - Potenciação")
    print("5 - Raiz quadrada")
    print("6 - Fatorial")
    print("7 - Sair")

    opcao = input("Escolha uma opção: ")

    match opcao:

        case "1":
            multiplicacao()

        case "2":
            divisao()

        case "3":
            soma()

        case "4":
            potenciacao()

        case "5":
            raiz_quadrada()

        case "6":
            fatorial()

        case "7":
            print("Saiu.")
            break

        case _:
            print("Opção inválida!")
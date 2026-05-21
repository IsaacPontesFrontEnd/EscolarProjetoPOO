while True:
    print("\n=== MENU ===")
    print("1 - Mostrar tabuada")
    print("2 - Sair")

    opcao = input("Escolha uma opção: ")

    match opcao:

        case "1":

            try:
                n = float(input("Digite um valor: "))
                a = int(input("Até quanto quer multiplicar? "))

                print(f"\nTabuada do {n}:")

                for b in range(1, a + 1):

                    resultado = n * b

                    print(f"{n} x {b} = {resultado}")

            except ValueError:
                print("Texto não é valido aqui.")

        case "2":

            try:
                n = float(input("Digite um valor: "))
                a = int(input("Por quanto quer dividir? "))

                print(f"\nTabuada do {n}:")

                for b in range(1, a + 1):

                    resultado = n / b

                    print(f"{n} x {b} = {resultado}")

            except ValueError:
                print("Texto não é valido aqui.")
            
            
            print("Saiu")
            break

        case _:
            print("Opção inválida!")
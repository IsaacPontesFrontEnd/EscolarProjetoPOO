import secrets
import string
import random

# =========================
# CONFIGURAÇÕES
# =========================

TAMANHO_SENHA = 20
QUANTIDADE_DE_ETAPAS = 10

# Limite absoluto de segurança
TAMANHO_MAXIMO = 100_000

CARACTERES = string.ascii_letters + string.digits + string.punctuation

# 20 dígitos de PI
PI = "31415926535897932384"

# Categorias de símbolos
SIMBOLOS = "@#$%&!*+-="

CARACTERES_ESPECIAIS = "".join(
    c for c in string.punctuation
    if c not in SIMBOLOS
)


# =========================
# FUNÇÕES AUXILIARES
# =========================

def limitar_tamanho(senha):
    """Impede a senha de ultrapassar o limite definido."""
    if len(senha) > TAMANHO_MAXIMO:
        return senha[:TAMANHO_MAXIMO]

    return senha


def dividir_em_tres(senha):
    """Divide a senha em três partes equilibradas."""
    tamanho = len(senha)

    parte1 = tamanho // 3
    parte2 = (tamanho * 2) // 3

    return (
        senha[:parte1],
        senha[parte1:parte2],
        senha[parte2:]
    )


# =========================
# GERADORES DE INVERSÃO
# =========================

def inversao_total(senha):
    """Inverte a senha inteira."""
    return senha[::-1]


def inversao_metades(senha):
    """Divide a senha em duas e inverte cada metade."""
    meio = len(senha) // 2

    parte1 = senha[:meio]
    parte2 = senha[meio:]

    return parte1[::-1] + parte2[::-1]


def inversao_extremidade(senha):
    """Inverte aleatoriamente o começo ou o final."""
    if len(senha) < 2:
        return senha

    meio = len(senha) // 2

    inicio = senha[:meio]
    final = senha[meio:]

    if secrets.randbelow(2) == 0:
        inicio = inicio[::-1]
    else:
        final = final[::-1]

    return inicio + final


# =========================
# GERADORES DE LETRAS
# =========================

def gerador_letras(senha):
    """Troca algumas letras."""
    senha = list(senha)

    for i in range(len(senha)):
        if senha[i].isalpha() and secrets.randbelow(2):
            senha[i] = secrets.choice(string.ascii_letters)

    return ''.join(senha)


def embaralhar_letras(senha):
    """Embaralha somente as letras."""
    caracteres = list(senha)

    indices = [
        i for i, c in enumerate(caracteres)
        if c.isalpha()
    ]

    valores = [caracteres[i] for i in indices]

    random.shuffle(valores)

    for i, valor in zip(indices, valores):
        caracteres[i] = valor

    return ''.join(caracteres)


# =========================
# GERADORES DE NÚMEROS
# =========================

def gerador_numeros(senha):
    """Troca alguns números."""
    senha = list(senha)

    for i in range(len(senha)):
        if senha[i].isdigit() and secrets.randbelow(2):
            senha[i] = secrets.choice(string.digits)

    return ''.join(senha)


def embaralhar_numeros(senha):
    """Embaralha somente os números."""
    caracteres = list(senha)

    indices = [
        i for i, c in enumerate(caracteres)
        if c.isdigit()
    ]

    valores = [caracteres[i] for i in indices]

    random.shuffle(valores)

    for i, valor in zip(indices, valores):
        caracteres[i] = valor

    return ''.join(caracteres)


# =========================
# GERADORES DE SÍMBOLOS
# =========================

def gerador_simbolos(senha):
    """Troca alguns símbolos."""
    senha = list(senha)

    for i in range(len(senha)):
        if senha[i] in SIMBOLOS and secrets.randbelow(2):
            senha[i] = secrets.choice(SIMBOLOS)

    return ''.join(senha)


def embaralhar_simbolos(senha):
    """Embaralha somente os símbolos."""
    caracteres = list(senha)

    indices = [
        i for i, c in enumerate(caracteres)
        if c in SIMBOLOS
    ]

    valores = [caracteres[i] for i in indices]

    random.shuffle(valores)

    for i, valor in zip(indices, valores):
        caracteres[i] = valor

    return ''.join(caracteres)


# =========================
# GERADORES DE ESPECIAIS
# =========================

def gerador_especiais(senha):
    """Troca alguns caracteres especiais."""
    senha = list(senha)

    for i in range(len(senha)):
        if senha[i] in CARACTERES_ESPECIAIS and secrets.randbelow(2):
            senha[i] = secrets.choice(CARACTERES_ESPECIAIS)

    return ''.join(senha)


def embaralhar_especiais(senha):
    """Embaralha somente os caracteres especiais."""
    caracteres = list(senha)

    indices = [
        i for i, c in enumerate(caracteres)
        if c in CARACTERES_ESPECIAIS
    ]

    valores = [caracteres[i] for i in indices]

    random.shuffle(valores)

    for i, valor in zip(indices, valores):
        caracteres[i] = valor

    return ''.join(caracteres)


# =========================
# TROCA GERAL
# =========================

def trocar_todos_caracteres(senha):
    """Troca todos os caracteres por outros da mesma categoria."""
    resultado = []

    for caractere in senha:

        if caractere.isupper():
            resultado.append(
                secrets.choice(string.ascii_uppercase)
            )

        elif caractere.islower():
            resultado.append(
                secrets.choice(string.ascii_lowercase)
            )

        elif caractere.isdigit():
            resultado.append(
                secrets.choice(string.digits)
            )

        elif caractere in SIMBOLOS:
            resultado.append(
                secrets.choice(SIMBOLOS)
            )

        else:
            resultado.append(
                secrets.choice(CARACTERES_ESPECIAIS)
            )

    return ''.join(resultado)


# =========================
# BLOCO DE TAMANHO
# =========================

def bloco_tamanho(senha):
    """
    Bloco obrigatório:

    1. Aumenta ×20
    2. Divide pela metade
    3. Divide em 3 partes
    4. Reduz cada parte pela metade
    5. Junta novamente
    6. Faz uma redução final para impedir
       crescimento permanente da senha.
    """

    tamanho_original = len(senha)

    # -------------------------
    # ×20
    # -------------------------

    senha = senha * 20

    senha = limitar_tamanho(senha)

    # -------------------------
    # ÷2
    # -------------------------

    metade = len(senha) // 2
    senha = senha[:metade]

    # -------------------------
    # Divide em 3
    # -------------------------

    parte1, parte2, parte3 = dividir_em_tres(senha)

    # Cada parte ÷2
    parte1 = parte1[:len(parte1) // 2]
    parte2 = parte2[:len(parte2) // 2]
    parte3 = parte3[:len(parte3) // 2]

    senha = parte1 + parte2 + parte3

    # -------------------------
    # Controle de obesidade
    # -------------------------
    #
    # O processo acima ainda deixa
    # aproximadamente 5x o tamanho original.
    #
    # Aqui limitamos o resultado ao
    # tamanho original.
    # -------------------------

    if len(senha) > tamanho_original:
        senha = senha[:tamanho_original]

    return senha


# =========================
# GERADOR ESPECIAL DE PI
# =========================

def gerador_pi(senha):
    """
    Usa os 20 dígitos de PI.

    A senha é dividida em 3 partes.
    Cada parte é reduzida pela metade.
    Depois elas são reunidas.

    Os números da senha são substituídos
    pelos dígitos de PI modificados.
    """

    # -------------------------
    # Troca os dígitos de PI
    # -------------------------

    pi_modificado = ''.join(
        secrets.choice(string.digits)
        for _ in PI
    )

    # -------------------------
    # Divide a senha em 3
    # -------------------------

    parte1, parte2, parte3 = dividir_em_tres(senha)

    # -------------------------
    # Cada parte ÷2
    # -------------------------

    parte1 = parte1[:len(parte1) // 2]
    parte2 = parte2[:len(parte2) // 2]
    parte3 = parte3[:len(parte3) // 2]

    senha = parte1 + parte2 + parte3

    # -------------------------
    # Substitui números usando PI
    # -------------------------

    resultado = []
    indice_pi = 0

    for caractere in senha:

        if caractere.isdigit():

            resultado.append(
                pi_modificado[indice_pi % len(pi_modificado)]
            )

            indice_pi += 1

        else:
            resultado.append(caractere)

    return ''.join(resultado)


# =========================
# LISTA DE GERADORES
# =========================

GERADORES = [

    # INVERSÃO
    ("Inversão total", inversao_total),
    ("Inversão de metades", inversao_metades),
    ("Inversão de extremidade", inversao_extremidade),

    # LETRAS
    ("Letras", gerador_letras),
    ("Embaralhar letras", embaralhar_letras),

    # NÚMEROS
    ("Números", gerador_numeros),
    ("Embaralhar números", embaralhar_numeros),

    # SÍMBOLOS
    ("Símbolos", gerador_simbolos),
    ("Embaralhar símbolos", embaralhar_simbolos),

    # ESPECIAIS
    ("Caracteres especiais", gerador_especiais),
    ("Embaralhar especiais", embaralhar_especiais),

    # TROCA GERAL
    ("Troca geral", trocar_todos_caracteres),

    # TAMANHO
    ("Bloco de tamanho", bloco_tamanho)
]


# =========================
# SORTEADOR
# =========================

def sortear_gerador(ultimo_gerador, pi_usado, tamanho_usado):

    disponiveis = [
        gerador
        for gerador in GERADORES
        if gerador[0] != ultimo_gerador
    ]

    # Remove o bloco de tamanho depois
    # que ele já foi utilizado.
    if tamanho_usado:
        disponiveis = [
            gerador
            for gerador in disponiveis
            if gerador[0] != "Bloco de tamanho"
        ]

    # PI também é de uso único.
    if not pi_usado:
        disponiveis.append(
            ("PI", gerador_pi)
        )

    return secrets.choice(disponiveis)


# =========================
# SENHA INICIAL
# =========================

senha = ''.join(
    secrets.choice(CARACTERES)
    for _ in range(TAMANHO_SENHA)
)

print("🔐 Senha inicial:")
print(senha)


# =========================
# PROCESSAMENTO
# =========================

ultimo_gerador = None

pi_usado = False
tamanho_usado = False

etapa = 0

while etapa < QUANTIDADE_DE_ETAPAS:

    nome, gerador = sortear_gerador(
        ultimo_gerador,
        pi_usado,
        tamanho_usado
    )

    senha = gerador(senha)

    senha = limitar_tamanho(senha)

    # -------------------------
    # PI
    # -------------------------

    if nome == "PI":

        pi_usado = True

        # PI reinicia o fluxo.
        ultimo_gerador = None

    # -------------------------
    # BLOCO DE TAMANHO
    # -------------------------

    elif nome == "Bloco de tamanho":

        tamanho_usado = True
        ultimo_gerador = nome

    else:

        ultimo_gerador = nome

    etapa += 1


# =========================
# SENHA FINAL
# =========================

print("\n🔒 Senha final:")
print(senha)
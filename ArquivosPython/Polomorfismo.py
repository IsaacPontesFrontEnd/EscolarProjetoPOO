class exploração:
    def __init__(self, colonizar= None, ocupar= None):
        self.colonizar= colonizar
        self.ocupar= ocupar

    def expor(self) -> str:
        return f"\nA exploração estar querendo {self.colonizar}(colonizar sim/não) o mundo, estar {self.ocupar}"

class iluminismo(exploração):
    def __init__(self, iluninar= None, desilumizar= None):
        self.iluninar= iluninar
        self.desilumizar= desilumizar

    def executar(self):
     return f"\nAs pessoas estão {self.iluninar} a ser iluminadas."

def fazer_executar(obj):
    obj.executar()

#p = Pato
#h = pessoa

#fazer_quack(p)
#fazer_quack(h)


class Pensamento(iluminismo):
    def __init__(self, pensar= None, imaginar= None, duvidar= None):
        self.pensar= pensar
        self.imaginar= imaginar
        self.duvidar= duvidar
    def executar(self):
        return f"Estou a {self.pensar} sobre mminha {self.imaginar}."

class Ideia(Pensamento):
    def __init__(self, viver= None, morrer= None):
        self.viver= viver
        self.morrer= morrer

    def executar(self):
        return f"Eu quero viver? {self.viver}. Eu quero morrer? {self.morrer}"

objetos = [exploração(), iluminismo(), Pensamento(), Ideia()]
for obj in objetos:
    obj.executar()

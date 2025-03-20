# Definicija bazne klase Životinja s dodatnim metodama
class Životinja:
    def zvuk(self):
        # Ova metoda mora biti implementirana u podklasama
        raise NotImplementedError("Metoda 'zvuk' mora biti implementirana u podklasama")
    
    def kretanje(self):
        # Osnovna metoda za kretanje; podklase mogu override-ati po potrebi
        return "Životinja se kreće"
    
    def spavanje(self):
        # Osnovna metoda za spavanje; podklase mogu override-ati po potrebi
        return "Životinja spava"
    
    def __str__(self):
        # Vraća osnovni opis životinje koristeći naziv klase
        return f"Životinja: {self.__class__.__name__}"

# Podklasa Pas nasljeđuje klasu Životinja
class Pas(Životinja):
    def zvuk(self):
        # Implementacija metode zvuk specifična za klasu Pas
        return "Vau vau"
    
    def kretanje(self):
        # Opcionalno override metode kretanje za pse
        return "Pas trči"

# Podklasa Mačka nasljeđuje klasu Životinja
class Mačka(Životinja):
    def zvuk(self):
        # Implementacija metode zvuk specifična za klasu Mačka
        return "Mjau"
    
    def kretanje(self):
        # Opcionalno override metode kretanje za mačke
        return "Mačka se šulja"

# Glavni dio programa
if __name__ == "__main__":
    # Kreiranje instanci pas i mačka
    pas = Pas()
    mačka = Mačka()
    
    # Ispis općih informacija o životinjama (poziva __str__ metodu)
    print(pas)       # Ispisuje: Životinja: Pas
    print(mačka)     # Ispisuje: Životinja: Mačka
    
    # Ispis specifičnih zvukova
    print("Pas kaže:", pas.zvuk())       # Ispisuje: Vau vau
    print("Mačka kaže:", mačka.zvuk())   # Ispisuje: Mjau
    
    # Ispis načina kretanja
    print("Pas se kreće:", pas.kretanje())     # Ispisuje: Pas trči
    print("Mačka se kreće:", mačka.kretanje()) # Ispisuje: Mačka se šulja
    
    # Ispis metoda spavanje (koriste implementaciju iz bazne klase)
    print("Pas spava:", pas.spavanje())        # Ispisuje: Životinja spava
    print("Mačka spava:", mačka.spavanje())    # Ispisuje: Životinja spava

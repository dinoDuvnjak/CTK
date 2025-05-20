class ClassTest:
    # Definirane unutar klase s ključnom riječi def i prvim parametrom self.
    # Pozivaju se na instanci objekta (npr. objekt.instance_metoda()).
    def instance_method(self):
        print(f'Called instance_method of {self}')

    # Dekorirane s @classmethod i primaju cls kao prvi parametar.
    # Mogu se pozvati direktno na klasi bez kreiranja instance (npr. Klasa.class_metoda()).
    # Često se koriste kao "factory" metode za kreiranje novih objekata na temelju unaprijed definiranih logika.
    @classmethod 
    def class_method(cls):
        print(f'Called class_method of {cls}')

    # Dekorirane s @staticmethod i ne primaju automatski nijedan parametar.
    # Pozivaju se s notacijom točke, slično kao ostale metode (npr. Klasa.static_metoda()).
    # Idealne su za funkcije koje logički pripadaju klasi, ali ne trebaju pristupiti niti instanci niti klasi.    
    @staticmethod
    def static_method():
        print('Called static_method')


# class_method() i static_method() su metode klase, a ne instance.
# Zato ih možemo pozvati direktno na klasi.
ClassTest.class_method()
ClassTest.static_method()

# test = ClassTest()
# test.instance_method()
# ClassTest.instance_method(test)



# Definiramo klasu Book koja predstavlja knjigu
class Book:
    # Definiramo tuple TYPES koji sadrži moguće tipove knjiga
    TYPES = ("hardcover", "paperback")

    def __init__(self, name, book_type, weight):
        """
        Konstruktor (inicijalizator) klase Book.
        name: naziv knjige
        book_type: vrsta knjige (hardcover ili paperback)
        weight: težina knjige u gramima
        """
        self.name = name
        self.book_type = book_type
        self.weight = weight

    def __repr__(self):
        """
        Metoda koja vraća string reprezentaciju objekta.
        Ovdje se prikazuju naziv, vrsta i težina knjige.
        """
        return f"Book {self.name}, {self.book_type}, weighing {self.weight}g"

    @classmethod
    def hardcover(cls, name, page_weight):
        """
        Class method koji stvara Book objekt s tipom 'hardcover'.
        Dodajemo 100g na težinu kako bismo simulirali dodatnu težinu korica.

        Zašto class method?
        - Omogućuje nam da kreiramo instancu klase Book bez izravnog pozivanja
          konstruktora s preciznim argumentima. 
        - Class method koristi klasu (cls) umjesto instance (self), što nam
          olakšava definiranje alternativnih načina za stvaranje objekata.
        """
        return cls(name, cls.TYPES[0], page_weight + 100)

    @classmethod
    def paperback(cls, name, page_weight):
        """
        Class method koji stvara Book objekt s tipom 'paperback'.
        U ovom slučaju ne dodajemo dodatnu težinu jer je meki uvez lakši.

        Zašto class method?
        - Kao i hardcover, ovo je alternativni konstruktor koji koristi klasu.
        - Možemo imati više različitih načina za kreiranje objekata, npr.
          hardcover i paperback, a sve unutar iste klase.
        """
        return cls(name, cls.TYPES[1], page_weight)


# Primjeri korištenja:
book = Book.hardcover("Harry Potter", 1500)
print(book)

book2 = Book.paperback("Python 101", 600)
print(book2)


class SomeClass:
    def __init__(self, name, number):
        self.name = name
        self.number = 0

    def instanceMethod(self):
        print(f'Called instance_method of {self}')    

    @classmethod
    def classMethod(cls):
        print(f'Called class_method of {cls}')    

    @staticmethod
    def staticMethod():
        print('Called static_method')    

#uvijek treba instancirati klasu ili na ovaj ili na drugi nacin
nekaKlasa = SomeClass("Test", 5)
nekaKlasa.instanceMethod()
SomeClass.instanceMethod(nekaKlasa)        

# classMethod() i staticMethod() su metode klase, a ne instance.
SomeClass.classMethod()
#nekaKlasa.classMethod() # ovo ne radi

SomeClass.staticMethod()
#ovo radi ali staticka metoda nije vezana za instancu
nekaKlasa.staticMethod()
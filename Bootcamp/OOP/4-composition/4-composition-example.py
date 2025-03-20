# Definicija klase Book (Knjiga)
class Book:
    def __init__(self, name):
        self.name = name  # Ime knjige

    def __str__(self):
        # Vraća string koji predstavlja knjigu
        return f"Book: {self.name}"

# Definicija klase Bookshelf (Polica) koristeći kompoziciju
class Bookshelf:
    def __init__(self, *books):
        # *books omogućava unos varijabilnog broja knjiga (objekata klase Book)
        self.books = books  # Spremi sve predane knjige u atribut books

    def __str__(self):
        # Vraća string koji prikazuje koliko knjiga se nalazi na polici
        return f"Bookshelf with {len(self.books)} books"

# Primjer korištenja kompozicije
if __name__ == "__main__":
    # Kreiraj nekoliko objekata klase Book
    book1 = Book("Harry Potter")
    book2 = Book("Python 101")
    
    # Kreiraj objekt Bookshelf i proslijedi mu kreirane knjige
    shelf = Bookshelf(book1, book2)
    
    # Ispiši sadržaj police
    print(shelf)  # Očekivani ispis: "Bookshelf with 2 books"
    
    # Ispis pojedinačne knjige
    print(book1)  # Očekivani ispis: "Book: Harry Potter"

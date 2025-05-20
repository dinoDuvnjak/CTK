#pogresno trbamo ih nekako drugacije spojiti

# class Book<Bookshelf>:
#     # Definicija klase Book (Knjiga)
#     # 
#     def __init__(self, name):
#         self.name = name  # Ime knjige

#     def __str__(self):
#         # Vraća string koji predstavlja knjigu
#         return f"Book: {self.name}"




# Definicija klase Book (Knjiga)
# 
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
#if __name__ == "__main__":
# Kreiraj nekoliko objekata klase Book
book1 = Book("Harry Potter")
book2 = Book("Python 101")

# Kreiraj objekt Bookshelf i proslijedi mu kreirane knjige
shelf = Bookshelf(book1, book2)

# Ispiši sadržaj police
print(shelf)  # Očekivani ispis: "Bookshelf with 2 books"

# Ispis pojedinačne knjige
print(book1)  # Očekivani ispis: "Book: Harry Potter"






# Daj mi jos primjera kompozicije i kad se koristi
class Item:
    def __init__(self, name: str, price: float):
        # Konstruktor: postavlja naziv i cijenu proizvoda
        self.name = name
        self.price = price

    def __str__(self):
        # Pretvara objekt u čitljiv string, npr. "Laptop ($1200.00)"
        return f"{self.name} (${self.price:.2f})"


class Inventory:
    def __init__(self):
        # Inventory drži listu Item objekata
        self._items: list[Item] = []

    def add(self, item: Item):
        # Dodaje novi Item u inventar
        self._items.append(item)

    def total_value(self) -> float:
        # Računa zbroj cijena svih predmeta
        return sum(item.price for item in self._items)

    def __str__(self):
        # Vraća string s popisom svih predmeta, svaki u novom retku
        lines = [str(item) for item in self._items]
        return "\n".join(lines)


class Store:
    def __init__(self, name: str):
        # Konstruktor za trgovinu: postavlja ime i stvara prazan Inventory
        self.name = name
        # OVDE JE KOMPOZICIJA: Store **ima** Inventory
        self.inventory = Inventory()

    def add_item(self, name: str, price: float):
        # Kreira Item i delegira dodavanje Inventory-ju
        item = Item(name, price)
        self.inventory.add(item)

    def stock_price(self) -> float:
        # Vraća ukupnu vrijednost zaliha tražeći Inventory.total_value()
        return self.inventory.total_value()

    def __str__(self):
        # Prikaz trgovine: ime, popis artikala i ukupan zbroj
        return (
            f"Store: {self.name}\n"
            f"Items:\n{self.inventory}\n"
            f"Total stock value: ${self.stock_price():.2f}"
        )


# Primjer korištenja:
if __name__ == "__main__":
    store = Store("Tech Shop")
    # Dodajemo par proizvoda:
    store.add_item("Laptop", 1200.00)
    store.add_item("Mouse", 25.50)
    store.add_item("Keyboard", 45.00)

    # Print će pozvati Store.__str__ i ispisati sve detalje:
    print(store)










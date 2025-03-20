import datetime

# Klasa Book: predstavlja knjigu s osnovnim informacijama
class Book:
    def __init__(self, book_id, title, author):
        self.book_id = book_id       # Jedinstveni identifikator knjige
        self.title = title           # Naslov knjige
        self.author = author         # Autor knjige
        self.available = True        # Status dostupnosti knjige (True = dostupna)

    def __str__(self):
        status = "dostupna" if self.available else "rezervirana"
        return f"Knjiga(ID: {self.book_id}, Naslov: '{self.title}', Autor: {self.author}, Status: {status})"


# Klasa Member: predstavlja člana knjižnice
class Member:
    def __init__(self, member_id, name):
        self.member_id = member_id   # Jedinstveni identifikator člana
        self.name = name             # Ime člana

    def __str__(self):
        return f"Član(ID: {self.member_id}, Ime: {self.name})"


# Klasa Reservation: predstavlja rezervaciju knjige od strane člana
class Reservation:
    def __init__(self, book, member):
        self.book = book                        # Referenca na objekt klase Book
        self.member = member                    # Referenca na objekt klase Member
        self.date = datetime.date.today()       # Datum rezervacije (danasnji datum)

    def __str__(self):
        return (f"Rezervacija: {self.book.title} rezervirao/la {self.member.name} "
                f"na datum {self.date}")


# Klasa Library: predstavlja knjižnicu koja sadrži knjige, članove i rezervacije
class Library:
    def __init__(self, name):
        self.name = name
        self.books = []           # Lista knjiga u knjižnici
        self.members = []         # Lista članova knjižnice
        self.reservations = []    # Lista rezervacija

    def add_book(self, book):
        self.books.append(book)
        print(f"Dodana je {book}")

    def add_member(self, member):
        self.members.append(member)
        print(f"Dodan je {member}")

    def reserve_book(self, book_id, member_id):
        # Pronađi knjigu prema book_id
        book = next((b for b in self.books if b.book_id == book_id), None)
        if book is None:
            print("Knjiga nije pronađena.")
            return
        if not book.available:
            print("Knjiga nije dostupna za rezervaciju.")
            return

        # Pronađi člana prema member_id
        member = next((m for m in self.members if m.member_id == member_id), None)
        if member is None:
            print("Član nije pronađen.")
            return

        # Kreiraj rezervaciju i ažuriraj status knjige
        reservation = Reservation(book, member)
        self.reservations.append(reservation)
        book.available = False
        print(f"Rezervirana je knjiga '{book.title}' za člana {member.name}.")

    def show_books(self):
        print(f"\nKnjige u knjižnici '{self.name}':")
        for book in self.books:
            print(book)

    def show_reservations(self):
        print(f"\nRezervacije u knjižnici '{self.name}':")
        for reservation in self.reservations:
            print(reservation)


# Glavni dio programa
if __name__ == "__main__":
    # Kreiraj knjižnicu
    library = Library("Centralna knjižnica")

    # Dodaj knjige
    book1 = Book(1, "1984", "George Orwell")
    book2 = Book(2, "Lovac u žitu", "J.D. Salinger")
    book3 = Book(3, "Mali princ", "Antoine de Saint-Exupéry")
    library.add_book(book1)
    library.add_book(book2)
    library.add_book(book3)

    # Dodaj članove
    member1 = Member(1, "Ivan Horvat")
    member2 = Member(2, "Ana Kovač")
    library.add_member(member1)
    library.add_member(member2)

    # Prikaži sve knjige
    library.show_books()

    # Rezerviraj knjigu (npr. knjiga s ID 2 za člana s ID 1)
    library.reserve_book(2, 1)

    # Prikaži rezervacije
    library.show_reservations()

    # Prikaži ažurirani popis knjiga
    library.show_books()

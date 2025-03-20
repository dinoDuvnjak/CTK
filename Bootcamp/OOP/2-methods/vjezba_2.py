class Store:
    def __init__(self, name):
        """
        Konstruktor (inicijalizator) za klasu Store.
        Parametar 'name' predstavlja naziv trgovine.
        """
        self.name = name
        self.items = []

    def add_item(self, name, price):
        """
        Dodaje stavku (proizvod) u trgovinu.
        'name' je naziv proizvoda, a 'price' cijena proizvoda.
        """
        self.items.append({"name": name, "price": price})

    def stock_price(self):
        """
        Vraća ukupnu cijenu svih stavki (proizvoda) u trgovini.
        """
        return sum(item["price"] for item in self.items)

    @staticmethod
    def franchise(store):
        """
        Vraća novu instancu klase Store, s nazivom koji je jednak
        nazivu postojeće trgovine + " - franchise".
        """
        return Store(store.name + " - franchise")

    @staticmethod
    def store_details(store):
        """
        Vraća string s detaljima o trgovini u formatu:
        "<naziv_trgovine>, total stock price: X"
        gdje je X ukupan zbroj cijena (stock_price).
        Koristimo int() zaokruživanje na cijeli broj.
        """
        return f"{store.name}, total stock price: {int(store.stock_price())}"


# Primjer korištenja:
store = Store("Test")
store2 = Store("Amazon")
store2.add_item("Keyboard", 160)

print(Store.franchise(store))   # Ispis: <__main__.Store object at ...> s nazivom "Test - franchise"
print(Store.franchise(store2))  # Ispis: <__main__.Store object at ...> s nazivom "Amazon - franchise"

print(Store.store_details(store))   # "Test, total stock price: 0"
print(Store.store_details(store2))  # "Amazon, total stock price: 160"

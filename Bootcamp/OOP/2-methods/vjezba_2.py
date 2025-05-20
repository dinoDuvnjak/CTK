class Store:
    def __init__(self, name):
        self.name = name
        self.items = []

    def add_item(self, name, price):
        """
        Dodaje stavku u trgovinu.
        """
        self.items.append({'name': name, 'price': price})

    def stock_price(self):
        """
        Vraća ukupnu cijenu svih stavki u trgovini.
        """
        return sum(item['price'] for item in self.items)

    def __str__(self):
        """
        Vraća opis objekta Store u formatu:
        "Store: {name}, Items: {count}, Total value: {value:.2f}"
        """
        return (f"Store: {self.name}, Items: {len(self.items)}, "
                f"Total value: {self.stock_price():.2f}")

    @staticmethod
    def franchise(store):
        """
        Vraća novu instancu Store s nazivom
        existing_name + " - Franchise".
        """
        return Store(store.name + " - Franchise")

    @staticmethod
    def compare_value(store1, store2):
        """
        Vraća naziv trgovine s većom ukupnom vrijednošću zaliha.
        """
        if store1.stock_price() >= store2.stock_price():
            return store1.name
        return store2.name

    @classmethod
    def from_year(cls, year):
        """
        Vraća Store kojemu je naziv string godine.
        """
        return cls(str(year))

    @classmethod
    def from_item_list(cls, items_list):
        """
        items_list je lista tupleova (naziv, cijena).
        Vraća instancu Store s tim stavkama.
        Naziv trgovine je "Custom Store".
        """
        store = cls("Custom Store")
        for name, price in items_list:
            store.add_item(name, price)
        return store

# Primjer korištenja:
if __name__ == "__main__":
    store = Store('JYSK')
    store.add_item('Stolica', 150)
    store.add_item('Stol', 200)
    print(store)  # Store: JYSK, Items: 2, Total value: 350.00

    # Franchise example
    fr = Store.franchise(store)
    print(fr)    # Store: JYSK - Franchise, Items: 0, Total value: 0.00

    # Compare value
    store2 = Store('IKEA')
    store2.add_item('Lampa', 100)
    print(Store.compare_value(store, store2))  # JYSK

    # From year
    s_year = Store.from_year(1995)
    print(s_year)  # Store: 1995, Items: 0, Total value: 0.00

    # From item list
    items = [('Book', 20), ('Pen', 5)]
    s_custom = Store.from_item_list(items)
    print(s_custom)  # Store: Custom Store, Items: 2, Total value: 25.00

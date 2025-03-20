class Store:
    def __init__(self, name):
        self.name = name
        self.items = []
    
    def add_item(self, name, price):
        self.items.append({'name': name, 'price': price})
        return self.items

    def stock_price(self):
        return sum([item['price'] for item in self.items])
    
store = Store('JYSK')
store.add_item('Stolica', 150)
store.add_item('Stol', 200)
print(store.stock_price())    

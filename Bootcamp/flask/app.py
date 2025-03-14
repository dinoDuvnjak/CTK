from flask import Flask, request
app = Flask(__name__)


stores = [
    {
        'name': 'Brodokomerc',   # ime trgovine
        'items': [                       # lista artikala u trgovini       
            {
                'name': 'Stol',        # ime artikla
                'price': 15.99            # cijena artikla
            }
        ]
    }    
]

@app.get('/stores') # URL http://127.0.0.1:5000/stores
def get_stores():
    return {'stores': stores} # 'stores' je lista trgovina s podacima




@app.post('/store') # URL http://127.0.0.1:5000/store
def create_store():
    request_data = request.get_json() # JSON se pretvara u Python dictionary koristeći request.get_json()
    new_store = {
        'name': request_data['name'], # ime trgovine
        'items': []                   # prazna lista artikala
    }
    stores.append(new_store) # dodaj novu trgovinu u listu trgovina
    return new_store, 201 # vrati novu trgovinu i status 201 (Created)


@app.post('/store/<string:name>/item') 
def create_item(name): 
    request_data = request.get_json() # JSON se pretvara u Python dictionary koristeći request.get_json()
    for store in stores: # prolazi kroz sve trgovine
        if store['name'] == name: # ako je ime trgovine jednako imenu trgovine u listi trgovina
            new_item = {
                'name': request_data['name'],
                'price': request_data['price']
            }
            store['items'].append(new_item) # dodaj novi artikal u listu artikala trgovine
            return new_item, 201 # vrati novi artikal i status 201 (Created)
    return {'message': 'Store not found'}, 404 # ako trgovina nije pronađena, vrati poruku i status 404 (Not Found)


@app.get('/store/<string:name>')
def get_store(name): # funkcija koja vraća trgovinu s artiklima
    for store in stores:
        if store['name'] == name: # ako je ime trgovine jednako imenu trgovine u listi trgovina
            return store # vrati trgovinu
    return {'message': 'Store not found'}, 404 # ako trgovina nije pronađena, vrati poruku i status 404 (Not Found)

@app.get('/store/<string:name>/item')
def get_store_items(name): # funkcija koja vraća artikle trgovine
    for store in stores:
        print(store)
        if store['name'] == name: # ako je ime trgovine jednako imenu trgovine u listi trgovina
            return {'items': store['items']} # vrati artikle trgovine
    return {'message': 'Store not found'}, 404 # ako trgovina nije pronađena, vrati poruku i status 404 (Not Found)



from flask import Flask, request

app = Flask(__name__)

# LEKCIJA 1 - first endpoint #################
stores = [
    {
        "name": "Radnja",
        "items": [
            {
                "name": "kondom",
                "price": 15.99
            }
        ]
    }
]

@app.get("/stores")
def get_stores():
    return {"stores": stores}


# LEKCIJA 2 - first endpoint #################
@app.post("/store")
def create_store():
    # pass # this will return 500 error we don't return anything
    # return {"message": "Store created successfully"}, 200 #mozemo i ovako
    request_data = request.get_json()  # ovako ono sto smo poslali u body requesta pretvara u python dictonary
    new_store = {
        "name": request_data["name"],
        "items": []
    }
    stores.append(new_store)
    return new_store, 201  # 201 Created status code



# LEKCIJA 3 - add item to the store #################
@app.post("/store/<string:name>/item")
def create_item_in_store(name):
    request_data = request.get_json()
    for store in stores:
        if store["name"] == name:
            new_item = {
                "name": request_data["name"],
                "price": request_data["price"]
            }
            store["items"].append(new_item)
            return new_item, 201
    return {"message": "Store not found"}, 404


# LEKCIJA 4 - get items store by name #################
@app.get("/store/<string:name>")
def get_items_in_store(name):
    for store in stores:
        if store["name"] == name:
            return {"items": store["items"]} # uvijek je dobro da vratimo objekat jel lako dodamo nove atribute
    return {"message": "Store not found"}, 404
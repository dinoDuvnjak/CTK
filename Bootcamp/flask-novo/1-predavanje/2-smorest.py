import uuid
from flask import Flask, request, jsonify
from
from db import stores, items  # dicts keyed by UUID strings

app = Flask(__name__)

# stores i items su dics sada jel sa listama je puno teze raditi
#npr stores = {
#     "<uuid>": {"id": "<uuid>", "name": "Store Name", "items": []} 
# }
#clana nalazimo po id-u, a ne po imenu vrlo lako, to nam omogucava
#store = stores[1]


# --------------------------
# STORE / ITEM ENDPOINTS
# --------------------------

@app.get("/item/<string:item_id>")
def get_item(item_id):
    try:
        return jsonify(items[item_id]) # jsonify pretvara dict u JSON format
    except KeyError:
        return jsonify({"message": "Item not found"}), 404 #ako radimo ovako nece se pojaviti u Swaggeru, moramo koristiti jsonify


@app.post("/item")
def create_item():
    item_data = request.get_json()
    store_id = item_data.get("store_id")
    if store_id not in stores:
        return jsonify({"message": "Store not found"}), 404

    item_id = uuid.uuid4().hex
    item = {
        "id": item_id,
        "name": item_data.get("name"),
        "price": item_data.get("price"),
        "store_id": store_id
    }
    items[item_id] = item

    return jsonify(item), 201


@app.get("/items")
def get_all_items():
    return jsonify({"items": list(items.values())})


@app.get("/store/<string:store_id>")
def get_store(store_id):
    try:
        return jsonify(stores[store_id])
    except KeyError:
        return jsonify({"message": "Store not found"}), 404


@app.post("/store")
def create_store():
    store_data = request.get_json()
    store_id = uuid.uuid4().hex
    store = {
        "id": store_id,
        "name": store_data.get("name"),
        "items": []
    }
    stores[store_id] = store

    return jsonify(store), 201


@app.get("/stores")
def get_stores():
    return jsonify({"stores": list(stores.values())})
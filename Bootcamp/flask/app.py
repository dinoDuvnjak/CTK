from flask import Flask, request
from db import stores, items
import uuid
app = Flask(__name__)


@app.get('/stores') # URL http://127.0.0.1:5000/stores
def get_stores():
    return {'stores': list(stores.values())} # 'stores' je lista trgovina s podacima

@app.get('/store/<string:store_id>')
def get_store(store_id):
    try:
        return stores[store_id]
    except KeyError:
        return {'message': 'Store not found'}, 404


# Create a store using a unique ID : expects name in the JSON payload
@app.post('/store')
def create_store():
    request_data = request.get_json()  # Convert JSON payload to a Python dictionary
    store_id = uuid.uuid4().hex         # Generate a unique ID for the store
    new_store = {
        'store_id': store_id,
        'name': request_data['name']
    }
    stores[store_id] = new_store         # Save the new store in the stores dictionary
    return new_store, 201                # Return the new store and status 201 (Created)

# Create an item; expects store_id in the JSON payload
@app.post('/item')
def create_item():
    request_data = request.get_json()  # Convert JSON payload to a Python dictionary
    store_id = request_data.get('store_id')
    if store_id not in stores:
        return {'message': 'Store not found'}, 404
    item_id = uuid.uuid4().hex          # Generate a unique ID for the item
    new_item = {
        'id': item_id,
        'name': request_data['name'],
        'price': request_data['price'],
        'store_id': store_id            # Associate the item with the store
    }
    items[item_id] = new_item           # Save the new item in the items dictionary
    return new_item, 201                # Return the new item and status 201 (Created)

# Get all items for a specific store using its unique ID
# this needs to be done with inner join
@app.get('/store/<string:store_id>/item')
def get_store_items(store_id):
    if store_id not in stores:
        return {'message': 'Store not found'}, 404
    # Filter items that belong to the given store_id
    store_items = [item for item in items.values() if item['store_id'] == store_id]
    return {'items': store_items}

@app.get('/items')
def get_items():
    return list(items.values())

@app.get('/item/<string:item_id>')
def get_item(item_id):
    try:
        return items[item_id]
    except KeyError:
        return {'message': 'Item not found'}, 404




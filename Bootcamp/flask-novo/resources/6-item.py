import uuid
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from schemas import ItemSchema, ItemUpdateSchema

# predavanje 8 , ovo brisemo
from db import items


blp = Blueprint("Items", "items", description="Operations on items")


@blp.route("/item/<string:item_id>")
class Item(MethodView):
    @blp.response(200, ItemSchema) # ispratiti cemo schemu gdje cemo vraitti i id i ostale atribute
    def get(self, item_id):
        try:
            return items[item_id]
        except KeyError:
            abort(404, message="Item not found.")

    def delete(self, item_id):
        try:
            del items[item_id]
            return {"message": "Item deleted."}
        except KeyError:
            abort(404, message="Item not found.")

    @blp.arguments(ItemUpdateSchema)
    @blp.response(200, ItemSchema) # vazno je da budu ispod argumenata response ispod arguments
    def put(self, item_data, item_id):
        try:
            item = items[item_id]

            # https://blog.teclado.com/python-dictionary-merge-update-operators/
            item |= item_data

            return item
        except KeyError:
            abort(404, message="Item not found.")


@blp.route("/item")
class ItemList(MethodView):
    @blp.response(200, ItemSchema(many=True)) # many=True oznacava da cemo vratiti listu objekata
    def get(self):
        return items.values() # vracam listu umjesto dict-a, ali trade off je cool koliko je cisici kod i koristimo schemu

    @blp.arguments(ItemSchema)
    @blp.response(201, ItemSchema)
    def post(self, item_data):
        for item in items.values():
            if (
                item_data["name"] == item["name"]
                and item_data["store_id"] == item["store_id"]
            ):
                abort(400, message=f"Item already exists.")

        item_id = uuid.uuid4().hex
        item = {**item_data, "id": item_id}
        items[item_id] = item

        return item
    
 ########   # predavanje 8, ovo postaje post metoda,#######
    # from models import ItemModel
    # ne trebamo validaciju jel imamo u db postavke unique i not null, tako da ne moramo provjeravati

    #  def post(self, item_data):
    #     item = ItemModel(**item_data)

    #     try:
    #         db.session.add(item)
    #         db.session.commit()
    #     except SQLAlchemyError:
    #         abort(500, message="An error occurred while inserting the item.")

    #     return item
    

    

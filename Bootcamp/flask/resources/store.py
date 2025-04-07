from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import StoreModel
from schemas import StoreSchema
from models import TagModel


blp = Blueprint("Stores", "stores", description="Operations on stores")

@blp.route("/store/<string:store_id>")
class Store(MethodView):
    @blp.response(200, StoreSchema)
    def get(self, store_id):
        store = StoreModel.query.get_or_404(store_id)
        return store

    def delete(self, store_id):
        store = StoreModel.query.get_or_404(store_id)
        db.session.delete(store)
        db.session.commit()
        return {"message": "Store deleted"}, 200

    @blp.arguments(StoreSchema)
    @blp.response(200, StoreSchema)
    def put(self, store_data, store_id):
        store = StoreModel.query.get_or_404(store_id)
        store.name = store_data.get("name", store.name)
        if "tags" in store_data:
            # Remove existing tags by deleting them from the session
            for tag in store.tags.all():
                db.session.delete(tag)         
            # Create new TagModel instances with the proper store_id and add them to the store
            for tag_dict in store_data["tags"]:
                new_tag = TagModel(name=tag_dict.get("name"), store_id=store.id)
                store.tags.append(new_tag)
        try:
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message="An error occurred updating the store. " + str(e))
        return store


@blp.route("/store")
class StoreList(MethodView):
    @blp.response(200, StoreSchema(many=True))
    def get(self):
        return StoreModel.query.all()

    @blp.arguments(StoreSchema)
    @blp.response(201, StoreSchema)
    def post(self, store_data):
        store = StoreModel(**store_data)
        try:
            db.session.add(store)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="A store with that name already exists.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the store.")
        return store

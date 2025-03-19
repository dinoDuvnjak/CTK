from db import db


class ItemModel(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True) # id je primarni ključ
    name = db.Column(db.String(80), unique=False, nullable=False) # name je jedinstven i obavezan
    price = db.Column(db.Float(precision=2), unique=False, nullable=False) # price je obavezan

    store_id = db.Column( # store_id je obavezan i referencira se na id u tablici stores
        db.Integer, db.ForeignKey("stores.id"), unique=False, nullable=False
    )

    store = db.relationship("StoreModel", back_populates="items") 
    tags = db.relationship("TagModel", back_populates="items", secondary="items_tags") # tags je relacija na TagModel


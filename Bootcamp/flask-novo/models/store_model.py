from db import db


class StoreModel(db.Model):
    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    # u 8 predavanju one to many ovako modificiraj
    # lazy="dynamic" means that the items will be loaded only when we tell it, it is not gonna be prefetched
    # if we need the we would set it to prefetched
    # cascade="all, delete" means that if we delete the store, all items in that store will be deleted too
    items = db.relationship("ItemModel", back_populates="store", lazy="dynamic", cascade="all, delete")

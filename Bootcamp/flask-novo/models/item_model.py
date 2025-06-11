from db import db  # sqlalchemy instance




#this is a model for the items table in the database and it will be used to create the table in the database
# and to interact with the table in the database.
# We will use this model to create, read, update and delete items in the database.
# We will also use this model to validate the data that we receive from the client.

# later on tell SQLAlchemy what tables we are gonna use in our application and
# what columns those tables will have.
# In addition, any class that we create that maps to a table with columns,
# SQLAlchemy will automatically be able to handle turning those
# table rows into Python objects.
# So it's pretty handy in that sense.

class ItemModel(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    price = db.Column(db.Float(precision=2), unique=False, nullable=False)
    store_id = db.Column(db.Integer, unique=False, nullable=False)
    # u 8 predavananju one to many ovako modificiraj
    # store_id = db.Column(db.Integer, db.ForeignKey("stores.id"), unique=False, nullable=False) # 
    # sa db.relationship() mozemo povezati store_id sa StoreModel i tako povezati item sa store-om
    store = db.relationship("StoreModel", back_populates="items")

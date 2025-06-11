from flask import Flask
from flask_smorest import Api

from db import db

import models

from resources.item import blp as ItemBlueprint
from resources.store import blp as StoreBlueprint

# bolje je napraviti funkciju create_app koja ce se koristiti za kreiranje aplikacije
# i inicijalizaciju baze podataka, umjesto da se sve radi direktno u app.py
# ovo je factory pattern za kreiranje Flask aplikacije
# https://flask.palletsprojects.com/en/2.3.x/patterns/appfactories/
def create_app(db_url=None): # db_url je opcionalan parametar koji mozemo koristiti za postavljanje URL baze podataka
    app = Flask(__name__)
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    #ovdje mozemo postaviti URL baze podataka, ako nije postavljen, koristi SQLite bazu
    # ako zelimo koristiti postgres bazu, onda trebamo postaviti db_url na npr. "postgresql://user:password@localhost/dbname"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or "sqlite:///data.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # da ne bi bilo warninga u konzoli
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)
    api = Api(app)

    with app.app_context():
        db.create_all()

    api.register_blueprint(ItemBlueprint)
    api.register_blueprint(StoreBlueprint)

    return app

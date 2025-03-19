import os
import secrets


from flask import Flask
from flask_smorest import Api
from resources.user import blp as UserBlueprint
from resources.item import blp as ItemBlueprint
from resources.store import blp as StoreBlueprint
from flask_jwt_extended import JWTManager

from db import db


def create_app(db_url=None): 
    app = Flask(__name__)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "Stores REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    # Ovo generira SQLite bazu u memoriji
    # Naknadno cemo promijeniti na POstgreSQL
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or "sqlite:///data.db" 
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True

    db.init_app(app)
    api = Api(app)

# Ovo ce pri svakom pokretanju aplikacije generirati novi tajni kljuc
    app.config["JWT_SECRET_KEY"] = "Ua7j41Xd7tSqOjqaT6cZ3hj6JFWFzL8bU-EC2DcdUEj9miHjMmI3pYruEOxcJMvIlXZetFcOeCoLp9GYbtPdM6TIisiVwEyBa9MIbhk5vgJJ6nlKKWsY_xS07i3_FTx6x59muWWsB8g8ano_3pw9poxycF1-d_Uw71JxfnauJ78"
    jwt = JWTManager(app)

    with app.app_context():
        import models
        # Ovo ce kreirati tablice u bazi ako ne postoje
        db.create_all()

    api.register_blueprint(ItemBlueprint)
    api.register_blueprint(StoreBlueprint)
    api.register_blueprint(UserBlueprint)

    return app

import os
import secrets


from flask import Flask, jsonify
from flask_smorest import Api
from resources.user import blp as UserBlueprint
from resources.item import blp as ItemBlueprint
from resources.tag import blp as TagBlueprint
from resources.store import blp as StoreBlueprint
from flask_jwt_extended import JWTManager

from db import db
from blocklist import BLOCKLIST
from flask_cors import CORS


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
    app.config["JWT_SECRET_KEY"] = "zvGKiS0bFWXZlzFnLWy_768BMp_PXG3cd_YGjPEPmghEW2X6VXPb4uKq_EsrzNebD_vl7BIuGQZzANR-ahXcicK_hGd6RPUgANa_y8jcAGGVshBCNPiXQjNSFIGf0bMbqElIXCDliN_Ukhm4f5-OHpSEPews3ix-eW_TzpC1yrJ2r06z45KZ8HFXp44mSIS2ANhRqeUtzSApzMF1LMFzJK7ERBkrE2qiDINzJACkwd3GSP1VvSLIUCdddCsl9pbhnGaddwj3o19R6mMh_W-R7ONFVlgg5xuQIqjBi8iVjNLukX-NPBw94YwfLCkXneEBrmyZsxh1QtOzgIRxFW-ogQ"
    jwt = JWTManager(app)

    # Ovo je callback funkcija koja se poziva kada se token stavi u blocklistu
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        print(jwt_payload)
        return jwt_payload["jti"] in BLOCKLIST

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "description": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )
    
    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {
                    "description": "The token is not fresh.",
                    "error": "fresh_token_required",
                }
            ),
            401,
        )
    
    # Ova funkcija se poziva kada se token stavi u blocklistu i ispisuje poruku
    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    with app.app_context():
        import models
        # Ovo ce kreirati tablice u bazi ako ne postoje
        db.create_all()

    api.register_blueprint(ItemBlueprint)
    api.register_blueprint(StoreBlueprint)
    api.register_blueprint(TagBlueprint)
    api.register_blueprint(UserBlueprint)
    CORS(app)  # This enables CORS for all routes and origins

    return app

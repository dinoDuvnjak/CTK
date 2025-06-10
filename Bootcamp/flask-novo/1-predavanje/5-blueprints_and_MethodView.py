# ovo je flask-smorest funkcinalnost koju dodajemo blueprint and MethodView

#1- napravi folder resources tamo prebaci item.py i store.py


#ovo postaje app.py
# poslije ovoga pokazi swagger ui http://127.0.0.1:5000/swagger-ui

from flask import Flask
from flask_smorest import Api

from resources.item import blp as ItemBlueprint
from resources.store import blp as StoreBlueprint


app = Flask(__name__)

app.config["PROPAGATE_EXCEPTIONS"] = True # flask config if there is an expection, it will be propagated to the client
app.config["API_TITLE"] = "Stores REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3" # stadard for the api documentation
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

api = Api(app)

api.register_blueprint(ItemBlueprint)
api.register_blueprint(StoreBlueprint)

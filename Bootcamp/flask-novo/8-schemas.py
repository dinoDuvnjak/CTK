from marshmallow import Schema, fields

# ItemSchema postaje PlainItemSchema kako bi odvojili logiku kada šaljemo podatke klijentu i kada primamo podatke od klijenta
# nekada nam ne trebaju podacti o storeu
class PlainItemSchema(Schema):
    id = fields.Str(dump_only=True) # dump_only means this field is only for reponse, not request
    name = fields.Str(required=True)
    price = fields.Float(required=True)
 

# StoreSchema postaje PlainStoreSchema iz istog razloga jel su nam sada namjesteni relashishipi
class PlainStoreSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)


class ItemUpdateSchema(Schema):
    name = fields.Str()
    price = fields.Float()

class ItemSchema(PlainItemSchema):
    store_id = fields.Str(required=True)  # store_id ostaje kao obavezan field
    store = fields.Nested(PlainStoreSchema, dump_only=True)  # store ostaje kao nested field

class StoreSchema(PlainStoreSchema):
    items = fields.List(fields.Nested(PlainItemSchema), dump_only=True)  # items ostaje kao nested field    

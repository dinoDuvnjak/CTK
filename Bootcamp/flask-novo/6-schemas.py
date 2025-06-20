from marshmallow import Schema, fields


class ItemSchema(Schema):
    id = fields.Str(dump_only=True) # dump_only means this field is only for reponse, not request
    name = fields.Str(required=True)
    price = fields.Float(required=True)
    store_id = fields.Str(required=True)
    #store_id = fields.Int(required=True) u 7 postaje int
 


class ItemUpdateSchema(Schema):
    name = fields.Str()
    price = fields.Float()


class StoreSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)

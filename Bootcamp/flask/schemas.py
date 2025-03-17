from marshmallow import Schema, fields

class ItemSchema(Schema): 
    id = fields.Str(dump_only=True) # koristimo samo pri vraćanju podataka (generiran interni ID)
    name = fields.Str(required=True) 
    price = fields.Float(required=True) 
    store_id = fields.Str(required=True) 


class ItemUpdateSchema(Schema):
    name = fields.Str() # name is optional
    price = fields.Float() # price is optional


class StoreSchema(Schema):
    id = fields.Str(dump_only=True) # koristimo samo pri vraćanju podataka (generiran interni ID)
    name = fields.Str(required=True) 
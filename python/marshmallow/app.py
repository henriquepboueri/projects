import datetime as dt
from marshmallow import Schema, fields, post_load
from pprintpp import pprint


class User:
    def __init__(self, name, email) -> None:
        self.name = name
        self.email = email
        self.created_at = dt.datetime.now()

    def __repr__(self):
        return "<User(name={self.name!r})>".format(self=self)


class User2:
    def __init__(self, name, email, created_at) -> None:
        self.name = name
        self.email = email
        self.created_at = created_at

    def __repr__(self):
        return "<User(name={self.name!r})>".format(self=self)


class UserSchema(Schema):
    name = fields.Str()
    email = fields.Str()
    created_at = fields.DateTime()


class UserSchema2(Schema):
    name = fields.Str()
    email = fields.Str()
    created_at = fields.DateTime()

    @post_load
    def make_user(self, data, **kwargs):
        return User2(**data)


# user = User(name="Monty", email="monty@python.org")
# result = UserSchema().dump(user)
# pprint(result)
# result = UserSchema().dumps(user)
# pprint(result)

user_data = {
    "created_at": "2021-04-14T19:50:27",
    "email": "ken@yahoo.com",
    "name": "Ken",
}
# result = UserSchema().load(user_data)
# pprint(result)
# user_data = {
#     "created_at": "2014-08-11T05:26:03.869245",
#     "email": "ken@yahoo.com",
#     "name": "Ken",
# }
# user = User2(**user_data)
# pprint(user.created_at)
result = UserSchema2().load(user_data)
pprint(result.created_at)

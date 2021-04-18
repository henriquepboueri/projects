from marshmallow.decorators import post_load
from marshmallow import Schema, fields
from app import ma
from .models import Paciente, TipoUsuario, Usuario


# class TipoUsuarioSchema(Schema):
#     # class Meta:
#     #     model = TipoUsuario
#     id__tipo_usuario = fields.Integer()
#     nome = fields.String()
#     data_cadastro = fields.DateTime()

class TipoUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoUsuario


# class UsuarioSchema(Schema):
#     # class Meta:
#     #     # fields = ('id__usuario', 'nome')
#     #     model = Usuario

#     # id__usuario = ma.auto_field()
#     id__usuario = fields.Integer()
#     nome = fields.String()
#     email = fields.String()
#     senha = fields.String()
#     data_cadastro = fields.DateTime()
#     tipo_usuario = fields.Nested(TipoUsuarioSchema(only=('nome',)))

class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario

    tipo_usuario = ma.Nested(TipoUsuarioSchema(only=('nome',)))


class PacienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Paciente

    # @post_load
    # def make_paciente(self, data, **kwargs):
    #     return Paciente(**data)


# class PacienteBuscaSchema(ma.Schema):
#     class Meta:
#         fields = ('id__paciente', 'nome', 'dt_nasc')
#         model = Paciente


usuarios_schema = UsuarioSchema(many=True)
usuario_schema = UsuarioSchema()

paciente_schema = PacienteSchema()
pacientes_schema = PacienteSchema(many=True)
# paciente_busca_schema = PacienteBuscaSchema(many=True)

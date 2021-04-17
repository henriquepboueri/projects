from app import ma
from .models import Paciente, TipoUsuario, Usuario


class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id__usuario', 'nome')
        model = Usuario


class TipoUsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TipoUsuario


class PacienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Paciente


class PacienteBuscaSchema(ma.Schema):
    class Meta:
        fields = ('id__paciente', 'nome', 'dt_nasc')
        model = Paciente


usuarios_schema = UsuarioSchema(many=True)
usuario_schema = UsuarioSchema()

paciente_schema = PacienteSchema()
pacientes_schema = PacienteSchema(many=True)
paciente_busca_schema = PacienteBuscaSchema(many=True)

from flask_restful import Api
from .resources import LoginResource, PacienteResource, PacientesResource


def initialize_routes(api: Api):
    # api.add_resource(UsuariosResource, '/api/usuarios')
    # api.add_resource(UsuarioResource, '/api/usuario')

    api.add_resource(LoginResource, '/api/auth/login')

    # api.add_resource(PacientesResource, '/api/paciente') # 
    api.add_resource(PacienteResource, '/api/paciente/<id>') # PUT, DELETE, GET
    api.add_resource(PacientesResource, '/api/pacientes') # GET, POST

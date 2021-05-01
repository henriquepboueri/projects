from flask_restful import Api
from .resources import  CovidListResource, LoginResource, PacienteListResouce,  UsuarioResource, UsuariosResource


def initialize_routes(api: Api):
    # url_base = '/api/v1/'

    api.add_resource(UsuariosResource, '/api/v1/usuarios')
    api.add_resource(UsuarioResource, '/api/v1/usuarios/<id>')

    api.add_resource(LoginResource, '/api/v1/auth/login')

    api.add_resource(CovidListResource, '/api/v1/covid')
    api.add_resource(PacienteListResouce, '/api/v1/pacientes/<name>')

from flask_restful import Api
from .resources import LoginResource


def initialize_routes(api: Api):
    # api.add_resource(UsuariosResource, '/api/usuarios')
    # api.add_resource(UsuarioResource, '/api/usuario')

    api.add_resource(LoginResource, '/api/auth/login')

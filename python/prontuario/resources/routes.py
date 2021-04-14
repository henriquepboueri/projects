from .resources import UsuarioResource, UsuariosResource


def initialize_routes(api):
    api.add_resource(UsuariosResource, '/api/usuarios')
    api.add_resource(UsuarioResource, '/api/usuario')

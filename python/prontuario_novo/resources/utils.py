from datetime import datetime, timedelta
from resources.models import Usuario


def isAdmin(usuario: Usuario):
    return usuario.tipo_usuario.nome == "Admin"


def genExpDateInMilliSecs(time_delta: timedelta):
    return int((datetime.now() + time_delta).timestamp() * 1000)

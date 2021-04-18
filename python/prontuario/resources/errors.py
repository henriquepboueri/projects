from flask_restful import HTTPException


class InternalServerError(Exception):
    pass


class CredentialsInvalidError(HTTPException):
    pass


class SchemaValidationError(HTTPException):
    pass


class MovieAlreadyExistsError(HTTPException):
    pass


class UpdatingMovieError(HTTPException):
    pass


class DeletingMovieError(Exception):
    pass


class NoAuthorizationError(HTTPException):
    pass


class BadTokenError(Exception):
    pass


class MissingAuthorizationTokenError(HTTPException):
    pass


class EmailAlreadyExistsError(Exception):
    pass


class EmailDoesNotExistError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class EmailDoesnotExistsError(Exception):
    pass


class ExpiredTokenError(Exception):
    pass


class AttributeError(Exception):
    pass


class BadRequestError(Exception):
    pass


class ExpiredSignatureError(Exception):
    pass


class NoContentError(HTTPException):
    pass


errors = {
    "NoContentError": {
        "message": "Sem conteúdo",
        "status": 204
    },
    "ExpiredSignatureError": {
        "message": "Token expirado",
        "status": 500
    },
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "CredentialsInvalidError": {
        "message": "E-mail or password invalid",
        "status": 401
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "MovieAlreadyExistsError": {
        "message": "Movie with given name already exists",
        "status": 400
    },
    "UpdatingMovieError": {
        "message": "Updating movie added by other is forbidden",
        "status": 403
    },
    "DeletingMovieError": {
        "message": "Deleting movie added by other is forbidden",
        "status": 403
    },
    "NoAuthorizationError": {
        "message": "Movie with given id doesn't exists",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "EmailDoesNotExistError": {
        "message": "Couldn't find the user with given email address",
        "status": 400
    },
    "BadTokenError": {
        "message": "Invalid token",
        "status": 403
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    },
    "EmailDoesnotExistsError": {
        "message": "Couldn't find the user with given email address",
        "status": 400
    },
    "ExpiredTokenError": {
        "message": "The token is expired",
        "status": 400
    },
    "MissingAuthorizationTokenError": {
        "message": " Header Authorization não encontrado na requisição",
        "status": 401
    },
    "AttributeError": {
        "message": " Erro em atributo de objeto (possivelmente inexistente)",
        "status": 500
    },
    "BadRequestError": {
        "message": "Dados em formato inválido",
        "status": 400
    }
}

from app import db
from flask_bcrypt import generate_password_hash, check_password_hash

from app import db


class Login():
    def __init__(self, email: str, senha: str) -> None:
        self.email = email
        self.senha = senha


class TipoUsuario(db.Model):
    __tablename__ = 'tipo_usuario'

    id__tipo_usuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    data_cadastro = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id__usuario = db.Column(db.Integer, primary_key=True)
    id__tp_usuario = db.Column(db.ForeignKey('tipo_usuario.id__tipo_usuario'), nullable=False, index=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    data_cadastro = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    data_atualizacao = db.Column(db.DateTime, server_default=db.FetchedValue())

    tipo_usuario = db.relationship('TipoUsuario', primaryjoin='Usuario.id__tp_usuario == TipoUsuario.id__tipo_usuario', backref='usuarios')

    def hash_password(self):
        self.senha = generate_password_hash(self.senha).decode('utf8')

    def check_password(self, senha):
        return check_password_hash(self.senha, senha)

    def isAdmin(self):
        return self.tipo_usuario.nome == 'Admin'



class CovidAnamnese(db.Model):
    __tablename__ = 'covid_anamnese'

    id__covid_anamnese = db.Column(db.Integer, primary_key=True)
    nome_paciente = db.Column(db.String(100))
    data_nasc_paciente = db.Column(db.Date)
    e_paciente = db.Column(db.Integer)
    id__usuario = db.Column(db.ForeignKey('usuario.id__usuario'), index=True)
    diag_covid = db.Column(db.Integer, nullable=False)
    febre = db.Column(db.Integer, nullable=False)
    prob_resp = db.Column(db.Integer, nullable=False)
    viagem = db.Column(db.Integer, nullable=False)
    contato_infect = db.Column(db.Integer, nullable=False)
    contato_sintomas = db.Column(db.Integer, nullable=False)
    part_reuniao = db.Column(db.Integer, nullable=False)
    prob_card_resp = db.Column(db.Integer, nullable=False)
    prob_outro = db.Column(db.Integer, nullable=False)
    usa_medic = db.Column(db.Integer, nullable=False)
    medic_desc = db.Column(db.Text)
    temperatura = db.Column(db.Numeric(2, 2), nullable=False)
    obs = db.Column(db.String)
    data_cadastro = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    data_atualizacao = db.Column(db.DateTime)
    assinatura = db.Column(db.String)

    usuario = db.relationship('Usuario', primaryjoin='CovidAnamnese.id__usuario == Usuario.id__usuario', backref='covid_anamnese')

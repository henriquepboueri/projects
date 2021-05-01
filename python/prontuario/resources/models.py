from app import db
from flask_bcrypt import generate_password_hash, check_password_hash

from app import db


class Login():
    def __init__(self, email: str, senha: str) -> None:
        self.email = email
        self.senha = senha


class TipoUsuario(db.Model):
    __tablename__ = 'tipo_usuario'

    id__tipo_usuario = db.Column(db.BigInteger, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    data_cadastro = db.Column(
        db.DateTime, nullable=False, server_default=db.FetchedValue())


class Usuario(db.Model):
    __tablename__ = 'usuario'

    id__usuario = db.Column(db.BigInteger, primary_key=True)
    id__tp_usuario = db.Column(db.ForeignKey(
        'tipo_usuario.id__tipo_usuario'), nullable=False, index=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    data_cadastro = db.Column(
        db.DateTime, nullable=False, server_default=db.FetchedValue())

    tipo_usuario = db.relationship(
        'TipoUsuario', primaryjoin='Usuario.id__tp_usuario == TipoUsuario.id__tipo_usuario', backref='usuarios')

    def hash_password(self):
        self.senha = generate_password_hash(self.senha).decode('utf8')

    def check_password(self, senha):
        return check_password_hash(self.senha, senha)

    def isAdmin(self):
        return self.tipo_usuario.nome == 'Admin'


class Paciente(db.Model):
    __tablename__ = 'paciente'

    id__paciente = db.Column(db.BigInteger, primary_key=True)
    encaminhado_por = db.Column(db.String(100))
    nome = db.Column(db.String(100))
    nr_sus = db.Column(db.String(50))
    sexo = db.Column(db.String(1))
    dt_nasc = db.Column(db.Date)
    cor = db.Column(db.String(1))
    nm_mae = db.Column(db.String(100))
    nm_pai = db.Column(db.String(100))
    cep_residencia = db.Column(db.String(8))
    logradouro_residencia = db.Column(db.String(100))
    bairro_residencia = db.Column(db.String(50))
    numero_residencia = db.Column(db.String(50))
    cidade_residencia = db.Column(db.String(100))
    cep_trabalho = db.Column(db.String(8))
    logradouro_trabalho = db.Column(db.String(100))
    bairro_trabalho = db.Column(db.String(50))
    numero_trabalho = db.Column(db.String(50))
    cidade_trabalho = db.Column(db.String(100))
    email = db.Column(db.String(50))
    nr_telefone_1 = db.Column(db.String(11))
    nr_telefone_2 = db.Column(db.String(11))
    profissao = db.Column(db.String(50))
    nmContato = db.Column(db.String(100))
    nr_contato = db.Column(db.String(11))
    obs_contato = db.Column(db.String)
    obs_gerais = db.Column(db.String)
    data_cadastro = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    naturalidade = db.Column(db.String(100))
    nacionalidade = db.Column(db.String(100))
    procedencia = db.Column(db.String(1))
    ocupacao = db.Column(db.String(100))
    data_atualizacao = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
    estado_civil = db.Column(db.String(2))
    nome_responsavel = db.Column(db.String(100))
    parentesco_responsavel = db.Column(db.String(50))
    relacionamento_contato = db.Column(db.String(50))
    cep_contato = db.Column(db.String(8))
    logradouro_contato = db.Column(db.String(100))
    bairro_contato = db.Column(db.String(50))
    numero_contato = db.Column(db.String(50))
    cidade_contato = db.Column(db.String(100))



class CovidAnamnese(db.Model):
    __tablename__ = 'covid_anamnese'

    id__covid_anamnese = db.Column(db.BigInteger, primary_key=True)
    id__paciente = db.Column(db.BigInteger)
    id__usuario = db.Column(db.BigInteger)
    diag_covid = db.Column(db.String(1), nullable=False)
    febre = db.Column(db.String(1), nullable=False)
    prob_resp = db.Column(db.String(1), nullable=False)
    viagem = db.Column(db.String(1), nullable=False)
    contato_infect = db.Column(db.String(1), nullable=False)
    contato_sintomas = db.Column(db.String(1), nullable=False)
    part_reuniao = db.Column(db.String(1), nullable=False)
    prob_card_resp = db.Column(db.String(1), nullable=False)
    prob_outro = db.Column(db.String(1), nullable=False)
    usa_medic = db.Column(db.String(1), nullable=False)
    medic_desc = db.Column(db.String(1), nullable=False)
    temperatura = db.Column(db.Numeric(2, 2), nullable=False)
    obs = db.Column(db.String)
    data_cadastro = db.Column(
        db.DateTime, nullable=False, server_default=db.FetchedValue())

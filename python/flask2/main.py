import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request, Response
from werkzeug.security import generate_password_hash, check_password_hash
from utils import db_write


# @app.route('/', methods=['GET'])
# def home():
#     print('Home')
#     return '<h1>Home</h1>'


@app.route('/anam_covid', methods=['POST'])
def add_user():
    try:
        _json = request.json
        _id_pessoa = _json['id_pessoa']
        _respostas = _json['respostas']
        # validate the received values
        if _id_pessoa and _respostas and request.method == 'POST':
            sql = '''INSERT INTO `prontuario`.`anamnese_covid` (`id_pessoa`, `r01`, `r02`, `r03`, `r04`, `r05`, `r06`, `r07`, `r08`, `r09`, `r10`, `r10_obs`, `temperatura`)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'''
            data = tuple(_id_pessoa) + tuple(_respostas)
            if db_write(sql, data):
                return Response(status=201)
            else:
                return Response(status=409)
        else:
            return Response(status=400)
    except Exception as e:
        print(e)


@app.route('/pessoa')
def users():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM pessoa")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

# @app.route('/anam_covid', methods=['POST'])
# def add_user():
#     try:
#         _json = request.json
#         _id_pessoa = _json['id_pessoa']
#         _data_cadastro = _json['data_cadastro']
#         _respostas = _json['respostas']
#         # validate the received values
#         if _id_pessoa and _data_cadastro and _respostas and request.method == 'POST':
#             # do not save password as a plain text
#             _hashed_password = generate_password_hash(_password)
#             # save edits
#             sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
#             data = (_name, _email, _hashed_password,)
#             conn = mysql.connect()
#             cursor = conn.cursor()
#             cursor.execute(sql, data)
#             conn.commit()
#             resp = jsonify('User added successfully!')
#             resp.status_code = 200
#             return resp
#         else:
#             return not_found()
#     except Exception as e:
#         print(e)
#     finally:
#         cursor.close()
#         conn.close()


# @app.route('/users')
# def users():
#     try:
#         conn = mysql.connect()
#         cursor = conn.cursor(pymysql.cursors.DictCursor)
#         cursor.execute("SELECT * FROM tbl_user")
#         rows = cursor.fetchall()
#         resp = jsonify(rows)
#         resp.status_code = 200
#         return resp
#     except Exception as e:
#         print(e)
#     finally:
#         cursor.close()
#         conn.close()


# @app.route('/user/<int:id>')
# def user(id):
#     try:
#         conn = mysql.connect()
#         cursor = conn.cursor(pymysql.cursors.DictCursor)
#         cursor.execute("SELECT * FROM tbl_user WHERE user_id=%s", id)
#         row = cursor.fetchone()
#         resp = jsonify(row)
#         resp.status_code = 200
#         return resp
#     except Exception as e:
#         print(e)
#     finally:
#         cursor.close()
#         conn.close()


# @app.route('/update', methods=['POST'])
# def update_user():
#     try:
#         _json = request.json
#         _id = _json['id']
#         _name = _json['name']
#         _email = _json['email']
#         _password = _json['pwd']
#         # validate the received values
#         if _name and _email and _password and _id and request.method == 'POST':
#             # do not save password as a plain text
#             _hashed_password = generate_password_hash(_password)
#             # save edits
#             sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"
#             data = (_name, _email, _hashed_password, _id,)
#             conn = mysql.connect()
#             cursor = conn.cursor()
#             cursor.execute(sql, data)
#             conn.commit()
#             resp = jsonify('User updated successfully!')
#             resp.status_code = 200
#             return resp
#         else:
#             return not_found()
#     except Exception as e:
#         print(e)
#     finally:
#         cursor.close()
#         conn.close()


# @app.route('/delete/<int:id>')
# def delete_user(id):
#     try:
#         conn = mysql.connect()
#         cursor = conn.cursor()
#         cursor.execute("DELETE FROM tbl_user WHERE user_id=%s", (id,))
#         conn.commit()
#         resp = jsonify('User deleted successfully!')
#         resp.status_code = 200
#         return resp
#     except Exception as e:
#         print(e)
#     finally:
#         cursor.close()
#         conn.close()


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp


if __name__ == "__main__":
    print('App running.')
    app.run()

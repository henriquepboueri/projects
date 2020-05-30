import pyodbc

print("Importing copia_padrao.py")

def conn_factory(server, db):
    return pyodbc.connect("Driver={};Server=SRVDB\{};Database={};Trusted_Connection=yes;".format('{SQL Server}', server, db))
    
databases = [('ALTERDATA','ALTERDATA_GERAL'),('ALTERDATA_2','ALTERDATA_GERAL_2')]
perm_tbls = ('aduwcont','aduwdp','aduwfiscal','aduwphd','aduwcobr')
users_sectors = [('FISCAL_PADRAO_1','Setor Fiscal #1'),('FISCAL_PADRAO_2','Setor Fiscal #2'),
                 ('CONTABIL_PADRAO_1','Setor Contábil #1'),('CONTABIL_PADRAO_2','Setor Contábil #2'),
                 ('DP_PADRAO_1','Setor Pessoal #1'),('DP_PADRAO_2','Setor Pessoal #2'),
                 ('CONTRATOS_PADRAO_1','Setor Contratos #1'),('CONTRATOS_PADRAO_2','Setor Contratos #2'),
                 ('FINANCEIRO_PADRAO_1','Setor Financeiro #1'),('FINANCEIRO_PADRAO_2','Setor Financeiro #2')]

conn_geral_1 = conn_factory('ALTERDATA','ALTERDATA_GERAL')
conn_geral_2 = conn_factory('ALTERDATA_2','ALTERDATA_GERAL_2')
conn_diniz = conn_factory('ALTERDATA_DINIZ','ALTERDATA_DINIZ')

users_geral_1 = conn_geral_1.execute("select idusuario, nmcurto from system.adusystem where nmcurto like '%PADRAO%'").fetchall()
users_geral_2 = conn_geral_2.execute("select idusuario, nmcurto from system.adusystem where nmcurto like '%PADRAO%'").fetchall()
users_diniz = conn_diniz.execute("select idusuario, nmcurto from system.adusystem where nmcurto like '%PADRAO%'").fetchall()

dict_users_geral_1 = {}
dict_users_geral_2 = {}
dict_users_diniz = {}

for user in users_geral_1:
    dict_users_geral_1[user[1]] = user[0]
for user in users_geral_2:
    dict_users_geral_2[user[1]] = user[0]
for user in users_diniz:
    dict_users_diniz[user[1]] = user[0]    

for tbl in perm_tbls:
    sql = "delete t1 from system.{} as t1 inner join system.adusystem as t2 on t1.idusuario = t2.idusuario where nmcurto like '%PADRAO%'".format(tbl)
    conn_geral_1.execute(sql)
    conn_geral_1.commit()
    conn_diniz.execute(sql)
    conn_diniz.commit()    
    for user in users_sectors:
        user = user[0]
        sql = "select dsacesso from system.{} where idusuario = {}".format(tbl, dict_users_geral_2[user])
        perms = conn_geral_2.execute(sql).fetchall()
        if len(perms) > 0:
            for perm in perms:
                sql_geral_1 = "insert into system.{} (idusuario, dsacesso) values ({}, '{}')".format(tbl, dict_users_geral_1[user], perm[0])
                sql_diniz = "insert into system.{} (idusuario, dsacesso) values ({}, '{}')".format(tbl, dict_users_diniz[user], perm[0])
                conn_geral_1.execute(sql_geral_1)
                conn_geral_1.commit()
                conn_diniz.execute(sql_diniz)
                conn_diniz.commit()
                
conn_geral_1.close()
conn_geral_2.close()
conn_diniz.close()

print("Finishing importing copia_padrao.py")



import pyodbc
import copia_padrao

print("Atualizando cadastros...")
def conn_factory(server, db):
    return pyodbc.connect("Driver={};Server=SRVDB\{};Database={};Trusted_Connection=yes;".format('{SQL Server}', server, db))

    
databases = [('ALTERDATA','ALTERDATA_GERAL'),('ALTERDATA_2','ALTERDATA_GERAL_2'),('ALTERDATA_DINIZ','ALTERDATA_DINIZ')]
perm_tbls = ('aduwcont','aduwdp','aduwfiscal','aduwphd','aduwcobr')
users_sectors = [('FISCAL_PADRAO_1','Setor Fiscal #1'),('FISCAL_PADRAO_2','Setor Fiscal #2'),
                 ('CONTABIL_PADRAO_1','Setor Contábil #1'),('CONTABIL_PADRAO_2','Setor Contábil #2'),
                 ('DP_PADRAO_1','Setor Pessoal #1'),('DP_PADRAO_2','Setor Pessoal #2'),
                 ('CONTRATOS_PADRAO_1','Setor Contratos #1'),('CONTRATOS_PADRAO_2','Setor Contratos #2'),
                 ('FINANCEIRO_PADRAO_1','Setor Financeiro #1'),('FINANCEIRO_PADRAO_2','Setor Financeiro #2')]
                              
for db in databases:
    msg = "Atualizando base: {}".format(db)
    print(msg);
    conn = conn_factory(db[0], db[1])
    for tbl in perm_tbls:
        sql = '''delete tb_sys
                from system.{} as tb_sys
                inner join system.adusystem as tb_users on
                tb_users.idusuario = tb_sys.idusuario
                where tb_users.nmusuario like '%Setor%' '''.format(tbl)
        conn.execute(sql)
        conn.commit()
        for i in users_sectors:
            sql = '''INSERT INTO SYSTEM.{} (idusuario, dsacesso)
                select p1.idusuario, p2.dsacesso
                from (select idusuario from system.adusystem where nmusuario like '%{}%') as p1, 
                (select dsacesso from system.{} p inner join system.adusystem s on s.idusuario = p.idusuario where nmcurto like '%{}%') AS p2'''.format(tbl, i[1], tbl, i[0])
            conn.execute(sql)
            conn.commit()
    conn.close()

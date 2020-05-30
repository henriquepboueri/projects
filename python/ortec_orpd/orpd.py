import pyodbc
import pandas as pd

conn = pyodbc.connect("Driver={SQL Server};"
                      "Server=SRVDB\ALTERDATA_2;"
                      "Database=ALTERDATA_GERAL_2;"
                      "Trusted_Connection=yes;")
cur = conn.cursor()

empresas = list()
while True:
    empresa = input("Enter the company id:")
    if empresa == '':
        break
    empresas.append(empresa)
    
for cod_emp in empresas:
    tb_di = "[ALTERDATA_GERAL_2].[wfiscal].[di{}]".format(cod_emp)
    tb_cd = "[ALTERDATA_GERAL_2].[wfiscal].[cd{}]".format(cod_emp)
    tb_m = "[ALTERDATA_GERAL_2].[wfiscal].[m{}]".format(cod_emp)

    print("Working on company {}".format(cod_emp.upper()))
    sql = '''update di
        set di.IdClassificacao = (select top 1 cdcodigo from wfiscal.cd{} where nmdescricao = cd.nmDescricao order by cdcodigo)
        from wfiscal.di{} di
        inner join wfiscal.cd{} cd on
        di.IdClassificacao = cd.cdcodigo'''.format(cod_emp, cod_emp, cod_emp)
    cur.execute(sql)
    cur.commit()
    sql = '''delete from wfiscal.cd{} where CdCodigo not in (select idclassificacao from wfiscal.di{})'''.format(cod_emp, cod_emp)
    cur.execute(sql)
    cur.commit()
    sql = '''update cd_dest
        set CdGeneroItem = cd_ori.CdGeneroItem, cdipi = cd_ori.cdipi, cdpis = cd_ori.cdpis, CdCOFINS = cd_ori.CdCOFINS,
        CdPISEnt = cd_ori.cdpisent, CdCOFINSEnt = cd_ori.CdCOFINSEnt, cdipient = cd_ori.CdIPIEnt,
        tipo_origem_registro = cd_ori.tipo_origem_registro
        from wfiscal.cd{} cd_dest
        inner join wfiscal.cd01321 cd_ori on
        cd_ori.nmDescricao = cd_dest.nmDescricao'''.format(cod_emp)
    cur.execute(sql)
    cur.commit()
cur.close()            

import pyodbc
import timeit
#import copia_padrao

def conn_factory(server, db):
    conn_string = "Driver={};Server={};Database={};Trusted_Connection=yes;".format('{SQL Server}', server, db)
    return pyodbc.connect(conn_string)

#databases = [('ALTERDATA', 'ALTERDATA_GERAL'), ('ALTERDATA_2', 'ALTERDATA_GERAL_2'), ('ALTERDATA_DINIZ', 'ALTERDATA_DINIZ')]
databases = [('SRVDB\ALTERDATA', 'ALTERDATA_GERAL'), ('SRVDB\ALTERDATA_2', 'ALTERDATA_GERAL_2'), ('SRVDB\ALTERDATA_DINIZ', 'ALTERDATA_DINIZ'), ('SRVTIBK','SQL_TESTE')]

selection = input("Choose a database to rebuild: [0]-GERAL #1; [1]-GERAL #2; [2]-DINIZ; [3]-TESTE; [4]-ALL\n")
frag_level = input("Set the minimum fragmentation value:\n")

if (selection != '4'):
    databases_temp = list()
    databases_temp.append(databases[int(selection)])
    databases = databases_temp
      
for db in databases:
    msg = "Selected database: {}.{}".format(db[0], db[1])
    print(msg)
    print("Gathering indexes from selected database")
    conn = conn_factory(db[0], db[1])
    sql = '''SELECT OBJECT_NAME(ind.OBJECT_ID) AS TableName,
        OBJECT_SCHEMA_NAME(ind.object_id) AS SchemaName, 
        ind.name AS IndexName, indexstats.index_type_desc AS IndexType, 
        indexstats.avg_fragmentation_in_percent 
        FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) indexstats
        INNER JOIN sys.indexes ind ON ind.object_id = indexstats.object_id
        AND ind.index_id = indexstats.index_id 
        WHERE 
        -- indexstats.avg_fragmentation_in_percent , e.g. >30, you can specify any number in percent 
        indexstats.avg_fragmentation_in_percent > {} AND
        ind.Name is not null 
        ORDER BY indexstats.avg_fragmentation_in_percent DESC'''.format(frag_level)
    indexes = conn.execute(sql).fetchall()
    total = len(indexes)
    if total > 0:
        count = 0
        for index in indexes:
            count = count + 1
            schema = index[1]
            index_name = index[2]
            table = index[0]
            full_table_name = "{}.{}".format(schema, table)
            avg_frag = float(index[4])
            proc_type = ""
            if (avg_frag < 5):
                sql = "ALTER INDEX ALL ON {} REORGANIZE".format(full_table_name)
                proc_type = "Reorganizing"
            else:
                sql = "ALTER INDEX ALL ON {} REBUILD WITH (ONLINE = ON)".format(full_table_name)
                proc_type = "Rebuilding"                
            print("{} index {} of {} [{}.{}, {:5.2f}]".format(proc_type, count, total, full_table_name, index_name, avg_frag))
            conn.execute(sql)
            if (count % 100 == 0):
                conn.commit()
    conn.commit()
conn.close()

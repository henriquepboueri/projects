import pandas as pd
import sqlite3
import os.path

def insertRows(data):
    conn.execute("INSERT INTO ONLINE_WORLD_STATISTICS (DATAHORA, WORLD, ONLINE_PLAYERS, LOCATION, PVP_TYPE) VALUES (datetime('now','localtime'), ?, ?, ?, ?)", (data[0], data[1], data[2], data[3]))

    
dir_path = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(dir_path, "online-world-statistics.db")
                 
conn = sqlite3.connect(db_path)
cur = conn.cursor()
cur.execute ('CREATE TABLE IF NOT EXISTS ONLINE_WORLD_STATISTICS (ID INTEGER PRIMARY KEY ASC, DATAHORA DATETIME, WORLD TEXT, ONLINE_PLAYERS INTEGER, LOCATION TEXT, PVP_TYPE TEXT)')
                       

dfs = pd.read_html('https://www.tibia.com/community/?subtopic=worlds', header=0)
for df in dfs:
    if 'World' in df.columns:
        for row in df.values:
            if (not row[1] in ('Off', 'off','Offline','offline')):
                insertRows(row)

conn.commit()
conn.close()        

import pandas as pd
import sqlite3
import os.path
from datetime import datetime

def insertRows(world, data):
    conn.execute("INSERT INTO KILL_STATISTICS (DATA, CREATURE, KILLED_PLAYERS, KILLED_BY_PLAYERS, WORLD) VALUES (date('now','localtime','-1 days'), ?, ?, ?, ?)", (data[0], data[1], data[2], world))

def checkDuplicates(world):
    return conn.execute("SELECT SUM(KILLED_BY_PLAYERS) FROM KILL_STATISTICS WHERE WORLD like '{}%' AND DATA = (date('now','localtime','-1 days'))".format(world)).fetchone()[0]

hournow = datetime.now().timetuple()[3]
print('Date and time now are: {}'.format(datetime.now()))

if (hournow < 18):
    dir_path = os.path.abspath(os.path.dirname(__file__))
    worlds_path = os.path.join(dir_path, "worlds.csv")
    db_path = os.path.join(dir_path, "tibia-kill-statistics.db")
                     
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS KILL_STATISTICS (ID INTEGER PRIMARY KEY ASC, DATA DATE, CREATURE TEXT, KILLED_PLAYERS INTEGER, KILLED_BY_PLAYERS INTEGER, WORLD TEXT)')

    # Read file containing world names                           
    fh_worlds = open(worlds_path)
    
    for world in fh_worlds:
        print("World on work: " + world.upper())
        url = 'https://www.tibia.com/community/?subtopic=killstatistics&world={}'.format(world)
        dfs = pd.read_html(url, header=0)

        for df in dfs:
            if 'Last Day' in df.columns:
                df_filtered = df.iloc[1:-1, :3]
                df_filtered.columns = ['CREATURE','KILLED_PLAYERS','KILLED_BY_PLAYERS']
                daily_kill_count_site = df_filtered['KILLED_BY_PLAYERS'].astype(int).sum()
                daily_kill_count_db = checkDuplicates(world)
                if (daily_kill_count_site == daily_kill_count_db):
                    print('Counts match. Skipping world: {}'.format(world.upper()))
                    break
                else:                    
                # Check for duplicates. If none found, add them to database.
                    for row in df_filtered.values:
                        print('Inserting creature: {}'.format(row[0].upper()))
                        insertRows(world, row)
                # Commit the data world by world
                print('Commiting changes to world: {}'.format(world.upper()))
                conn.commit()
    # Close open connections                                         
    fh_worlds.close()
    conn.close()
else:
    print('Script not on schedule!')



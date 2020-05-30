import matplotlib.pyplot as plt
import sqlite3
import pandas as pd

conn = sqlite3.connect('tibia-kill-statistics.db')
sql = "select data, creature, killed_by_players, world  from kill_statistics where world in ('Nossobra\n','Inabra\n','Honbra\n') and creature = 'raging mages'"
df = pd.read_sql_query(sql, conn)
df.set_index('DATA', inplace=True)
df.groupby(['WORLD','CREATURE'])['KILLED_BY_PLAYERS'].plot(kind='line', legend=True)
plt.show()

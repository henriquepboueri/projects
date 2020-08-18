import matplotlib.pyplot as plt
import sqlite3
import pandas as pd

conn = sqlite3.connect('online-world-statistics.db')

locations = ['%%','South%','North%','Europe%']
pvp_types = ['%%','Open%','Retro Open%','Optional%','%Hardcore%']
keep_going = True

while (keep_going):  
    location = locations[int(input("Enter location (0-All; 1-South; 2-North; 3-Europe):"))]
    pvp_type = pvp_types[int(input("Enter PvP Type (0-All; 1-Open; 2-Retro Open; 3-Optional; 4-Hardcore):"))]
    days_behind = input("How many days behind?") or 999
    world_name = input("Enter world to filter within results:")
                             
    sql = '''select *
    from online_world_statistics
    where location like '{}'
    and PVP_TYPE like '{}'
    and DATAHORA between datetime('now','localtime','-{} days')
    and datetime('now','localtime')
    and world like '{}%' '''.format(location, pvp_type, days_behind, world_name)
    
    df = pd.read_sql_query(sql, conn)
    df['ONLINE_PLAYERS'] = df['ONLINE_PLAYERS'].replace('-', 0)
    df.set_index('DATAHORA', inplace=True)
    df.groupby(['WORLD'])['ONLINE_PLAYERS'].plot(kind='line', legend=True)
    plt.show()
    keep_going = bool(input("Hit enter to quit the program or anything else to continue:"))


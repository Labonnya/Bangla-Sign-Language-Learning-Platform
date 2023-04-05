import sqlite3

connection = sqlite3.connect('bsl.db')
cursor = connection.cursor()

create_table = '''
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY,
    label TEXT,
    choice1 TEXT,
    choice2 TEXT,
    choice3 TEXT,
    choice4 TEXT,
    answer TEXT
)
'''
cursor.execute(create_table)

connection.commit()
connection.close()

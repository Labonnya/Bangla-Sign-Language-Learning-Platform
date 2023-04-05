import sqlite3

def create_user_table():
    conn = sqlite3.connect('bsl.db')
    c = conn.cursor()

    # Create the countries table if it does not exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            institution TEXT,
            email TEXT,
            role TEXT
        )
    ''')
    conn.close()

def insert_user_data(username, password, institution, email, role):
    conn = sqlite3.connect('bsl.db')
    c = conn.cursor()

    c.execute('INSERT INTO user (username, password, institution, email, role) VALUES (?, ?, ?, ?, ?)', (username, password, institution, email, role))
    
    conn.commit()
    conn.close()

def get_user_data(username, password):
    conn = sqlite3.connect('bsl.db')
    c = conn.cursor()

    c.execute('select * from user where username= ? and password = ? ', (username, password))
    data = c.fetchall()
    
    print("DEBUG-GET DATA RESULT: "+str(data))

    conn.commit()
    conn.close()

    return data

def update_password_in_db(email, new_password):
    conn = sqlite3.connect('bsl.db')
    c = conn.cursor()

    c.execute("UPDATE user SET password = ? WHERE email = ?;", (new_password, email))
    
    conn.commit()
    conn.close()

def drop_table():
    conn = sqlite3.connect('bsl.db')
    c = conn.cursor()

    c.execute("drop table if exists user")
    
    conn.commit()
    conn.close()
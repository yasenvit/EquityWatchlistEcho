import pymysql

con = pymysql.connect('localhost', 'root','8251', 'equityDB')

def create_db():
    con = pymysql.connect('localhost', 'root', '8251', 'equityDB')
    with con:
        cur = con.cursor()

        tables = ['positions', 'trades', 'lookuptickers','accounts', ]
        SQL = " DROP TABLE IF EXISTS {};"
        for table in tables:
            cur.execute(SQL.format(table))
       
        accountsSchema = """
        CREATE TABLE accounts (
            pk int NOT NULL AUTO_INCREMENT,
            username VARCHAR(128),
            password_hash VARCHAR(128),
            balance FLOAT(14,2),
            api_key VARCHAR(128),
            PRIMARY KEY (pk)            
        );
        """
        activetickersSchema = """
        CREATE TABLE lookuptickers (
            pk int NOT NULL AUTO_INCREMENT,
            account_pk int,
            symbol_id int,
            ticker VARCHAR(10),
            PRIMARY KEY (pk),
            FOREIGN KEY (account_pk) REFERENCES accounts(pk),
            FOREIGN KEY (symbol_id) REFERENCES symbols(ID)
        );
        """

        positionsSchema = """
        CREATE TABLE positions (
            pk int NOT NULL AUTO_INCREMENT,
            account_pk int, 
            ticker VARCHAR(10),
            shares int,
            PRIMARY KEY (pk),
            FOREIGN KEY (account_pk) REFERENCES accounts(pk)
        );
        """
        tradesSchema = """
        CREATE TABLE trades (
            pk int NOT NULL AUTO_INCREMENT,
            account_pk int, 
            ticker VARCHAR(10),
            volume int,
            price FLOAT(10,2),
            cost FLOAT(14,2),
            time DATETIME,
            PRIMARY KEY (pk),
            FOREIGN KEY(account_pk) REFERENCES accounts(pk)
        );
        """
        schemas = [accountsSchema, activetickersSchema, positionsSchema, tradesSchema]
        for schema in schemas:
            cur.execute(schema)





if __name__ == "__main__":
    create_db()

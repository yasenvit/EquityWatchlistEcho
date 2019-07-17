import pymysql
import app
import datetime
#import time
from app.util import get_price, hash_pass


con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB')

DBNAME = "equityDB"
dt = datetime.datetime.today()

def seed():
    con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB', autocommit = "true")
    with con:
        tables = ['positions', 'trades', 'accounts', 'lookuptickers']
        SQL = "DELETE FROM {};"
        for table in tables:
                cur = con.cursor()
                cur.execute(SQL.format(table))
        
        account = app.Account()
        account.username = "carter"
        account.balance = 1000.0
        account.set_password("mypass")
        account.api_key = '0123456789abcde'
        account.save()

        position = app.Position()
        position.account_pk = 1
        position.ticker = 'tsla'
        position.shares = 5
        position.save()

        trade1 = app.Trade()
        trade1.account_pk = 1
        trade1.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade1.ticker = 'tsla'
        trade1.volume = 10
        trade1.price = app.util.get_price('tsla')
        trade1.cost = -trade1.volume * app.util.get_price('tsla')
        trade1.save()

        trade2 = app.Trade()
        trade2.account_pk = 1
        trade2.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade2.ticker = 'tsla'
        trade2.volume = -5
        trade2.price = app.util.get_price('tsla')
        trade2.cost = -trade2.volume * app.util.get_price('tsla')
        trade2.save()
# 2nd user
        account = app.Account()
        account.username = "vit"
        account.balance = 1000.0
        account.set_password("mypass")
        account.api_key = 'abcde0123456789'
        account.save()

        position = app.Position()
        position.account_pk = 2
        position.ticker = 'f'
        position.shares = 20
        position.save()

        trade3 = app.Trade()
        trade3.account_pk = 2
        trade3.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade3.ticker = 'f'
        trade3.volume = 30
        trade3.price = app.util.get_price('f')
        trade3.cost = -trade3.volume * app.util.get_price('f')
        trade3.save()

        trade4 = app.Trade()
        trade4.account_pk = 2
        trade4.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade4.ticker = 'f'
        trade4.volume = -10
        trade4.price = app.util.get_price('f')
        trade4.cost = -trade4.volume * app.util.get_price('f')
        trade4.save()

if __name__ == "__main__":
    seed()

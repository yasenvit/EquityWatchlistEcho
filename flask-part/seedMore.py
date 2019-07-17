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
        tables = ['positions', 'trades', 'accounts']
        account = app.Account()
        account.username = "vit"
        account.balance = 1000.0
        account.set_password("mypass")
        account.api_key = 'abcde0123456789'
        account.save()

       
        lookupticker1=app.Lookupticker()
        lookupticker1.account_pk = 2
        lookupticker1.ticker = "aapl"
        lookupticker1.symbol_id = 14
        lookupticker1.save()

        lookupticker2=app.Lookupticker()
        lookupticker2.account_pk = 2
        lookupticker2.ticker = "a"
        lookupticker2.symbol_id = 1
        lookupticker2.save()

        lookupticker3=app.Lookupticker()
        lookupticker3.account_pk = 2
        lookupticker3.ticker = "aa"
        lookupticker3.symbol_id = 2
        lookupticker3.save()
        
        position1 = app.Position()
        position1.account_pk = 2
        position1.ticker = 'aapl'
        position1.shares = 120
        position1.save()

   

        trade5 = app.Trade()
        trade5.account_pk = 2
        trade5.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade5.ticker = 'aapl'
        trade5.volume = 150
        trade5.price = app.util.get_price('aapl')
        trade5.cost = -trade5.volume * app.util.get_price('aapl')
        trade5.save()

        trade6 = app.Trade()
        trade6.account_pk = 2
        trade6.time = dt.strftime("%Y-%m-%d %H:%M:%S")
        trade6.ticker = 'aapl'
        trade6.volume = -30
        trade6.price = app.util.get_price('aapl')
        trade6.cost = -trade6.volume * app.util.get_price('aapl')
        trade6.save()

if __name__ == "__main__":
    seed()

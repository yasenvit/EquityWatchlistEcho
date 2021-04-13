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

        lookupticker4=app.Lookupticker()
        lookupticker4.account_pk = 2
        lookupticker4.ticker = "aaba"
        lookupticker4.symbol_id = 4
        lookupticker4.save()

        lookupticker5=app.Lookupticker()
        lookupticker5.account_pk = 2
        lookupticker5.ticker = "aac"
        lookupticker5.symbol_id = 5
        lookupticker5.save()

        lookupticker6=app.Lookupticker()
        lookupticker6.account_pk = 2
        lookupticker6.ticker = "aadr"
        lookupticker6.symbol_id = 6
        lookupticker6.save()

        lookupticker7=app.Lookupticker()
        lookupticker7.account_pk = 2
        lookupticker7.ticker = "aal"
        lookupticker7.symbol_id = 7
        lookupticker7.save()

        lookupticker8=app.Lookupticker()
        lookupticker8.account_pk = 2
        lookupticker8.ticker = "aamc"
        lookupticker8.symbol_id = 8
        lookupticker8.save()

        lookupticker9=app.Lookupticker()
        lookupticker9.account_pk = 2
        lookupticker9.ticker = "aame"
        lookupticker9.symbol_id = 9
        lookupticker9.save()


if __name__ == "__main__":
    seed()

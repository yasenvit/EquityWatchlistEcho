import time
from app.orm import ORM
from app.util import get_price, hash_pass
from app.position import Position
from app.lookupticker import Lookupticker
from app.trade import Trade
import random
import string

SALT = "nobody will ever guess this"

class Account(ORM):
    fields = ["username", "password_hash", "balance", "api_key"]
    table = "accounts"

    def __init__(self):
        self.pk = None
        self.username = None
        self.password_hash = None
        self.balance = None
        self.api_key = None

    def set_password(self, password):
        self.password_hash = hash_pass(password)

    @classmethod
    def login(cls, username, password):
        account = cls.select_one("WHERE password_hash = '{}' AND username = '{}'".format(hash_pass(password), username))
        if not account:
            return None
        else:
            return account
    
    def signUp(self,username, password):
        self.username = username
        self.password = self.set_password(password)
        self.balance = 0
        self.random_generator()
        self.save()

    def deposit(self, amount):
        self.balance += amount
        self.save()

    def get_positions(self):
        """ return a list of each Position object for this user """
        where = "WHERE account_pk = %s"
        values = (self.pk, )
        return Position.select_many(where, values)

    def get_position_for(self, ticker):
        where = "WHERE account_pk = %s AND ticker = %s"
        values = (self.pk, ticker.upper())
        result = Position.select_one(where, values)

        if result:
            return result

        position = Position()
        position.account_pk = self.pk
        position.ticker = ticker.upper()
        position.shares = 0
        return position

    def buy(self, ticker, amount):
        price = get_price(ticker.upper())
        self.balance -= price * amount
        trade = Trade()
        trade.account_pk = self.pk
        trade.ticker = ticker.upper()
        trade.price = price
        trade.volume = amount
        trade.cost = -round(price * amount)
        trade.time = time.time()

        position = self.get_position_for(ticker.upper())
        position.shares += amount
        position.save()
        self.save()
        trade.save()
            
    def sell(self, ticker, amount):
        row = self.get_position_for(ticker.upper())
        result = row.shares
        if result < amount:
            raise ValueError
        price = get_price(ticker.upper())
        self.balance += price * amount

        trade = Trade()
        trade.account_pk = self.pk
        trade.ticker = ticker.upper()
        trade.price = price
        trade.volume = -amount
        trade.cost = price * amount
        trade.time = time.time()

        trade.save()
        self.save()
        
        position = self.get_position_for(ticker.upper())   #deleting position if it's volume = 0
        if position.shares == amount:
            position.delete()
        else:
            position.shares -= amount
            position.save()

    def check_position(self, ticker):
        where = "WHERE account_pk = %s AND ticker = %s"
        values = (self.pk, ticker.upper())
        result = Position.select_one(where, values)
        if result:
            return result
        return None

    def get_trades(self):
        """ return a list of all Trades for this user """
        where = "WHERE account_pk = %s"
        values = (self.pk, )
        return Trade.select_many(where, values)

    def get_trades_for(self, ticker):
        """ return a list of all Trades for a given symbol for this user """
        where = "WHERE account_pk = %s AND ticker = %s"
        values = (self.pk, ticker.upper())
        return Trade.select_many(where, values)
    
    def get_trade_sum(self,ticker):
        tradelist = self.get_trades_for(ticker.upper())
        _sum = 0
        for trade in tradelist:
            _sum = _sum + trade.cost
        return _sum

    @classmethod
    def get_name(cls, newname):
        where = "WHERE username=%s"
        values = (newname,)
        print("account get name function",cls.select_many(where, values))
        return cls.select_many(where, values)
   
    def get_api_key(self):
        where = "WHERE pk=%s"
        values = (self.pk,)
        return self.select_one(where, values)

    def random_generator(self,size=15, chars=string.ascii_uppercase + string.digits):
        key = ''.join(random.choice(chars) for x in range(size))
        self.api_key = key
            
    @classmethod    
    def api_authenticate(cls, api_key):
        account = cls.select_one("WHERE api_key = %s",(api_key,))
        if not account:
            return None
        else:
            return account
        
    def get_positionsCurrCost(self):
        positionsList = self.get_positions()
        _sum = 0
        for position in positionsList:
            positionPrice = get_price(position.ticker.upper())
            _sum = _sum + round(position.shares * positionPrice,2)
        return _sum

    def summary(self):
        positionslist = self.get_positions()
        dictList = []
        for position in positionslist:
            positionValue = get_price(position.ticker) * position.shares
            positionCost = 0
            shares = 0
            for trade in self.get_trades_for(position.ticker):
                positionCost += trade.cost
                shares += trade.volume
            margin = positionValue - abs(positionCost)
            marginPercentage = margin/abs(positionCost)*100
            dictList.append({
                'ticker': position.ticker,
                'shares': shares,
                'positionCost': abs(round(positionCost,2)),
                'positionValue': round(positionValue,2),
                'margin': round(margin,2),
                'marginPercentage': round(marginPercentage,4)
            })
        return dictList
    
    def get_delete_oneormore_symbols(self, symbols):
        symbolslist = []
        for symbol in symbols.split(","):
            symbolslist.append(symbol)
        if len(symbolslist)>1:
            where = "WHERE ticker IN {} and account_pk = %s".format(tuple(symbolslist))
        else:
            where = "WHERE ticker IN ('{}') and account_pk = %s".format(symbols)
        values = (self.pk, )
        return Lookupticker.delete_oneormore(where, values)

    def get_list_id(self):
        where = "WHERE account_pk=%s"
        values = (self.pk)
        lookuptickers = Lookupticker.select_many(where, values)
        listid = []
        for ticker in lookuptickers:
            listid.append(ticker.symbol_id)
        return listid

    def get_list_symbols(self):
        where = "WHERE account_pk=%s"
        values = (self.pk)
        lookuptickers = Lookupticker.select_many(where, values)
        listsymbols = []
        for ticker in lookuptickers:
            listsymbols.append(ticker.ticker)
        return listsymbols

    def get_add_symbol(self, symbol, id):
        lookupticker = Lookupticker()
        lookupticker.ticker = symbol
        lookupticker.symbol_id = id
        lookupticker.account_pk = self.pk
        lookupticker.save()
        

from app import view
from app import account
from app.account import Account
from app import util
import sys
import random

def new_username():
    """checking name if it existing in database. If it's not existing return this name to account creation. It also gives quit option """ 
    while True:
        newname = view.inpt_username().lower()
        if newname == "q":
            return None
        names = Account.get_name(newname)
        nameslist = []
        for name in names:
            nameslist.append(name.username)
        if newname not in nameslist:
            return newname
        else:
            view.another_username()
            continue
        
def pass_condition():
    """ requires create password larger than 6 symbols. It also gives quit option"""
    while True:
        inpass = view.pass_pass()
        if inpass.lower() == "q":
            return None
        elif len(inpass) < 6:
            view.invalid_passlen()
            continue
        else:
            return inpass

def log_in():
    """ log in and sign up options """
    while True:
        chosen = view.menu()
        if chosen == "3":
            view.program_end()
            sys.exit()
        elif chosen == "1":
            inuser = Account()
            name = new_username()                                   #checking name if it exists
            if not name:
                return None
            inuser.username = name
            inpass = pass_condition()                               #checking password required length
            if not inpass:
                return None
            inuser.set_password(inpass)                              #set password
            inuser.balance = 0
            inuser.random_generator()
            inuser.save()
            return inuser
        elif chosen == "2":    
            user = view.log_username().lower()
            psw = view.log_pass()
            inuser = Account.login(user, psw)                       #checking if account exists
            if inuser:
                return inuser
            else:
                view.invalid_cred()                                 # ststing that account doesnt exist. Asking try again
                continue
        else:
            view.invalid_opt() 
            continue


def view_balance(user):                 
    stocklist = user.get_positions()
    _sum = 0
    for stock in stocklist:
        _sum = _sum + stock.shares * util.get_price(stock.ticker)  # calculating costs of all shares
    view.balance_display(user, _sum)                               # printing cash and stocks balances
    while True:
        answer = view.inpt_breakdown().lower()
        if answer == "n":
            break
        elif answer == "y":
            for stock in stocklist:
                tradessum = user.get_trade_sum(stock.ticker)    #getting deifference between purchased and sold stocks - i.e. how much we invested in this position
                view.breakdown_stock(stock, tradessum)          #printing all tickers with volume and current cost
            break
        else:
            view.invalid_opt
            continue

def list_ten():
    validlist = ["1","2","3","4","5","6"]
    while True:
        answer = view.inpt_criteria()               #input criterion to look up stocks on marketplace
        if answer == "9":
            break
        elif answer == "8":
            ticker = view.inpt_ticker().upper()
            report = util.get_price(ticker)
            if report == None:
                view.invalid_stock()
                break
            view.display_price(ticker, report)
        elif answer == "7":
            ticker = view.inpt_ticker().upper()
            report = util.stock_info(ticker)        #taking info about stock, requested stock/previous
            if report == None:
                view.invalid_stock(ticker)
                continue
            view.print_dict_col(report)
        elif answer not in validlist:
            view.invalid_opt()
            continue
        else:
            report = util.get_ten_stocks(answer)    #pulling requested report
            if len(report) == 0:
                view.no_report()
                continue
            else:
                for obj in report:                  #printing report with selected fields
                    indict = {}
                    indict["symbol"] = report[report.index(obj)]["symbol"]
                    indict["companyName"] = report[report.index(obj)]["companyName"]
                    indict["sector"] = report[report.index(obj)]["sector"]
                    indict["latestPrice"] = report[report.index(obj)]["latestPrice"]
                    indict["changePercent"] = report[report.index(obj)]["changePercent"]
                    view.print_dict_row(indict)
    
def buy_stock(user):
    ticker = view.inpt_ticker().upper()
    existticker = util.stock_info(ticker)            #checking if ticker exists
    if existticker is not None:
        qty = view.inpt_qty()
        if qty > 0:                            
            try:                                    #it wouldn't happen but it's raise exeption if something wrong with transaction
                user.buy(ticker, qty)               #actual buying
                view.buy_stat(user,ticker,qty)      #stating completed
            except ValueError:
                view.trans_failed()
        else:
            view.negative_value()
    else:
        view.invalid_stock(ticker)

def sell_stock(user):
    ticker = view.inpt_ticker().upper()     
    accticker = user.check_position(ticker)              #checking if ticker exists
    if accticker is not None:
        qty = view.inpt_qty()
        if qty > 0:
            try:                                        #it wouldn't happen but it's raise exeption if something wrong with transaction
                user.sell(ticker, qty)                  #actual selling
                view.sell_stat(user,ticker,qty)          #stating if completed
            except ValueError:
                view.trans_failed()
        else:
            view.negative_value()
    else:
        view.not_have(ticker)
 
def make_deposit(user):
    amount = view.inpt_deposit()
    if amount > 0:
        user.deposit(amount)
        view.deposit_stat(user, amount)
    else:
        view.negative_value()

def trade_history(user):
    buysum = 0
    sellsum = 0
    transactions = user.get_trades()                             #getting all trades
    for transaction in transactions:
        if transaction.volume < 0:
            sellsum += transaction.price * transaction.volume    #calculating income cashflow from sales 
        else:
            buysum += transaction.price * transaction.volume     #calculating outcome cashflow from all purchases
    view.history_title(user, buysum, sellsum)                    #printing summary
    for transaction in transactions:                             #printing all trades
        view.transaction_print(transaction) 

def operational_menu(user):
    while True:
        answer = view.operational_menu_inpt()
        if answer == "1":
            view_balance(user)
            continue
        elif answer == "2":
            list_ten()
            continue
        elif answer == "3":
            buy_stock(user)
            continue
        elif answer == "4":
            sell_stock(user)
            continue
        elif answer == "5":
            make_deposit(user)
            continue
        elif answer == "6":
            trade_history(user)
            continue
        elif answer == "7":
            acc = user.get_api_key()
            view.lookup_apikey(acc.api_key)
        elif answer == "8":
            break
        else:
            view.invalid_opt()
            continue

def run():
    view.placeholder()
    while True:
        inuser = log_in()
        if not inuser:
            run()
        else:
            operational_menu(inuser)
    operational_menu_inpt
import requests
import hashlib
import json
import json
import pymysql
from decimal import Decimal
from datetime import datetime  
from datetime import timedelta  
from datetime import date
from app import utilDB

con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB')

ENDPOINT1 = "https://api.iextrading.com/1.0" 
ENDPOINT2 = "https://cloud.iexapis.com/stable"
def token():
    with open("../../api.json", "r") as file_object:
        credencials = json.load(file_object)
    return "token={}".format(credencials["secret_token"])
TOKEN = token()


#ENDPOINT2 = "https://cloud.iexapis.com/v1"

salt = "its a secret to everyone"

def hash_pass(password):
    # salted 128 character hash of a string
    hasher = hashlib.sha512()
    value = password.encode() + salt.encode()
    hasher.update(value)
    return hasher.hexdigest()

def get_price(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2+ "/stock/{}/price?".format(symbol) + token)
    if response.status_code == 200:
        return float(response.text)
    return None  

def get_previous_price(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2+ "/stock/{}/previous?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    return None

def get_company(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/{}/company?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    return None

def get_quote(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 +"/stock/{}/quote?".format(symbol) + token)
    response.raise_for_status()
    if response.status_code == 200:
        return response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))

def get_multiQuotes(symbols,token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/market/batch?symbols={}&types=quote&".format(symbols) + token)
    if response.status_code == 200:
        return response.json()
    else:
        return requests.ConnectionError('http status: ' + format(response.status_code))

def list_ten(criteria, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/market/list/{}?".format(criteria) + token)
    if response.status_code == 200:
        return response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))

def get_online_data(symbol, fromdate, todate, token=TOKEN):
    fromdate_obj = datetime.strptime(fromdate,'%Y%m%d')
    todate_obj = datetime.strptime(todate,'%Y%m%d')
    onlinedata = []
    while fromdate_obj <= todate_obj:
        response = requests.get(ENDPOINT2 + "/stock/{}/chart/date/{}?".format(symbol, fromdate_obj) + token)
        if response.status_code == 200:
            if fromdate_obj.weekday() == 5 or fromdate_obj.weekday() == 6:
                pass
            else:
                onlinedata.append(response.json())
            fromdate_obj = fromdate_obj + timedelta(days=1)
        else:
            raise requests.ConnectionError('http status: ' + format(response.status_code))

    return onlinedata

def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

def get_batchonline_data(symbol, days, token=TOKEN):
    if isfloat(days):	
        if int(days) >1095:	
            period = "5y"	
        elif int(days) >730:	
            period = "3y"	
        elif int(days) >365:	
            period = "2y"	
        elif int(days) >180:	
            period = "1y"	
        elif int(days) >90:	
            period = "6m"	
        elif int(days) >30:	
            period = "3m"	
        elif int(days)>5:	
            period = "1m"	
        elif int(days)>1:	
            period = "5d"	
        else:
            period = "1d"	
    else:
        return []
    response = requests.get(ENDPOINT2 + "/stock/{}/chart/{}?".format(symbol, period) + token)
    if response.status_code == 200:
        result = response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))
   
    return result

def get_eps(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/{}/earnings?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def get_stats(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/{}/stats?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def get_online_data(symbol, fromdate, todate, token=TOKEN):
    fromdate_obj = datetime.strptime(fromdate,'%Y%m%d')
    todate_obj = datetime.strptime(todate,'%Y%m%d')
    onlinedata = []
    while fromdate_obj <= todate_obj:
        response = requests.get(ENDPOINT2 + "/stock/{}/chart/date/{}?chartByDay=true&".format(symbol, datetime.strftime(fromdate_obj,'%Y%m%d')) + token)

        if response.status_code == 200:
            if fromdate_obj.weekday() == 5 or fromdate_obj.weekday() == 6:
                pass
            else:
                if response.json():
                    onlinedata.append(response.json()[0])
            fromdate_obj = fromdate_obj + timedelta(days=1)
        else:
            pass
    return onlinedata


    
  #curl 'https://cloud.iexapis.com/stable/stock/aapl/quote?token=YOUR_TOKEN'
#https://cloud.iexapis.com/stable/stock/tsla/chart/date/20190109?chartByDay=true&token=sk_9a7597da513f48778f2f7176ad8d339d



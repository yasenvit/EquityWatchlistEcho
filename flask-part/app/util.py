import requests
import hashlib
import json

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

def get_eps(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/{}/earnings?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))

"{'symbol':'AAPL','earnings':[{'actualEPS':2.46,'consensusEPS':2.36,'announceTime':'AMC','numberOfEstimates':34,'EPSSurpriseDollar':0.1,'EPSReportDate':'2019-04-30','fiscalPeriod':'Q1 2019','fiscalEndDate':'2019-03-31','yearAgo':2.73,'yearAgoChangePercent':-0.0989}]}"


def get_stats(symbol, token=TOKEN):
    response = requests.get(ENDPOINT2 + "/stock/{}/stats?".format(symbol) + token)
    if response.status_code == 200:
        return response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))


    
  #curl 'https://cloud.iexapis.com/stable/stock/aapl/quote?token=YOUR_TOKEN'



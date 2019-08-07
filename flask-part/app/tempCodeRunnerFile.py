import json
import pymysql
from decimal import Decimal
from datetime import datetime  
from datetime import timedelta  
from datetime import date
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

con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB')

start = (datetime.now() - timedelta(days=3)) 
end = (datetime.now() - timedelta(days=2))
now = datetime.now()
# print(now)
datetime_object = datetime.now()
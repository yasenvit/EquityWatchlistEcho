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
# print(datetime_object)
date_object = date.today()
today = str(date.today())
# print(today)




datepoint = (date.today() - timedelta(days=30))
datepoint2 = (date.today() - timedelta(days=15))
diff = datepoint2-datepoint
print(diff.days)
print(date.today())
print(datetime.strftime(date.today(),'%Y%m%d'))
print(datepoint)
date = datetime.now()
print(datetime.now().year)
print(date.year)
print(datetime_object.weekday())
print(date.weekday())

mylist = [{'date': 1, "some":"some"},{ 'date': 2,"some":"some"},{ 'date': 3,"some":"some"},{ 'date': 4,"some":"some"},{ 'date': 5,"some":"some"},{'date': 6,"some":"some"},{'date': 7,"some":"some"}]
print(len(mylist))
n=3
g = mylist[:-n]
t = mylist[n+1:]
print(g)
print(t)

x="2019-08-08"
f=x.replace("-","")
print(f)

a = datetime.now().date().replace(month=1, day=1) 
print(a)
g=()
if g is True:
    print("true")
elif g is False:
    print("false")
else:
    print("hz")
tu = (("a",),("b",),("c",))
print(type(tu))
g=list(tu)
print(g, type(g))
# tu = None
if tu and len(tu) > 0:
    print("cool")
else:
    print("fiii")
l=[1,2,3]
k=["er","rt","ty"]

startPoint = datetime.strptime("20190705",'%Y%m%d')
print("tt", startPoint.date())
fullonlinedata = [[{'date': '2019-08-05', 'uClose': 193.34, 'uOpen': 197.99, 'uHigh': 198.65, 'uLow': 192.58, 'uVolume': 52392969, 'close': 193.34, 'open': 197.99, 'high': 198.65, 'low': 192.58, 'volume': 52392969, 'change': 0, 'changePercent': 0, 'label': 'Aug 5', 'changeOverTime': 0}], [{'date': '2019-08-06', 'uClose': 197, 'uOpen': 196.31, 'uHigh': 198.07, 'uLow': 194.04, 'uVolume': 35824787, 'close': 197, 'open': 196.31, 'high': 198.07, 'low': 194.04, 'volume': 35824787, 'change': 3.66, 'changePercent': 1.893, 'label': 'Aug 6', 'changeOverTime': 0.01893}]]
for item in fullonlinedata:
    print(item[0]["date"])
from flask import jsonify, request
from flask_app import app
from app import util, utilDB, Account
from requests.exceptions import ConnectionError
import json

UNATHORIZED = {'error':'unathorized', 'status code':'401'}
NOT_FOUND = {'error':'not found', 'status code':'404'}
APP_ERROR = {'error':'application error', 'status code':'500'}
BAD_REQUEST = {'error':'bad request', 'status code':'400'}

@app.errorhandler(404)
def error404(e):
    return jsonify(NOT_FOUND), 404

@app.errorhandler(500)
def error500(e):
    return jsonify(APP_ERROR), 500

@app.route('/')
def root():
    return jsonify({'name':'ProReplica'})


@app.route('/api/stock/<symbol>/price')
def getPrice(symbol):
    price = util.get_price(symbol)
    return price

@app.route('/api/stock/<symbol>/company')  #?
def getCompany(symbol):
    company = util.get_company(symbol)
    if not company:
        return jsonify(BAD_REQUEST), 400
    return jsonify(company)

@app.route('/api/stock/<symbol>/quote')
def getQuote(symbol):
    quote = util.get_quote(symbol)
    if not quote:
       return jsonify(BAD_REQUEST), 400
    return jsonify({"quote":quote})

@app.route('/api/list/<symbols>/quote')
def getMultiQuotes(symbols):
    response = util.get_multiQuotes(symbols)
    if not response:
       return jsonify(BAD_REQUEST), 400
    result = []
    for item in response:
        result.append(response[item]["quote"])
    quotes = {"quotes":result}
    return jsonify(quotes)

"""{"AAPL":{"quote":{"symbol":"AAPL","companyName":"Apple"""

@app.route('/api/stocks/list/<criteria>')
def get_listTen(criteria):
    listTen = util.list_ten(criteria)
    if not listTen:
        return jsonify(APP_ERROR), 500
    return jsonify({criteria : listTen})
    
#####################################################################

@app.route('/api/signup', methods=['POST'])
def signUp():
    if not request.json or 'username' not in request.json or 'password' not in request.json:
        return jsonify(BAD_REQUEST), 400
    username = request.json["username"]
    password = request.json["password"]
    checking = Account.get_name(username)
    if len(checking) > 0:
        return jsonify(BAD_REQUEST), 500
    new = Account()
    new.signUp(username, password)
    new.save()
    return jsonify({
        'username': new.username,
        'api_key': new.api_key
    })


@app.route('/api/get_api_key', methods=['POST'])
def get_api_key():
    if not request.json or 'username' not in request.json or\
        'password' not in request.json:
        return jsonify(BAD_REQUEST), 400
    account = Account.login(request.json["username"], request.json["password"])
    if not account:
        return jsonify(UNATHORIZED), 401
    return jsonify({
        'username': account.username,
        'api_key': account.api_key
    })

@app.route('/api/active/add/<symbol>')  
def record(symbol):
    result = utilDB.mySQLrecord(symbol)
    if not result:
       return jsonify(BAD_REQUEST), 400
    return jsonify(result)

@app.route('/api/active/delete/<symbol>')  
def delete(symbol):
    result = utilDB.deleteActive(symbol)
    if not result:
       return jsonify(APP_ERROR), 400
    return jsonify(result)

@app.route('/api/active/list')
def getList():
    result = utilDB.get_list()
    if not result:
        return jsonify(BAD_REQUEST), 400
    return jsonify(result)

@app.route('/api/stocks/all')
def getStocksAll():
    result = utilDB.getStocksAll()
    if not result:
        return jsonify(BAD_REQUEST), 400
    return jsonify(result)

##############################################



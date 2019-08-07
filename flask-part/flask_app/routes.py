from flask import jsonify, request
from flask_app import app
from app import util, utilDB, Account
from requests.exceptions import ConnectionError
import json
import datetime
from datetime import timedelta
from datetime import date
from datetime import datetime



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
    return jsonify({"listTen": listTen})

@app.route('/api/stock/<symbol>/stats')
def get_stats(symbol):
    eps = util.get_eps(symbol)
    if not eps:
        return jsonify(APP_ERROR), 500
    stats = util.get_stats(symbol)
    return jsonify({"stats": stats, "eps": eps["earnings"][0]})


   
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

@app.route('/api/<api_key>/active/list')
def getList(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    result = account.get_list_symbols()
    if not result:
        return jsonify(BAD_REQUEST), 400
    return jsonify({'symbols':result})

@app.route('/api/stocks/all')
def getStocks_All():
    result = utilDB.getStocksAll()
    if not result:
        return jsonify(APP_ERROR), 500
    mapresult = map(lambda x:{"value":str(x[0]),"label":str(x[0])},result)
    # print("\n\nmapresult\n\n",list(mapresult),"\n\n\n")
    return jsonify(list(mapresult))

##############################################

@app.route('/api/<api_key>/active/delete/<symbols>')  
def delete_oneormore(api_key,symbols):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    result = account.get_delete_oneormore_symbols(symbols)
    if not result:
       return jsonify(APP_ERROR), 400
    return jsonify({"symbols":result})

@app.route('/api/<api_key>/active/add/<symbol>')  
def record(api_key,symbol):
    if not symbol:
        return jsonify({"error": "select symbol"})
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    if not symbol:
        return jsonify(BAD_REQUEST), 400                        #-?
    symbol_id = utilDB.get_symbolID(symbol)
    if symbol_id == None:
        return jsonify(BAD_REQUEST), 400
    criterialist = account.get_list_id()
    if symbol_id in criterialist:
        return jsonify({"error": "You have already added this ticker"})
    account.get_add_symbol(symbol, symbol_id)
    symbolslist = account.get_list_symbols()
    if not symbolslist:
        return jsonify(APP_ERROR), 400
    return jsonify({"symbols":symbolslist, "error":""})



@app.route('/api/chart/range/<symbol>/<fromdate>/<todate>')
def custom_chart_data(symbol, fromdate, todate):
    if not symbol:
        return jsonify(BAD_REQUEST), 400                        #-?
    symbol_id = utilDB.get_symbolID(symbol)
    if not symbol_id:
        return jsonify(BAD_REQUEST), 400
    result = utilDB.get_db_data(symbol_id,fromdate,todate)
    if not result:
        return jsonify({"error": "no historical data for this ticker"}), 400
    return jsonify({"data":result, "error":""})


@app.route('/api/chart/<symbol>/<days>')
def chart_data(symbol, days):
    if not symbol:
        return jsonify(BAD_REQUEST), 400                        #-?
    symbol_id = utilDB.get_symbolID(symbol)
    if not symbol_id:
        return jsonify(APP_ERROR), 500
    LR = utilDB.find_lastdate(symbol_id)
    if not LR:
        print("\n\nCONDITION: NOT LR\n\n")
        fullonlinedata = util.get_batchonline_data(symbol,"1825")
        utilDB.data_record(symbol_id, fullonlinedata)
        LR = utilDB.find_lastdate(symbol_id)
    nextafterLR = LR + timedelta(days=1)
    print("nextafterLR==>>", nextafterLR)
    if days == "ytd":
        startPoint = datetime.now().date().replace(month=1, day=1) 
        endPoint = date.today()-timedelta(days=1)
        
        print("YTD startPoint->", startPoint)
        print("YTD endpoint->",endPoint)
    else:
        endPoint = date.today()-timedelta(days=1)
        startPoint = endPoint - timedelta(days=int(days))
        
        print("Reg startPoint->", startPoint)
        print("Reg endpoint->",endPoint)
    # ----checked this block---------
    if endPoint <= LR:
        dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),datetime.strftime(endPoint,'%Y%m%d'))
        print("\n\nCONDITION: endPoint <= LR\n","dataToDisplay Start",dbdata[0], "\ndataToDisplay End",dbdata[-1],"\n\n")
        return jsonify({"data": dbdata,"error": ""})
    #-----------------------------------
    # ----checked this block---------
    elif  endPoint > LR and startPoint <= LR:
        diff = (endPoint - LR).days
        if diff < 20:
            print("diff<20 ->",diff)
            dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),datetime.strftime(LR,'%Y%m%d'))
            fullonlinedata = util.get_online_data(symbol, datetime.strftime(nextafterLR,'%Y%m%d'), datetime.strftime(endPoint,'%Y%m%d'))
            print("fullonlinedata----------", fullonlinedata)
            if not fullonlinedata:
                onlinedata = []
            else:
                onlinedata = []
                for item in fullonlinedata:
                    onlinedata.append([item[0]["date"], item[0]["close"]])
                dbdata.extend(onlinedata)
            utilDB.data_record(symbol_id, fullonlinedata) #recording
            print("\n\nCONDITION: endPoint > LR and startPoint <= LR, DIFF<20\n\n","dataToDisplay ",dbdata, "\ndataTorecord ",fullonlinedata,"\n\n")
            return jsonify({"data":dbdata,"error": ""})
        else:
    #-------------------------------------------------------
    # ----checked this block--------------------------------
            print("diff>20 ->",diff)
            alldata = util.get_batchonline_data(symbol, diff)
            onlinedata = []
            LRindex=0
            for item in alldata:
                onlinedata.append([item["date"], item["close"]])
                if item["date"] == datetime.strftime(LR,'%Y-%m-%d'):
                    LRindex = alldata.index(item)
            onlineslice = onlinedata[LRindex+1:]
            dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),\
                datetime.strftime(LR,'%Y%m%d'))
            dbslice = []
            for item in dbdata:
                dbslice.append([datetime.strftime(item[0],'%Y-%m-%d'), item[1]])
            dataToDisplay = []
            dataToDisplay.extend(dbslice)
            dataToDisplay.extend(onlineslice)
            utilDB.data_record(symbol_id, alldata[LRindex+1:])        #recording
            print("\n\nCONDITION: endPoint > LR and startPoint <= LR, DIFF>20\n\n","strtDis", dataToDisplay[0], "\nendDisp", dataToDisplay[-1], "\nstrtRec", onlineslice[0], "\nendRec", onlineslice[-1],"\n\n")
            return jsonify({"data":dataToDisplay,"error": ""})
    #----------------------------------------------------------------
    elif startPoint > LR:
        diff = (endPoint - LR).days
        alldata = util.get_batchonline_data(symbol, diff)
        onlinedata = []
        startPointIndex = 0
        LRindex = 0
        for item in alldata:
            onlinedata.append([item["date"], item["close"]])
            if item["date"] == datetime.strftime(startPoint,'%Y-%m-%d'):
                startPointIndex = alldata.index(item)
            elif item["date"] == datetime.strftime(LR,'%Y-%m-%d'):
                LRindex = alldata.index(item)
        
        dataToDisplay = onlinedata[startPointIndex:]
        dataToRecord = alldata[LRindex+1:]
        utilDB.data_record(symbol_id, dataToRecord)  #recording
        print("\n\n CONDITION: startPoint > LR\n\n","strtDis", dataToDisplay[0], "\nendDisp", dataToDisplay[-1], "\nstrtRec", dataToRecord[0], "\nendRec", dataToRecord[-1],"\n\n")
        return jsonify({"data":dataToDisplay,"error": ""})

# ****************CUSTOM RANGE********************************

@app.route('/api/chart/<symbol>/range/<fromdate>/<todate>')
def range_chart_data(symbol, fromdate, todate):
    if not symbol:
        return jsonify(BAD_REQUEST), 400                        #-?
    symbol_id = utilDB.get_symbolID(symbol)
    if not symbol_id:
        return jsonify(APP_ERROR), 500
    LR = utilDB.find_lastdate(symbol_id)
    if not LR:
        print("\n\nCONDITION: NOT LR\n\n")
        fullonlinedata = util.get_batchonline_data(symbol,"1825")
        utilDB.data_record(symbol_id, fullonlinedata)
        LR = utilDB.find_lastdate(symbol_id)
    nextafterLR = LR + timedelta(days=1)
    print("nextafterLR==>>", nextafterLR)
    
    startPoint = datetime.strptime(fromdate,'%Y%m%d').date()
    endPoint = datetime.strptime(todate,'%Y%m%d').date()
    
        
    print("Reg startPoint->", startPoint)
    print("Reg endpoint->",endPoint)
    
    if endPoint <= LR:
        dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),datetime.strftime(endPoint,'%Y%m%d'))
        print("\n\nCONDITION: endPoint <= LR\n","dataToDisplay Start",dbdata[0], "\ndataToDisplay End",dbdata[-1],"\n\n")
        return jsonify({"data": dbdata,"error": ""})
    
    # ----need to check this block----
    elif  endPoint > LR and startPoint <= LR:
        diff = (endPoint - LR).days
        if diff < 20:
            print("diff<20 ->",diff)
            dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),datetime.strftime(LR,'%Y%m%d'))
            fullonlinedata = util.get_online_data(symbol, datetime.strftime(nextafterLR,'%Y%m%d'), datetime.strftime(endPoint,'%Y%m%d'))
            print("fullonlinedata----------", fullonlinedata)
            if not fullonlinedata:
                onlinedata = []
            else:
                onlinedata = []
                for item in fullonlinedata:
                    onlinedata.append([item[0]["date"], item[0]["close"]])
                dbdata.extend(onlinedata)
            utilDB.data_record(symbol_id, fullonlinedata) #recording
            print("\n\nCONDITION: endPoint > LR and startPoint <= LR, DIFF<20\n\n","dataToDisplay ",dbdata, "\ndataTorecord ",fullonlinedata,"\n\n")
            return jsonify({"data":dbdata,"error": ""})
        else:
            # *********************checked*********************************
            print("diff>20 ->",diff)
            alldata = util.get_batchonline_data(symbol, diff)
            onlinedata = []
            LRindex=0
            for item in alldata:
                onlinedata.append([item["date"], item["close"]])
                if item["date"] == datetime.strftime(LR,'%Y-%m-%d'):
                    LRindex = alldata.index(item)
            onlineslice = onlinedata[LRindex+1:]
            dbdata = utilDB.get_db_data(symbol_id,datetime.strftime(startPoint,'%Y%m%d'),\
                datetime.strftime(LR,'%Y%m%d'))
            dbslice = []
            for item in dbdata:
                dbslice.append([datetime.strftime(item[0],'%Y-%m-%d'), item[1]])
            dataToDisplay = []
            dataToDisplay.extend(dbslice)
            dataToDisplay.extend(onlineslice)
            utilDB.data_record(symbol_id, alldata[LRindex+1:])        #recording
            print("\n\nCONDITION: endPoint > LR and startPoint <= LR, DIFF>20\n\n","strtDis", dataToDisplay[0], "\nendDisp", dataToDisplay[-1], "\nstrtRec", onlineslice[0], "\nendRec", onlineslice[-1],"\n\n")
            return jsonify({"data":dataToDisplay,"error": ""})
            #*********************************************************
    elif startPoint > LR:
        diff = (endPoint - LR).days
        alldata = util.get_batchonline_data(symbol, diff)
        onlinedata = []
        startPointIndex = 0
        LRindex = 0
        for item in alldata:
            onlinedata.append([item["date"], item["close"]])
            if item["date"] == datetime.strftime(startPoint,'%Y-%m-%d'):
                startPointIndex = alldata.index(item)
            elif item["date"] == datetime.strftime(LR,'%Y-%m-%d'):
                LRindex = alldata.index(item)
        
        dataToDisplay = onlinedata[startPointIndex:]
        dataToRecord = alldata[LRindex+1:]
        utilDB.data_record(symbol_id, dataToRecord)  #recording
        print("\n\n CONDITION: startPoint > LR\n\n","strtDis", dataToDisplay[0], "\nendDisp", dataToDisplay[-1], "\nstrtRec", dataToRecord[0], "\nendRec", dataToRecord[-1],"\n\n")
        return jsonify({"data":dataToDisplay,"error": ""})





# ***********************************************
# @app.route('/api/onlinechart/range/<symbol>/<fromdate>/<todate>')
# def online_chart_data(symbol, fromdate, todate):
#     result = util.get_online_data(symbol,fromdate,todate)
#     if not result:
#         return jsonify({"error": "no historical data for this ticker"}), 400
#     return jsonify({"data":result, "error":""})


@app.route('/api/db/chart/<symbol>/lastdate')
def find_last(symbol):
    if not symbol:
        return jsonify(BAD_REQUEST), 400                        #-?  
    symbol_id = utilDB.get_symbolID(symbol)
    if not symbol_id:
        return jsonify(BAD_REQUEST), 400
    result = utilDB.find_lastdate(symbol_id)
    if not result:# or len(result)==0:
        return jsonify(BAD_REQUEST), 400
    return jsonify({"lastdate":result, "error":""})


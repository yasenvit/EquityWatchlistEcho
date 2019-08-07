#!/usr/bin/python3
# -*- coding: utf-8 -*-
from app import util 
import json
import pymysql
from decimal import Decimal
from decimal import Decimal
import datetime
from datetime import timedelta
from datetime import date


con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB')

"""
CREATE TABLE lookuptickers (
            pk int NOT NULL AUTO_INCREMENT,
            account_pk int,
            symbol_id int,
            ticker VARCHAR(10),
            PRIMARY KEY (pk),
            FOREIGN KEY (account_pk) REFERENCES accounts(pk),
            FOREIGN KEY (symbol_id) REFERENCES symbols(ID)
        );
"""

def get_symbolID(symbol):
    print("\n\n\getSymbol-symbol input\n", symbol)
    if not symbol:
        return None
    with con:
        cur = con.cursor()
        cur.execute("SELECT ID FROM symbols WHERE symbol=%s",symbol)
        tupleID = cur.fetchone()
        print("\n\ntupleID", tupleID,"\n\n\n")
        if tupleID and len(tupleID) > 0:
            return tupleID[0]
        return None
        
def getStocksAll():
    with con:
        cur = con.cursor()
        cur.execute("SELECT symbol FROM symbols")
        symbols = cur.fetchall()
        if symbols and len(symbols) >0:
            return symbols
        return None

def get_db_one(table, symbol):
    with con:
        cur = con.cursor()
        SQLcol = """SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE TABLE_NAME='{}' AND TABLE_SCHEMA = 'equityDB'""".format(table)
        cur.execute(SQLcol)
        columnNames = []
        for columnName in cur.fetchall():
                columnNames.append(*columnName)
        SQL = "SELECT * FROM {} WHERE symbol='{}';".format(table,symbol)
        cur.execute(SQL)
        row_result = cur.fetchall()
        result = []
        for res in list(row_result[0]):
                if type(res) is Decimal:
                        result.append(float(res))
                else:
                        result.append(res)
        resultDict = {}
        for columnName in columnNames:
                index = columnNames.index(columnName)
                resultDict[columnName]=result[index]
        return resultDict
        
def get_db_many(table, where_clause):
    with con:
        cur = con.cursor()
        SQLcol = """SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE TABLE_NAME='{}' AND TABLE_SCHEMA = 'equityDB'""".format(table)
        cur.execute(SQLcol)
        columnNames = []
        for columnName in cur.fetchall():
                columnNames.append(*columnName)
        SQL = "SELECT * FROM {} {};".format(table,where_clause)
        cur.execute(SQL)
        row_results = cur.fetchall()
        dbdata = []
        for row_result in row_results:
                resultDict = {}
                for columnName in columnNames:
                        index = columnNames.index(columnName)
                        if type(row_result[index]) is Decimal:
                                resultDict[columnName]=float(row_result[index])
                        else:
                                resultDict[columnName]=row_result[index]
                dbdata.append(resultDict)
        return dbdata

def SQLrecord(columns, values):
    with con:
        cur = con.cursor()
        inpcolumns = ", ".join(columns)
        inpvalues = tuple(values)
        raw_sql = "INSERT INTO probe ({0}) VALUES ".format(inpcolumns)
        sql = raw_sql + "{0}".format(inpvalues)
        cur.execute(sql)

def data_record(symbol_id,data):
        if data:
                colnames = ["date","open","high","low","close","volume","unadjustedVolume","change",\
                        "changePercent","vwap","label","changeOverTime"]
                objlist = []
                for obj in data:
                        values = []
                        columns = []
                        for colname in colnames:
                                
                                if colname == "unadjustedVolume" or colname == "vwap":
                                        values.append(0)
                                        columns.append(colname)
                                elif colname == "change":
                                        values.append(obj[0][colname])
                                        columns.append("`change`")
                                else:
                                        values.append(obj[0][colname])
                                        columns.append(colname)
                                        print('\n\n\nOBJECT RECORD',obj[0][colname] , "\n\n\n")
                        values.append(symbol_id)
                        columns.append("ID")
                        SQLrecord(columns, values)
                        objlist.append(values)
 
def get_db_data(symbol_id,fromdate,todate):
    fromdate_obj = datetime.datetime.strptime(fromdate,'%Y%m%d')
    todate_obj = datetime.datetime.strptime(todate,'%Y%m%d')
    with con:
        cur = con.cursor()
        SQL="""SELECT  date,close FROM probe WHERE ID={} 
                AND date>='{}' AND date<='{}';""".format(symbol_id,fromdate,todate)
        cur.execute(SQL)
        dbdata = []
        row_results = cur.fetchall()
        for row_result in row_results:
                itemlist = []
                for i in row_result:
                        if type(i) is Decimal:
                                itemlist.append(float(i))
                        else:
                                itemlist.append(i)
                dbdata.append(itemlist)
        return dbdata

def find_lastdate(symbol_id):
    print("\n\n\nsymbol:find lastdate\n", symbol_id,"\n\n\n")
    with con:
        cur = con.cursor()
        SQL="""SELECT date FROM probe WHERE ID={} AND date =(SELECT max(date) FROM probe);""".format(symbol_id)
        cur.execute(SQL)
        row_results = cur.fetchone()
        if not row_results:
                return None
        print("\n\LR:\n",row_results,"\n")
        return row_results[0]




"""
MAX DATE QUERY: 
SELECT * FROM charts WHERE ID=14 AND Date IN (SELECT max(Date) FROM charts);- 9sec
SELECT date FROM charts WHERE ID=14 AND date = (SELECT MAX(date) FROM charts) - 9sec

SELECT * FROM charts WHERE (ID, Date) IN (SELECT ID, Max(Date) FROM charts GROUP BY ID)
from min:
----------
SELECT TOP ID, close,label, date
FROM charts
WHERE id = 14
ORDER BY Date
-----------
2014-06-09
"""
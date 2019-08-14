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
        print("getSymbol=>", symbol)
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                print("SELECT ID FROM symbols WHERE symbol='{}'".format(symbol))
                cur.execute("SELECT ID FROM symbols WHERE symbol='{}'".format(symbol))
                tupleID = cur.fetchone()
                print("\ntupleID->", tupleID,"\n")
                if tupleID:
                        return tupleID[0]
                return []
        
def getStocksAll():
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                cur.execute("SELECT symbol FROM symbols")
                symbols = cur.fetchall()
                if symbols:
                        return symbols
                return None

def get_db_one(table, symbol):
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
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
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
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
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                inpcolumns = ", ".join(columns)
                inpvalues = tuple(values)
                raw_sql = "INSERT INTO charts ({0}) VALUES ".format(inpcolumns)
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
                                        values.append(obj[colname])
                                        columns.append("`change`")
                                else:
                                        values.append(obj[colname])
                                        columns.append(colname)
                        values.append(symbol_id)
                        columns.append("ID")
                        SQLrecord(columns, values)
                        objlist.append(values)
 
def get_db_data(symbol_id,fromdate,todate):
        fromdate_obj = datetime.datetime.strptime(fromdate,'%Y%m%d')
        todate_obj = datetime.datetime.strptime(todate,'%Y%m%d')
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                SQL="""SELECT  date,close FROM charts WHERE ID={} 
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
        print("\n\nfind lastdate for->\n", symbol_id,"\n\n")
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                SQL="""SELECT max(date) FROM charts WHERE ID={};""".format(symbol_id)
                cur.execute(SQL)
                row_results = cur.fetchone()
                if not row_results:
                        return None
                return row_results[0]

def get_logo(symbol_id):
        with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
                cur.execute("SELECT url FROM logo WHERE ID={}".format(symbol_id))
                tupleLogo = cur.fetchone()
                if tupleLogo:
                        return tupleLogo[0]
                return None
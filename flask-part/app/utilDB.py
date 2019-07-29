#!/usr/bin/python3
# -*- coding: utf-8 -*-
import json
import pymysql
from decimal import Decimal

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
    with con:
        cur = con.cursor()
        cur.execute("SELECT ID FROM symbols WHERE symbol=%s",symbol)
        tupleID = cur.fetchone()
        if not tupleID:
                return None
        ID = tupleID[0]
        return ID

def getStocksAll():
    with con:
        cur = con.cursor()
        cur.execute("SELECT symbol FROM symbols")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append({"value":str(*sym), "label": str(*sym)})
        return {"selectSymbols":result}

# def getStats(symbol, table="stats"):
#     with con:
#         cur = con.cursor()
#         SQLcol = """SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
#                     WHERE TABLE_NAME='{}' AND TABLE_SCHEMA = 'equityDB'""".format(table)
#         cur.execute(SQLcol)
#         columnNames = []
#         for columnName in cur.fetchall():
#                 columnNames.append(*columnName)
#         SQL = "SELECT * FROM stats WHERE symbol='{}';".format(symbol)
#         cur.execute(SQL)
#         row_result = cur.fetchall()
#         result = []
#         for res in list(row_result[0]):
#                 if type(res) is Decimal:
#                         result.append(float(res))
#                 else:
#                         result.append(res)
#         resultDict = {}
#         for columnName in columnNames:
#                 index = columnNames.index(columnName)
#                 resultDict[columnName]=result[index]
#         return resultDict

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
        # print("\n\n\n\n",SQL,"\n\n\n\n")
        cur.execute(SQL)
        row_results = cur.fetchall()
        return row_results
        resultList = []
        for row_result in row_results:
                for res in row_result:
                        result = []
                        if type(res) is Decimal:
                                result.append(float(res))
                        else:
                                result.append(res)
                resultList.append(result)
                
        return resultList



        #         for res in list(row_result[0]):
        #                 if type(res) is Decimal:
        #                         result.append(float(res))
        #                 else:
        #                         result.append(res)
        #         resultList.append(result)
        # return resultList     
        
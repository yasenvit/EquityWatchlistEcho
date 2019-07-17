#!/usr/bin/python3
# -*- coding: utf-8 -*-
import json
import pymysql

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
"""
def mySQLrecord(ID):
    with con:
        cur = con.cursor()
        cur.execute("SELECT ticker FROM lookuptickers WHERE symbol_id=%s",ID)
        existingID = cur.fetchone()
        if existingID:
                return {"error": "You have already added this ticker"}
        sql = "INSERT INTO lookuptickers (ticker, symbol_id) VALUES (%s, %s);"
        cur.execute(sql, (symbol, ID))

        cur.execute("SELECT ticker FROM lookuptickers")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append(*sym)
        return {"symbols":result, "error":""}

def get_list():
    with con:
        cur = con.cursor()
        cur.execute("SELECT ticker FROM lookuptickers")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append(*sym)
        return {"symbols":result}
"""
def getStocksAll():
    with con:
        cur = con.cursor()
        cur.execute("SELECT symbol FROM symbols")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append({"value":str(*sym), "label": str(*sym)})
        print(result)
        return {"selectSymbols":result}
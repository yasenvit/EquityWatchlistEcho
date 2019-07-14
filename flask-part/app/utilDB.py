#!/usr/bin/python3
# -*- coding: utf-8 -*-
import json
import pymysql

con = pymysql.connect('localhost', 'root', 
    '8251', 'equityDB')

"""
CREATE TABLE activeTickers (
    tickID int NOT NULL AUTO_INCREMENT,
    ticker VARCHAR(20),
    ID int,
    UNIQUE (ticker),
    PRIMARY KEY (tickID),
    FOREIGN KEY (ID) REFERENCES symbols(ID)
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

def mySQLrecord(symbol):
    with con:
        cur = con.cursor()
        ID = get_symbolID(symbol)
        if ID == None:
                return {"error": "Unknown ticker"}
        cur.execute("SELECT ticker FROM activeTickers WHERE ID=%s",ID)
        existingID = cur.fetchone()
        if existingID:
                return {"error": "You have already added this ticker"}
        sql = "INSERT INTO activeTickers (ticker, ID) VALUES (%s, %s);"
        cur.execute(sql, (symbol, ID))

        cur.execute("SELECT ticker FROM activeTickers")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append(*sym)
        return {"symbols":result, "error":""}

def deleteActive(symbol):
    with con:
        cur = con.cursor()
        ID = get_symbolID(symbol)
        cur.execute("DELETE FROM activeTickers WHERE ID=%s",ID)
        cur.execute("SELECT ticker FROM activeTickers")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append(*sym)
        return {"symbols":result}

def get_list():
    with con:
        cur = con.cursor()
        cur.execute("SELECT ticker FROM activeTickers")
        symbols = cur.fetchall()
        result = []
        for sym in symbols:
                result.append(*sym)
        return {"symbols":result}

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
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
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        cur.execute("SELECT ID FROM symbols WHERE symbol=%s", (symbol,))
        tupleID = cur.fetchone()
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
        SQLcol = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=%s AND TABLE_SCHEMA = 'equityDB'"
        cur.execute(SQLcol, (table,))
        columnNames = []
        for columnName in cur.fetchall():
            columnNames.append(*columnName)
        SQL = "SELECT * FROM %s WHERE symbol=%s;"
        cur.execute(SQL, (table, symbol))
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
            resultDict[columnName] = result[index]
        return resultDict


def get_db_many(table, where_clause):
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        SQLcol = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=%s AND TABLE_SCHEMA = 'equityDB'"
        cur.execute(SQLcol, (table,))
        columnNames = []
        for columnName in cur.fetchall():
            columnNames.append(*columnName)
        SQL = "SELECT * FROM %s %s;"
        cur.execute(SQL, (table, where_clause))
        row_results = cur.fetchall()
        dbdata = []
        for row_result in row_results:
            resultDict = {}
            for columnName in columnNames:
                index = columnNames.index(columnName)
                if type(row_result[index]) is Decimal:
                    resultDict[columnName] = float(row_result[index])
                else:
                    resultDict[columnName] = row_result[index]
            dbdata.append(resultDict)
        return dbdata


def SQLrecord(columns, values):
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        question_marks = "%s,"*len(values)
        input_columns = ", ".join(columns)
        input_values = tuple(values)
        sql = "INSERT INTO charts ({}) VALUES ({}) ".format(
            input_columns, question_marks[:-1])
        cur.execute(sql, input_values)


def data_record(symbol_id, data):
    if data:
        colnames = ["date", "open", "high", "low", "close", "volume", "unadjustedVolume", "change",
                    "changePercent", "vwap", "label", "changeOverTime"]
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


def get_db_data(symbol_id, fromdate, todate):
    fromdate_obj = datetime.datetime.strptime(fromdate, '%Y%m%d')
    todate_obj = datetime.datetime.strptime(todate, '%Y%m%d')
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        SQL = "SELECT  date,close FROM charts WHERE ID=%s AND date>=%s AND date<=%s;"
        cur.execute(SQL, (symbol_id, fromdate, todate))
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
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        SQL = "SELECT max(date) FROM charts WHERE ID=%s;"
        cur.execute(SQL, (symbol_id,))
        row_results = cur.fetchone()
        if not row_results:
            return None
        return row_results[0]


def get_logo(symbol_id):
    with pymysql.connect('localhost', 'root', '8251', 'equityDB') as cur:
        cur.execute("SELECT url FROM logo WHERE ID=%s", (symbol_id,))
        tupleLogo = cur.fetchone()
        if tupleLogo:
            return tupleLogo[0]
        return None

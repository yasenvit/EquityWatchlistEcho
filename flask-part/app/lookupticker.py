from app import util
from app.orm import ORM

class Lookupticker(ORM):
    fields = ["ticker", "account_pk", "symbol_id" ]
    table = "lookuptickers"

    def __init__(self):
        self.pk = None
        self.ticker = None
        self.account_pk = None
        self.symbol_id = None
        

    def json(self):
        return {'ticker': self.ticker,'symbol_id': self.symbol_id}

    
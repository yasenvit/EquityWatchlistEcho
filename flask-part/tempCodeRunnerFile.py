            shares int,
            PRIMARY KEY (pk),
            FOREIGN KEY (account_pk) REFERENCES accounts(pk)
        );

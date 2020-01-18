# EquityWatchlist
Byte Academy solo project

Project goals:
  1) Build a tool that will allow a user to create your own list of equity stocks and keep it in focus
  2) Display stock market reports
  3) Build your own database for historical prices in order to visualize it in the charts 

Scheme:
  1) Secured sign up and sign in to the application with hashed password.
  2) Ability to generate your own Watchlist of equity stocks
  3) Receiving latest real-time data (summary, financial, statistics)
  4) Data visualization in any date range within the last 5 years
  5) Look up reports from IEX trading (top-10 quotes: most active, gainers, losers )

Challenges:
  1) Synchronize different libraries into one application;
  2) Write Object Relational Mapping (ORM) to MySQL, which allows application to work with many user accounts
  3) Create an algorithm that will combine online data and database for data visualization, minimizing free API data usage:
     - take data from the database and pull the rest of needed data online;
     - record data to the database without duplicates and missed dates;
     - display data for any requested date range;

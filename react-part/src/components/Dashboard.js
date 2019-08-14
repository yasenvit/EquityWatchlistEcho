import React, {Component, Fragment} from 'react';
import {Route, NavLink, Redirect} from 'react-router-dom'
import Logout from '../util/Logout';
import '../styles/style.css';
import Screener from './Screener'
import Lookup from './Lookup'
import Watchlist from './Watchlist'

const linkStyleActive = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  marginLeft: '5px',
  color: 'rgb(58, 85, 143)',
  padding: '5px',
  borderBottom: '1.5px solid rgb(58, 85, 143)'
}

class Dashboard extends Component {
  state = {
    lookupTicker: null,
    activeTickers:null,
    isActive: ""
  }
  componentWillUnmount =() => {
    this.setState({
      lookupTicker: null
    })
      }

  setChartsTicker = (ticker) => {
    this.setState({
      lookupTicker: ticker,
    })
  }
  grabActiveTickers = (tickers) => {
    this.setState({
      activeTickers: tickers
    })
  }

  render() {  
  // console.log("dashboard=>",this.state.activeTickers)
  let appLogout= [<Logout clicked={this.props.clicked}/>]
  let firstRouteList = []

  firstRouteList = [
    <Route exact path="/dashboard"  render={(props)=> <Redirect to="/dashboard/watchlist"/>}/>,      
    <Route exact path="/dashboard/watchlist"  render={(props)=>
      <Watchlist setChartsTicker={this.setChartsTicker} lookupTicker={this.state.lookupTicker} grabActiveTickers={this.grabActiveTickers} {...props} />}/>,
    <Route path="/dashboard/screener"  render={(props)=>
      <Screener setChartsTicker={this.setChartsTicker} lookupTicker={this.state.lookupTicker} {...props} />}/>,
    <Route path="/dashboard/lookup"  render={(props)=>
      <Lookup activeTickers={this.state.activeTickers} lookupTicker={this.state.lookupTicker} {...props} />}/>,
  ]

  return (
    <div className="entire">
      <div className='header-container-signed'>
        <div className="header-item header-left">
        </div>
        <div className='header-item header-center'>
          Equity watchlist
        </div>
        <div className="header-item header-right">
          {appLogout}
        </div>
      </div>
      <div className="page">
        <div className="page-top-field">
          <div className="page-header">
            <div className="half-header">
              <div 
               > <NavLink
                  onClick={this.componentWillUnmount}
                  exact to="/dashboard/watchlist"
                  className="tag"
                  activeStyle={linkStyleActive}
                  >My Watchlist
                </NavLink>
              </div>
              <div
               > <NavLink
                  onClick={this.componentWillUnmount}
                  to="/dashboard/lookup"
                  className="tag"
                  activeStyle={linkStyleActive}
                  >Lookup
                </NavLink>
              </div>
              <div
              > <NavLink
                  onClick={this.componentWillUnmount}
                  exact to="/dashboard/screener"
                  className="tag"
                  activeStyle={linkStyleActive}
                  >Screener
                </NavLink>
              </div>
          </div>
          </div>
        </div>
 
        <div className="page-field">
          {firstRouteList}
        </div>
      </div>
    </div>
)
  }
}

export default Dashboard
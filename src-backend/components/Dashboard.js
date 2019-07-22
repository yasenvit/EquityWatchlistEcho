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
  padding: '3px',
  borderBottom: '1.5px solid rgb(58, 85, 143)'
}

class Dashboard extends Component {
  state = {
    lookupTicker: null,
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

  render() {  
   
  let appLogout= [<Logout clicked={this.props.clicked}/>]
  let firstRouteList = []

  firstRouteList = [
    <Route exact path="/dashboard/watchlist"  render={(props)=>
      <Watchlist setChartsTicker={this.setChartsTicker} lookupTicker={this.state.lookupTicker} {...props} />}/>,
    <Route exact path="/dashboard/screener"  render={(props)=>
      <Screener lookupTicker={this.state.lookupTicker} {...props} />}/>,
    <Route path="/dashboard/lookup"  render={(props)=>
      <Lookup lookupTicker={this.state.lookupTicker} {...props} />}/>,
  ]

  return (
    <div className="entire">
      <div className='header-container-signed'>
        <div className="header-item header-left">
          <div className="header-box">search symbol</div>
          <div className="header-box" style={{color:"skyblue"}}></div>
          <div className="header-box">save</div>
        </div>
        <div className='header-item header-center'>
          <div className="index">
            Index 1
          </div>
          <div className="index">
            Index 2
          </div>
          <div className="index">
            Index 3
          </div>
          <div className="index">
            Index 4
          </div>
          <div className="index">
            Index 5
          </div>
          <div className="index">
            Index 6
          </div>
        </div>
        <div className="header-item header-right">
          <div className='logo'>{appLogout}</div>
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
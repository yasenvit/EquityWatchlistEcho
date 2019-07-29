import React, { Component, Fragment } from 'react'
import '../styles/style.css';
import {Route, NavLink, Redirect} from 'react-router-dom'
import EquityScreen from './screeners/EquityScreen';
import ListTen from './screeners/ListTen';

const linkStyleActive = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '110px',
    color: 'rgb(58, 85, 143)',
    height: '5vh',
    padding: '5px',
    backgroundColor: 'rgb(160, 236, 250)',
    borderBottom: '3px solid rgb(58, 85, 143)'
}

export default class Screener extends Component {
    state = {
        listTen: null,
    }

    render() {
        let secondRouteList
        secondRouteList = [
            <Route exact path="/dashboard/screener/custom" render={(props)=>
                <EquityScreen setChartsTicker={this.props.setChartsTicker} {...props} />}/>,
            <Route exact path="/dashboard/screener/:criteria?" render={(props)=>
                <ListTen setChartsTicker={this.props.setChartsTicker} {...props} />}/>,
        ]
           
        let linkToMostactive = `/dashboard/screener/mostactive`
        let linkToGainers = `/dashboard/screener/gainers`
        let linkToLosers = `/dashboard/screener/losers`
        let linkToCustomScreen = `/dashboard/screener/custom`
     
        return (
            <Fragment>
                <div className="navheader-screener">
                    <div className="filler">
                    </div>
                    <div className="subtag.screener">
                        <NavLink
                            exact to={linkToMostactive}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Most Active
                        </NavLink>
                    </div>
                    <div className="subtag-screener">
                        <NavLink
                            exact to={linkToGainers}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Gainers
                        </NavLink>
                    </div>
                    <div className="subtag-screener">
                        <NavLink
                            exact to={linkToLosers}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Losers
                        </NavLink>
                    </div>
                    <div className="subtag-screener">
                        <NavLink
                            exact to={linkToCustomScreen}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Custom screener
                        </NavLink>
                    </div>
                    <div className="filler">
                    </div>
                </div>
                <div className="lookup-field" style={{color:"blue"}}>
                    {secondRouteList}
                </div>
            </Fragment>
        )
    }
}

import React, { Component, Fragment } from 'react'
import {Route, NavLink, Redirect} from 'react-router-dom'
import Chart from './Ticker/Chart'
import Summary from './Ticker/Summary'
import Statistic from './Ticker/Statistic'
import '../styles/style.css';

const linkStyleActive = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '70px',
    color: 'rgb(58, 85, 143)',
    height: '7vh',
    padding: '5px',
    backgroundColor: 'rgb(160, 236, 250)',
    borderBottom: '3px solid rgb(58, 85, 143)'
}

export default class Lookup extends Component {
    state = {
        lookupTicker: null,
        symbolDisplay: null
    }
    symbolDisplayHandle = (symbol) => {
        this.setState({symbolDisplay: symbol})
    }

    pickHandle = (symbol) => {
        this.setState({
            lookupTicker: symbol
        })
    }
    componentDidMount () {
       this.setState({lookupTicker: this.props.lookupTicker})
    }

    render() {
        // console.log("-->",this.state.lookupTicker,"<--")
        let secondRouteList
        
        secondRouteList = [
            <Route exact path="/dashboard/lookup" render={(props)=><Redirect to="/dashboard/lookup/summary"/>}/>,

            <Route exact path="/dashboard/lookup/summary/:symbol?" render={(props)=>
                <Summary symbolDisplayHandle={this.symbolDisplayHandle} {...props} />}/>,
            <Route exact path="/dashboard/lookup/chart/:symbol?" render={(props)=>
                <Chart pickHandle = {this.pickHandle} {...props} />}/>,
            <Route exact path="/dashboard/lookup/statistic/:symbol?" render={(props)=>
                <Statistic {...props} />}/>,
        ]
        
        let linkToSummary = this.state.lookupTicker?`/dashboard/lookup/summary/${this.state.lookupTicker}`:`/dashboard/lookup/summary`
        let linkToChart = this.state.lookupTicker?`/dashboard/lookup/chart/${this.state.lookupTicker}`:`/dashboard/lookup/chart`
        let linkToStatistic = this.state.lookupTicker?`/dashboard/lookup/statistic/${this.state.lookupTicker}`:`/dashboard/lookup/statistic`
        let companyName = (<div></div>)
        if(this.state.symbolDisplay){
            companyName = (
                <div>{this.state.symbolDisplay.companyName} ({this.state.symbolDisplay.symbol}) </div>
            )
        }
        return (
            <Fragment>
                <div className="space-btw-navs">
                    <div className="space-btw-navs-company">
                        {companyName}
                    </div>
                    <div className="space-btw-navs-market">
                        {this.state.symbolDisplay?this.state.symbolDisplay.primaryExchange:null}
                    </div>
                    <div className="space-btw-navs-container">
                        <div className="space-btw-navs-price">
                            {this.state.symbolDisplay?this.state.symbolDisplay.latestPrice:null}
                        </div>
                        <div className="space-btw-navs-div">
                            Forward Dividend Yields here
                        </div>
                    </div>
                    
                </div>
                <div className="navheader">
                    <div className="subtag">
                        <NavLink
                            exact to={linkToSummary}
                            className="linkstyle"
                            activeStyle={linkStyleActive}
                            >Summary
                        </NavLink>
                    </div>
                    <div className="subtag">
                        <NavLink
                            exact to={linkToChart}
                            className="linkstyle"
                            activeStyle={linkStyleActive}
                            >Chart
                        </NavLink>
                    </div>
                    <div className="subtag">
                        <NavLink
                            exact to={linkToStatistic}
                            className="linkstyle"
                            activeStyle={linkStyleActive}
                            >Statistic
                        </NavLink>
                    </div>
                    <div className="filler">
                    </div>
                </div>
                <div className="lookup-field">
                    {secondRouteList}
                </div>
            </Fragment>
        )
    }
}

import React, { Component, Fragment } from 'react'
import {Route, NavLink, Redirect} from 'react-router-dom'
import Chart from './Ticker/Chart'
import Summary from './Ticker/Summary'
import Statistic from './Ticker/Statistic'
import '../styles/style.css';
import apiCall from '../util/apiCall';

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
        tickerQuote: null,
        pickedTicker: null
    }
    
    getQuote (symbol) {
        if(symbol) {
        const endpoint = `/api/stock/${symbol}/quote`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
           this.setState({
            tickerQuote: json.quote,
            lookupTicker: json.quote.symbol
          })
        })
      }}


    pickHandle = (symbol) => {
        this.getQuote(symbol)
    }
    componentDidMount () {
       this.setState({lookupTicker: this.props.lookupTicker})
       this.getQuote(this.props.lookupTicker)
    }

    render() {
        const roundTo = require('round-to')
        let secondRouteList

        secondRouteList = [
            <Route exact path="/dashboard/lookup/chart/:symbol?" render={(props)=><Redirect to={linkToChart}/>}/>,
            <Route exact path="/dashboard/lookup/summary/:symbol?" render={(props)=><Redirect to={linkToSummary}/>}/>,
            <Route exact path="/dashboard/lookup/statistic/:symbol?" render={(props)=><Redirect to={linkToStatistic}/>}/>,
            <Route exact path="/dashboard/lookup" render={(props)=><Redirect to="/dashboard/lookup/summary"/>}/>,
            <Route exact path="/dashboard/lookup/summary/:symbol?" render={(props)=>
                <Summary tickerQuote={this.state.tickerQuote} pickHandle = {this.pickHandle} {...props} />}/>,
            <Route exact path="/dashboard/lookup/chart/:symbol?" render={(props)=>
                <Chart pickHandle = {this.pickHandle} {...props} />}/>,
            <Route exact path="/dashboard/lookup/statistic/:symbol?" render={(props)=>
                <Statistic {...props} />}/>,
        ]
            
        let linkToSummary = this.state.lookupTicker?`/dashboard/lookup/summary/${this.state.lookupTicker}`:`/dashboard/lookup/summary`
        let linkToChart = this.state.lookupTicker?`/dashboard/lookup/chart/${this.state.lookupTicker}`:`/dashboard/lookup/chart`
        let linkToStatistic = this.state.lookupTicker?`/dashboard/lookup/statistic/${this.state.lookupTicker}`:`/dashboard/lookup/statistic`
        let companyName = (<div></div>)
        if(this.state.tickerQuote){
            companyName = (
                <div>{this.state.tickerQuote.companyName} ({this.state.tickerQuote.symbol}) </div>
            )
        }
        console.log(this.state.tickerQuote,"1111")
        console.log(this.state.lookupTicker,"222")
        // console.log(this.state.pickedTicker,"333")
        return (
            <Fragment>
                <div className="space-btw-navs">
                    <div className="space-btw-navs-company">
                        {companyName}
                    </div>
                    <div className="space-btw-navs-market">
                        {this.state.tickerQuote?this.state.tickerQuote.primaryExchange:null}
                    </div>
                    <div className="space-btw-navs-container">
                        <div className="space-btw-navs-price">
                            {this.state.tickerQuote?roundTo(this.state.tickerQuote.latestPrice,2):null}
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

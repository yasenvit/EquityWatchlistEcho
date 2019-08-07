import React, { Component, Fragment } from 'react'
import {Route, NavLink, Redirect} from 'react-router-dom'
import Chart from './Ticker/Chart'
import Summary from './Ticker/Summary'
import Statistic from './Ticker/Statistic'
import '../styles/style.css';
import apiCall from '../util/apiCall';
import SelectItemLookup from '../util/SelectItemLookup'

const linkStyleActive = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '70px',
    color: 'rgb(58, 85, 143)',
    height: '8vh',
    padding: '5px',
    backgroundColor: 'rgb(160, 236, 250)',
    borderBottom: '3px solid rgb(58, 85, 143)'
}
const greenColor = {
    color: "green",
    fontSize:"18px"
}
const redColor = {
    color: "red",
    fontSize: "18px"
}

export default class Lookup extends Component {
    state = {
        lookupTicker: null,
        tickerQuote: null,
        pickedTicker: null,
        prevPrice:null
    }
    
    getQuote (symbol) {
        if(symbol) {
        const endpoint = `/api/stock/${symbol}/quote`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            console.log("QUOTE", json)
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
                <Summary tickerQuote={this.state.tickerQuote} {...props} />}/>,
            <Route exact path="/dashboard/lookup/chart/:symbol?" render={(props)=>
                <Chart {...props} />}/>,
            <Route exact path="/dashboard/lookup/statistic/:symbol?" render={(props)=>
                <Statistic {...props} />}/>,
        ]
            
        let linkToSummary = this.state.lookupTicker?`/dashboard/lookup/summary/${this.state.lookupTicker}`:`/dashboard/lookup/summary`
        let linkToChart = this.state.lookupTicker?`/dashboard/lookup/chart/${this.state.lookupTicker}`:`/dashboard/lookup/chart`
        let linkToStatistic = this.state.lookupTicker?`/dashboard/lookup/statistic/${this.state.lookupTicker}`:`/dashboard/lookup/statistic`
        let companyName = (<div></div>)
        let changes = (<div className="space-btw-navs-div"></div>)
        if(this.state.tickerQuote){
            companyName = (
                <div>{this.state.tickerQuote.companyName} ({this.state.tickerQuote.symbol}) </div>
            )
            if(this.state.tickerQuote.change){
            changes = (
                <div className="space-btw-navs-div" style={this.state.tickerQuote.change>0?greenColor:this.state.tickerQuote.change<0?redColor:null}>
                    {roundTo(this.state.tickerQuote.change,2)} ({roundTo(this.state.tickerQuote.changePercent,4)}%)
                </div>
            )
            }   
        }
        if(this.state.prevPrice){
        console.log("prevPrice",this.state.prevPrice.close)}
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
                        {this.state.tickerQuote?this.state.tickerQuote.latestPrice?roundTo(this.state.tickerQuote.latestPrice,2):"":""}
                        </div>
                        
                        {changes}
                        
                    </div>
                    
                </div>
                <div className="navheader">

                    <div className="navheader-block-select">
                        <SelectItemLookup pickHandle = {this.pickHandle}/>
                    </div>
                        <div className="filler">
                        </div>
                    
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
                    <div className="navheader-block-right">
                    </div>
                </div>
                <div className="lookup-field">
                    {secondRouteList}
                </div>
            </Fragment>
        )
    }
}

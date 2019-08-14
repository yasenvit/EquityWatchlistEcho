import React, { Component, Fragment } from 'react'
import '../../styles/style.css';
import apiCall from '../../util/apiCall';


export default class Statistic extends Component {
    state = {
        tickerToLook: null,
        stockStats: {},
        stockEPS: {}
    }

    getStats (symbol) {
        if(symbol) {
        const endpoint = `/api/stock/${symbol}/stats`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            console.log("STATS", json)
           this.setState({
            stockStats: json.stats,
            stockEPS: json.eps
          })
        })
      }}

    componentDidUpdate(prevProps) {
        if(this.props.match.params.symbol && this.props.match.params.symbol !== this.state.tickerToLook) {
           this.setState({tickerToLook: this.props.match.params.symbol})
           this.getStats(this.props.match.params.symbol)
        } 
    }
    render() {
        const roundTo = require('round-to')
    const {
        companyName,marketcap,peRatio,dividendYield,employees,beta,avg30Volume,day30ChangePercent,
        ttmEPS,ttmDividendRate,week52change,year1ChangePercent,week52low,week52high
    } = this.state.stockStats
    const {
        EPSReportDate,actualEPS,consensusEPS,fiscalPeriod,yearAgo,yearAgoChangePercent
    } = this.state.stockEPS

        return (
            <div className="statistic">
                <div className="stat-column">
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Company name
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {companyName?companyName:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Employees
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {employees?employees:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                MarketCap
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {marketcap?<div className="digits">{roundTo(marketcap/1e9,4)}<div style={{color:"green", marginLeft:"3px"}}>B</div></div>:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                PeRatio
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {peRatio?peRatio:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Average Volume (30days)
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {avg30Volume?avg30Volume:"-"}
                            </div>
                        </div>
                    </div>
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Change Percent (30 days)
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {day30ChangePercent?day30ChangePercent:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                52 weeks change
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {week52change?week52change:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                52 weeks low
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {week52low?week52low:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                52 weeks high
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {week52high?week52high:""}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Year Change Percent
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {year1ChangePercent?yearAgoChangePercent:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                ttmDividendRate
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {ttmDividendRate?ttmDividendRate:"-"}
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="stat-column">
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Beta
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {beta?roundTo(beta,4):"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                            Dividend Yield
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {dividendYield?dividendYield:""}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                ttmEPS
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {ttmEPS?ttmEPS:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                ttmDividendRate
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {ttmDividendRate?ttmDividendRate:""}
                            </div>
                        </div>
                    </div>
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Actual EPS
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {actualEPS?actualEPS:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                consensus EPS
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {consensusEPS?consensusEPS:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Fiscal Period
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {fiscalPeriod?fiscalPeriod:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Year Ago
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {yearAgo?yearAgo:"-"}
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                Year Ago Change Percent
                            </div>
                            <div className="stat-col-cont-elem-value">
                                {yearAgoChangePercent?yearAgoChangePercent:"-"}
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            
        )
    }
}

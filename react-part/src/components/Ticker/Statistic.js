import React, { Component, Fragment } from 'react'
import '../../styles/style.css';
import apiCall from '../../util/apiCall';

export default class Statistic extends Component {
    state = {
        stockStats: null
    }

    getStats (symbol) {
        if(symbol) {
        const endpoint = `/api/stock/${symbol}/stats`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            console.log("STATS", json)
           this.setState({
            stockStats: json.stats
          })
        })
      }}


    render() {

        if(this.props.match.params.symbol) {
        console.log("STATISTIC tickerToLOOK", this.props.match.params.symbol)
        }
        return (
        
            <div className="statistic">
                <div className="stat-column">
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                    </div>
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="stat-column">
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                    </div>
                    <div className="stat-col-container">
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                        <div className="stat-col-cont-element">
                            <div className="stat-col-cont-elem-key">
                                key
                            </div>
                            <div className="stat-col-cont-elem-value">
                                value
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            
        )
    }
}

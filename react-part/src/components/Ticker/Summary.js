import React, { Component, Fragment } from 'react'
import SelectItem from '../../util/SelectItem'
import '../../styles/style.css';
import AreaChartSmall from './AreaChartSmall'
import apiCall from '../../util/apiCall';

export default class Summary extends Component {
    state = {
        tickerQuote: null,
        tickerToLook: null,
        // selfTicker: null
    }

    componentDidMount(){
        if(this.props.match.params.symbol && this.props.tickerQuote) {
            this.setState({
                tickerToLook:this.props.match.params.symbol,
            })
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.tickerQuote !== prevProps.tickerQuote ||
             this.state.tickerQuote !== this.props.tickerQuote){
           this.setState({tickerQuote: this.props.tickerQuote})
        } else {
            if(this.state.tickerToLook !== this.props.match.params.symbol){
                this.setState({tickerToLook: this.props.match.params.symbol})
            } 
        }
    }

    render() {
        console.log(this.state.tickerQuote,"SUMMARY - 1111")
        const roundTo = require('round-to')
        return (
            <Fragment>
                <div className="chart-header">
                    <div style={{width:"140px", padding:"0.2rem"}}>
                        <SelectItem pickHandle = {this.props.pickHandle}/>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className="chart-field">
                    <div className="chart-info">

                        <div className="chart-info-column">
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Previous close</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.previousClose:""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Open</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.open:""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Day's Range</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.low:""
                                    } - {
                                        this.state.tickerQuote?this.state.tickerQuote.high:""
                                        }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">52 Week Range</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.week52Low:""
                                    } - {
                                        this.state.tickerQuote?this.state.tickerQuote.week52High:""
                                        }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.latestVolume:""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Avg. Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.avgTotalVolume:""}
                                </div>
                            </div>
                        </div>
                        <div className="chart-info-column">
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Previous Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.previousVolume:""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Market Cap</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.marketCap:""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">PE Ratio (TTM)</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.peRatio:""}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Change</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.change:""}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Change Percent</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?roundTo(this.state.tickerQuote.changePercent,4):""
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Year to Date change</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?roundTo(this.state.tickerQuote.ytdChange,4):""
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="chart-body">
                        <AreaChartSmall tickerToLook={this.state.tickerToLook}/>
                    </div>
                    </div>
                        
            </Fragment>
        )
    }
}

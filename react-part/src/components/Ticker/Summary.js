import React, { Component, Fragment } from 'react'
import '../../styles/style.css';
import AreaChartSmall from './AreaChartSmall'


export default class Summary extends Component {
    state = {
        tickerQuote: null,
        tickerToLook: null,
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
        
        const roundTo = require('round-to')
        let week52Range = this.state.tickerQuote?<div>{this.state.tickerQuote.week52Low} - {this.state.tickerQuote.week52Low}</div>:"-"
        let dayRange = this.state.tickerQuote?<div>{this.state.tickerQuote.low?roundTo(this.state.tickerQuote.low,2):""} - {this.state.tickerQuote.high?roundTo(this.state.tickerQuote.high,2):""}</div>:"-"
        let openClose = this.state.tickerQuote?<div>{this.state.tickerQuote.open} - {this.state.tickerQuote.close}</div>:"-"

        return (
            <Fragment>
                <div className="chart-field">
                    <div className="chart-info">
                        <div className="chart-info-column">
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Previous close</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.previousClose?this.state.tickerQuote.previousClose:"-":"-"
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Open - Close</div>
                                <div className="chart-info-column-row-value">
                                    {openClose}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Day's Range</div>
                                <div className="chart-info-column-row-value">
                                    {dayRange}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">52 Week Range</div>
                                <div className="chart-info-column-row-value">
                                    {week52Range}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.latestVolume?this.state.tickerQuote.latestVolume:"-":"-"
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Avg. Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?
                                    <div className="digits">{this.state.tickerQuote.avgTotalVolume?roundTo(this.state.tickerQuote.avgTotalVolume/1e6,4):""
                                    }<div style={{color:"green", marginLeft:"3px"}}>M</div></div>
                                    :"-"}
                                </div>
                            </div>
                        </div>
                        <div className="chart-info-column">
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Previous Volume</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.previousVolume?this.state.tickerQuote.previousVolume:"-":"-"
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Market Cap</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?
                                    <div className="digits">{this.state.tickerQuote.marketCap?roundTo(this.state.tickerQuote.marketCap/1e9,4):""
                                    }<div style={{color:"green", marginLeft:"3px"}}>B</div></div>
                                    :"-"
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">PE Ratio (TTM)</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.peRatio?this.state.tickerQuote.peRatio:"-":"-"}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Change</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.change?this.state.tickerQuote.change:"-":"-"}
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Change Percent</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.changePercent?<div>{
                                        roundTo(this.state.tickerQuote.changePercent,4)
                                    }%</div>:"-":"-"
                                    }
                                </div>
                            </div>
                            <div className="chart-info-column-row">
                                <div className="chart-info-column-row-key">Year to Date change</div>
                                <div className="chart-info-column-row-value">{
                                    this.state.tickerQuote?this.state.tickerQuote.ytdChange?<div>{
                                        roundTo(this.state.tickerQuote.ytdChange,4)
                                    }%</div>:"-":"-"
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

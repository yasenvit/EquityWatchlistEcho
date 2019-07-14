import React, { Component, Fragment } from 'react'
import SelectItem from '../util/SelectItem'
import '../styles/chart.css'

export default class Chart extends Component {
    
    render() {
        let tickerDisplayed = (<div><input></input></div>)
        if(this.props.chartsTicker){
             tickerDisplayed = (
                <div>
                    {this.props.chartsTicker}
                </div>
            )
        }
        return (
            <div className="chart">
            <div className="chart-header">
                <div>
                     
                </div>
                <div  style={{width:"100px"}}>
                    <SelectItem/>
                </div>
            </div>
            <div className="chart-field">

            </div>
            </div>
        )
    }
}

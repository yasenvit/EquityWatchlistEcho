import React, { Component, Fragment } from 'react'
import SelectItem from '../../util/SelectItem'
import '../../styles/chart.css'

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
                    <div  style={{width:"140px", padding:"0.2rem"}}>
                        <SelectItem/>
                    </div>
                </div>
                <div className="chart-field">
                    <div className="chart-info">
                        chart info
                    </div>
                    <div className="chart-body">
                        chart
                    </div>

                </div>
            </div>
        )
    }
}

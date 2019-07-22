import React, { Component, Fragment } from 'react'
import SelectItem from '../../util/SelectItem'
import '../../styles/style.css';
import AreaChart from './AreaChart'

export default class Chart extends Component {
 
    render() {
        if(this.props.match.params.symbol) {
        console.log("CHART tickerToLOOK", this.props.match.params.symbol)
        }
    
        return (
            <div className="chart">
                <div className="chart-header">
                    
                    <div  style={{width:"140px", padding:"0.2rem", marginLeft:"70px" }}>
                        <SelectItem pickHandle = {this.props.pickHandle}/>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="chart-field">
                    <div className="chart-body" style={{backgroundColor:"yellow"}}>
                        <AreaChart tickerToLook={this.props.match.params.symbol}/>
                    </div>
                </div>
            </div>
        )
    }
}

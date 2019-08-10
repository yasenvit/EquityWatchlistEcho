import React, { Component, Fragment } from 'react'
import '../../styles/style.css';
import AreaChart from './AreaChart'

export default class Chart extends Component {
 
    render() {
   
        return (
            <div>
                
                <div>
                    <AreaChart tickerToLook={this.props.match.params.symbol}/>
                </div>
            </div>
        )
    }
}

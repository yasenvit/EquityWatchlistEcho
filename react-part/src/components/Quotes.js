import React, { Component } from 'react'
import apiCall from '../util/apiCall';
import QuoteSheet from './QuoteSheet'


export default class Quotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeQuotes: [],
          activeTickers : [],
          error: ""
        };
        this.checkList()
      }

    checkList() {
      console.log("checking function running")
        const endpoint = `/api/active/list`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then(json => {
          this.setState({
            activeTickers: json.symbols
          })
        })
      }

    getQuotes (symbols) {
        console.log("getQuotes running", symbols)
        const activeTickers = symbols.join()
        const endpoint = `/api/list/${activeTickers}/quote`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
          this.setState({
            activeQuotes: json.quotes
          })
        })
    }

    addSymbol(symbol) {
        const endpoint = `/api/active/add/${symbol}`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then(json => {
          if (json.error.length > 0) {
            alert(json.error)
          } else {
            this.setState({activeTickers: json.symbols})
          }
        })
      }

      delSymbol=(symbol) =>{
        const endpoint = `/api/active/delete/${symbol}`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then(json => {
        this.setState({activeTickers: json.symbols})
          })
      }
    
    componentDidUpdate(prevState) {
      console.log("componentDIDmount")
        if(this.state.activeTickers && this.state.activeTickers.length>0){
          if(!this.state.activeQuotes || this.state.activeQuotes.length===0) {
            this.getQuotes(this.state.activeTickers)
          }
        } 
      }
    
    
    render() {
      console.log("render")
        let dummydata = [
            {
            "symbol": "AAPL",
            "latestPrice": 201.24,
            "marketCap": 925921339200,
            "avgTotalVolume": 24728097,
            "peRatio": 16.78,
            "open": 199.05,
            "close": 201.24,
            "low": 198.81,
            "high": 201.51,
            "week52Low": 142,
            "week52High": 233.47,
            "change": 1.22,
            "changePercent": 0.0061,
            "ytdChange": 0.272691
            },
            {
              "symbol": "TSLA",
              "latestPrice": 199,
              "marketCap": 925921339199,
              "avgTotalVolume": 24728097,
              "peRatio": 16.78,
              "open": 199.05,
              "close": 201.24,
              "low": 198.81,
              "high": 201.51,
              "week52Low": 142,
              "week52High": 233.47,
              "change": 1.22,
              "changePercent": 0.0061,
              "ytdChange": 0.272691
              }
          ]

          let output = (<div></div>)
          if(this.state.activeQuotes) {
            output=(
            <QuoteSheet
            data={dummydata}
            addSymbol={this.addSymbol}
            delSymbol={this.delSymbol} 
            activeTickers={this.state.activeTickers}
            activeQuotes={this.state.activeQuotes}
            setChartsTicker={this.props.setChartsTicker}
          />
            )
          } else {
            output= (
            <div></div>
            )
          }
        return (
            <div>
                {output}
            </div>
        )
    }
}

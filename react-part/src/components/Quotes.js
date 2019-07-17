import React, { Component, Fragment } from 'react'
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
      const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/active/list`
      const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then(json => {
        this.setState({
          activeTickers: json.symbols
        })
      })
    }

    getQuotes (symbols) {
      const activeTickers = symbols.join()
      const endpoint = `/api/list/${activeTickers}/quote`
      const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then (json=> {
        this.setState({
          activeQuotes: json.quotes
        })
      })
    }

    addSymbol=(symbols) =>{
      const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/active/add/${symbols}`
      const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then(json => {
      if(json.error.length>0) {
        alert(json.error)
      }
      this.setState({activeTickers: json.symbols})
      this.getQuotes(this.state.activeTickers)
       })
    }

    delSymbol=(symbol) =>{
      const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/active/delete/${symbol}`
      const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then(json => {
      this.setState({activeTickers: json.symbols})
      if(json.symbols && json.symbols.length>0) {
      this.getQuotes(this.state.activeTickers)
      } else {
        this.setState({activeQuotes: []})
      }
       })
    }
 
    componentDidUpdate(prevState) {
        if(this.state.activeTickers){
          if(!this.state.activeQuotes || this.state.activeQuotes.length===0) {
            this.getQuotes(this.state.activeTickers)
          }
        } 
      }
    
  render() {
    let output = (<Fragment></Fragment>)
    if(this.state.activeQuotes) {
      output=(
        <QuoteSheet
          addSymbol={this.addSymbol}
          delSymbol={this.delSymbol} 
          activeTickers={this.state.activeTickers}
          activeQuotes={this.state.activeQuotes}
          setChartsTicker={this.props.setChartsTicker}
        />
      )
    }
    return (
      <div>
        {output}
      </div>
    )
  }
}

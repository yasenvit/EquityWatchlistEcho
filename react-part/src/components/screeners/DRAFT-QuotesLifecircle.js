import React, { Component } from 'react';
import apiCall from '../util/apiCall';
import '../styles/table.css';
import QuoteItem from './QuoteItem'

export default class Quotes extends Component {
  state = {
    activeTickers: [],
    activeQuotes: []
  }
  checkList() {
    console.log("QUOTES checkList function")
    const endpoint = `/api/list`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
      this.setState({
        activeTickers: json.symbols
      })
    })
  }
  getQuotes (symbols) {
    console.log("QUOTES getQuotes function")
    console.log("symbols", symbols)
    const tickers = symbols.join()
    const endpoint = `/api/list/${tickers}/quote`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      this.setState({
        activeQuotes: json.quotes
      })
    })
  }


  
  static getDerivedStateFromProps(nextProps, prevState) { 
    
    console.log('QUOTES getDerivedStateFromProps')
    
    }
    

  shouldComponentUpdate(nextProps, nextState) {
    console.log("QUOTES shouldComponentUpdate")
    return true;
  }
  componentWillUpdate(){
    console.log("QUOTES componentWillUpdate")
  }

  componentDidUpdate(prevProps) {
    console.log("QUOTES componentDidUpdate")
    if(prevProps.activeTickers && 
      this.props.activeTickers !== prevProps.activeTickers) {
        this.getQuotes(this.props.activeTickers)
      } else {
        this.getQuotes(prevProps.activeTickers)
      }
  }

 

  render() {
    console.log("RENDER")
    console.log("props ----", this.props.activeTickers)
    console.log("state ----", this.state.activeTickers)
    console.log("qotes ----", this.state.activeQuotess)
    let output = (<div></div>)
    if(this.state.activeQuotes === null || this.state.activeQuotes === undefined) {
      output = (<div></div>)
    } else {
      output = (
        <QuoteItem items = {this.state.activeQuotes} delSymbol = {this.props.delSymbol}/>
      )
    }

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>latestPrice</th>
            <th>open</th>
            <th>close</th>
            <th>high</th>
            <th>low</th>
            <th>latestVolume</th>
            <th>change</th>
            <th>changePercent</th>
            <th>marketCap</th>
            <th>peRatio</th>
            <th>week52High</th>
            <th>week52Low</th>
            <th>ytdChange</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {output}
        </tbody>
      </table>
    )
   }
   componentDidMount() {
    console.log('QUOTES componentDidMount')
    } 
  }
  





  /*
shouldComponentUpdate(nextProps, nextState) {
  let shouldUpdate = this.props.activeTickers !== nextProps.activeTickers;
  return shouldUpdate;
}
 
static getDerivedStateFromProps(nextProps, prevState) {
    console.log('----derivedStateFromProps-----')
    if(nextProps.activeTickers && 
      prevState.activeTickers !== nextProps.activeTickers) {
      return {
        activeTickers : nextProps.activeTickers
      }
    }
  return null
  };

   componentWillUpdate(){
    this.getQuotes(this.props.activeTickers)
  }

  componentDidUpdate(prevProps) {
    console.log("DID - UPDATE")
    if(prevProps.activeTickers !== this.props.activeTickers) {
      this.getQuotes(this.state.activeTickers);
    } 
  }
 
  componentDidMount() {
     console.log("DID MOUNT")
     this.getQuotes(this.props.activeTickers)
   }
*/
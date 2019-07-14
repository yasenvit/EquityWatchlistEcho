import React, { Component, Fragment } from 'react'
import apiCall from '../util/apiCall';
import '../styles/style.css';

import Quotes from '../quoteGrid/Quotes'
import Gainers from '../quoteGrid/Gainers'
import Mostactive from '../quoteGrid/Mostactive'
import Losers from '../quoteGrid/Losers'
import Positions from '../portfolioGrid/Positions'
import Trades from '../portfolioGrid/Trades'
import Account from '../portfolioGrid/Account'
import SelectBox from '../features/select-box/Tags'
import SelectList from '../features/select-box/ListTen'

export default class QuoteGrid extends Component {
  state = {
    quotes:{
      page: "US Equities",
      tags:[
      { tag:'In Focus', id: 1 },
      { tag:'Mostactive', id: 2 },
      { tag:'Gainers', id: 3 },
      { tag:'Losers', id: 4 },
    ]},

    portfolio : {
      page: "Portfolio",
      tags : [
        { tag: 'Account', id: 1 },
        { tag: 'Positions', id: 2 },
        { tag: 'Trades', id: 3 }
      ]},
      selectedPage: "US Equities",
      selectedTag: "In Focus",
      activeTickers: [],
      positionFor: null,
      trade: null
  }

  selectList = (obj) => {
    this.setState({
      selectedTag: obj.tag,
    })
  }
  selectItem = (obj) => {
    this.setState({
      selectedTag: obj.tag,
    })
  }
  selectPage = (obj) => {
    this.setState({
      selectedPage: obj.page,
      selectedTag : obj.tags[0].tag
    })
  }
  /**************************************************************************/
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
  delSymbol = (symbol) => {
    console.log("deleting",symbol)
    const endpoint = `/api/active/delete/${symbol}`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
    this.setState({activeTickers: json.symbols})
      })
  }
  /***********************************************************************/
  checkList() {
    const endpoint = `/api/active/list`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
      this.setState({
        activeTickers: json.symbols
      })
    })
  }
  componentWillMount() {
    this.checkList();
  }

  getPositionFor(symbol) {
    const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/positions/positionfor/${symbol}`
    const promise = apiCall(endpoint,'get')
      promise.then(blob => blob.json()).then (json=> {
        this.setState({
          positionFor: json.position
       })
      })
  }
/************************************************************************/

  render() {
    console.log("quoteGrid POSITION FOR:====",this.state.positionFor)
  let outpTable = (<div></div>)
  if(this.state.selectedPage === "US Equities" && this.state.selectedTag === "In Focus") {
    outpTable = (
      <Quotes
        setChartsTicker={this.props.setChartsTicker}
        activeTickers = {this.state.activeTickers}
        delSymbol = {this.delSymbol}
      />
    )
    } else if(this.state.selectedPage === "US Equities" && this.state.selectedTag === "Mostactive") {
      outpTable = (
        <Mostactive addSymbol = {this.addSymbol} activeTickers = {this.state.activeTickers}/>
      )
    } else if (this.state.selectedPage === "US Equities" && this.state.selectedTag === "Gainers") {
      outpTable = (
        <Gainers addSymbol = {this.addSymbol} activeTickers = {this.state.activeTickers}/>
      )
    } else if (this.state.selectedPage === "US Equities" && this.state.selectedTag === "Losers") {
      outpTable = (
        <Losers addSymbol = {this.addSymbol} activeTickers = {this.state.activeTickers}/>
      )
    } else if(this.state.selectedPage === "Portfolio" && this.state.selectedTag === "Account") {
      outpTable = (
        <Account/>
      )
    } else if(this.state.selectedPage === "Portfolio" && this.state.selectedTag === "Positions") {
      outpTable = (
        <Positions positionFor = {this.state.positionFor} setChartsTicker={this.props.setChartsTicker}/>
      )
    } else if(this.state.selectedPage === "Portfolio" && this.state.selectedTag === "Trades") {
      outpTable = (
        <Trades setChartsTicker={this.props.setChartsTicker}/>
      )
    }
/************************************************/  
  let addTickerButton = (<div></div>)
  let outputPageOption = (<div></div>)
  if(this.state.selectedPage === "US Equities"){
    addTickerButton = (
      <div className="table-header-left">
        <input className="input-adding"id="symbol"></input>
        <button className = "button-adding" onClick={(event)=>{
          this.addSymbol(document.getElementById('symbol').value)                      
        }}>add symbol</button>
      </div>
    )
    outputPageOption = (
      <SelectList
        lists={this.state.quotes.tags}
        selectList={this.selectList}
      />
    )    
  } else if(this.state.selectedPage === "Portfolio"){
    outputPageOption = (
      <SelectBox
        items={this.state.portfolio.tags}
        selectItem={this.selectItem}
      />
    )
  }
  let selectFor = (<div></div>)
  if(this.state.selectedPage==="Portfolio" && this.state.selectedTag==="Positions"){
    selectFor = (
    <div style={{display:"flex",flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
      <div>position for : </div>
      <input className="input-adding"id="positionfor"></input>
        <button className = "button-adding" onClick={(event)=>(
          this.getPositionFor(document.getElementById('positionfor').value)         
        )}>show</button>
    </div>
    )
  } else if(this.state.selectedPage==="Portfolio" && this.state.selectedTag==="Trades"){
    selectFor = (
      <div style={{display:"flex",flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
        <div>trades for : </div>
        <input className="input-adding"id="tradesfor"></input>
        <button className = "button-adding" onClick={(event)=>{
          this.tradeFor(document.getElementById('tradesfor').value)                      
        }}>show</button>
      </div>
    ) 
  } 
    return (
      <Fragment>
        <div className="collar">
          <div><button onClick={()=>{this.selectPage(this.state.quotes)}} className={this.state.selectedPage==="US Equities"?"tag-on":"tag-off"}><p>Quote Grid</p></button></div>
          <div><button onClick={()=>{this.selectPage(this.state.portfolio)}} className={this.state.selectedPage==="Portfolio"?"tag-on":"tag-off"}><p>Portfolio</p></button></div>
          <div className="tag-ext"></div>
        </div>
        <div className="table-header">
          <div className="table-header-left">
            {addTickerButton}
          </div>
          <div className="table-header-center" >
            <div style={{width: "100px",backgroundColor:"red",margin: '0px', position: 'relative'}}>
              {outputPageOption}
            </div>
          </div>
          <div className="table-header-right">
            {selectFor}
          </div>
        </div>
        <div className="split">
          <div className={'scroll-box'}>
            {outpTable}
          </div>
        </div>
      </Fragment>    
    )
  }
}



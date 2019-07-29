import React, { Component, Fragment } from 'react'
import apiCall from '../../util/apiCall';
import ListSheet from './ListSheet'
import '../../styles/style.css';

export default class Losers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTen:[],
      error: ""
    };
  }

  getListTen = () => {
    const endpoint = `/api/stocks/list/losers`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
       this.setState({
        listTen: json.listTen
      })
    })
  }   

  addSymbol=(symbol) =>{
    const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/active/add/${symbol}`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then(json => {
    if(json.error.length>0) {
      alert(json.error)
    } else {alert(`You have added ticker '${symbol}' to watchlist`)}
    })
  }
  componentDidMount(){
    this.getListTen()
  }
  
render() {
  let output = (<Fragment></Fragment>)
  if(this.state.listTen) {
    output=(
      <ListSheet
        listTen={this.state.listTen}
        addSymbol={this.addSymbol}
        setChartsTicker={this.props.setChartsTicker}
      />
    )
  }
  return (
    <Fragment>
      <div className="watchlist-field">
        {output}
      </div>
    </Fragment>
    )
  }
}
  
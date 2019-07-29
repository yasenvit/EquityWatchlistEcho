import React, { Component, Fragment } from 'react'
import apiCall from '../../util/apiCall';
import ListSheet from './ListSheet'
import '../../styles/style.css';

export default class ListTen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        criteria: null,
        listTen:[],
        error: ""
    };
  }

  getListTen = (criteria) => {
    console.log("getListTen")
    const endpoint = `/api/stocks/list/${criteria}`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
        console.log("listten", json)
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
    } else {alert(`Ticker '${symbol}' has been added to watchlist`)}
    })
  }
    componentDidMount(){
        if(this.props.match.params.criteria){
            this.setState({criteria:this.props.match.params.criteria})
        }
    }

    componentDidUpdate(prevState){
        if(!this.state.criteria && this.props.match.params.criteria ||
            this.state.criteria !== this.props.match.params.criteria ){
                this.setState({criteria:this.props.match.params.criteria})
                console.log(this.state.criteria,this.props.match.params.criteria,"condition")
                this.getListTen(this.props.match.params.criteria)
        } 
    }
  
    render() {
        console.log(this.state.criteria)
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
  
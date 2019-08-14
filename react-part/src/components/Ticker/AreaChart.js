import React, {Component, Fragment} from 'react';
import ReactApexChart from 'react-apexcharts';
import '../../styles/style.css';
import apiCall from '../../util/apiCall';
import DateRange from '../../util/DateRange'

class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickerToLook : null,
      fromDate: null,
      toDate: null,
      isActive: true,
      selection: '30',
      options: {

      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: "",
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
      },
      series: [{
        name: "",
        data : []
      }],
    }
  }
  
  setChartData = (json) => {
    const chartData = []
    json.map((data, index)=> (
      chartData.push([data[0],data[1]])
    ))
    this.setState({
      series:[{data: chartData, name: this.state.tickerToLook}],
      options: {
        xaxis: {
          min: chartData[0][0],
          max: chartData.slice(-1).pop()[0],
        }
      }
    })
  }
 
  getRangeData = (ticker, from, to) => {
    if(ticker && from && to) {
      let fromdate = from.toISOString().substring(0, 10).replace(/-/g,"")
      let todate = to.toISOString().substring(0, 10).replace(/-/g,"")
      console.log("getRangeData function=> from-", fromdate, " todate-", todate)
    const endpoint = `/api/chart/${ticker}/range/${fromdate}/${todate}`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      if(json.error.length > 0) {
        alert(json.error)
        this.setState({isActive: false})
      } else {
        this.setChartData(json.data)
      }
    })
  }}

  componentWillUnmount(){
    this.setState({selection: null})
  }

  pickRangeHandler = (fromdate,todate) => {
    if(fromdate && todate){
      this.getRangeData(this.state.tickerToLook,fromdate, todate)
      this.setState({
        fromDate: fromdate,
        toDate: todate,
        selection:""
    })
  }}

  unmountRangeHandler = (e) => {
    this.setState({isActive: false})
  }
  getChartData = (ticker, days) => {
    if(ticker !== undefined && ticker !== null) {
    const endpoint = `/api/chart/${ticker}/${days}`
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
      if(json.error.length > 0) {
        alert(json.error)
      } else {
        this.setChartData(json.data)
        this.setState({
          tickerToLook:ticker,
          isActive: true
        })
      }
    })
  }}

  componentDidMount(){
    this.setState({
      tickerToLook:this.props.tickerToLook,
      selection: "30",
      isActive: false
    })
    if(this.props.tickerToLook){
    this.getChartData(this.props.tickerToLook,"30")
  }}

  componentDidUpdate(prevProps) {
     if(this.props.tickerToLook !== prevProps.tickerToLook){
      this.setState({
        tickerToLook: this.props.tickerToLook,
        selection: "30",
        isActive: false
      })
      this.getChartData(this.props.tickerToLook,"30")
     }
  }

  updateData (timeline) {
    this.setState({
      selection: timeline
    })
  
  switch (timeline) {
    case timeline:
    this.getChartData(this.state.tickerToLook,timeline)
    break;  
    default:
  }

  }
  render() {

return (
      <Fragment>
        <div id="chart">
          <div className="toolbar">
          <DateRange pickRangeHandler = {this.pickRangeHandler} isActive={this.state.isActive}/>
            <button onClick={(e)=>(this.updateData('5'), this.unmountRangeHandler(e))} id="5d" className={(this.state.selection==='5' ? 'active' : '')}>5d</button>
            <button onClick={(e)=>(this.updateData('30'), this.unmountRangeHandler(e))} id="1m" className={(this.state.selection==='30' ? 'active' : '')}>1M</button>
            <button onClick={(e)=>(this.updateData('90'), this.unmountRangeHandler(e))} id="3m" className={ (this.state.selection==='90' ? 'active' : '')}>3M</button>
            <button onClick={(e)=>(this.updateData('180'), this.unmountRangeHandler(e))} id="6m" className={ (this.state.selection==='180' ? 'active' : '')}>6M</button>
            <button onClick={(e)=>(this.updateData('ytd'), this.unmountRangeHandler(e))} id="ytd" className={ (this.state.selection==='ytd' ? 'active' : '')}>YTD</button>
            <button onClick={(e)=>(this.updateData('365'), this.unmountRangeHandler(e))} id="1y" className={ (this.state.selection==='365' ? 'active' : '')}>1Y</button>
            <button onClick={(e)=>(this.updateData('730'), this.unmountRangeHandler(e))} id="2y" className={ (this.state.selection==='730' ? 'active' : '')}>2Y</button>
            <button onClick={(e)=>(this.updateData('1825'), this.unmountRangeHandler(e))} id="5y" className={ (this.state.selection==='1825' ? 'active' : '')}>5Y</button>
            
          </div>
          
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="350" />
        </div>
        <div id="html-dist"> 
        </div>
      </Fragment>
    );
  }
}

export default AreaChart;

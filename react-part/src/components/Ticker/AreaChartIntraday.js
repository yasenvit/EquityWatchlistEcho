import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';

// const hdata = [{"date":"2019-06-19","open":199.68,"close":197.87,"high":199.88,"low":197.31,"volume":21124235,"uOpen":199.68,"uClose":197.87,"uHigh":199.88,"uLow":197.31,"uVolume":21124235,"change":0,"changePercent":0,"label":"Jun 19","changeOverTime":0},{"date":"2019-06-20","open":200.37,"close":199.46,"high":200.61,"low":198.03,"volume":21513988,"uOpen":200.37,"uClose":199.46,"uHigh":200.61,"uLow":198.03,"uVolume":21513988,"change":1.59,"changePercent":0.8036,"label":"Jun 20","changeOverTime":0.008036},{"date":"2019-06-21","open":198.8,"close":198.78,"high":200.85,"low":198.15,"volume":47800589,"uOpen":198.8,"uClose":198.78,"uHigh":200.85,"uLow":198.15,"uVolume":47800589,"change":-0.68,"changePercent":-0.3409,"label":"Jun 21","changeOverTime":0.004599},{"date":"2019-06-24","open":198.54,"close":198.58,"high":200.16,"low":198.17,"volume":18220421,"uOpen":198.54,"uClose":198.58,"uHigh":200.16,"uLow":198.17,"uVolume":18220421,"change":-0.2,"changePercent":-0.1006,"label":"Jun 24","changeOverTime":0.003588},{"date":"2019-06-25","open":198.43,"close":195.57,"high":199.26,"low":195.29,"volume":21070334,"uOpen":198.43,"uClose":195.57,"uHigh":199.26,"uLow":195.29,"uVolume":21070334,"change":-3.01,"changePercent":-1.5158,"label":"Jun 25","changeOverTime":-0.011624},{"date":"2019-06-26","open":197.77,"close":199.8,"high":200.99,"low":197.35,"volume":26067512,"uOpen":197.77,"uClose":199.8,"uHigh":200.99,"uLow":197.35,"uVolume":26067512,"change":4.23,"changePercent":2.1629,"label":"Jun 26","changeOverTime":0.009754},{"date":"2019-06-27","open":200.29,"close":199.74,"high":201.57,"low":199.57,"volume":20899717,"uOpen":200.29,"uClose":199.74,"uHigh":201.57,"uLow":199.57,"uVolume":20899717,"change":-0.06,"changePercent":-0.03,"label":"Jun 27","changeOverTime":0.009451},{"date":"2019-06-28","open":198.68,"close":197.92,"high":199.49,"low":197.05,"volume":31110642,"uOpen":198.68,"uClose":197.92,"uHigh":199.49,"uLow":197.05,"uVolume":31110642,"change":-1.82,"changePercent":-0.9112,"label":"Jun 28","changeOverTime":0.000253},{"date":"2019-07-01","open":203.17,"close":201.55,"high":204.49,"low":200.65,"volume":27316739,"uOpen":203.17,"uClose":201.55,"uHigh":204.49,"uLow":200.65,"uVolume":27316739,"change":3.63,"changePercent":1.8341,"label":"Jul 1","changeOverTime":0.018598},{"date":"2019-07-02","open":201.41,"close":202.73,"high":203.13,"low":201.36,"volume":16935217,"uOpen":201.41,"uClose":202.73,"uHigh":203.13,"uLow":201.36,"uVolume":16935217,"change":1.18,"changePercent":0.5855,"label":"Jul 2","changeOverTime":0.024562},{"date":"2019-07-03","open":203.28,"close":204.41,"high":204.44,"low":202.69,"volume":11362045,"uOpen":203.28,"uClose":204.41,"uHigh":204.44,"uLow":202.69,"uVolume":11362045,"change":1.68,"changePercent":0.8287,"label":"Jul 3","changeOverTime":0.033052},{"date":"2019-07-05","open":203.35,"close":204.23,"high":205.08,"low":202.9,"volume":17265518,"uOpen":203.35,"uClose":204.23,"uHigh":205.08,"uLow":202.9,"uVolume":17265518,"change":-0.18,"changePercent":-0.0881,"label":"Jul 5","changeOverTime":0.032142},{"date":"2019-07-08","open":200.81,"close":200.02,"high":201.4,"low":198.41,"volume":25338628,"uOpen":200.81,"uClose":200.02,"uHigh":201.4,"uLow":198.41,"uVolume":25338628,"change":-4.21,"changePercent":-2.0614,"label":"Jul 8","changeOverTime":0.010866},{"date":"2019-07-09","open":199.2,"close":201.24,"high":201.51,"low":198.81,"volume":20578015,"uOpen":199.2,"uClose":201.24,"uHigh":201.51,"uLow":198.81,"uVolume":20578015,"change":1.22,"changePercent":0.6099,"label":"Jul 9","changeOverTime":0.017031},{"date":"2019-07-10","open":201.85,"close":203.23,"high":203.73,"low":201.56,"volume":17897138,"uOpen":201.85,"uClose":203.23,"uHigh":203.73,"uLow":201.56,"uVolume":17897138,"change":1.99,"changePercent":0.9889,"label":"Jul 10","changeOverTime":0.027088},{"date":"2019-07-11","open":203.31,"close":201.75,"high":204.39,"low":201.71,"volume":20191842,"uOpen":203.31,"uClose":201.75,"uHigh":204.39,"uLow":201.71,"uVolume":20191842,"change":-1.48,"changePercent":-0.7282,"label":"Jul 11","changeOverTime":0.019609},{"date":"2019-07-12","open":202.45,"close":203.3,"high":204,"low":202.2,"volume":17595212,"uOpen":202.45,"uClose":203.3,"uHigh":204,"uLow":202.2,"uVolume":17595212,"change":1.55,"changePercent":0.7683,"label":"Jul 12","changeOverTime":0.027442},{"date":"2019-07-15","open":204.09,"close":205.21,"high":205.87,"low":204,"volume":16947420,"uOpen":204.09,"uClose":205.21,"uHigh":205.87,"uLow":204,"uVolume":16947420,"change":1.91,"changePercent":0.9395,"label":"Jul 15","changeOverTime":0.037095},{"date":"2019-07-16","open":204.59,"close":204.5,"high":206.11,"low":203.5,"volume":16866816,"uOpen":204.59,"uClose":204.5,"uHigh":206.11,"uLow":203.5,"uVolume":16866816,"change":-0.71,"changePercent":-0.346,"label":"Jul 16","changeOverTime":0.033507},{"date":"2019-07-17","open":204.05,"close":203.35,"high":205.09,"low":203.27,"volume":14107450,"uOpen":204.05,"uClose":203.35,"uHigh":205.09,"uLow":203.27,"uVolume":14107450,"change":-1.15,"changePercent":-0.5623,"label":"Jul 17","changeOverTime":0.027695},{"date":"2019-07-18","open":204,"close":205.66,"high":205.88,"low":203.7,"volume":18582161,"uOpen":204,"uClose":205.66,"uHigh":205.88,"uLow":203.7,"uVolume":18582161,"change":2.31,"changePercent":1.136,"label":"Jul 18","changeOverTime":0.039369}]

class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickerToLook : null,
      selection: '1d',
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
        min: new Date('01 Jul 2019').getTime(),
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
    console.log("INSIDE FUNCTION JSON", json)
    const chartData = []
    json.map((data, index)=> (
      chartData.push([data.label,data.average])
    ))
    this.setState({
      series:[{data: chartData, name: this.state.tickerToLook}],
      options: {
        xaxis: {
          min: chartData[1][0],
          max: chartData.slice(-1).pop()[0]
        }
      }
    })
  }
  
  getChartData = (ticker) => {
    console.log("getchartdata function")
    const promise = fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${process.env.REACT_APP_API_PUBLISH}`)
    promise.then(blob=>blob.json()).then(json=>{
      console.log(json)
      this.setChartData(json)
    })
  }

  componentDidMount(){
    this.setState({tickerToLook:this.props.tickerToLook})
    console.log("component DID MOUNT")
    this.getChartData(this.props.tickerToLook)
  }

  componentDidUpdate(prevProps) {
    if(this.props.tickerToLook !== prevProps.tickerToLook){
      console.log("component DID UPDATE")
      this.setState({tickerToLook: this.props.tickerToLook})
      this.getChartData(this.props.tickerToLook)
    } 
  }

  render() {
// console.log("RENDER setchart=>", this.setChartData(hdata))
console.log("--------------------------------------------------------------------RENDER period=>", this.state.selection)
console.log("RENDER state Ticker=>", this.state.tickerToLook)
console.log("RENDER props Ticker=>", this.props.tickerToLook)

console.log("RENDER state series=>", this.state.series)
console.log("RENDER xaxis MIN",this.state.options.xaxis.min)
console.log("RENDER xaxis Max",this.state.options.xaxis.max)
    return (
      <div>
        <div id="chart">
          <div className="toolbar">
            Intraday
           </div>
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="350" />
        </div>
        <div id="html-dist"> 
        </div>
      </div>
    );
  }
}

export default AreaChart;

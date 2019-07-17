import React, {Component, Fragment} from 'react';
import {Route, Link} from 'react-router-dom';
import Logout from '../util/Logout';
import '../styles/style.css';
import '../styles/dash.css';
import Quotes from './Quotes';
import Screening from './Screening'
import Chart from './Ticker/Chart'
import Summary from './Ticker/Summary'
import Statistic from './Ticker/Statistic'

class Dashboard extends Component {
  state = {
    chartsTicker: null,
    isActive: "watchlist"
  }
  componentWillUnmount =() => {
    this.setState({
      chartsTicker: null
    })
      }

  setChartsTicker = (ticker) => {
    this.setState({
      chartsTicker: ticker,
      isActive: "summary"
    })
    
  }
  onClickTagHandler =(name)=> {
    this.setState({isActive: name})
  }
  render() {  

  let appLogout= [<Logout clicked={this.props.clicked}/>]
  let displayed = (<div></div>)
  if(this.state.isActive==="watchlist") {
    displayed = (
      <Quotes setChartsTicker={this.setChartsTicker} />
    )
  } else if(this.state.isActive==="screening"){
    displayed = (
      <Screening />
    )
  } else if(this.state.isActive==="summary") {
    displayed = (
      <Summary setChartsTicker={this.setChartsTicker}/>
    )
  } else if(this.state.isActive==="chart") {
    displayed = (
      <Chart setChartsTicker={this.setChartsTicker}/>
    )
  } else if(this.state.isActive==="statistic") {
    displayed = (
      <Statistic setChartsTicker={this.setChartsTicker}/>
    )
    }

let secondRowTags = (<div></div>)
if(this.state.chartsTicker) {

  secondRowTags = (
    <Fragment>
      <div className="second-header">
        <div
          onClick={this.onClickTagHandler.bind(this,"summary")}
          className={this.state.isActive==="summary"?"tag-active":"tag"}
          ><Link 
            style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
            >Summary
          </Link>
        </div>
        <div
          onClick={this.onClickTagHandler.bind(this,"chart")}
          className={this.state.isActive==="chart"?"tag-active":"tag"}
          ><Link 
            style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
            >Chart
          </Link>
        </div>
        <div
          onClick={this.onClickTagHandler.bind(this,"statistic")}
          className={this.state.isActive==="statistic"?"tag-active":"tag"}
          ><Link 
            style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
            >Statistic
          </Link>
        </div>
      </div>
    </Fragment>
  )
}


  console.log("isActive", this.state.isActive)
    return (
      <div>
        <div className='header-container-signed'>
          <div className="header-item header-left">
            <div className="header-box">search symbol</div>
            <div className="header-box" style={{color:"skyblue"}}></div>
            <div className="header-box">save</div>
          </div>
          <div className='header-item header-center'>
            <div className="index">
              Index 1
            </div>
            <div className="index">
              Index 2
            </div>
            <div className="index">
              Index 3
            </div>
            <div className="index">
              Index 4
            </div>
            <div className="index">
              Index 5
            </div>
            <div className="index">
              Index 6
            </div>
          </div>
          <div className="header-item header-right">
            <div className='logo'>{appLogout}</div>
          </div>
        </div>
        <div className="main-container">
          <div className="page">
            <div className="page-header">
              <div className="half-header">
                <div 
                  onClick={this.onClickTagHandler.bind(this,"watchlist")}
                  className={this.state.isActive==="watchlist"||
                             this.state.isActive==="summary"||
                             this.state.isActive==="chart"||
                             this.state.isActive==="statistic"?"tag-active":"tag"}
                >
                  <Link 
                    onClick={this.componentWillUnmount}
                    style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
                    >Watchlist
                  </Link>
                </div>
                <div
                  onClick={this.componentWillUnmount}
                  onClick={this.onClickTagHandler.bind(this,"screening")}
                  className={this.state.isActive==="screening"?"tag-active":"tag"}
                >
                  <Link 
                    onClick={this.componentWillUnmount}
                    style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
                    >Screening
                  </Link>
                </div>
              </div>
              <div className="half-header">
              </div>
            </div>
            <div className="navheader">
              {secondRowTags}
            </div>
            <div className="page-field">
              {displayed}
            </div>
          </div>
        </div>
        </div>
)
  }
}

export default Dashboard
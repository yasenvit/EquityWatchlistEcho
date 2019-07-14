import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Logout from '../util/Logout';
import '../styles/style.css';
import '../styles/dash.css';
import Quotes from './Quotes';
import Chart from './Chart'

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
      isActive: "chart"
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
  } else if(this.state.isActive==="chart"){
    displayed = (
      <Chart chartsTicker={this.state.chartsTicker}/>
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
      <div className="grid-container">
        <div className="page">
          <div className="page-header">
            <div className="half-header">
              <div 
                onClick={this.onClickTagHandler.bind(this,"watchlist")}
                className={this.state.isActive==="watchlist"?"tag-active":"tag"}
              >
                <Link 
                  onClick={this.componentWillUnmount}
                  style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
                  >Watchlist
                </Link>
              </div>
              <div 
                onClick={this.onClickTagHandler.bind(this,"chart")}
                className={this.state.isActive==="chart"?"tag-active":"tag"}
              >
                <Link 
                  onClick={this.componentWillUnmount}
                  style={{textDecoration:"none", color:"rgb(28, 104, 243)"}}
                  >Chart
                </Link>
              </div>
            </div>
            <div className="half-header">
          </div>
        </div>
        <div className="navheader">

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
import React, { Component, Fragment } from 'react'
import '../styles/style.css';
import {Route, NavLink, Redirect} from 'react-router-dom'
import SelectItem from '../util/SelectItem'
import EquityScreen from './screeners/EquityScreen';
import Mostactive from './screeners/Mostactive';
import Gainers from './screeners/Gainers';
import Losers from './screeners/Losers';
import apiCall from '../util/apiCall';

const linkStyleActive = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: '70px',
    color: 'rgb(58, 85, 143)',
    height: '8vh',
    padding: '5px',
    backgroundColor: 'rgb(160, 236, 250)',
    borderBottom: '3px solid rgb(58, 85, 143)'
}

export default class Screener extends Component {
    state = {
        listTen: null
    }

    render() {
        let secondRouteList
        secondRouteList = [

            // <Route exact path="/dashboard/screener" render={(props)=><Redirect to="/dashboard/screener/custom"/>}/>,
            <Route exact path="/dashboard/screener/custom" render={(props)=>
                <EquityScreen {...props} />}/>,
            <Route exact path="/dashboard/screener/mostactive" render={(props)=>
                <Mostactive {...props} />}/>,
            <Route exact path="/dashboard/screener/gainers" render={(props)=>
                <Gainers {...props} />}/>,
            <Route exact path="/dashboard/screener/losers" render={(props)=>
                <Losers {...props} />}/>,
           
        ]
           
        let linkToMostactive = `/dashboard/screener/mostactive`
        let linkToGainers = `/dashboard/screener/gainers`
        let linkToLosers = `/dashboard/screener/losers`
        let linkToCustomScreen = `/dashboard/screener/custom`
    
    
        return (
            <Fragment>
                <div className="navheader">

                    <div className="filler">
                    </div>
                    
                    <div className="subtag">
                        <NavLink
                            exact to={linkToMostactive}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Most Active
                        </NavLink>
                    </div>
                    <div className="subtag">
                        <NavLink
                            exact to={linkToGainers}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Gainers
                        </NavLink>
                    </div>
                    <div className="subtag">
                        <NavLink
                            exact to={linkToLosers}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Losers
                        </NavLink>
                    </div>
                    <div className="subtag">
                        <NavLink
                            exact to={linkToCustomScreen}
                            className="linkstyle-screener"
                            activeStyle={linkStyleActive}
                            >Custom screener
                        </NavLink>
                    </div>
                    
                    
                    <div className="filler">
                    </div>
                    <div className="navheader-block-right">
                    </div>
                </div>
                <div className="lookup-field" style={{backgroundColor:"green", color:"blue"}}>

                    HELLO THERE!
                    {secondRouteList}
                </div>
            </Fragment>
        )
    }
}

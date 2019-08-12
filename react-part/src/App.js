import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'
import './styles/style.css';
import isloggedin from './util/isloggedin';
import Login from './util/Login';
import logoutf from './util/logoutf';
import SignUp from './util/SignUp';
import apiCall from './util/apiCall';
import Dashboard from './components/Dashboard'

class App extends Component {
  state={
    time: new Date(),
    refresh:"empty",
    error:"no error",
    username:null
  }
  currentTime() {
    this.setState ({
      time:new Date()
    })
  }

  signup = (username, password) => {
    const promise = apiCall('/api/signup', 'post', {
      "username": username,
      "password": password
    })
    promise.then(blob=>blob.json()).then(json=>{
      if (json.api_key !== undefined) {
        window.sessionStorage.setItem("apikey", json.api_key)
        window.sessionStorage.setItem("username", json.username)
        this.setState({
          refresh: "loggedin",
          error: ""
        })
      } else {
        this.setState({
          refresh: "login error",
          error: "Could not sign up"
        })
        alert("This username is already taken")  
      }
    })
  }

  loginf = (username, password) => {
    const promise = apiCall('/api/get_api_key', 'post', {
      "username": username,
      "password": password
    })
    promise.then(blob=>blob.json()).then(json=>{
      if (json.api_key !== undefined) {
        window.sessionStorage.setItem("apikey", json.api_key)
        window.sessionStorage.setItem("username", json.username)
        this.setState({
          refresh: "loggedin",
          username: json.username
        })
      } else {
        this.setState({
          refresh: "login error",
          error: "Could not log in"
        })   
      }
    })
  }

  logoutClick=(event)=>{
    event.preventDefault()
    logoutf()
    this.setState({refresh: "loggedout"})
  }

  render () {
    let appLogin = []
    let routeList = []
    let appSignUp = []
    let output = []

    if (isloggedin()){
      routeList = [
        <Route exact path="/login" render={()=><Redirect to="/dashboard"/>}/>,
        <Route exact path="/signup" render={()=><Redirect to="/dashboard"/>}/>,
        <Route path="/dashboard" render={(props)=><Dashboard {...props} clicked={this.logoutClick}/>}/>,
        
      ]
      output = (
        <div className="entire">
          {routeList}
        </div>
      )
        
    } else {
      routeList=[
        <Route exact path="/signup" render={(props)=><SignUp {...props} signupfunc={this.signup}/>}/>,
        <Route exact path="/login" render={(props)=><Login {...props} loginfunc={this.loginf}/>} />,
        <Route exact path="/dashboard" render={(props)=><Redirect to="/"/>} />,
      ]
      appSignUp=[<Link to="/signup" style={{color:"white", textDecoration: "none"}} >Sign up</Link>]
      appLogin=[<Link to="/login" style={{color:"white", textDecoration: "none"}}>Sing in</Link>]
      
      output= (
        <div className="entire">
          <div className='header-container-out'>
            <div className='header-item'>{this.state.time.toLocaleDateString()}</div>
            <div className='header-item header-center'>Equity watchlist</div>
            <div className="header-item header-right">
              <div className='signup' style={{color:"white"}}>{appSignUp}</div>
              <div className='login'>{appLogin}</div>
            </div>
          </div>
          <div className="unsigned-body">
            {routeList}
          </div>
          <div className="footer">
            Final project by Vitaliy Yasenivskyy
          </div>
        </div> 
      )
      }
    return (
      <BrowserRouter>
        
          {output}
        
      </BrowserRouter>
    )
  }
}
export default App;

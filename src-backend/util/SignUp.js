import React, {Component} from 'react';
import '../styles/style.css';

class SignUp extends Component {
    
    render() {
        
        return (
            <div className="signupBox">
                
                <div>
                    <input className="input" style={{width:"200px"}} id="user" placeholder="username"/>
                </div>
                <div>
                    <input className="input" style={{width:"200px", margin:"20px"}} id="pass" placeholder="password"/>
                </div>
                <div>
                    <button className="myButton" style={{width:"200px"}} onClick={(event)=>{
                    this.props.signupfunc(document.getElementById('user').value,document.getElementById('pass').value
                    )
                    }}
                    >sign up</button>
                </div>
            </div>
            
        ) 
        }    
    }
export default SignUp
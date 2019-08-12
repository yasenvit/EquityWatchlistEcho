import React,{Component} from 'react';

class Login extends Component {
    render() {
        console.log('Login')
        return (
            <div className="loginBox">
                
                <div>
                    <input className="input" id="username" placeholder="username" style={{width:"200px"}} onChange={()=>null}/>
                </div>
                <div>
                    <input className="input" id='password' type='password' placeholder='password' style={{width:"200px", margin:"20px"}} onChange={()=>null}/>
                </div>
                <div>
                    <button className="myButton" style={{width:"200px"}} onClick={(event)=>{
                        this.props.loginfunc(
                            document.getElementById('username').value,
                            document.getElementById('password').value
                        )
                    }}
                    >sign in</button>
                </div>
            </div>
        )
    }
}

export default Login
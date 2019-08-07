import React,{Component} from 'react';

class Logout extends Component {
    render() {
        return (

<div
    className="logo"
    alignItems="center"><button className="example_c"
    onClick={this.props.clicked}
    >Log out</button>
</div>

            // <div className="Logout">
            //     <button className="myButton" onClick={this.props.clicked}>Log out</button>
            // </div>
        )
    }
}

export default Logout
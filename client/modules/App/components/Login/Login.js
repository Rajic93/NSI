import React from 'react';

import { connect } from "react-redux";
import { Link } from "react-router";

var styleDiv = {
    marginTop: "20vh",
    marginLeft: "40%",
    width: "30%",
    backgroundColor : "#fcfdfd",
    borderColor: "#eef1f1",
    borderStyle: "outset",
    borderSize: "2px",
    borderRadius: "5px",
}

var styleLogo = {
    width: "30%",
    height: "25%",
    marginLeft: "35%",
    marginBottom: "4%",
    marginTop: "4%"
}

var styleInput = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%"
}

var styleButton = {
    float: "right",
    marginRight: "5%",
    marginTop: "6%"
}

var styleJoin = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%"
}

var styleForgot = {
    marginLeft: "5%",
    marginTop: "6%"
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
        this.props = props;
    }

    logedIn(response) {
        
    }

    login() {
        
    }

    joinNow() {

    }

    render() {
        return (
            <div>
                <div style={styleDiv}>
                    <input type="email" placeholder="email" id="email" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="password" id="password" style={styleInput}/>
                    <br/>
                    <Link to="/feed">
                        <input type="button" className="btn btn-success" value="Login" name="login" onClick={this.login.bind(this)} style={styleButton}/>
                    </Link>
                    <a href="#">
                        <p  style={styleForgot}>
                            Forgot password?
                        </p>
                    </a>
                    <Link to="/register">
                        <input type="button" className="btn btn-primary" value="Join now" onClick={this.joinNow.bind(this)} style={styleJoin}/>
                    </Link>
                </div>
            </div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
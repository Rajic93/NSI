import React from 'react';

import { connect } from "react-redux";
import { Link } from "react-router";

var styleDiv = {
    marginTop: "20vh",
    marginLeft: "35%",
    width: "40%",
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
    marginTop: "5%",
    marginRight: "5%"
}

var styleJoin = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%"
}

var styleType = {
    float: "left",
    marginTop: "5%",
    width: "30%"
}

var styleDropContainer = {
    width: "90%",
    float: "right",
    marginRight: "5%"
}

var styleDropdown = {
    width: "50%",
    float: "right",
    marginTop: "5%"
}

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    register() {

    }

    login() {
        console.log("login")
        
    }

    render() {
        return (
            <div>
                <div style={styleDiv}>
                    <input type="text" placeholder="email" id="email" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="password" id="password" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="repeat password" id="repeatPassword" style={styleInput}/>
                    <br/>
                    <input type="button" className="btn btn-primary" value="Register" name="register" onClick={this.register.bind(this)} style={styleButton}/>
                    <Link to="/">
                        <input type="button" className="btn btn-success" value="Login" onClick={this.login.bind(this)} style={styleJoin}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
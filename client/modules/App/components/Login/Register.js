import React from 'react';

import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import axios from "axios";

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
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let repeat = document.getElementById('repeatPassword').value;
        console.log({email, password, repeat});
        
        if (password !== repeat) {
            alert("Paswords must match!");
            return;
        }
        
        axios.post('http://localhost:10000/user/register', {
            email,
            password
        }).then((data) => {
            console.log('done');
            console.log(data);
            browserHistory.push("http://localhost:10000/")
        }).catch((error) => {
            alert(error);
        })
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
                        <input type="button" className="btn btn-success" value="Login" style={styleJoin}/>
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
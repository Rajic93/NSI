import React, { Component, PropTypes } from 'react';

var buttonStyle = {
    display: "block",
    margin: "0 auto",
    marginTop: "20px"
};

var headerStyle = {
    backgroundColor: "#fc5353"
};

export function FacebookNotConnected(props) {
    return (
        <div>
            <h2 style={headerStyle}>Account is not connected</h2>
            <div> To start receiving facebook notification u need to connect account.</div>
            <button onClick={props.onClick} style={buttonStyle}> Connect</button>
        </div>
    );
}
import React, { Component, PropTypes } from 'react';

var buttonStyle = {
    display: "block",
    margin: "0 auto",
    marginTop: "20px"
}

var headerStyle = {
    backgroundColor: "#afffb1"
};

export function FacebookConnected(props) {
    return (
        <div>
            <h2 style={headerStyle}>Account connected</h2>
            <div> U can remove account to stop receiving notifications.</div>
            <button onClick={props.onClick} style={buttonStyle}> Disconnect</button>
        </div>
    );
}

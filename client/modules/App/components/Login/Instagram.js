import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Import Style
//import styles from "./instagram.css";

// Import Components

class Instagram extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isMounted: false };
    }

    render() {
        return (
            <div>
                <div>
                    
                </div>
            </div>
        );
    }
}

Instagram.propTypes = {
    // children: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
    // intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        intl: store.intl,
    };
}

// Bind actions
function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapDispatchToProps, mapDispatchToProps)(Instagram);
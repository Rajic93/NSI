import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Content.css';

// Import Components
import Accounts from "../Accounts/Accounts";

// Import Actions
//import { toggleAddPost } from '../../AppActions';

class Content extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isMounted: false };
    }

    render() {
        return (
            <div className="row">
                {/* Accounts */}
                <div className="col-md-2">
                    <Accounts />
                </div>
                {/* Main content */}
                <div className="col-md-8">
                    <div className={styles['feed']}>

                    </div>
                </div>
                {/* Notifications and messages */}
                <div className="col-md-2">

                </div>
            </div>
        );
    }
}

Content.propTypes = {
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

export default connect(mapDispatchToProps, mapDispatchToProps)(Content);
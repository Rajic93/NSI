import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Content.css';

// Import Components
import Accounts from "../Accounts/Accounts";
import Feed from "./components/Feed";

// Import Actions
//import { toggleAddPost } from '../../AppActions';

const Content = (props) => {

    return (
        <div className={styles.cont}>
        <div className="row">
            {/* Accounts */}
            <div className="col-md-2">
                <Accounts />
            </div>
            {/* Main content */}
            <div className="col-md-8">
                <div className={styles.feed}>
                    <Feed />
                </div>
            </div>
            {/* Notifications and messages */}
            <div className="col-md-2">

            </div>
        </div>
        </div>
    );
}

export default Content;
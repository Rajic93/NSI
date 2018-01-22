import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

// Import Style
import styles from './Content.css';

// Import Components
import Accounts from "../Accounts/Accounts";
import Feed from "./components/Feed";

// Import Actions
//import { toggleAddPost } from '../../AppActions';

var contentStyle = {
    backgroundColor: "#E9EBEE"
};

const Content = (props) => {

    return (
        <div style={contentStyle}>
            <div className="row">
                {/* Accounts */}
                <div className="col-md-2">
                    <Accounts />
                </div>
                {/* Main content */}
                <div className="col-md-7">
                    <div className={styles.feed}>
                        <Feed />
                    </div>
                </div>
                {/* Notifications and messages */}
                <div className="col-md-4">

                </div>
            </div>
        </div>
    );
}

export default Content;
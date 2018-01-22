import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

// Import Style
import styles from './Content.css';

// Import Components
import Accounts from "../Accounts/Accounts";
import Feed from "./components/Feed";

// Import Actions
import { UPDATE_CONTENT, updateContent } from "../../AppActions";

// Import Selectors
import { getPosts, } from "../../AppReducer";
import { getSavedToken, getFeed, initFbSdk, generateLongLivedToken, initializeFacebook } from '../../../Facebook/FacebookActions';
import { getWrappedFacebookFeed } from '../../../Facebook/FacebookAPI';

var contentStyle = {
    backgroundColor: "#E9EBEE"
};

var refreshButtonStyle = {
    margins: "20px",
    marginTop:"10px"
};

class Content extends React.Component {

    constructor(props) {
        super(props)
    }

    showFeed() {
        axios.get('http://localhost:10000/inst/feed', {
            withCredentials: true
        }).then((response) => {
            let instaData = response.data;
            //this.props.updateFeed(response.data);

            //get facebook data
            getWrappedFacebookFeed(this.props.fbToken).then((fbData) => {
                console.log(fbData);
                let combined = instaData.concat(fbData);
                this.props.updateFeed(combined);
            }).catch((err) => {
                console.log("Facebook not connected");
                //update only with instagram data
                this.props.updateFeed(instaData);
            });

        }).catch((err) => {
            console.log(err);
        });


    }

    render() {
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
                    <div className="col-md-3">
                        <button onClick={() => this.showFeed()} style={refreshButtonStyle}> Refresh </button>
                    </div>
                </div>
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        posts: getPosts(store),
        fbToken: store.facebook.longLivedToken
    };
}

// Bind actions
function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateFeed: (data) => {
            dispatch(updateContent(data))
        },
        initFacebook: () => {
            dispatch(generateLongLivedToken('publish_actions,user_posts,user_photos'));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
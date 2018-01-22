import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

// Import Style
import styles from '../Content.css';

// Import Components
import FeedItem from "./FeedItem";

// Import Actions
import { UPDATE_CONTENT, updateContent } from "../../../AppActions";

// Import Selectors
import { getPosts, } from "../../../AppReducer";
import { getSavedToken, getFeed, initFbSdk, generateLongLivedToken, initializeFacebook } from '../../../../Facebook/FacebookActions';
import { getWrappedFacebookFeed } from '../../../../Facebook/FacebookAPI';

class Feed extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // axios.get('http://localhost:10000/inst/feed', {
        //     withCredentials: true
        // }).then((response) => {
        //     this.props.updateFeed(response.data);
        // }).catch((err) => {

        // });

        this.props.initFacebook();
    
    }

    showFeed() {
        axios.get('http://localhost:10000/inst/feed', {
            withCredentials: true
        }).then((response) => {
            this.props.updateFeed(response.data);
        }).catch((err) => {
            alert("Could not show feed");
        });

        getWrappedFacebookFeed(this.props.fbToken).then((fbData) => {
            console.log(fbData);
            this.props.updateFeed(fbData);
        });;
    }

    render() {
        return (
            <div className={styles['scrollable']}>
                <button onClick={() => this.showFeed()}> Show feed</button>
                {this.props.posts.map((post, index) =>
                    <FeedItem key={index} type={post.type} post={post.data} />
                )}
            </div>
        );
    }
}

Feed.propTypes = {

};

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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
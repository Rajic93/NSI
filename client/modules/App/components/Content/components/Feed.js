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

class Feed extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        
        axios.get('http://localhost:10000/inst/feed', {
            withCredentials: true
        }).then((response) => {
            this.props.updateFeed(response.data);
        }).catch((err) => {

        });
    }

    render() {
        return (
            <div className={styles['scrollable']}>
                {this.props.posts.map( post => 
                    <FeedItem type={post.type} post={post.data} />
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
        posts: getPosts(store)
    };
}

// Bind actions
function mapDispatchToProps(dispatch) {
    return {
        updateFeed: (data) => {
            dispatch(updateContent(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
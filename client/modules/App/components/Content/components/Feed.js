import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from '../Content.css';

// Import Components
import FeedItem from "./FeedItem";

// Import Actions
import { UPDATE_CONTENT } from "../../../AppActions";

// Import Selectors
import { getPosts } from "../../../AppReducer";

class Feed extends React.Component {

    constructor(props) {
        super(props)
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
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
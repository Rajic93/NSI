import React, { Component, PropTypes } from 'react';

var imgStyle = {
    width: "400px",
    height: "400px"
};

function FacebookImage(props) {
    const images = props.images;
    if (images && images.length > 0) {
        return <img src={images[0].source} style={imgStyle} />
    } else {
        return null;
    }
}

function FacebookComment(props) {
    const post = props.post;
    return (
        <div>
            {post.message}
        </div>
    );
}

export function FacebookFeed(props) {
    const posts = props.posts;

    const feed = posts.map((post, i) =>
        <li key={i}>
            <FacebookComment post={post}></FacebookComment>
            <FacebookImage images={post.images}></FacebookImage>
        </li>
    );

    return (
        <ul>
            {feed}
        </ul>
    );
}   
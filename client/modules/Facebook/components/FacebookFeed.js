import React, { Component, PropTypes } from 'react';

var imgStyle = {
    width: "400px",
    height: "400px"
};

function FacebookImage(props) {
    const post = props.post;
    if (post.images && post.images.length > 0) {
        return <img src={post.images[0].source} style={imgStyle} />
    } else {
        return null;
    }
}

export function FacebookFeed(props) {
    const posts = props.posts;

    const list = posts.map((post, i) =>
        <div key={i}>
            <li> {post.message} </li>
            <FacebookImage post={post}></FacebookImage>
        </div>
    );

    return (
        <ul>
            {list}
        </ul>
    );
}   
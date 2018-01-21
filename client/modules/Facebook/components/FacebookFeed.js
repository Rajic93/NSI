import React, { Component, PropTypes } from 'react';

var imgStyle = {
    width: "400px",
    height: "400px"
};

var postStyle = {
    borderStyle: "groove"
};

function FacebookPostAuthor(props) {
    var date = new Date(props.date).toLocaleTimeString();
    return (
        <div>
            <img src={props.profilePicture.url} />
            <div>{props.name}</div>
            <div>{date}</div>
        </div>
    )
}

function FacebookPostImage(props) {
    const images = props.images;
    if (images && images.length > 0) {
        return <img src={images[0].source} style={imgStyle} />
    } else {
        return null;
    }
}

function FacebookPostComment(props) {
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
        <li key={i} style={postStyle}>
            <FacebookPostAuthor
                name={post.from.name}
                profilePicture={post.authorPicture}
                date={post.created_time}>
            </FacebookPostAuthor>
            <FacebookPostComment post={post}></FacebookPostComment>
            <FacebookPostImage images={post.images}></FacebookPostImage>
        </li>
    );

    return (
        <ul>
            {feed}
        </ul>
    );
}   
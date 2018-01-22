import React, { Component, PropTypes } from 'react';

var imgStyle = {
    width: "400px",
    height: "400px"
};

var postStyle = {
    borderStyle: "groove"
};

var avatar = {
    width: "40px",
    height: "40px",
    clipPath: "circle(15px at center)"
}

var imgMain = {
    display: "inline-block",
    width: "100%",
    minHeight: "300px",
    padding: "2px"
}


var msgTextStyle = {
    fontWeight: "bold"
};

var nameStyle = {
    color: "blue"
};

var authorStyle = {
    display: "flex"
};

export function FacebookPostAuthor(props) {
    var date = new Date(props.date).toLocaleTimeString();
    return (
        <div style={authorStyle}>
            <img src={props.profilePicture.url} style={avatar} />
            <div>
                <div style={nameStyle}>{props.name}</div>
                <div>{date}</div>
            </div>
        </div>
    )
}

export function FacebookPostImage(props) {
    const images = props.images;
    if (images && images.length > 0) {
        return <img src={images[0].source} style={imgMain} />
    } else {
        return null;
    }
}

export function FacebookPostComment(props) {
    const post = props.post;
    return (
        <div style={msgTextStyle}>
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
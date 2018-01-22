import React from "react";
import axios from "axios";

// Import styles
import style from '../Content.css';
import { FacebookPostAuthor, FacebookPostComment, FacebookPostImage } from "../../../../Facebook/components/FacebookFeed";

var panelMarginStyle = {
    margins: "15px",
    padding: "15px"
};

var fullNameStyle = {
    color: "blue"
};

const FeedItem = (props) => {
    let post = props.post;
    let type = props.type;
    let isLiked = false;

    const like = () => {
        if (type === 'instagram') {
            instaLike()
        }
    }

    const instaLike = () => {

        if (!isLiked) {
            updateLikes(true);
            axios.post('http://localhost:10000/inst/like', {
                mediaId: post.id
            }).then((res) => {
            }).catch((err) => {
                isLiked = false;
                updateLikes(false);
            });
        } else {
            updateLikes(false);
            axios.post('http://localhost:10000/inst/dislike', {
                mediaId: post.id
            }).then((res) => {
            }).catch((err) => {
                isLiked = true;
                updateLikes(true);
            });
        }
    }

    const updateLikes = (increase) => {

        let img = document.getElementById('like');
        if (increase) {
            post.likes++;
            isLiked = true;
            img.src = 'http://wfarm4.dataknet.com/static/resources/icons/set105/13577682.png';
        } else {
            post.likes--;
            isLiked = false;
            img.src = 'https://cdn2.iconfinder.com/data/icons/web-part-1/32/heart-empty-256.png';
        }
        let num = document.getElementById('num');
        num.value = `${post.likes} like${post.likes === 1 ? '' : 's'}`;
    }

    const renderInsta = (post) => {
        let avatar = post.avatar;
        let img = post.img;
        let likes = post.likes;
        let comments = post.comments;
        let fullName = post.fullName;
        return (
            <div className='panel panel-default'>
                <div style={panelMarginStyle}>
                    <div className='pane-body'>
                        <table className={style.frame}>
                            <tbody>
                                <tr className={style['avatar-container']}>
                                    <td>
                                        <img className={style['avatar']} src={avatar} />
                                        <span style={fullNameStyle}>{fullName}</span>
                                    </td>
                                </tr>
                                <tr className={style['img-main']}>
                                    <td>
                                        <img className="img-responsive" onDoubleClick={like} src={img} />
                                    </td>
                                </tr>
                                <tr className={style['actions']}>
                                    <td>
                                        <img id='like' className={style.heart} onClick={like} src='https://cdn2.iconfinder.com/data/icons/web-part-1/32/heart-empty-256.png' />
                                        <span id='num'>{likes} like{likes === 1 ? '' : 's'}</span>
                                    </td>
                                </tr>
                                <tr className={style['comments']}>
                                    <td>

                                    </td>
                                </tr>
                                {/* <tr className={style['comment-add']}>
                                <td>

                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    };

    const renderFB = (post) => {
        return (
            <div className='panel panel-default'>
                <div style={panelMarginStyle}>
                    <FacebookPostAuthor
                        name={post.from.name}
                        profilePicture={post.authorPicture}
                        date={post.created_time}>
                    </FacebookPostAuthor>
                    <FacebookPostComment post={post}></FacebookPostComment>
                    <FacebookPostImage images={post.images}></FacebookPostImage>
                </div>
            </div>
        );
    };

    switch (type) {
        case 'instagram':
            return renderInsta(props.post);
        case 'facebook':
            return renderFB(props.post);
        default:
            return '';
    }
};

export default FeedItem
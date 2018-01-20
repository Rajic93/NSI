import React from "react";

// Import styles
import style from '../Content.css';


const FeedItem = (props) => {
    let post = props.post;
    let type = props.type;
    let isLiked = false;

    const like = () => {
        let img = document.getElementById('like');
        if (!isLiked) {
            isLiked = true;
            post.likes++;
            img.src = 'http://wfarm4.dataknet.com/static/resources/icons/set105/13577682.png';
        } else {
            isLiked = false;
            post.likes--;
            img.src = 'https://cdn2.iconfinder.com/data/icons/web-part-1/32/heart-empty-256.png';
        }
        let num = document.getElementById('num');
        num.value = `${likes} like${likes === 1 ? '' : 's'}`;
    }

    const renderFB = (post) => {
        return;
    };

    const renderInsta = (post) => {
        let avatar = post.avatar;
        let img = post.img;
        let likes = post.likes;
        let comments = post.comments;
        return (
            <div className='panel panel-default'>
                <div className='pane-body'>
                    <table className={style.frame}>
                        <tbody>
                            <tr className={style['avatar-container']}>
                                <td>
                                    <img className={style['avatar']} src={avatar}/>
                                </td>
                            </tr>
                            <tr className={style['img-main']}>
                                <td>
                                    <img className="img-responsive" onDoubleClick={like} src={img} />
                                </td>
                            </tr>
                            <tr className={style['actions']}>
                                <td>
                                    <img id='like' className={style.heart} onClick={like} src='https://cdn2.iconfinder.com/data/icons/web-part-1/32/heart-empty-256.png'/>
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
        )
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
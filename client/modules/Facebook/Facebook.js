import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import { bindActionCreators } from 'redux';
import { fbSdkReady, initFbSdk, getShortLivedToken, generateLongLivedToken, getFeed, getSavedToken } from './FacebookActions';
import { FacebookNotConnected } from './components/FacebookNotConnected';
import { FacebookConnected } from './components/FacebookConnected';
import { FacebookFeed } from './components/FacebookFeed';

var styleDiv = {
  marginTop: "10vh",
  marginLeft: "40%",
  width: "30%",
  minHeight: "300px",
  backgroundColor: "#fcfdfd",
  borderColor: "#eef1f1",
  borderStyle: "outset",
  borderSize: "2px",
  borderRadius: "5px",
}

var messageDiv = {
  backgroundColor: "#c6dcff",
  marginTop: "60px"
}

var styleFacebook = {
  backgroundColor: "#00067c",
  color: "white",
  fontSize: "40px",
  paddingLeft: "10px"
}


class Facebook extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.initFacebookSdk();
  }

  handleConnectClick = () => {
    if (this.props.isSdkActive) {
      this.props.generateLongLivedToken();
    } else {
      alert("Sdk isn't ready!");
    }
  }

  handleDisconectClick = () => {

  }


  render() {
    let connectOption = null;

    if (this.props.isTokenReady) {
      connectOption = <FacebookConnected onClick={this.handleDisconectClick}> </FacebookConnected>;
    } else {
      connectOption = <FacebookNotConnected onClick={this.handleConnectClick}> </FacebookNotConnected>;
    }

    return (
      <div style={styleDiv}>
        <div style={styleFacebook}> Facebook </div>
        {connectOption}
        <div style={messageDiv}>Status: {this.props.message}</div>
        <Link to="/feed">Go to Feed {this.props.posts.length}</Link>
        <button onClick={this.props.getFeed}> Get feed </button>
        <FacebookFeed posts={this.props.posts}></FacebookFeed>


      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSdkActive: state.facebook.isSdkReady,
    isTokenReady: state.facebook.isTokenReady,
    token: state.facebook.longLivedToken,
    message: state.facebook.message,
    posts: state.facebook.posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initFacebookSdk: () => {
      dispatch(initFbSdk());
    },
    getShortLivedToken: () => {
      dispatch(getShortLivedToken('publish_actions,user_posts,user_photos'));
    },
    generateLongLivedToken: () => {
      dispatch(generateLongLivedToken('publish_actions,user_posts,user_photos'));
    },
    getFeed: () => {
      dispatch(getFeed(ownProps.token));
    },
    getSavedToken: () => {
      dispatch(getSavedToken());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Facebook);


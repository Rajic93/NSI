import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import { bindActionCreators } from 'redux';
import { fbSdkReady, initFbSdk, getShortLivedToken, generateLongLivedToken, getFeed, getSavedToken } from './FacebookActions';
import { FacebookNotConnected } from './components/FacebookNotConnected';
import { FacebookConnected } from './components/FacebookConnected';
import { FacebookFeed } from './components/FacebookFeed';


var styleLogo={
  width:"75px",
  height:"75px"
};


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
      <div>
        <img src="http://localhost:10000/fb-logo.png" onClick={this.handleConnectClick} style={styleLogo}/>
        <div>Connected</div>
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


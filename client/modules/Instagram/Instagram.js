import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';


// Import Style
//import styles from './Instagram.css';

// Import Actions
import { redirect } from "./InstagramActions";

class Instagram extends Component {

  login() {
      axios.get('http://localhost:10000/inst/login')
          .then((response) => {
              window.location.replace(response.data);
          })
          .catch((err) => {
              console.log(err);
          });
  }

  render() {
    return (
      <div>
        <button id="login" onClick={this.login.bind(this)}>Instagram</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirect: (page) => {
        dispatch(redirect(page))
    }
  };
};

Instagram.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instagram);
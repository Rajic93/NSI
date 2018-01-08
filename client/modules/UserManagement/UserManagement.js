import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
import styles from './User.management.css';

class UserManagement extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

UserManagement.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);

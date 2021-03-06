import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
require('../../../public/stylesheets/home.css')

// USER HOME, UPON LOGIN OR SIGNUP

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props
    return (
      <div className="welcome">
        <div className="welcome-message" >
          <h3>Welcome, {username}!</h3>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username: state.user.username
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  username: PropTypes.string
};

import React, {Component} from 'react';
import '../../App.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {dispatch} = this.props;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => dispatch({
        type: 'UPDATE_USERS',
        payload: users
      }));
  }

  render() {
    const {users} = this.props;
    const showListOfUsers = (users || []).map(user => (
      <div className="usersBorder"
           key={user.id}>
        <span>User:</span>
        <span>{user.name}</span>
        <NavLink to={`/users/${user.id}/posts`}>
          <button>POSTS</button>
        </NavLink>
      </div>
    ));
    return (
      <div>
        {showListOfUsers}
      </div>
    );
  }
}

export default connect(state => {
  return {
    users: state.users
  }
}, dispatch => {
  return {
    dispatch: dispatch
  }
})(Users);

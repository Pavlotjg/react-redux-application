import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Popup from "reactjs-popup";
import PostEditor from "./PostEditor";
import { connect } from 'react-redux'


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const {userId} = this.props.match.params;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => dispatch ({
        type: 'UPDATE_POSTS',
        payload: posts
      }));
  }

  render() {
    const {posts} = this.props;
    const {userId} = this.props.match.params;
    const showListOfPosts = (posts || []).map(post => (
      <div key={post.id}>
        <span>  {post.title}</span> <br/>
        <span> {post.body}</span> <br/>
        <NavLink to={`/users/${userId}/posts/${post.id}/details`}>
          <button>DETAILS</button>
        </NavLink>
      </div>
    ));
    return (
      <div>
        <NavLink to="/users">
          <button>BACK</button>
        </NavLink>
        {showListOfPosts}
        <Popup trigger={<button>ADD</button>} position="right center">
          <PostEditor userId={userId} />
        </Popup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}
function mapDispatchToProps(dispatch) {
  return{
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

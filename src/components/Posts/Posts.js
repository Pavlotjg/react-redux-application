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
      <div className="postsPage"
           key={post.id}>
        <span><b>Post TITLE:</b> {post.title}</span> <br/>
        <span><b>Post:</b> {post.body}</span> <br/>
        <NavLink to={`/users/${userId}/posts/${post.id}/details`}>
          <button>DETAILS</button>
        </NavLink>
      </div>
    ));
    return (
      <div>
        <h2>POSTS</h2>
        <NavLink to="/users">
          <button className="commonButtons">BACK</button>
        </NavLink>
        <Popup trigger={<button className="commonButtons">ADD</button>} position="right top">
          <PostEditor userId={userId} />
        </Popup>
        {showListOfPosts}

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

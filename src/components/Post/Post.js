import React, {Component} from 'react';
import PostEditor from "../Posts/PostEditor";
import Popup from "reactjs-popup";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onDeletePost = this.onDeletePost.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const {postId, userId} = this.props.match.params;
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(comments => this.setState({comments: comments}));

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(responce => responce.json())
      .then(post => dispatch({
        type: 'UPDATE_CURRENT_POST',
        payload: post
      }))
  }

  onDeletePost() {
    const {postId, userId} = this.props.match.params;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(
        () => {
          alert("Important: the resource will not be really deleted on the server but it will be faked as if.");
          this.props.history.push(`/users/${userId}/posts`)
        }
      )
  }

  render() {
    const {comments} = this.state;
    const { post = {}} = this.props;
    const {postId, userId} = this.props.match.params;
    const showListOfComments = (comments || []).map(comment => (
      <div key={comment.id}>
        <div>{comment.postId}</div>
        <div>{comment.id}</div>
        <div>{comment.name}</div>
        <div>{comment.email}</div>
        <div>{comment.body}</div>
        <br/>
      </div>
    ));

    return (
      <div>
        <NavLink to={`/users/${userId}/posts`}>
          <button>BACK</button>
        </NavLink>
        <div key={post.id}>
          <span>  {post.title}</span> <br/>
          <span> {post.body}</span> <br/>
        </div>
        {showListOfComments}
        <Popup trigger={<button>EDIT</button>} position="right center">
          <PostEditor userId={userId}
                      isEdit={true}
          />
        </Popup>
        <button onClick={this.onDeletePost}>DELETE</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}
function mapDispatchToProps(dispatch) {
  return{
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

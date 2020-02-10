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
    const {postId} = this.props.match.params;

    dispatch({
      type: 'UPDATE_CURRENT_POST',
      payload: undefined
    });

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
    const {userId} = this.props.match.params;
    const showListOfComments = (comments || []).map(comment => (
      <div className="commentPage" key={comment.id}>
        <span> <b>Post ID:</b> {comment.postId}</span> <br/>
        <span> <b>Comment ID:</b> {comment.id}</span> <br/>
        <span> <b>Comment TITLE:</b> {comment.name}</span> <br/>
        <span> <b>Email:</b> {comment.email}</span> <br/>
        <span> <b>Comment:</b> {comment.body}</span>
        <br/>
      </div>
    ));

    return (
      <div>
        <h2>COMMENTS</h2>
        <NavLink to={`/users/${userId}/posts`}>
          <button className="commonButtons">BACK</button>
        </NavLink>
        <Popup trigger={<button className="commonButtons">EDIT</button>} position="right top">
          <PostEditor userId={userId}
                      isEdit={true}
          />
        </Popup>
        <button className="commonButtons" onClick={this.onDeletePost}>DELETE</button>
        <div className="commentPage" key={post.id}>
          <span> <b>Post TITLE:</b> {post.title}</span> <br/>
          <span> <b>Post:</b> {post.body}</span> <br/>
        </div>
        {showListOfComments}
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

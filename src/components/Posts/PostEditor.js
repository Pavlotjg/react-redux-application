import React, {Component} from 'react';
import {connect} from 'react-redux'

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChangeField = this.onChangeField.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isEdit && props.post && props.post.id !== state.id) {
      return {
        title: props.post.title,
        body: props.post.body,
        id: props.post.id
      }
    }
    return null
  }

  onChangeField(event) {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }


  onFormSubmit() {
    const {userId, post, isEdit, dispatch} = this.props;
    const {title, body} = this.state;
    const payload = JSON.stringify({
      title,
      body,
      userId
    });
    const headers = {
      "Content-type": "application/json; charset=UTF-8"
    };

    if (isEdit) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        body: payload,
        headers
      })
        .then(response => response.json())
        .then(post => {
          dispatch({
            type: 'UPDATE_CURRENT_POST',
            payload: post
          });
        })
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: payload,
        headers
      })
        .then(response => response.json())
        .then(post => {
          dispatch({
            type: 'ADD_POST',
            payload: post
          });
        })
    }
  }

  render() {
    const submitTitle = this.props.isEdit ? "EDIT POST" : "ADD POST";
    const {title, body} = this.state;
    return (
      <div className="popupWindow">
        Title: <input type="text"
               value={title}
               name="title"
               onChange={this.onChangeField}/>
        Post: <textarea cols="22"
                  rows="5" value={body}
                  name="body"
                  onChange={this.onChangeField}>
        </textarea>
        <button className="commonButtons" onClick={this.onFormSubmit}>{submitTitle}</button>
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
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);

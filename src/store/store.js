import {createStore} from "redux";

export const initialState = {};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_POSTS':
      return {...state, posts: action.payload};

    case 'ADD_POST': {
      const {posts} = state;
      const updatedPosts = [action.payload,  ...posts ];
      return {...state, posts: updatedPosts};
    }

    case 'UPDATE_USERS': {
      return {...state, users: action.payload}
    }

    case 'UPDATE_CURRENT_POST':
      return {...state, post: action.payload};

    default:
      return state;
  }
}


export const store = createStore(rootReducer, initialState);

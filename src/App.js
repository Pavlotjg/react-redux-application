import React from 'react';
import './App.css';
import Users from "./components/Users/Users";
import Posts from "./components/Posts/Posts";
import {BrowserRouter, Route} from 'react-router-dom';
import Post from "./components/Post/Post";
import {Provider} from 'react-redux';
import {store} from './store/store'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route path={['/', '/users']} exact render={(props) => <Users {...props} />}/>
            <Route path="/users/:userId/posts" exact render={(props) => <Posts {...props} />}/>
            <Route path="/users/:userId/posts/:postId/details" exact render={(props) => <Post {...props} />}/>
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import { browserHistory } from 'react-router';
import directory from './components/directory.jsx';
import nested from './components/nested.jsx';
import store from './store';

class AppContainer extends React.Component {
  constructor() {
    super();
  }

 
  render() {
    const { match } = this.props;
        console.log(match);
    return (
        <Router>
          <div>
            <Route exact path="/" component={directory} />
            <Route path="/:term" component={nested} />
            <Route path="/:term/:term1" component={nested} />
          </div>
        </Router>
    )
  }
}

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')

);
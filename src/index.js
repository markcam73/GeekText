import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory} from 'react-router'
import BookList from './Components/bookList'
import BookDetailed from './Components/bookDetailed'
import Login from './Components/login';

ReactDOM.render(<Router history={hashHistory}>
                  <Route path="/" component={Login}/>
                  <Route component={App}>
                    <Route path="/books" component={BookList}/>
                    <Route path="/books/:id" component={BookDetailed}/>
                  </Route>
                </Router>, document.getElementById('root'));
registerServiceWorker();

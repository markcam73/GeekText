import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory} from 'react-router';
import BookDetailed from './Components/bookDetailed';
import Login from './Components/login';
import SignUp from './Components/signup';
import Home from './Components/home';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import AddShippingAddress from './Components/AddShippingAddress'
import AddCreditCard from './Components/AddCreditCard'
import BookList from'./Components/bookList';
import Shopcart from './Components/shopcart';
import BookpageByAuthor from './Components/BooksByAuthor';

ReactDOM.render(<Router history={hashHistory}>
                  <Route path="/" component={Login}/>
                  <Route path="/signup" component={SignUp}/>
                  <Route component={App}>
                    <Route path="/home" component={Home}/>
                    <Route path="/books" component={BookList}/>
                    <Route path="/books/:id" component={BookDetailed}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/profile/edit" component={EditProfile}/>
                    <Route path="/profile/insert/shippingaddress" component={AddShippingAddress}/>
                    <Route path="/profile/insert/card" component={AddCreditCard}/>
                    <Route path="/shopcart" component={Shopcart}/>
                    <Route path="/books/author/:author" component={BookpageByAuthor}/>
                  </Route>
                </Router>, document.getElementById('root'));
registerServiceWorker();

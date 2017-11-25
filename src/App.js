import React, { Component } from 'react';
import './App.css';
import API from './API';
import PubSub from 'pubsub-js';

class App extends Component {
  constructor(props){
    super(props)
    if(this.props.location.state){
      this.state={
        username:this.props.location.state.username,
        items: [],
        cartTotal:0,
        headerCount:0,
        userID:-1
      }
    }else if(window.sessionStorage.token) {
      this.state={
        username:"",
        items: [],
        cartTotal:0,
        headerCount:0,
        userID:-1
      }
      var payload = {
          token: window.sessionStorage.token
      };
      var _this = this;
      API.postRequest(payload, '/profile/mine').then((jsonRes) => {
            if (jsonRes.status===200){
              _this.setState({username: jsonRes.username})
            }
      })
    }else{
      API.changePath("/",{})
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    this.countTotal = this.countTotal.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
    this.createCartElement = this.createCartElement.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  componentWillMount(){
    if(window.sessionStorage.token) {
      var payload = {
        token: window.sessionStorage.token
      };
      var _this = this;
      API.postRequest(payload, '/shopcart').then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.status===200){
          _this.setState({items:jsonRes.items, cartTotal: jsonRes.cartTotal, headerCount: jsonRes.headerCount, userID: jsonRes.userID})
          if(this.state.items.length > 0){
            alert("you have saved items in your cart!");
            console.log(this.state);
          }                
        }
      })
    }
    console.log(this.state)
    PubSub.subscribe('cart.added', this.handleAdd)
    PubSub.subscribe('cart.edited', this.handleHeader)
    PubSub.subscribe('change.price',this.handleTotal)
    PubSub.subscribe('cart.wiped', this.deleteCart)
  }

  deleteCart(e){
    this.setState({
      items: [],
      cartTotal:0,
      headerCount:0,
    })
  }
  createCartElement(item){
    var e = {}
    var quantity = 1;
    e.title = item.title;
    e.id = item.id;
    e.price = item.price;
    e.imageSrc = item.imageSrc;
    e.quantity = quantity;
    return e;
  }

  handleHeader(e, count){
    this.setState({
      headerCount: count.header
    })
  }

  handleTotal(e, total){
    if(this.state.cartTotal === 0){
      return;
    }
    var temp = this.state.cartTotal - total.price;
    this.setState({
      cartTotal: temp.toFixed(2)
    })
    console.log(this.state);
  }

  handleAdd (e, item) {
    var items = this.state.items;
    var cartItem = this.createCartElement(item);

    var itemIndexInArray = -1;
    this.state.items.some(function(item, index) {
      if(item.id === cartItem.id) {
        itemIndexInArray = index;
        return true;
      }else{
        return false;
      }
    });
    var tempCount = this.state.headerCount;

    if(itemIndexInArray < 0){
      items.push(cartItem)
      tempCount += 1;
      this.setState({
        items: items,
        headerCount: tempCount
      })
    }else{
      var stateCopy = Object.assign({}, this.state);
      stateCopy.items[itemIndexInArray].quantity += 1;
      stateCopy.headerCount += 1;
      this.setState(stateCopy);
    }
    this.countTotal();
    console.log(this.state);
  }

  countTotal() {
    let totalPrice = 0;
    this.state.items.forEach(function (item) {
      var indiv_price = item.price*item.quantity;
      totalPrice += +parseFloat(indiv_price);
    });

    this.setState({
      cartTotal: totalPrice.toFixed(2)
    });
  }

  render() {
    var content = (
      <p className ='badge badge-warning' style = {{backgroundColor: 'red', color: 'white', fontSize: '10px'}}>
        {this.state.headerCount}
      </p>
    );

    var empty = null;

    return (
      <div className="App">
        <div className="App-header">
        <h1>GeekText<img src="favicon.ico" alt="icon" style={{float: 'center', width: '32px', height: '32px'}}></img></h1>
          <p><small>Your one stop book shop.</small></p>
          <button onClick={()=>API.changePath("/home/",{username:this.state.username})}style = {{height: '24px'}}><small>Best Sellers</small></button>
          <button onClick={()=>API.changePath("/books/",{username:this.state.username})}style = {{height: '24px'}}><small>Browse</small></button>
          <button onClick={()=>API.changePath("/profile",{username:this.state.username})}style = {{height: '24px'}}><small>Account</small></button>
          <button onClick={()=>API.changePath("/shopcart", {username:this.state.username, books:this.state.items, cartTotal: this.state.cartTotal, header: this.state.headerCount, userID: this.state.userID})} style = {{float: 'right', height: '24px'}}> <img src = './cart.png' alt="cart" style = {{float: 'center', width: '32px', height: '20px'}}/>
            {this.state.headerCount > 0 ? content: empty}
          </button>
        </div>
        <div className="App-body">
            {this.props.children}
        </div>
      </div>
    );
  }
}



export default App;

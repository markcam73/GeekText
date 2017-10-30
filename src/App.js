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
        headerCount:0
      }
    }else if(window.sessionStorage.token) {
      var payload = {
          token: window.sessionStorage.token
      };
      var _this = this;
      API.postRequest(payload, '/profile/mine').then((jsonRes) => {
            if (jsonRes.status===200){
              _this.setState({username: jsonRes.username})
            }else{

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
  }

  componentDidMount(){
    PubSub.subscribe('cart.added', this.handleAdd)
    PubSub.subscribe('cart.removed', this.handleHeader)
    PubSub.subscribe('change.price',this.handleTotal)
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
          <button onClick={()=>API.changePath("/home/",{username:this.state.username})}>Home</button>
          <button onClick={()=>API.changePath("/books/",{username:this.state.username})}>Books</button>
          <button onClick={()=>API.changePath("/profile",{username:this.state.username})}>Profile</button>
          <button onClick={()=>API.changePath("/shopcart/", {username:this.state.username, books:this.state.items, cartTotal: this.state.cartTotal, header: this.state.headerCount})} style = {{float: 'right', height: '32px'}}> <img src = './cart.png' alt="cart" style = {{width: '40px', height: '25px'}}/>
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

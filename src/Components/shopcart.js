import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './cart.css';
import API from '../API';

class ShopCart extends Component{
    constructor(props) {
        super(props);
        this.state={
            totalPrice:0,
            items:[],
            header:0,
            userID:-1
        }
        this.countTotal = this.countTotal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.saveItems = this.saveItems.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }

    componentWillMount() {
        var cartItems = this.props.location.state.books;
        var cartTotal = this.props.location.state.cartTotal;
        var header = this.props.location.state.header;
        var ID = this.props.location.state.userID;
        this.setState({
            items: cartItems,
            totalPrice: cartTotal,
            header: header,
            userID: ID
        });
        console.log(this.props);
        console.log(this.state);
    }

    removeItem (cartItem) {

        var itemIndexInArray;
        this.state.items.some(function(item, index) {
          if(item.id === cartItem.id) {
            itemIndexInArray = index;
            return true;
          }else{
            return false;
          }
        });
        //assuming item to be removed is always in array
        if(this.state.items[itemIndexInArray].quantity > 1){
            var stateCopy = Object.assign({}, this.state);
            stateCopy.items[itemIndexInArray].quantity -= 1;
            this.setState(stateCopy);
        }else{
            this.state.items.splice(itemIndexInArray, 1);
        }
        //tell parent about removal
        console.log(this.state);
        this.setState({
            header: this.state.header - 1
        });
        var e = {};
        var rem = cartItem.price;
        var neg = -Math.abs(rem);
        e.header = this.state.header - 1;
        e.price = neg;
        console.log(e.price);
        PubSub.publish('cart.edited', e)
        PubSub.publish('change.price', e)
        this.countTotal();
        console.log(this.state);
    }

    addQuantity(cartItem){
        var itemIndexInArray;
        this.state.items.some(function(item, index) {
          if(item.id === cartItem.id) {
            itemIndexInArray = index;
            return true;
          }else{
            return false;
          }
        });
        //assuming item to be added is always in array
        if(this.state.items[itemIndexInArray].quantity > 1){
            var stateCopy = Object.assign({}, this.state);
            stateCopy.items[itemIndexInArray].quantity += 1;
            this.setState(stateCopy);
        }
        //tell parent about removal
        console.log(this.state);
        this.setState({
            header: this.state.header + 1,
            items: this.state.items
        });
        var e = {};
        e.header = this.state.header + 1;
        e.price = cartItem.price;
        console.log(e.price);
        PubSub.publish('cart.edited', e)
        PubSub.publish('change.price', e)
        this.countTotal();
        console.log(this.state);
        console.log(this.props.location.state);
    }
    countTotal() {
        let totalPrice = 0;
        this.state.items.forEach(function (item) {
          var indiv_price = item.price*item.quantity;
          totalPrice += +parseFloat(indiv_price);
        });
        this.setState({
          totalPrice: totalPrice.toFixed(2)
        });
    }

    deleteCart(e){
        var itemsE = [];
        this.setState({
            items: itemsE,
            header: 0,
            cartTotal: 0
        });
        PubSub.publish('cart.wiped')
        var payload = {"userid": this.state.userID};
        API.postRequest(payload, "/shopcart/deletecart").then((jsonRes)=>{
            if(jsonRes.status==200){
                alert("Items successfully Deleted");
                API.changePath("/shopcart", this.props.location.state)
            }
        })
    }

    saveItems(e){
        var id = this.state.userID;
        var payload = {"userid": id};
        API.postRequest(payload, "/shopcart/deletecart").then((jsonRes)=>{})
        this.state.items.map(function(item) {
            var payload = {
                "userid" : id,
                "bookID" : item.id,
                "quantity": item.quantity,
                "price": item.price,
                "title": item.title,
                "imageSrc": item.imageSrc 
            }
            API.postRequest(payload, "/shopcart/savecart").then((jsonRes)=>{})
        })
        alert("Items successfully saved!");
    }

    render(){
        var items = this.state.items.map(function(item) {
            return (
                <li key={item.id} style ={{listStyle: 'none'}}>
                    <span onClick={()=>API.changePath("/books/" + item.id,{})}><img style= {{width:'60px', height: "100px", marginBottom:'60px'}} src={item.imageSrc} alt="cover"/></span>
                    <span> {item.title} </span>
                    <span style = {{float: 'right',marginRight: '100px'}}>${item.price}</span>
                    <span><button onClick={this.removeItem.bind(this, item)}>[-]</button></span>
                    <span style={{marginRight: '10px', marginLeft:'10px'}}>{item.quantity}</span>
                    <span><button onClick = {this.addQuantity.bind(this, item)}>[+]</button></span>
                </li>
            )
        },this);
        var body = (
            <div>
                <ul>
                    {items}
                </ul>
                <div><h1>Total: ${this.state.totalPrice} </h1></div>
                <div><button> Checkout </button></div>
                <div><button onClick = {this.saveItems}> Save Items For Later </button></div>
                <div><button onClick = {this.deleteCart}> Delete Cart Items</button></div>
            </div>
        );
        var empty = <div className="alert alert-info">Cart is empty</div>;
        return (
            <div className = 'shopping-cart'>
                <div className="panel panel-default">
                    <div>Your Cart: </div>
                    <div className="panel-body">
                        {items.length > 0 ? body : empty}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopCart;

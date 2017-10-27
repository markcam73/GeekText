import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './cart.css';

class ShopCart extends Component{
    constructor(props) {
        super(props);
        this.state={
            totalPrice:0,
            items:[],
            header:0
        }
        this.countTotal = this.countTotal.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentWillMount() {        
        var cartItems = this.props.location.state.books;
        var cartTotal = this.props.location.state.cartTotal;
        var header = this.props.location.state.header;
        var _this = this;
        _this.setState({
            items: cartItems,
            totalPrice: cartTotal,
            header: header
        })
        console.log(this.props);
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
        e.header = this.state.header - 1;
        e.price = cartItem.price;
        console.log(e.price);
        PubSub.publish('cart.removed', e)
        PubSub.publish('change.price', e)
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
          totalPrice: totalPrice.toFixed(2)
        });
    }

    render(){
        var items = this.state.items.map(function(item) {
            return (
                <li key={item.id} style ={{listStyle: 'none'}}>
                    <span> {item.title} </span>
                    <span style = {{float: 'right'}}>${item.price}</span>
                    <span><button onClick={this.removeItem.bind(this, item)}>[{item.quantity}]</button></span>
                </li>
            )
        },this);
        var body = (
            <ul>
                {items}
            </ul>
        );
        var empty = <div className="alert alert-info">Cart is empty</div>;
        return (
            <div className = 'shopping-cart'>
                <div className="panel panel-default">
                    <div>Your Cart: </div>
                    <div className="panel-body">
                        {items.length > 0 ? body : empty} 
                        <div>Total: ${this.state.totalPrice} </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopCart;

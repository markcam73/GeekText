import React, { Component } from 'react';
import Book from './Book.js';
import PubSub from 'pubsub-js';

class ShopCart extends Component{
    constructor(props) {
        super(props);

        this.state = {
          total: 0,
          items: []
        };

        this.countTotal = this.countTotal.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        PubSub.subscribe('cart.added', this.addItem);
        PubSub.subscribe('cart.removed', this.removeItem);


    }

    addItem (e, item) {
        var items = this.state.items;
        items.push(item)
        this.setState({items: items})
        this.forceUpdate();

        this.countTotal();
    }

    removeItem (e, itemId) {
        var itemIndexInArray;

        this.state.items.some(function(item, index) {
          if(item.id === itemId) {
            itemIndexInArray = index;
            return true;
          }
        });

        this.state.items.splice(itemIndexInArray, 1);
        this.forceUpdate();

        this.countTotal();
    }

    countTotal() {
        let totalPrice = 0;

        this.state.items.forEach(function (item) {
          totalPrice += +parseFloat(item.price);
        });

        this.setState({
          "total": totalPrice.toFixed(2)
        });
    }

    render(){
        var items = this.state.items.map(function(item) {
            return (
                <li key={item.id} className="cart-item">
                    <span> {item.name} </span>
                    <span> $ {item.price}</span>
                </li>
            )
        });

        var body = (
            <ul>
                {items}
            </ul>
        );

        var empty = <div className="alert alert-info">Cart is empty</div>;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h5>Shopping Cart</h5>
                    {items.length > 0 ? body : empty}
                    <div>Total: ${this.state.total} </div>
                </div>
            </div>
        );
    }
}


var styles ={
    divStyle:{
      marginBottom: "3px",
      justifyContent: "right"
    }
}
export default ShopCart;

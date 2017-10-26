import React, { Component } from 'react';
import API from '../API';
class Profile extends Component {
  constructor(supplied) {
    super(supplied);
    this.state={
      user:{
          creditCards:[],
          shippingAddresses: []
        }
    }
  }
  componentWillMount(){
    var username = this.props.params.username;
    console.log(username);
    var _this = this;
    API.getRequest('/profile/' + username).then(function(data){
      console.log(data.creditCards);
      console.log(data.shippingAddresses);
      _this.setState({user:data});

    })
  }
  render() {
    return (
      <div style={styles.divStyle}>
        <div>
          <h1>Profile</h1>
          <p>Username: {this.state.user.username}</p>
          <p>FirstName: {this.state.user.firstName}</p>
          <p>LastName: {this.state.user.lastName}</p>
          <p>Email: {this.state.user.email}</p>
          <p>Address: {this.state.user.homeAddress}</p>
        </div>
        <div>
          <h1>Your Shipping Addresses</h1>
          {this.state.user.shippingAddresses.map((address,i)=>
            <div key={i}>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
            </div>)}
        </div>
        <div>
          <h1>Credit Card Information</h1>
          {this.state.user.creditCards.map((cards,i)=>
          <div key={i}>
            <p>{cards.cardCompany}</p>
            <p>{cards.cardNumber}</p>
            <p>{cards.expirationDate}</p>
          </div>)}
        </div>
      </div>
    );
  }
}
var styles ={
  divStyle:{
    display: "inline-block",
    marginBottom: "8px",
    width: "calc(25% - 4px)",
    marginRight: "8px",
    cursor: "hand"
  },
  imgStyle:{
    width:"100%"
  }
}
export default Profile;

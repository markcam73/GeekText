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
    if(window.sessionStorage.token) {
      var payload = {
          token: window.sessionStorage.token
      };
      var _this = this;
      API.postRequest(payload, '/profile').then((jsonRes) => {
            console.log(jsonRes);
            if (jsonRes.status===200){
              _this.setState({user:jsonRes})
            }else{

            }
      })
    }else{
      API.changePath("/",{})
    }
  }
  delete_address(street, city, state, zip){
    var payload = {
      "token": window.sessionStorage.token,
      "username": this.state.user.username,
      "street": street,
      "city": city,
      "state": state,
      "zipcode": zip
    };
    var _this = this;
    API.postRequest(payload, "/profile/delete/shippingaddress").then((jsonRes)=>{
      if(jsonRes.status==200){
        API.changePath("/profile", window.sessionStorage.token)
      }
    window.location.reload()
    })
  }
  delete_card(cardNumber,cardCompany,expirationDate){
    var payload = {
      "token": window.sessionStorage.token,
      "username": this.state.user.username,
      "cardNumber": cardNumber,
      "cardCompany": cardCompany,
      "expirationDate": expirationDate
    };
    API.postRequest(payload, "/profile/delete/card").then((jsonRes)=>{
      if(jsonRes.status==200){
        API.changePath("/profile", window.sessionStorage.token)
      }
    window.location.reload()
    })
  }
  edit_profile(username, firstName, lastName, email, homeAddress){
    var payload = {
      "username": this.state.user.username,
      "firstName": this.state.user.firstName,
      "lastName": this.state.user.lastName,
      "email": this.state.user.email,
      "homeAddress": this.state.user.homeAddress
    };
    API.changePath("/profile/edit", payload)
  }
  add_address(){
    var payload = {
      "username": this.state.user.username
    }
    API.changePath("profile/insert/shippingaddress",)
  }
  add_card(){
    API.changePath("profile/insert/card")
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
          <button onClick={()=>this.edit_profile(this.state.user.username,
            this.state.user.firstName, this.state.user.lastName, this.state.user.email,
            this.state.user.homeAddress)}>Edit Profile</button>
        </div>
        <div>
          <h1>Your Shipping Addresses</h1>
          {this.state.user.shippingAddresses.map((address,i)=>
            <div key={i}>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <button onClick={()=>this.delete_address(address.street,address.city,
                address.state,address.zip)}>Delete Shipping Address</button>
            </div>)}
          <button onClick={()=>this.add_address()}>Add Shipping Address</button>
        </div>
        <div>
          <h1>Credit Card Information</h1>
          {this.state.user.creditCards.map((cards,i)=>
          <div key={i}>
            <p>{cards.cardCompany}</p>
            <p>{cards.cardNumber}</p>
            <p>{cards.expirationDate}</p>
            <button onClick={()=>this.delete_card(cards.cardNumber,cards.cardCompany,
              cards.expirationDate)}>Delete Credit Card</button>
          </div>)}
          <button onClick={()=>this.add_card()}>Add Credit Card</button>
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

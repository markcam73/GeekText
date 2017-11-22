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
      <div>
      <div style={styles.containerDiv}>
            <div style={styles.leftDiv}>
              <h2>Account Information</h2>
              <p><b>Username:</b> {this.state.user.username}</p>
              <p><b>First Name:</b> {this.state.user.firstName}</p>
              <p><b>Last Name:</b> {this.state.user.lastName}</p>
              <p><b>Email:</b> {this.state.user.email}</p>
              <p><b>Billing Address:</b> {this.state.user.homeAddress}</p>
              <button onClick={()=>this.edit_profile(this.state.user.username,
                this.state.user.firstName, this.state.user.lastName, this.state.user.email,
                this.state.user.homeAddress)}style={{fontSize: '12px', height: '20px'}}>Edit Profile</button>
            </div>
              

            <div style={styles.leftInnerDiv}>
              <h2>Shipping Information</h2>
              {this.state.user.shippingAddresses.map((address,i)=>
                <div key={i}>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zip}</p>
                  <p><button onClick={()=>this.delete_address(address.street,address.city,
                    address.state,address.zip)}style={{fontSize: '12px', height: '20px'}}>Delete</button></p>
                </div>)}
              <button onClick={()=>this.add_address()}style={{fontSize: '12px', height: '20px'}}>Add Shipping Address</button>
            </div>
          

            <div style={styles.rightDiv}>
              <h2>Payment Information</h2>
              {this.state.user.creditCards.map((cards,i)=>
              <div key={i}>
              <p>{cards.cardCompany}</p>
              <p>{cards.cardNumber}</p>
              <p>{cards.expirationDate}</p>
              <p><button onClick={()=>this.delete_card(cards.cardNumber,cards.cardCompany,
              cards.expirationDate)}style={{fontSize: '12px', height: '20px'}}>Delete</button></p>
              </div>)}
              <button onClick={()=>this.add_card()}style={{fontSize: '12px', height: '20px'}}>Add Payment Method</button>
            </div>
        </div>
    </div>
    );
  }
}
var styles ={
  h2:{
    fontSize: "16px"
  },
  h3:{
    fontSize: "16px"
  },
  h4:{
    fontSize: "12px"
  },
  containerDiv:{
    display: "flex",
    font: "50%",
    background: "#cccccc"

  },
  leftDiv:{
    padding:"10px",
    display: "left",
    marginRight:"auto",
    marginLeft:"10%",
    lineHeight:"12px"
  },
  leftInnerDiv:{
    display: "fixed",
    display: "center",
    padding:"10px",
    lineHeight:"12px"

  },
  rightDiv:{
    display: "right",
    marginLeft: "auto",
    marginRight:"10%",
    padding:"10px",
    lineHeight:"12px"
  },
  imgStyle:{
    width:"100%"
  }
}
export default Profile;

import React, { Component } from 'react';
import API from '../API';

class AddCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.sessionStorage.token,
      username: "",
      cardCompany:"",
      cardNumber:"",
      securityCode:"",
      expirationDate:""
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.add = this.add.bind(this);

  }
  handleValueChange(event, key) {
    var obj ={}
    obj[key]=event.target.value
    this.setState(obj);
  }
  add(){
    var _this = this;
    API.postRequest(_this.state,'/profile/insert/card').then((jsonRes) => {
      if (jsonRes.status===200){
        API.changePath("/profile",{username:_this.state.username})
      }
    })
  }
  render() {
    return (
      <div style={styles.containerStyle} >
        <form style={styles.containerStyle} onSubmit={this.add}>
          <label>
            Credit Card Company:
            <input type="cardCompany" value={this.state.cardCompany} onChange={(e)=>this.handleValueChange(e,"cardCompany")} />
          </label>
          <label>
            Credit Card Number:
            <input type="cardNumber" value={this.state.cardNumber} onChange={(e)=>this.handleValueChange(e,"cardNumber")} />
          </label>
          <label>
            Security Code:
            <input type="securityCode" value={this.state.securityCode} onChange={(e)=>this.handleValueChange(e,"securityCode")} />
          </label>
          <label>
            Expiration Date:
            <input type="expirationDate" value={this.state.expirationDate} onChange={(e)=>this.handleValueChange(e,"expirationDate")} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
var styles={
  containerStyle:{
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto"
  }
}
export default AddCreditCard;

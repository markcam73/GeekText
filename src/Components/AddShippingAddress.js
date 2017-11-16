import React, { Component } from 'react';
import API from '../API';

class AddShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.sessionStorage.token,
      username: "",
      street:"",
      city:"",
      state:"",
      zipcode:""
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
    API.postRequest(_this.state,'/profile/insert/shippingaddress').then((jsonRes) => {
          if (jsonRes.status===200){
            window.sessionStorage.token=jsonRes.token;
            API.changePath("/profile",{username:_this.state.username})
          }
    })
  }
  render() {
    return (
      <div style={styles.containerStyle} >
        <form style={styles.containerStyle} onSubmit={this.add}>
          <label>
            Street:
            <input type="Street" value={this.state.street} onChange={(e)=>this.handleValueChange(e,"street")} />
          </label>
          <label>
            City:
            <input type="City" value={this.state.city} onChange={(e)=>this.handleValueChange(e,"city")} />
          </label>
          <label>
            State:
            <input type="State" value={this.state.state} onChange={(e)=>this.handleValueChange(e,"state")} />
          </label>
          <label>
            Zipcode:
            <input type="Zipcode" value={this.state.zipcode} onChange={(e)=>this.handleValueChange(e,"zipcode")} />
          </label>
          <input type="submit" value="Submit" />
          {this.state.incorrect ? <p>{this.state.incorrect}</p> : null}
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
export default AddShippingAddress;

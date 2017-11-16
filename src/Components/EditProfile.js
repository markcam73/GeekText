import React, { Component } from 'react';
import API from '../API';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.sessionStorage.token,
      username: '',
      password: '',
      confirmPassword:"",
      incorrect:"",
      firstName:"",
      lastName:"",
      email:"",
      homeAddress:""
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);

  }
  componentWillMount(){
    var _this = this;
    if (this.props.location.state.username){
      _this.setState({username:this.props.location.state.username})
    }
    if (this.props.location.state.firstName){
      _this.setState({firstName:this.props.location.state.firstName})
    }
    if (this.props.location.state.lastName){
      _this.setState({lastName:this.props.location.state.lastName})
    }
    if (this.props.location.state.email){
      _this.setState({email:this.props.location.state.email})
    }
    if (this.props.location.state.homeAddress){
      _this.setState({homeAddress:this.props.location.state.homeAddress})
    }
  }
  handleValueChange(event, key) {
    var obj ={}
    obj[key]=event.target.value
    this.setState(obj);
  }
  updateProfile(){
    if(this.state.password!==this.state.confirmPassword){
      this.setState({incorrect:"Passwords do not match"});
      return;
    }
    var _this = this;
    API.postRequest(_this.state,'/profile/edit').then((jsonRes) => {
          if (jsonRes.status===200){
            window.sessionStorage.token=jsonRes.token;
            API.changePath("/profile",{username:_this.state.username})
          }else{
            _this.setState({incorrect: jsonRes.error});
          }
    })
  }
  render() {
    return (
      <div style={styles.containerStyle} >
        <form style={styles.containerStyle} onSubmit={this.updateProfile}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={(e)=>this.handleValueChange(e,"username")} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={(e)=>this.handleValueChange(e,"password")} />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={this.state.confirmPassword} onChange={(e)=>this.handleValueChange(e,"confirmPassword")} />
          </label>
          <label>
            First name:
            <input type="text" value={this.state.firstName} onChange={(e)=>this.handleValueChange(e,"firstName")} />
          </label>
          <label>
            Last name:
            <input type="text" value={this.state.lastName} onChange={(e)=>this.handleValueChange(e,"lastName")} />
          </label>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={(e)=>this.handleValueChange(e,"email")} />
          </label>
          <label>
            Home Address:
            <input type="text" value={this.state.homeAddress} onChange={(e)=>this.handleValueChange(e,"homeAddress")} />
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
export default EditProfile;

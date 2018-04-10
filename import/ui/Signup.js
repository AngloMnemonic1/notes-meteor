import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base'
import PropTypes from 'prop-types'; // ES6


export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
  }

  componentWillMount() {

  }
  
  componentWillUpdate(){
    if (Accounts.userId()){
      this.props.history.push('/dashboard');
    }
  }

  render(){
    return (
      <div className = "boxed-view">
        <div  className = "boxed-view-box">
          <h2>Join</h2>
          {/*//if statement error true pint tag else nothing*/}
          {this.state.error ? <p>{this.state.error}</p> :undefined}
          <form onSubmit = {this.onSubmit.bind(this)} noValidate className = "boxed-view-form"> {/* call method */}
            <input type = "email" name = "email" placeholder ="Email"/>
            <input type = "password" name = "password" placeholder="Password"/>
            <button className = "button">Create Account</button>
          </form>
          <p><Link to= "/">Already have an account</Link></p>
        </div>
      </div>
    );
  }


  onSubmit(event){
    event.preventDefault();

    var userObject = {
       email: event.target.email.value.trim(),
       password: event.target.password.value.trim()
     };
    if (userObject.password.length < 4){
       return this.setState({error: 'Password must be more than 4 characters long'})
    }
    Accounts.createUser(userObject, (error) => {
      //sending error to call back function
        //console.log('signup callback', error);
        if (error){
          this.setState({error: error.reason});
        } else {
          this.setState({error: ''});
        }
    }); //createUser end
  } //on submit end

}


Signup.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
//Signup.propTypes = {
//    error: PropTypes.var
//  }

/*
  export default class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        count: this.props.count || 0
      };
    }
    render(){
      return (
        <div>
          <h1>Join Short Link</h1>
          <p>{this.state.count}</p>
          <button  onClick = {this.increment.bind(this)}>+1</button>
          <button  onClick = {this.decrement.bind(this)}>-1</button>
          <p><Link to= "/">Already have an account</Link></p>
        </div>
      );
    }

    increment(){
      this.setState({ //need to do this so that page updates on change in state
        count: this.state.count + 1
      });
    }
    decrement(){
      this.setState({ //need to do this so that page updates on change in state
        count: this.state.count - 1
      });
    }

  }

  Signup.propTypes = {
      count: PropTypes.number
    }

    */

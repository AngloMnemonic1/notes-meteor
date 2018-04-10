import { Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { Link } from 'react-router-dom';

import { IsAuth } from './IsAuth'


export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = { error: '', fireRedirect: false };
  }
  componentWillMount() {
      const firePush = new IsAuth(Meteor.userId(),this.props.location.pathname);
      if (firePush.EnterPublicPageAuth){
        this.props.history.push('/dashboard');
      }
         //this.props.history.push('/?Ipushed');
         //console.log('props', this.props);
         console.log('Login firePush ', firePush.EnterPublicPageAuth,
         'Meteor.userId() ', Meteor.userId(),
         'this.props.location.pathname', this.props.location.pathname
       );
   }
  componentWillUpdate(){
    console.log('will update ')
  }

  componentDidUpdate(){
    if (this.state.fireRedirect){
      this.props.history.push('/dashboard');
    }
    console.log('did update ',this.state)
  }

  componentWillReceiveProps(nextProps){
    console.log('Receive props', nextProps)
  }

  render(){
    //return <p>Login component here</p>
    return (
    <div className = "boxed-view">
      <div  className = "boxed-view-box">
        <h2>Login</h2>
        {/*//if statement error true pint tag else nothing*/}
        {/*this.state.error ? <p>{this.state.error}</p> :undefined */}
        {this.displayError(this.state.error)}

        <form onSubmit = {this.onSubmit.bind(this)} noValidate className = "boxed-view-form"> {/* call method */}
          <input type = "email" name = "email" placeholder ="Email"/>
          <input type = "password" name = "password" placeholder="Password"/>
          <button className = "button">Login</button>
        </form>

        <Link to = "/signup">Not registered? - create an account</Link>
      </div>

    </div>
    );
  }

  onSubmit(event){
    //<Redirect to="/link" />
    event.preventDefault();
    let email =  event.target.email.value.trim();
    let password = event.target.password.value.trim();

    Meteor.loginWithPassword(
      {email},
      password,
      (error) => {
        //sending error to call back function
        if (error){
          console.log('login error', error);
          this.setState({error: error.reason});
        } else {
          console.log('login no error', error);
          this.setState({
            fireRedirect: true,
            error: ''
          });
        }
      } //error callback end
    ); // Meteor.loginWithPassword end

  }

  displayError(error){
    console.log(error)
    if (error){
      return(<p>{error}</p>)
    } else {
      undefined;
    }
  }

}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

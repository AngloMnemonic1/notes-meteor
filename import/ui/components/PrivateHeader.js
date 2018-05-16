import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'; // ES6
import store from 'store'

//NOTE Stateless function component
const PrivateHeader = (props) => {

  const OnLogout = () =>{
      Accounts.logout( (error) =>{
        if (error){
          console.log('Logout error');
        }else{
          console.log('No logout error');
          props.history.replace('/');
        }
      });
      store.set('storedNoteId', undefined);
    } // end On logout

    return (
      <div className = "header" >
        <div className = "header-content">
          <h1 className = "header-title">{props.title}</h1>
          <button className = "button button-linktext" onClick = {OnLogout.bind(this)}>Logout</button>
          {/*
            <button onClick = {OnLogout.bind(this)}>Logout</button>
            console.log(this.props)*/}
        </div>
      </div>
    );


}

PrivateHeader.propTypes = {
  history: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default PrivateHeader;





/*

export default class PrivateHeader extends React.Component {
  //constructor(props){
  //  super(props);
  //  }

  render(){
   return (
     <div>
        <h1>{this.props.title}</h1>
        <button onClick = {this.OnLogout.bind(this)}>Logout</button>
        {console.log(this.props)}
      </div>

   )
 }

 OnLogout(){
     Accounts.logout( (error) =>{
       if (error){
         console.log('Logout error');
       }else{
         console.log('No logout error');
          this.props.history.replace('/');
       }
     });
   } // end On logout
}
*/

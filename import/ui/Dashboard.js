import { Meteor } from 'meteor/meteor';

import React from 'react';
//import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'; // ES6
import { IsAuth } from './IsAuth';
import PrivateHeader from './components/PrivateHeader';
import NoteList from './components/NoteList';

//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom'


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
      const firePush = new IsAuth(Meteor.userId(),this.props.location.pathname);
      if (firePush.EnterPrivatePageAuth){
        this.props.history.replace('/');
      }

      //console.log("Links",this.props);
   }

   render(){
    return (
      <div>
         <PrivateHeader title = "Dashboard" history = {this.props.history} />
         <div className = "page-content">
           <NoteList props = {this.props}/>
         </div>
      </div>
    )
  }


//<NoteList history = {this.props.history} props = {this.props}/>


} //end class

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

/*

onSubmit(event){
  event.preventDefault();
  const url =  event.target.url.value.trim();
  if (url){
    Meteor.call('Links_Insert', url);
    //dbLinks.insert({url: url, userId: Meteor.userId()});
    event.target.url.value = '';
    console.log('Added link ', url);
  }

}
//OnLogout(){
//    Accounts.logout( (error) =>{
//      if (error){
  //      console.log('Logout error');
  //    }else{
  //      console.log('No logout error');
  //       this.props.history.replace('/');
  //    }
  //  });
  //} // end On logout


<h1>Your links</h1>
<button onClick = {this.OnLogout.bind(this)}>Logout</button>

    //Accounts.logout(function(error){
    //  if (error == null) {
    //    console.log('Logout click no error',error)
        //this.props.history.push('/');
    //    this.setState({fireRedirect: true});
    //  }
      //callback no error then can Logout
      //console.log('Logout click no error',error)
      //if (!error){

        //this.props.history.push('/');
      //}
  //  });
    //this.setState({fireRedirect: true});







<Link to="/">
 <button>Logout</button>
</Link>


let withRouter = (ButtonToNavigate) => {

}

const ButtonToNavigate = ({ title, history }) => (
  <button
    type="button"
    onClick={() => history.push('/login')}
  >
    {title}
  </button>
);

ButtonToNavigate.propTypes = {
    title: PropTypes.string,
    history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
*/

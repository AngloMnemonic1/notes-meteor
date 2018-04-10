import {Meteor} from 'meteor/meteor';
//import { Tracker } from 'meteor/tracker';
//import { ReactiveDict } from 'meteor/reactive-dict';
import ReactDOM from 'react-dom';
import { routes } from '../import/routes/routes';
import '../import/startup/simple-schema-config.js';


//const sessionDict = new ReactiveDict();
//sessionDict.set('name', 'Steve');

//NOTE Session - only in client re renders on change
//Tracker.autorun( () => {
//  const name =sessionDict.get('name');
//  console.log('Name: ', name);
//});


Meteor.startup(() => {

  ReactDOM.render(routes, document.getElementById('app'));


});




/*


Meteor.call("greetUser",'bob', function(error, result){
  if(error){
    console.log("error", error);
  }
  if(result){
     console.log("Greet user arguments client ", result);
  }
});

Meteor.call("addNumbers",3,4, function(error, result){
  if(error){
    console.log("error", error);
  }
  if(result){
     console.log("Greet user arguments client ", result);
  }
});


*/

//const history = createHistory();
//const unauthenticatedPages = ['/', '/signup'];
//const authenticatedPages = ['/link'];
//const onEnterPublicPage = () => {
//  if (Meteor.userId()){
    //should not view this page when logged in divert to link
//    history.push('/link');
//  }
//};
//const onEnterPrivatePage = () => {
  //if (!Meteor.userId()){
    //should not view this page when not logged in divert to /
  //  history.push('/');
  //  console.log('pushed it');
//  }
//};



    //dbLinks.propTypes = {
    //  links: PropTypes.object.isRequired
  //  }
//var UserAuthenticated = () => {
//  UserAuthenticated = true;
//  return UserAuthenticated;
  //if (Meteor.userId()){
  //  return true;
//  }else{
  //  return false;
//  }
//}





  //!!Meteor.userId(); conversts to true or false

  //const isAuthenticated = !!Meteor.userId();
  //const pathname = history.location.pathname;
  //const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  //const isAuthenticatedPage = authenticatedPages.includes(pathname);
  //if (isUnauthenticatedPage && isAuthenticated){
  //  history.push('/link');
  //} else if (isAuthenticatedPage && !isAuthenticated){
  //  history.push('/');
  //  }

  //console.log('isAuthenticated', isAuthenticated," pathname "  + pathname, " isAuthent " + isAuthenticatedPage );
  //console.log('history',history);

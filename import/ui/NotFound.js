import React from 'react';
import { Link } from 'react-router-dom';

//NOTE Stateless function component
const NotFound = () => {
  return (
    <div className = "boxed-view">
      <div  className = "boxed-view-box">
        <h1>Page not found</h1>
        <p>Hmmmm, unable to find that page.</p>
        <Link to = "/" className = "button-link">Head Home</Link>
      </div>
    </div>
  );
}
export default NotFound;

/*
export default class NotFound extends React.Component {
  render(){
    return <p>Not found component here</p>
  }
}

*/

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types'; // ES6

export const NoteListHeader = (props) => {

  const clickCreateNote = () =>{
    props.meteorCall('notes.insert');
  }

  return (
    <div>
      <button onClick={clickCreateNote}>Create Note</button>
    </div>
  );
};


export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

// () => {
//  props.meteorCall('notes.insert');
//}}

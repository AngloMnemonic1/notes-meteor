import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import store from 'store';
import PropTypes from 'prop-types'; // ES6


export const NoteListHeader = (props) => {

  const clickCreateNote = () =>{
    props.meteorCall('notes.insert', function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        //result
        store.set('storedNoteId', result);
        store.set('refreshPage', true);
        //console.log("result",result);
        //console.log("createNoteProps",props);
      }

   });
    //const dbCollection = Notes.find({}).sort({_id:-1}).limit(1).fetch()
    //console.log('CreateNote', dbCollection._id );
    //store.set('storedNoteId', dbCollection._id);
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

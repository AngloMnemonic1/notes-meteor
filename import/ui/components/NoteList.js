import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../api/notes';
import PropTypes from 'prop-types'; // ES6
import NoteListHeader from './NoteListHeader';
import NotesListItem from './NotesListItem';
//stateless function component
export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
      {/* using map method to convert notes array into jsx array*/
        renderNotesListItems(props)

      }

      NoteList { props.notes.length }
    </div>
  );
};

const renderNotesListItems = (props) => {
  return props.notes.map( (note) => {
      return <NotesListItem key = {note._id} note = {note} /> //<p key = {link._id} >URL {link.url}</p>
    });
}

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()   // passed in as notes prop
  };
}, NoteList);

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

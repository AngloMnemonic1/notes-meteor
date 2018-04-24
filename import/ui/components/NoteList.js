import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import moment from 'moment';
import store from 'store'
//import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../api/notes';
import PropTypes from 'prop-types'; // ES6
import NoteListHeader from './NoteListHeader';
//import NotesListItem from './NotesListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export default class NoteList extends React.Component {

  constructor(props){
    super(props);
    //this.onClickMe = this.onClickMe.bind(this);

    this.state = {
      selectedNoteId: '',
      notes: []
    };
  }



  componentDidMount() {
    //NOTE tracker
    this.NotesTracker = Tracker.autorun(
      () => {
        //NOTE subscription
        Meteor.subscribe('notes');
        const dbCollection = Notes.find().fetch();
        //console.log('dbCollection ', dbCollection);
        this.setState({notes: dbCollection});
      }
    );


    //console.log("props",this.props);

  }

  componentWillUnmount() {
    this.NotesTracker.stop();
    Meteor.unsubscribe('notes');
  }


  render(){
    return(
      <div>

        {this.renderNoteItems()}
        <NoteListHeader/>
      </div>
    )
  }

  renderNoteItems(){
    if (this.state.notes.length == 0){
          console.log('no items ',this.state.notes.length);
          return (
              <NoteListEmptyItem/>
          );
    }
    console.log('state ',this.state);
      console.log('state ',this.props);
    //we have items to NoteList

    return this.state.notes.map( (note) => {
        return (
          <div key = {note._id} onClick = { this.onClickMe.bind(this,note._id)  }>
            <h5>
              { note.title || 'Untitled note' }
              <p>
                { moment(note.updateAt).format('DD/M/YY')}
                { this.IsItSelected(note._id) }

              </p>

            </h5>
          </div>

        );    //<NotesListItem key = {note._id} note = {note} props = {this.props}/> //<p key = {link._id} >URL {link.url}</p>
    });


  }

  onClickMe(noteId){
      this.setState({selectedNoteId: noteId });
      store.set('storedNoteId', noteId);
      //this.props.history.replace('/dashboard/');
      console.log('selectedNoteId', noteId);
      console.log('storedNoteId', store.get('storedNoteId'));
  }

  IsItSelected(noteId) {
    //this.props.history.replace('/dashboard/');
    //if (this.state.selectedNoteId == noteId) {
    if (noteId == store.get('storedNoteId')) {
      return('Selected');
    } else {
      undefined;
    }

  }


}

NoteList.propTypes = {
  notes: PropTypes.array,
  history: PropTypes.object

};
/*

//stateless function component
export const NoteList = (props) => {
  // using map method to convert notes array into jsx array
  return (
    <div>
      <NoteListHeader/>

      {renderNotesListItems(props)}
      NoteList { props.notes.length }
    </div>
  );
};

const renderNotesListItems = (props) => {
  if (props.notes.length == 0){
    //console.log('no items ',props.notes.length);
    return <NoteListEmptyItem/>

  }
  return props.notes.map( (note) => {
      return <NotesListItem key = {note._id} note = {note} history = {props.history}/> //<p key = {link._id} >URL {link.url}</p>
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
*/

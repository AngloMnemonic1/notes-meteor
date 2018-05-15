//import { Meteor } from 'meteor/meteor';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
//import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React from 'react';
import store from 'store';
import { Notes } from '../../api/notes';
//import PropTypes from 'prop-types'; // ES6


export default class Editor extends React.Component {

  constructor(props){
    super(props);
    //this.onClickMe = this.onClickMe.bind(this);
    const selectedNoteId = store.get('storedNoteId');
    //const dbCollection = Notes.findOne(selectedNoteId);
    //console.log('constructor', selectedNoteId);
    //const noteId = store.get('storedNoteId');
    this.state = {
      selectedNoteId: selectedNoteId,
      note: [],
      numCharTitle: 20,
      isLoaded: false
    };
  }



  componentDidMount() {
    //NOTE tracker
    this.NotesTracker = Tracker.autorun(
     () => {
        //NOTE subscription
        //Meteor.subscribe('notes');

      const dbCollection = Notes.findOne(this.state.selectedNoteId);
      //console.log('componentDidMount tracker', dbCollection);
      if (dbCollection){
        //if (dbCollection.title == null) {
        //  console.log('dbcollection', dbCollection.title);
      //  }
        //console.log('dbcollection', dbCollection.title);
        this.setState({
          note: dbCollection,
          isLoaded: true
         });
      }


      }
   );
  }

  componentWillUnmount() {
    this.NotesTracker.stop();

  }

  shouldComponentUpdate(){

    const selectedNoteId = store.get('storedNoteId');
    if (this.state.isLoaded && this.state.selectedNoteId == selectedNoteId){
      //console.log('shouldComponentUpdate false', selectedNoteId);
      return false;
    }
    const dbCollection = Notes.findOne(selectedNoteId).fetch()
    this.setState({
       selectedNoteId: selectedNoteId,
       note: dbCollection
    });
    console.log('shouldComponentUpdate', selectedNoteId,this.state.note);
     return true;

  }

  render(){
    console.log("this.state.numCharTitle", this.state.isLoaded, this.state.selectedNoteId,store.get('storedNoteId'));
    if (this.state.note) {
      //when there is a note
      return (
        <div>
          <textarea value = {this.state.note.title} placeholder = "Add your title here" onChange = {this.handleTitleChange.bind(this)} ></textarea>

          <textarea value = {this.state.note.body} placeholder = "Add your note here" onChange = {this.handleBodyChange.bind(this)}></textarea>
          <button>Delete</button>
        </div>
      )
    } else {
      // an empty notes
      return (
        //ternary operator
        <p>{this.state.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started'}</p>
      )
    }
  }

  handleTitleChange(event){
    console.log("handleTitleChange",event.target.value.length);

    Meteor.call('notes.update', this.state.selectedNoteId,{title: event.target.value});

    this.setState({
       isLoaded: false
    });
  }

  handleBodyChange(event){
    Meteor.call('notes.update', this.state.selectedNoteId,{
      body: event.target.value
      } , function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        //result
      }
    });
    this.setState({
       isLoaded: false
    });
    //console.log("handleBodyComponent",this.state.selectedNoteId, this.state.note);
  }

}
/*
<p>(Maximum characters: 20)</p>
<p>You have <textarea readOnly rows="1" name="countdown" value={this.state.numCharTitle}/> characters left.</p>
// /Editor.propTypes = {
//  dbCollection: PropTypes.object,
//  history: PropTypes.object

//*/

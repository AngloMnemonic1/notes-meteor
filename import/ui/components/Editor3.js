import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


import React from 'react';
import store from 'store';
import { Notes } from '../../api/notes';

//material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const styles = {
  errorStyle: {
    color: '#1B5E20',
  },
  floatingLabelStyle: {
    color: '#1B5E20',
  //  margin: '15px',
  },
  floatingLabelFocusStyle: {
    color: '#1B5E20',
  },
  floatingLabelShrinkStyle: {
    color: '#1B5E20',
  },
  textareaStyle: {
    border: '2px solid #1B5E20',
    padding: '5px',
  },
  underlineShow: false,
  underlineStyle: {
    borderColor: '#1B5E20',
  },

};
export default class Editor extends TrackerReact(React.Component) {
  constructor(props){
    super(props);
    //this.onClickMe = this.onClickMe.bind(this);
    //const selectedNoteId = store.get('storedNoteId');
    //const dbCollection = Notes.findOne(selectedNoteId);
    //console.log('constructor', selectedNoteId);
    //const selectedNoteId = store.get('storedNoteId');
    this.state = {
      selectedNoteId: '',
      note: [],
      numCharTitle: 20,
      currentTitle: '',
      currentNote: '',
      isLoaded: false
    };
  }


  componentDidMount() {
    //NOTE tracker
    this.NotesTracker = Tracker.autorun(
     () => {
        //NOTE subscription
        //Meteor.subscribe('notes');
      const selectedNoteId = store.get('storedNoteId');

      const dbCollection = Notes.findOne(selectedNoteId);
      console.log('componentDidMount tracker', selectedNoteId, dbCollection);
        if (dbCollection){
          //if (dbCollection.title == null) {
          //  console.log('dbcollection', dbCollection.title);
        //  }
          //console.log('dbcollection', dbCollection.title);
          this.setState({
            selectedNoteId: selectedNoteId,
            note: dbCollection,
            currentTitle: dbCollection.title,
            currentNote: dbCollection.body,
            isLoaded: true,  });
        }
      });
  }

  componentWillUnmount() {
    this.NotesTracker.stop();

  }

  shouldComponentUpdate(){
    const selectedNoteId = store.get('storedNoteId');
    if (this.state.selectedNoteId != selectedNoteId){
      console.log('shouldComponentUpdate', selectedNoteId, this.state.selectedNoteId );
      //console.log('shouldComponentUpdate stop', this.state.selectedNoteId, this.state.isLoaded);
      //return false;
      const dbCollection = Notes.findOne(selectedNoteId);
      if (dbCollection){
        this.setState({
                      selectedNoteId: selectedNoteId,
                      note: dbCollection,
                      currentTitle: dbCollection.title,
                      currentNote: dbCollection.body, });
      } else {
        this.setState({
                      selectedNoteId: '',
                      note: '',
                      currentTitle: '',
                      currentNote: '', });

      }

    }

    return true
  }

   //tracker-based reactivity in action, no need for `getMeteorData`!
	getNote() {

      const dbCollection = Notes.find(this.state.selectedNoteId).fetch();
      //const dbCollection = Notes.findOne(this.state.selectedNoteId).fetch();
      if (dbCollection){
        const note = dbCollection[0];
        return note;
      }
      return ''
	}

   render(){

    if (this.state.note) {
       console.log("Render ",this.state.selectedNoteId, this.state.currentTitle, this.state.currentNote );
       //when there is a note
       return (
         <div>
           <div>
             <MuiThemeProvider>
               <TextField
                 hintText="Add title"
                 floatingLabelText="Title"
                 value = {this.state.currentTitle}
                 onChange = {this.handleTitleChange.bind(this)}
                 floatingLabelShrinkStyle  ={styles.floatingLabelShrinkStyle}
                 underlineFocusStyle={styles.underlineStyle}
                />
             </MuiThemeProvider>
           </div>
           <div>
             <MuiThemeProvider>
               <TextField
                 hintText = "Add note"
                 floatingLabelText = "Note"
                 multiLine = {true}
                 rows ={3}
                 rowsMax ={5}
                 textareaStyle = {styles.textareaStyle}
                 underlineShow = {styles.underlineShow}
                 value = {this.state.currentNote}
                 onChange = {this.handleBodyChange.bind(this)}
                 floatingLabelShrinkStyle  = {styles.floatingLabelShrinkStyle}
                 underlineFocusStyle = {styles.underlineStyle}
                />
             </MuiThemeProvider>
           </div>
           <div>
             <button onClick = {this.onClickDelete.bind(this)}>Delete</button>
           </div>


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
       currentTitle: event.target.value,
       isLoaded: false });


   }

   handleBodyChange(event){
     console.log("handleBodyChange",event.target.value.length);
     Meteor.call('notes.update', this.state.selectedNoteId,{
       body: event.target.value
       } , function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){
         //result
          console.log("result",result);
       }
     });
     this.setState({
        currentNote: event.target.value,
        isLoaded: false
     });
     //console.log("handleBodyComponent",this.state.selectedNoteId, this.state.note);
   }

   onClickDelete(){
     console.log("deleted note",this.state.selectedNoteId);

     Meteor.call('notes.remove', this.state.selectedNoteId, function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){
         //result
         console.log("result",result);
       }
    });
    this.setState({ note: '', });
    store.set('storedNoteId', '');

   }


}

/*


shouldComponentUpdate(){
  const selectedNoteId = store.get('storedNoteId');
  if (this.state.selectedNoteId != selectedNoteId){
    //console.log('shouldComponentUpdate false', selectedNoteId);
    //console.log('shouldComponentUpdate stop', this.state.selectedNoteId, this.state.isLoaded);
    //return false;
    const dbCollection = Notes.findOne(selectedNoteId);
    this.setState({
      selectedNoteId: selectedNoteId,
      note: dbCollection,
      currentTitle: dbCollection.title,
      currentNote: dbCollection.body,

     });
  }

  return true
}




shouldComponentUpdate(){
   const selectedNoteId = store.get('storedNoteId');
   if (this.state.isLoaded && this.state.selectedNoteId == selectedNoteId){
     //console.log('shouldComponentUpdate false', selectedNoteId);
     console.log('shouldComponentUpdate stop', this.state.selectedNoteId, this.state.isLoaded);
     return false;
   }

   this.setState({
      selectedNoteId: selectedNoteId,
      isLoaded: true
   });
   console.log('shouldComponentUpdate go', this.state.isLoaded);
  return true;

}

const noteView = this.getNote();

 if (noteView) {

*/

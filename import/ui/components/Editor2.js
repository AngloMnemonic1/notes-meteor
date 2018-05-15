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
    const selectedNoteId = store.get('storedNoteId');
    this.state = {
      selectedNoteId: selectedNoteId,
      note: [],
      numCharTitle: 20,
      isLoaded: false
    };
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
     const noteView = this.getNote();
     if (noteView) {
       console.log("Render ",this.state.selectedNoteId,noteView.title,noteView.body );
       //when there is a note
       return (
         <div>
           <div>
             <MuiThemeProvider>
               <TextField
                 hintText="Add title"
                 floatingLabelText="Title"
                 value = {noteView.title}
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
                 value = {noteView.body}
                 onChange = {this.handleBodyChange.bind(this)}
                 floatingLabelShrinkStyle  = {styles.floatingLabelShrinkStyle}
                 underlineFocusStyle = {styles.underlineStyle}
                />
             </MuiThemeProvider>
           </div>

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
     console.log("handleBodyChange",event.target.value.length);
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

<textarea value = {noteView.title} placeholder = "Add your title here" onChange = {this.handleTitleChange.bind(this)}></textarea>
<textarea value = {noteView.body} placeholder = "Add your note here" onChange = {this.handleBodyChange.bind(this)}></textarea>
<textarea value = {note.title} placeholder = "Add your title here" ></textarea>

<textarea value = {note.body} placeholder = "Add your note here" ></textarea>

*/

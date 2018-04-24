import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'; // ES6


export default class NoteListItem extends React.Component {
//const NoteListItem = (props) => {
  constructor(props) {
      super(props);
      this.state = {
        selectedNoteId: ''
      };
  }

  shouldComponentUpdate() {
    console.log('update', this.props);
    return true;

  }

  render(){
    return (
      <div onClick = { this.onClickMe.bind(this)  }>
        <h5>
          { this.props.note.title || 'Untitled note' }
          <p>
            { moment(this.props.note.udatedAt).format('DD/M/YY')}
            { this.IsItSelected() }

          </p>

        </h5>
      </div>

    );
  }

  onClickMe(){
      //this.setState({selectedNoteId: this.props.note._id });
      this.props.history.replace('/dashboard/');
      console.log('update', this.props);
  }

  IsItSelected() {
    //this.props.history.replace('/dashboard/');
    //if (this.state.selectedNoteId == this.props.note._id) {

    //  return('Selected')

    //} else {
    //  undefined;
    //}

  }

}


NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired

};

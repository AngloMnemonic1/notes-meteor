import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'; // ES6

const NoteListItem = (props) => {

  return (
    <div>
      <h5>
        { props.note.title || 'Untitled note' }
        <p>
          { moment(props.note.udatedAt).format('DD/M/YY')}
        </p>
      </h5>
    </div>

  )

};
export default NoteListItem;

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

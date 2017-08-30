import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Note.css';


class Note extends Component{

  constructor(props){
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.removeHandler = this.removeHandler.bind(this);
  }

  removeHandler(id){
    this.props.removeNote(id);
  }

  render(props){
    return(
      <div className = "note fade-in">
      <span className = "close-btn" onClick = {() => this.removeHandler(this.noteId)}>
      &times;
      </span>
        <p className = "note-content">{this.noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
}

export default Note

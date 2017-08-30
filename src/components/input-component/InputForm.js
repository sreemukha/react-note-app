import React, {Component} from 'react';

import './InputForm.css';

class Input extends Component{
  constructor(props){
    super(props);
    this.state = {
      newNoteContent:'',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  // sets the value of newNoteContent to the value typed in by the user

  inputHandler(e){
    this.setState({
      // value entered by the user in the input box
      newNoteContent: e.target.value,
    })
  }

  addNote(){

    this.props.setNote(this.state.newNoteContent);

    this.setState({
      newNoteContent: '',
    })
  }

  render(){
    return(
      <div className = "inputWrapper">
        <input className = "noteInput" placeholder = "What's on your mind" value = {this.state.newNoteContent} onChange = {this.inputHandler}/>
        <button className = "inputButton" onClick = {this.addNote}>Add Note</button>
      </div>
    )
  }
}

export default Input

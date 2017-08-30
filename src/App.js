import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import Note from './components/note-component/Note';
import Input from './components/input-component/InputForm';
import {db_config} from './Config/Config';


import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.setNote = this.setNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(db_config);
    this.database = this.app.database().ref().child('notes');

    // react state for the component
    this.state = {
      notes:[],

    }
  }

  componentWillMount(){
    const oldNotes = this.state.notes;

    // Data in firebase
    this.database.on('child_added', snapshot => {
      oldNotes.push({
        id:snapshot.key,
        noteContent: snapshot.val().noteContent
      })
      this.setState({
          notes: oldNotes
      })
    })

    this.database.on('child_removed', snapshot =>{
        for(let i = 0;i<oldNotes.length;i++){
          if(oldNotes[i].id === snapshot.key){
            oldNotes.splice(i,1);
          }
        }
        this.setState({
          notes:oldNotes
        })
      })
  }


  setNote(note){
    //push note to notes array
    this.database.push().set({noteContent:note});
  }

  removeNote(noteId){
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className = "notesWrapper">
        <div className = "notesHeader">
          <div className = "header-content">Include Header Component here</div>
        </div>
        <div className = "notesBody">
          {
            this.state.notes.map((note) =>{
              return(
                  <Note noteContent = {note.noteContent} noteId = {note.id} key = {note.id} removeNote = {this.removeNote}/>
              )
            })
          }
        </div>
        <div className = "notesFooter">
          <Input setNote = {this.setNote}/>
        </div>

      </div>
    );
  }
}

export default App;

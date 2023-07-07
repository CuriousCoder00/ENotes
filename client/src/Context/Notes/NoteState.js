import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const { title, description, tag } = props;
  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzNlZDIyYjJhNTUyYWQwZWVmOTU5In0sImlhdCI6MTY4NzM3NTM2Nn0.QeEIegN1GYAEpPI-HbA2hn8EMqecVAdDrOtyV_X8IBM",
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzNlZDIyYjJhNTUyYWQwZWVmOTU5In0sImlhdCI6MTY4NzM3NTM2Nn0.QeEIegN1GYAEpPI-HbA2hn8EMqecVAdDrOtyV_X8IBM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzNlZDIyYjJhNTUyYWQwZWVmOTU5In0sImlhdCI6MTY4NzM3NTM2Nn0.QeEIegN1GYAEpPI-HbA2hn8EMqecVAdDrOtyV_X8IBM",
      },
    });
    if (!response.ok) {
      window.alert("Note could not be deleted");
    } else {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5MzNlZDIyYjJhNTUyYWQwZWVmOTU5In0sImlhdCI6MTY4NzM3NTM2Nn0.QeEIegN1GYAEpPI-HbA2hn8EMqecVAdDrOtyV_X8IBM",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = json.title;
        newNotes[index].description = json.description;
        newNotes[index].tag = json.tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

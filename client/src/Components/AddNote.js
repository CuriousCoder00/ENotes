import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";


const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [ note, setNote ] = useState({title: "", description: "", tag: "General"});


  const addNoteHandle = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
  };
  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
    console.log({[e.target.name]: e.target.value})
  };

  return (
    <div>
      <h4>
        <b>Add Note</b>
      </h4>
      <form className="form-control-sm mb-3 mx-auto">
        <div className="mb-1">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control bg-${
              props.theme === "dark" ? "dark" : ""
            } text-${props.theme === "dark" ? "light" : "dark"} `}
            id="title"
            name="title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control bg-${
              props.theme === "dark" ? "dark" : ""
            } text-${props.theme === "dark" ? "light" : "dark"}`}
            id="description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className={`form-control bg-${
              props.theme === "dark" ? "dark" : ""
            } text-${props.theme === "dark" ? "light" : "dark"}`}
            id="tag"
            name="tag"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-3 text-center">
          <button
            disabled={note.title.length<3 || note.description.length<5}
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={addNoteHandle}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;

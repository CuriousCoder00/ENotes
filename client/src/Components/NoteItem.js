import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-4 align-items-center my-3">
      <div className="card-body border rounded p-3">
        <span class="badge rounded-pill text-bg-primary">{note.tag}</span>
        <div className="d-flex">
          <h5 className="card-title mx-auto my-3">{note.title}</h5>
          
          <i
            style={{ cursor: "pointer" }}
            className="far fa-trash-alt mx-2"
            onClick={() => {
              let response = window.confirm(
                `Do You Want To Delete Note: ${note.title}`
              );
              if (response) deleteNote(note._id);
            }}
          ></i>
          <i
            style={{ cursor: "pointer" }}
            className="far fa-edit mx-2"
            onClick={async () => {
              updateNote(note);
            }}
          ></i>
        </div>
        <hr />
        <p className="card-text text-break">{note.description}</p>
      </div>
    </div>
  );
};

export default NoteItem;

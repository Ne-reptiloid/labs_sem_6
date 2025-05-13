import { useState } from "react";
import axios from "axios";

function CreateNoteForm({ onNoteAdded }) {
  const[note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setNote(null);
    onCreate(note);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5289/notes", {
        title,
        description
      });
      setTitle("");
      setDescription("");
      onNoteAdded(); 
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <h3 className="font-weight-bold">Создание заметки</h3>
      <input 
        className="form-control mb-2" 
        placeholder="Название" 
        value={note?.title ?? " "}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea 
        className="form-control mb-2" 
        placeholder="Описание" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
}

export default CreateNoteForm;
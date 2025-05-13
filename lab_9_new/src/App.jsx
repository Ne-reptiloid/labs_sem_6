import "./App.css";
import { useState, useEffect } from "react";
import CreateNoteForm from "./components/CreateNoteForm";
import Note from "./components/Note";
import Filters from "./components/Filters";
import { fetchNotes, createNote } from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  })


  useEffect(() => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };

    const handleNoteAdded = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error refreshing notes:", error);
      }
    };
    

    fetchData();
  }, [filter]);

  const onCreate = async (note) => {
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  }

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-12">
          <CreateNoteForm/>
          <Filters filter={filter} setFilter={setFilter}/>
        </div>
        <div className="col-md-12 mt-3">
          {loading && (
            <div className="alert alert-info">Загрузка заметок...</div>
          )}
          
          {error && (
            <div className="alert alert-warning">{error}</div>
          )}

          <ul className="list-group">
            {notes.map((n) => (
              <li key={n.id} className="list-group-item">
                <Note 
                  title={n.title}
                  description={n.description}
                  createdAt={n.createdAt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default App;
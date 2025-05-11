import "./App.css";
import CreateNoteForm from "./components/CreateNoteForm";
import Note from "./components/Note";
import Filters from "./components/Filters";
import { useEffect } from "react";
import { fetchNotes } from "./services/notes";


function App() {
  return (
    <section className="container">
      <div className="row">
        <div className="col-md-12">
          <CreateNoteForm/>
          <Filters />
          <ul className="list-group">
          <li>
            <Note />
          </li>
          <li>
            <Note />
          </li>
          <li>
            <Note />
          </li>
          <li>
            <Note />
          </li>
          <li>
            <Note />
          </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default App;
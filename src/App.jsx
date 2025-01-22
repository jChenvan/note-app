import { useState, useEffect } from "react";
import "./App.css";
import Note from "./Note.jsx";

function countLines(text, lineLength) {
  if (!text) {
    return;
  }
  let chars = 0;
  let lines = 0;

  for (let i = 0; i < text.length; i++) {
    chars++;
    if (text[i] === "\n" || chars >= lineLength) {
      chars = 0;
      lines++;
    }
  }

  if (chars != 0 || text[text.length - 1] === "\n") {
    lines++;
  }

  return lines;
}

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [current, setCurrent] = useState(undefined);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setNotes(JSON.parse(localStorage.notes || "[]"));
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="search">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <ul className="notes">
          {notes
            .filter((val) =>
              new RegExp(`.*${query.toLowerCase()}.*`).test(
                val.title.toLowerCase(),
              ),
            )
            .map((val, index) => (
              <li key={val.key} className={(index === current) ? 'highlight' : ''}>
                <button onClick={() => setCurrent(index)}>{val.title}</button>
                <button onClick={()=>{
                  const New = [...notes];
                  New.splice(index,1);
                  setNotes(New);
                  localStorage.notes = JSON.stringify(New);
                }}>×</button>
              </li>
            ))}
        </ul>
        <button>+</button>
      </div>
      <div className="content">
        <h1>{current != undefined ? notes[current].title : ""}</h1>
        <div>
          <textarea
            style={{ display: current === undefined ? "none" : "block" }}
            cols={50}
            rows={
              current != undefined ? countLines(notes[current].content, 50) : 10
            }
            value={current != undefined ? notes[current].content : ""}
            onChange={(event) => {
              const New = JSON.parse(JSON.stringify(notes));
              New[current].content = event.target.value;
              setNotes(New);
              localStorage.notes = JSON.stringify(New);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import "./App.css";

function countLines(text, lineLength) {
  if (!text) {
    return 1;
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
  const dialogRef = useRef(null);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.notes || "[]"));
  }, []);

  return (
    <>
      <dialog ref={dialogRef}>
        <form action="">
          <input type="text" value={newNote} onChange={(event)=>setNewNote(event.target.value)}/>
          <button onClick={event=>{
            event.preventDefault();
            const New = [{title:newNote,content:'',key:crypto.randomUUID()},...notes];
            setNotes(New);
            localStorage.notes = JSON.stringify(New);
            setNewNote('');
            dialogRef.current.close();
          }}>+</button>
        </form>
      </dialog>
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
                  if (index <= current) {setCurrent(current - 1)}
                  const New = [...notes];
                  New.splice(index,1);
                  setNotes(New);
                  localStorage.notes = JSON.stringify(New);
                }}>×</button>
              </li>
            ))}
        </ul>
        <button onClick={()=>dialogRef.current.showModal()}>+</button>
      </div>
      <div className="content">
        {current != undefined && notes.length != 0 ? <><h1>{notes[current].title}</h1>
        <div>
          <textarea
            cols={75}
            rows={Math.max(5,countLines(notes[current].content, 75))}
            value={notes[current].content}
            onChange={(event) => {
              const New = JSON.parse(JSON.stringify(notes));
              New[current].content = event.target.value;
              setNotes(New);
              localStorage.notes = JSON.stringify(New);
            }}
          ></textarea>
        </div></> : <></>}
      </div>
    </>
  );
}

export default App;

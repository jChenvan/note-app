import { useState, useEffect } from 'react'
import './App.css'
import Note from './Note.jsx'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(()=>{
    setNotes(JSON.parse(localStorage.notes || '[]'));
  },[]);

  return (
    <>
      <form action="" className="new-group">
        <input type="text" value={newNote} onChange={event=>setNewNote(event.target.value)}/>
        <button onClick={(event)=>{
          event.preventDefault();
          if (newNote != '') {
            const New = [{title:newNote,content:"",key:crypto.randomUUID()},...notes];
            setNotes(New);
            setNewNote("");
            localStorage.notes = JSON.stringify(New);
          }
        }}>+</button>
      </form>
      <ul className="notes">
        {notes.map((val,index)=><Note key={val.key} title={val.title} content={val.content} setContent={text => {const New = [...notes]; New[index].content = text; setNotes(New); localStorage.notes = JSON.stringify(New)}} deleteSelf={() => {const New = [...notes]; New.splice(index,1); setNotes(New); localStorage.notes=JSON.stringify(New)}}></Note>)}
      </ul>
    </>
  )
}

export default App

import { useState } from "react";
import './Note.css'

function countLines(text, lineLength) {
    let chars = 0;
    let lines = 0;

    for (let i = 0; i < text.length; i++) {
        chars++;
        if (text[i] === '\n' || chars >= lineLength) {
            chars = 0;
            lines++;
        }
    }

    if (chars != 0 || text[text.length-1] === '\n') {lines++}

    return lines
}

function Note({title, content, setContent, deleteSelf}) {
    const [hidden, setHidden] = useState(true);

    return <div className="note">
        <div className="title">
            <button onClick={()=>setHidden(!hidden)}>
                <h1>{title}</h1>
            </button>
        </div>
        <div className={`text ${hidden ? 'hidden' : ''}`}>
            <textarea cols='50' rows={countLines(content,50)} value={content} onChange={event=>setContent(event.target.value)}>
            </textarea>
            <button onClick={deleteSelf}>delete me!</button>
        </div>
    </div>
}

export default Note;
import { useState } from "react";

function Note({title, content, setContent, deleteSelf}) {
    return <div className="note">
        <div className="title">
            <h1>{title}</h1>
        </div>
        <button onClick={deleteSelf}>delete me!</button>
        <div className="text">
            <textarea cols="30" rows="10" value={content} onChange={event=>setContent(event.target.value)}>
            </textarea>
        </div>
    </div>
}

export default Note;
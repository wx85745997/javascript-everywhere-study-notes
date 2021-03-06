// 导入所需的库
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'



const NoteWrapper = styled.div`
    max-width: 800px;
    margin:0 atuo;
    margin-bottom: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #f5f4f0;

`
import Note from './note';

const NoteFeed = ({ notes }) => {
    return (
        <div>
            {notes.map(note => (
                <NoteWrapper key={note.id}>
                    <Note note={note} />
                    <Link to={`note/${note.id}`}>Permalink</Link>
                </NoteWrapper>
            ))}
        </div>
    )
}

export default NoteFeed;
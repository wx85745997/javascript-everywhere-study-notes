import React from 'react';
import { Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { format } from 'date-fns'
import Markdown from 'react-native-markdown-renderer';

const NoteView = styled.ScrollView`
    padding:10px;
`

const Note = ({ note }) => {
    return (
        <NoteView>
            <Text>
                Note by {note.author.username} / Published{' '}
                {format(new Date(note.createdAt), 'MMM do yyyy')}
            </Text>
            <Markdown>{note.content}</Markdown>
        </NoteView>
    )
}

export default Note;
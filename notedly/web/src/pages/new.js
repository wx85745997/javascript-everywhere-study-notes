import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm'

// 导入查询
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

// 新建笔记查询
const NEW_NOTE = gql`
    mutation newNote($content:String!){
        newNote(content:$content){
            id
            content
            createdAt
            favoriteCount
            favoritedBy{
                id
                username
            }
            author{
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        // 更新文档标题
        document.title = 'New Note -- Notedly';
    })

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // 重新获取 GET_NOTES查询，更新缓存
        refetchQueries: [{ query: GET_NOTES },{ query: GET_MY_NOTES }],
        onCompleted: data => {
            // 操作完成后，把用户重定向到该篇笔记的页面
            props.history.push(`note/${data.newNote.id}`)
        }
    })

    return (
        <React.Fragment>
            {/* 显示一个消息，指明正在加载数据 */}
            {loading && <p>Loading...</p>}
            {/* 如果出错，显示一个错误信息 */}
            {error && <p>Error saving the note</p>}
            {/* 渲染表单组件，通过属性传入变更数据 */}
            <NoteForm action={data} />
        </React.Fragment>)
}

export default NewNote;
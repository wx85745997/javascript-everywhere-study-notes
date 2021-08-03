import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// 导入 NoteForm 组件
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation'

const EditNote = props => {
    // 把在 URL 中找到的ID存在一个变量中
    const id = props.match.params.id;
    // 定义note查询 
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // 获取当前用户的数据
    const { data:userdata,loading:userLoading } = useQuery(GET_ME);
    //定义变更操作
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`)
        }
    })
    // 显示一个消息，指明正在加载数据
    if (loading || userLoading) return 'Loading...';
    // 如果获取数据出错，显示一个错误信息
    if (error) return <p>Error!Note not found</p>;
    // 如果当前用户与笔记的作者不一致
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>
    }
    return <NoteForm content={data.note.content} action={editNote} />;
}

export default EditNote
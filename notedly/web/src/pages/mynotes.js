import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        //更新文档标题
        document.title = 'My Notes - Notedly';
    })

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    // 显示一个消息，指明正在加载数据
    if (loading) return 'Loading...';
    // 如果获取数据出错，显示一个错误消息
    if (error) return `Error! ${error.message}`;
    // 如果查询成功，而且有笔记，返回笔记动态流
    // 如果查询成功，但是没有笔记，显示一个消息
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>No notes yet</p>;
    }
}

export default MyNotes;
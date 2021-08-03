import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect(() => {
        //更新文档标题
        document.title = 'Favorites - Notedly';
    })

    const { loading, error, data } = useQuery(GET_MY_FAVORITES);

    // 显示一个消息，指明正在加载数据
    if (loading) return 'Loading...';
    // 如果获取数据出错，显示一个错误消息
    if (error) return `Error! ${error.message}`;
    // 如果查询成功，而且有笔记，返回笔记动态流
    // 如果查询成功，但是没有笔记，显示一个消息
    if (data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} />;
    } else {
        return <p>No favorites yet</p>;
    }
}

export default Favorites;
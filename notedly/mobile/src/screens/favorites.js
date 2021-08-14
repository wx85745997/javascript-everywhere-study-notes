import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading'


// GraphQL 查询
const GET_MY_FAVORITES = gql`
    query me{
        me{
            id
            username
            favorites{
                id
                createdAt
                content
                favoriteCount
                author{
                    username
                    id
                    avatar
                }
            }
        }
    }
`

const Favorites = props => {
    const { loading, error, data } = useQuery(GET_MY_FAVORITES)

    // 加载数据时显示一个加载中指使符
    if (loading) return <Loading />
    // 获取数据出错，显示一个错误消息
    if (error) return <Text>Error loading notes</Text>
    // 如果查询成功，而且有笔记，返回笔记动态流
    // 如果查询成功，但是没有笔记，显示一个消息
    if (data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} navigation={props.navigation} />
    } else {
        return <Text>No notes yet</Text>
    }
}

Favorites.navigationOptions = {
    title: 'Favorites'
}
export default Favorites;


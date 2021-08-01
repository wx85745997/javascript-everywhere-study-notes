import React from 'react';
// 导入GraphQL 依赖
import { useQuery, gql } from '@apollo/client';

// 导入Note组件
import Note from '../components/Note';

// note查询，接受一个ID变量
const GET_NOTE = gql`
    query note($id:ID!){
        note(id:$id){
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
`

const NotePage = props => {
    // 把在 URL 中找到的ID 存在一个变量中
    const id = props.match.params.id

    // 查询钩子，传入ID的值
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // 显示一个消息，指明正在加载数据
    if (loading) return <p>Loading...</p>;
    // 如果获取数据出错，显示一个错误消息
    if (error) return <p>Error!Note not found</p>;

    return <Note note={data.note}/>
    
}

export default NotePage
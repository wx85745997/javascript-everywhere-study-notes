// 导入所需的库
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'
import Button from '../components/Buttons'
import NoteFeed from '../components/NoteFeed';
// 把GraphQL查询存储为一个变量
const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
        cursor
        hasNextPage
        notes {
            id
            createdAt
            content
            favoriteCount
            author {
            username
            id
            avatar
            }
        }
        }
    }
`;

const Home = () => {
    // 查询钩子
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    // 显示一个消息，指明正在加载数据
    if (loading) return <p>Loading...</p>
    // 如果获取数据出错，显示一个错误消息
    if (error) return <p>Error!</p>
    // 成功获取数据后，在UI中显示出来
    return (
        // 添加 <React.Fragment>元素，作为父级元素
        <React.Fragment>
            < NoteFeed notes={data.noteFeed.notes} />
            {/*仅当hasNextPage的值为true时显示Load more按钮 */}
            {
                data.noteFeed.hasNextPage && (
                    <Button onClick={() => {
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previosResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // 把新旧结果合并在一起
                                        notes: [
                                            ...previosResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                }
                            }
                        })
                    }}>Load more</Button>
                )
            }
        </React.Fragment>
    )
}

export default Home;
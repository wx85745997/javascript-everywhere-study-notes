
// 导入所需的库
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from "styled-components";

// 防止笔记超过800px宽
const StyledNode = styled.article`
    max-width: 800px;
    margin: 0 auto;
`
// 装饰笔记的元数据
const MetaData = styled.div`
    @media (min-width:500px){
        display: flex;
        align-items: top;
    }
`

// 在图片和元信息之间添加一点空白
const MetaInfo = styled.div`
    padding-left: auto;
`
// 在大屏上靠右对齐 'UserActions'
const UserActions = styled.div`
    margin-left: auto;
`
const Note = ({ note }) => {
    return (
        <StyledNode>
            <MetaData>
                <MetaInfo>
                    <img src={`${note.author.avatar}`}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />{' '}
                </MetaInfo>
                <MetaInfo>
                    <em>by</em> {note.author.username} <br />
                    {format(note.createdAt, 'MMM Do YYYY')}
                </MetaInfo>
                <UserActions>
                    <em>Favorites:</em> {note.favoriteCount}
                </UserActions>
            </MetaData>
            <ReactMarkdown soure={note.content} />
        </StyledNode>
    )
}

export default Note;
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
// 导入 GET_ME查询
import { GET_ME } from '../gql/query';
// 导入 Delete 组件
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  console.log('data',data )
  // 显示一个消息，指明正在加载数据
  if (loading) return <p>Loading...</p>;
  // 如果获取数据出错，显示一个错误消息
  if (error) return <p>Error!</p>;
  return (
    <React.Fragment>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />
      <br />
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
          <DeleteNote noteId={props.note.id}></DeleteNote>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NoteUser;

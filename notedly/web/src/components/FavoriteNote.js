import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';
import ButtonAsLink from './ButtonAsLink';

const FavoriteNote = props => {
  // 把收藏的笔记数量存储为状态
  const [count, setCount] = useState(props.favoriteCount);

  // 把用户是否收藏了当前笔记存储为状态
  const [favorited, setFavorited] = useState(
    // 检查当前笔记是否在用户的收藏列表中
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  // toggleFavorite 变更操作钩子
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    // 重新获取 GET_MY_FAVORITES 查询，更新缓存
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  // 如果用户已经收藏当前笔记，显示取消收藏链接
  // 否则，显示收藏链接
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          Remove favorites
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          Add favorites
        </ButtonAsLink>
      )}
      :{count}
    </React.Fragment>
  );
};

export default FavoriteNote;

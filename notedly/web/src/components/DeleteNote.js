import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router';
// 导入 DELETE_NOTE 变更操作
import { DELETE_NOTE } from '../gql/mutation';
// 导入查询，在删除笔记后重新获取数据
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

import ButtonAsLink from './ButtonAsLink';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    // 重新获取笔记列表，更新缓存
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: data => {
      // 把用户重定向到“My Notes”页面
      props.history.push('/mynotes');
    }
  });
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Buttons';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';


const SIGNUP_SUER = gql`
    mutation signUp($email:String!,$username:String!,$password:String!){
        signUp(email:$email,username:$username,password:$password)
    }
`

// 加上传给组件的props，以备后用
const SignUp = props => {
    useEffect(() => {
        // 更新文档标题
        document.title = 'Sign Up - Notedly';
    })
    // Apollo  Client
    const client = useApolloClient();
    // useState 、onChange 和 useEffect 保持不变

    // 添加变更操作钩子
    const [signUp, { loading, error }] = useMutation(SIGNUP_SUER, {
        onCompleted: data => {
            // 把 JWT 存储到localStorage中
            localStorage.setItem('token', data.signUp);
            // 更新本地缓存
            client.writeData({ data: { 'isLoggedIn': true } })
            // 把用户重定向到首页
            props.history.push('/')

        }
    })
    return (
        <React.Fragment>
            <h2>Sign Up</h2>
            <UserForm action={signUp} formType="signup" />
            {/* 显示一个消息，指明正在加载数据 */}
            {loading && <p>loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    )
}

export default SignUp;
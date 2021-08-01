import React, { useEffect } from 'react';
import {gql, useApolloClient, useMutation } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email:String!,$password:String!){
        signIn(email:$email,password:$password)
    }
`

// 加上传给组件的props，以备后用
const SignIn = props => {
    useEffect(() => {
        // 更新文档标题
        document.title = `Sign In -- Notedly`
    });
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // 存储令牌
            localStorage.setItem('token', data.signIn);
            // 更新本地缓存
            client.writeData({ data: { isLoggedIn: true } })
            // 把用户重定向到首页
            props.history.push('/');
        }
    })

    return (
        <React.Fragment>
            <h2>Sign In</h2>
            <UserForm action={signIn} formType="signin" />
            {/* 显示一个消息，指明正在加载数据 */}
            {loading && <p>loading...</p>}
            {/* 如果遇到错误，显示一个错误消息 */}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    )
}

export default SignIn;
// 导入React和路由依赖
import React from 'react';
// 更新导入 React Router 的语句，加入 Redirect
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// 导入 NewNote 路由组件
import NewNote from './new';

import { useQuery, gql } from '@apollo/client';
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`
// 导入共用的布局组件
import Layout from '../components/Layout';

// 导入路由
import Home from './home'
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import EditNote from './edit';

// 在Pages组件下面添加PrivateRoute组件
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // 显示一个消息，指明正在加载数据
    if (loading) return <p>Loading...</p>;
    // 如果获取数据出错，显示一个错误消息
    if (error) return <p>Error!</p>;
    // 如果用户已登录，把用户带到请求的组件
    // 否则重定向到登录页面
    return (
        <Route {...rest} render={props => data.isLoggedIn === true ? (
            <Component {...props} />
        ) : (
            <div>
                <Redirect
                    to={{ pathname: 'signin', state: { form: props.location } }}
                />
                {console.log(props)}
            </div>

        )}>
        </Route>
    )
}

// 定义路由
const Pages = () => {
    return (
        <Router>
            {/* 把路由套入Layout 组件 */}
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </Router>
    )
}

export default Pages;
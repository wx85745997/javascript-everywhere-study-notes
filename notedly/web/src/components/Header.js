import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
// 新依赖
import { useQuery, gql } from '@apollo/client';
// 从React Router中导入Link和withRouter
import { Link, withRouter } from 'react-router-dom';

// 导入ButtonAsLink组件
import ButtonAsLink from './ButtonAsLink'

const UserState = styled.div`
    margin-left: auto;
`

// 本地查询
const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}
`

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow:0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`

const LogoText = styled.h1`
    margin:0;
    padding:0;
    display: inline;
`

const Header = props => {
    // 查询钩子，查看用户的登录状态
    // 加入client,用户引用Apollo存储器
    const { data, client } = useQuery(IS_LOGGED_IN)
    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40"></img>
            <LogoText>Notedly</LogoText>
            {/*  如果已登录，显示退出链接,否则显示注册链接 */}
            <UserState>
                {
                    data.isLoggedIn ? (
                        <ButtonAsLink onClick={() => {
                            // 删除令牌
                            localStorage.removeItem('token')
                            // 清空应用的缓存
                            client.resetStore()
                            // 更新本地状态
                            client.writeData({ data: { isLoggedIn: false } })
                            // 把用户重定向到首页
                            props.history.push('/')
                        }}>Log Out</ButtonAsLink>
                    ) : (
                        <p>
                            <Link to={'/signin'}>Sign In</Link> or{''}
                            <Link to={'/signup'}>Sign Up</Link>
                        </p>
                    )
                }

            </UserState>
        </HeaderBar>
    );
};

export default withRouter(Header);
import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Nav = styled.nav`
    padding:1em;
    background: #f5f4f0;
    @media (max-width: 700px){
        padding-top:64px;
    }

    @media (min-width: 700px){
        position: fixed;
        width: 220px;
        height: calc(100% - 64px);
        overflow-y: scroll;
    }
`

const Navlist = styled.ul`
        margin:0;
        padding:0;
        list-style:none;
        line-height: 2;

        /* 在样式组件中可以嵌套样式 */
        /* 下述样式只应用于NavList组件中的链接 */
        a {
            text-decoration:none;
            font-weight: bold;
            font-size:1.1em;
            color:#333
        }

        a:visited{
            color:#333
        }
        a:hover,
        a:focus{
            color: #0077cc;
        }
`
const Navigation = () => {
    return (
        <Nav>
            <Navlist>
                <li>
                    <Link to="/"><span aria-hidden="true" role="img" ></span>Home</Link>
                </li>
                <li>
                    <Link to="/new">New</Link>
                </li>
                <li>
                    <Link to="/mynotes"><span aria-hidden="true" role="img" ></span>My Notes</Link>
                </li>
                <li>
                    <Link to="/favorites"><span aria-hidden="true" role="img" ></span>Favorites</Link>
                </li>
            </Navlist>
        </Nav>
    );
};

export default Navigation;
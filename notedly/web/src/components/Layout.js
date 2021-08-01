import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Navigation from './Navigation'

// 组件样式
const Wrapper = styled.div`
    /* 在样式组件中可以编写媒体查询样式 */
    /* 只有宽度超过700px的屏幕才应用这部分样式 */
    @media (min-width:700px){
        display: flex;
        top:64px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`

const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding:1em;
    overflow-y:scroll;
    /* 这个媒体查询样式也针对宽度拆过700px的屏幕 */
    @media(min-width:700px){
        flex:1;
        margin-left: 220px;
        height: calc(100% - 64px);
        width: calc(100% - 220px);
    }
`

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Navigation />
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    )
}

export default Layout;
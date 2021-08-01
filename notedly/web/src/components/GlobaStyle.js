// 导入createGlobaStyle 和 normalize
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

// 使用JS模版字面量编写CSS
export default createGlobalStyle`
    ${normalize}

    body{
        margin: 50px;
    }
    
    *,*:before, *:after{
        box-sizing:border-box;
    }

    body,
    html{
        height: 100%;
        margin: 0;
    }
   
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        line-height:1.4
    }

    a:link,
    a:visited{
        color:#0077cc;
    }

    a:hover,
    a:focus {
        color:#004499;
    }

    code,
    pre {
        max-width:100%;
    }


`;

import React from "react";
import ReactDOM from "react-dom";
// 导入 Apollo Client 库
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from "apollo-link-context";

// 导入全局样式
import GlobaStyle from './components/GlobaStyle';
// 导入路由
import Pages from "./pages";

// 配置 API URI 和缓存
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
})


// 配置 Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
})

// 检查本地有没有令牌
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

// 首次加载时写入缓存数据
cache.writeData({ data });
// 重置缓存之后写入缓存数据
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <div>
            <ApolloProvider client={client}>
                <GlobaStyle />
                <Pages />
            </ApolloProvider>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'))
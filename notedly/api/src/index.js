const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const port = process.env.PORT || 4000

// 使用graphql模式语言编制一个模式
const typeDefs = gql`
    type Query{
        hello:String
    }
`;

// 为模式字段提供接解析函数
const resolvers = {
    Query: {
        hello: () => 'hello world'
    }
};

const app = express();
// 设置apollo server
const server = new ApolloServer({ typeDefs, resolvers });
// 应用apollo graphql中间件,把路径设为/api

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));
app.listen({ port }, () => console.log(`GraphQL Server runing at http://localhost:${port}${server.graphqlPath}`)) 213123312
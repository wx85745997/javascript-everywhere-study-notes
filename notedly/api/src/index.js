const express = require('express');
const models = require('./models')

console.log('xxx',models)
const { ApolloServer } = require('apollo-server-express');
const port = process.env.PORT || 4000;
require('dotenv').config();
const db = require('./db');
const DB_Host = process.env.DB_HOST;
const typeDefs = require('./schema')
const resolvers = require("./resolvers");

const app = express();
// 连接数据库
db.content(DB_Host)

// 设置apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:()=>{
        //把数据库模型添加到上下文中
        return { models };
    }
})
// 应用apollo graphql中间件,把路径设为/api

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));
app.listen({ port }, () => console.log(`GraphQL Server runing at http://localhost:${port}${server.graphqlPath}`))
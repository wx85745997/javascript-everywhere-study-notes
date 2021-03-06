const express = require('express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity')
var path  = require('path'); 
const helmet = require('helmet')
const cors = require("cors");
const models = require('./models')
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config({ path: path.resolve(`${process.cwd()}`,`.env.${process.env.NODE_ENV}`)});
const port = process.env.PORT || 4000;
const db = require('./db');
const DB_Host = process.env.DB_HOST;
const typeDefs = require('./schema')
const resolvers = require("./resolvers");
const jwt = require('jsonwebtoken')

const app = express();
app.use(helmet())
app.use(cors())
// 连接数据库
db.content(DB_Host)

const getUser = token => {
  if (token) {
    try {
      // 返回通过令牌获取的用户信息
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      // 如果令牌有问题，抛出错误
      throw new Error('Session invalid')
    }
  }
}

// 设置apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    // 从首部中获取令牌
    const token = req.headers.authorization;
    //尝试使用令牌检索用户
    const user = getUser(token);
    // 暂且把用户输出到控制台中
    console.log(user);
    //把数据库模型添加到上下文中
    return { models, user };
  }
})
// 应用apollo graphql中间件,把路径设为/api

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));


if (process.env.SERVERLESS) {
  module.exports = app;
} else {
  app.listen({ port }, () => console.log(`GraphQL Server runing at http://localhost:${port}${server.graphqlPath}`))
}
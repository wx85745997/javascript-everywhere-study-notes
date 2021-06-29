const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const port = process.env.PORT || 4000

let notes = [{
    id: '1', content: 'this is a note', author: 'Adam Scott'
}, {
    id: '2', content: 'this is another note', author: 'Harlow Everly'
}, {
    id: '3', content: 'Oh hey look, another note!', author: 'Rilley Harrison'
}
]


const typeDefs = gql`
  type Note{
    id: ID!
    content: String!
    author: String!
}
type Query {
    hello: String!
    notes:[Note!]!
    note(id:ID!):Note
  }
  
 type Mutation{
     newNote(content:String!):Note!
 } 
`;

// 为模式字段提供接解析函数
const resolvers = {
    Query: {
        hello: () => 'hello world',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Adam Scott'
            }
            notes.push(noteValue);
            return noteValue;
        }
    }
};

const app = express();
// 设置apollo server
const server = new ApolloServer({ typeDefs, resolvers });
// 应用apollo graphql中间件,把路径设为/api

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));
app.listen({ port }, () => console.log(`GraphQL Server runing at http://localhost:${port}${server.graphqlPath}`))
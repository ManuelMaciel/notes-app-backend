import express from 'express'
import { ApolloServer } from 'apollo-server-express'

const app = express()

const startApolloServer = async (typeDefs, resolvers, app) => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  })

  await server.start()

  server.applyMiddleware({
    app
  })

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


export {app, startApolloServer}

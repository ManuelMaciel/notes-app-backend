import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'

import { decodedToken } from './utils/decodeJWT'

const app = express()

dotenv.config()




const createContext = ({req}: any) => {

  const user = decodedToken(req)
  return user
}

const startApolloServer = async ({ typeDefs, resolvers, app }: { typeDefs: any; resolvers: any; app: any }) => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: createContext
  })

  await server.start()

  server.applyMiddleware({
    app
  })

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


export {app, startApolloServer}

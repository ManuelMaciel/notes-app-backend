import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'

import { decodedToken } from './utils/decodeJWT'

const app = express()

dotenv.config()




const createContext = ({req}: any) => {
  const header: string = req.headers.authorization
  if(header !== undefined){
    const user = decodedToken(header)
    return user
  } else {
    return 'Token de Autorizacion no proveido'
  }
}

const startApolloServer = async ({ typeDefs, resolvers, app }: { typeDefs: any; resolvers: any; app: any }) => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: createContext,
  })

  await server.start()

  server.applyMiddleware({
    app
  })

  await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


export {app, startApolloServer}

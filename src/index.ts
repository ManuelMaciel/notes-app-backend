import { startApolloServer, app } from './app'
import { resolvers, typeDefs } from './apollo/index'

startApolloServer({ typeDefs, resolvers, app })

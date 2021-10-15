import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Note {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    getNotes: [Note!]
  }

  type Mutation {
    createNewUser(name: String!, email: String!, password: String!): AuthPayload
    publishNote(title: String!, content: String!): Note
  }
`

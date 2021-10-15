import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  type Note {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    getNotes: [Note!]
  }

  type Mutation {
    publishNote(title: String!, content: String!): Note
  }
`

import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    notes: [Note]
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    pinned: Boolean
    color: String
    user: User!
    userId: ID!
  }

  type Query {
    getNotes: [Note!]
    getNotesByUser: [Note!]
  }

  type Mutation {
    createNewUser(name: String!, email: String!, password: String!): AuthPayload
    # publishNote(title: String!, content: String!, pinned: Boolean, color: String): Note
    publishNote: Note
  }
`

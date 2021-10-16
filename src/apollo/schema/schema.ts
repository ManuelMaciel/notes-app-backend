import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    notes: [Note]
    avatar: String!
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
    updated_at: Date!
  }

  type Query {
    getNotesByUser(user_id: ID!): [Note!]
  }

  type Mutation {
    createNewUser(name: String!, email: String!, password: String!): AuthPayload
    publishNote(title: String!, content: String!, pinned: Boolean, color: String): Note
    deleteNote(note_id: ID): Boolean
    updateNote(note_id: ID!, title: String, content: String, pinned: Boolean, color: String): Note
  }
`

import { UserInputError } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

import { getUserById } from '../../utils/findUserById'
import { dateScalar } from '../schema/scalar/date'

const prisma = new PrismaClient()

export const resolvers = {
  // Resolvers from Querys
  Query: {
    // Query to get all notes by user id
    getNotesByUser: async (_parent: any, {user_id}: any, _context: any, _info: any) => {
      try {
        const notes = await prisma.notes.findMany({
          where: {
            userId: user_id
          },
          include: {
            user: true
          }
        })
        return notes
      } catch (error) {
        throw new UserInputError(error)
      }
    },
  },
  // Resolvers from Mutations
  Mutation: {
    // Mutation to create a new user
    createNewUser: async (_parent: string, {name, email, password}: any, _context: any, _info: any ) => {
      // check if user exist
      const userExist = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if(userExist !== null) throw new UserInputError(`El usuario con el correo: ${email}, ya existe.`)
      // if user not exist, create new user
      const encryptedPassword = await bcrypt.hash(password, 10, )
      try {
        const avatarId = randomUUID()
        const user = await prisma.user.create({
          data: {
            email,
            name,
            password: encryptedPassword,
            avatar: `https://avatars.dicebear.com/api/miniavs/${avatarId}.svg`
          }
        })
        const token = jwt.sign({user: user.id}, process.env.SECRET, )
        return {
          user,
          token
        }
      } catch (error) {
        throw new UserInputError(error)
      }
    },
    // Mutation to create a new note
    publishNote: async (_parent: any, {title, content, pinned, color}: any, _context: any, _info: any ) => {
      console.log("context: ",_context)
      const user = await getUserById(_context.user)
      if(user){
        try {
          color ??= '#FFFFFF'
          pinned ??= false
          const note = await prisma.notes.create({
            data: {
              color,
              title,
              content,
              pinned,
              user: {
                connect: {
                  id: user.id
                }
              },
            },
            include: {
              user: true
            }
          })
          return note
        } catch (error) {
          throw new UserInputError(error)
        }
      } else {
        throw new UserInputError("Token invalido!")
      }
    },
  // Mutation to delete a note
    deleteNote: async (_parent: any, {note_id}: any, _context: any, _info: any) => {
      const user = await getUserById(_context.user)
      if(user){
        try {
          const user = await prisma.notes.delete({
            where: {
              id: note_id,
            },
          })
          console.log(user)
          return true
        } catch (error) {
          throw new UserInputError(error)
        }
      } else {
        throw new UserInputError("Token invalido!")
      }
    },
    // Mutation to update note
    updateNote: async (_parent: any, {note_id, title, content, pinned, color}: any, _context: any, _info: any) => {
      const user = await getUserById(_context.user)
      if(user){
        try {
          const note = await prisma.notes.update({
            where: {
              id: note_id
            },
            data: {
              title,
              content,
              pinned,
              color
            },
            include: {
              user: true
            }
          })
          return note
        } catch (error) {
          throw new UserInputError(error)
        }
      } else {
        throw new UserInputError("Token invalido!")
      }
    },
  },
  // Custom Scalars
  Date: dateScalar
}

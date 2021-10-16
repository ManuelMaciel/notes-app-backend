import { UserInputError } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


export const resolvers = {
  // Resolvers from Querys
  Query: {
    getNotes: async () => {
      return prisma.notes.findMany()
    },
  },
  // Resolvers from Mutations
  Mutation: {
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
        const user = await prisma.user.create({
          data: {
            email,
            name,
            password: encryptedPassword,
          }
        })
        const token = jwt.sign(user, process.env.SECRET, )
        return {
          user,
          token
        }
      } catch (error) {
        throw new UserInputError(error)
      }
    },

    publishNote: async (_parent: any, {title, content, pinned, color}: any, _context: any, _info: any ) => {
      // return prisma.notes.create({
      //   data: {
      //     content,
      //     title,
      //   }
      // })
      console.log("context: ", _context)
    },
  }
}

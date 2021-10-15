import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export const resolvers = {
  // Resolvers from Querys
  Query: {
    getNotes: async () => {
      return prisma.notes.findMany()
    },
  },
  // Resolvers from Mutations
  Mutation: {
    publishNote: async (_parent: any, {title, content}: any, _context: any, _info: any ) => {
      return prisma.notes.create({
        data: {
          content,
          title,
        }
      })
    },
  }
}

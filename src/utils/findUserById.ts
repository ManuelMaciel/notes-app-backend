import { PrismaClient } from '@prisma/client'
import { UserInputError } from 'apollo-server-errors'

const prisma = new PrismaClient()


export const getUserById = async (userId: string) => {

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        name: true,
        id: true
      }
    })

    return user

  } catch (error) {
    throw new UserInputError(error)
  }

}

import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'

export const decodedToken = (req: any) => {
  const header: string = req.headers.authorization
  if(header){
    const token = header.split('Bearer')[1]
    const decoded = jwt.verify(token.trimStart(), process.env.SECRET)
    return decoded
  } else {
    throw new UserInputError("No Autenticado")
  }
}

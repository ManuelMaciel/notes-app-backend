import jwt from 'jsonwebtoken'

export const decodedToken = (header: any) => {
  try {
    const token = header.split('Bearer')[1]
    const decoded = jwt.verify(token.trimStart(), process.env.SECRET)
    return decoded
  } catch (error) {
    return error
  }
}

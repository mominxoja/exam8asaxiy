import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JWT_EXPIRE_TIME } from '../constants/jwt.constants.js'

dotenv.config()
export const sign = (payload, expireTime = JWT_EXPIRE_TIME) => jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expireTime
})
export const verify = token => jwt.verify(token, process.env.SECRET_KEY)





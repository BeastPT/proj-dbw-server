import jwt from 'jsonwebtoken'
const SECRET_KEY = 'SECRET'
import { getUserByData } from '../models/user.js'

export default async function auth(req, res, next) {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({message: 'Unauthorized User'})
        }

        const user = jwt.verify(token, SECRET_KEY)
        req.username = user.username
        req.user = await getUserByData({ username: user.username })
        next()
    } catch (err) {
        res.status(401).json({message: 'Unauthorized User'})
    }
}
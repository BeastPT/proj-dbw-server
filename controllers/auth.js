import { getUserByData, createUser } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'SECRET'

export async function register(req, res) {
    const { email, password, username } = req.body
    if (!(email && password && username)) {
        return res.status(400).json({message: 'Missing required fields'})
    }
    
    // Verifica se o email é válido
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
        return res.status(400).json({message: 'Invalid Email'})
    }

    // Verifica se o username é válido (letras, números, '-', '_', '.')
    if (!(/^[a-zA-Z][a-zA-Z\d-_\.]+$/.test(username))) {
        return res.status(400).json({message: 'Invalid Username'})
    }

    // Verificar se existe algum utilizador com o mesmo email
    if (await getUserByData({ email })) {
        return res.status(400).json({message: 'Email already in use'})
    }

    // Verificar se existe algum utilizador com o mesmo username
    if (await getUserByData({ username })) {
        return res.status(400).json({message: 'Username already in use'})
    }

    // Verifica se a senha é válida (letras, números, caracteres especiais)
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password))) {
        return res.status(400).json({message: 'Invalid Password'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({ email, password: hashedPassword, username })
    const jwtoken = jwt.sign({ email, username }, SECRET_KEY)
    res.status(201).json({ token: jwtoken })
}

export async function login(req, res) {
    const { username, password } = req.body
    if (!(username && password)) {
        return res.status(400).json({message: 'Missing required fields'})
    }

    const user = await getUserByData({ username })
    if (!user) {
        return res.status(400).json({message: 'Invalid Username'})
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    const jwtoken = jwt.sign({ email: user.email, username: user.username }, SECRET_KEY)
    res.status(200).json({ token: jwtoken })
}
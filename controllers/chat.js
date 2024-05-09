
// req.username - {UUID}
// req.user - {User}
import * as Chat from '../models/chat.js'

export async function getMessages(req, res) {
    res.status(200).json({message: 'GET /chat'})
}

export async function listChats(req, res) {
    const chats = await Chat.getChatsByUserId(req.user.id)
    if (!chats) {
        return res.status(404).json({message: 'Chats not found'})
    }

    res.status(200).json({message: chats})
}

export async function addMessage(req, res) {
    if (!req.body.message) {
        return res.status(400).json({message: 'Message is required'})
    }
    const chat = await Chat.addMessage(req.params.id, {
        isSystem: false,
        message: req.body.message,
        timestamp: new Date()
    })
    // pesquisar ja no chatgpt e mandar no RES
    // Verificar se é Servico ou Suporte, se for servico modificar no model.servicos
    
    res.status(200).json({message: chat, answer: 'Answer'})
}

export async function createSupport(req, res) {
    const chat = await Chat.createChat({
        userId: req.user.id,
        type: 'support',
        subject: 'Support',
        messages: []
    })
    res.status(200).json({message: chat})
}

// req.username - {UUID}
// req.user - {User}
import * as Chat from '../models/chat.js'
import { openai } from '../index.js'
import { incrementPrice } from '../models/service.js'

export async function getMessages(req, res) {
    const chat = await Chat.getChatById(req.params.id)
    if (!chat) {
        return res.status(404).json({message: 'Chat not found'})
    }
    const msgs = chat.messages.map(message => {
        return {
            isUser: !message.isSystem,
            text: message.message,
        }
    })
    res.status(200).json({message: msgs})
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
    
    if (!chat) {    
        return res.status(404).json({message: 'Chat not found'})
    }

    const messages = chat.messages.map(message => {
        return {
            role: message.isSystem ? 'assistant' : 'user',
            content: message.message
        }
    })
    try {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });
        const message = completion.choices[0].message.content
        chat.messages.push({
            isSystem: true,
            message: message,
            timestamp: new Date()
        })

        if (chat.service) {
            incrementPrice(chat.service, completion.usage.total_tokens)
        }
        await chat.save()
        res.status(200).json({message: chat, answer: message})
    } catch (err) {
        res.status(500).json({message: 'Aconteceu algum erro!'})
    }
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
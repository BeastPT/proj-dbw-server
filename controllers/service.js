import * as Service from '../models/service.js'
import { createChat, getSubjectByServiceId } from '../models/chat.js'

export async function listServices(req, res) {
    const query = (await Service.getServicesByRequesterId(req.user.id)).map(service => service.toObject())
    const services = await Promise.all(query.map(async (service) => {
        service.subject = await getSubjectByServiceId(service._id)
        return service
    }))

    if (!services) {
        return res.status(404).json({message: 'Services not found'})
    }
    res.status(200).json({message: services})
}

export async function createService(req, res) {
    const service = await Service.createService({
        requester: req.user.id,
        type: req.body.type || null,
        rating: null,
        state: 'active',
        price: 0
    })

    const chat = await createChat({
        userId: req.user.id,
        type: 'service',
        subject: req.body.subject || 'Desconhecido', // Provavelmente adicionar mais informacao
        messages: [],
        service: service.id
    })

    res.status(200).json({message: {service, chat}})
}

export async function getService(req, res) {
    const service = await Service.getServiceById(req.params.id)
    if (!service) {
        return res.status(404).json({message: 'Service not found'})
    }

    res.status(200).json({message: service})
}

export async function editService(req, res) {
    const service = await Service.getServiceById(req.params.id)
    if (!service) {
        return res.status(404).json({message: 'Service not found'})
    }

    if (req.body.rating) {
        if (req.body.rating < 1 || req.body.rating > 5) {
            return res.status(400).json({message: 'Invalid rating'})
        }
        service.rating = req.body.rating
    }
    if (req.body.state) {
        if (!['active', 'finished', 'cancelled'].includes(req.body.state)) {
            return res.status(400).json({message: 'Invalid state'})
        }
        service.state = req.body.state
    }

    await service.save()
    res.status(200).json({message: service})
}
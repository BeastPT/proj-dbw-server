/*
 - type ( /!\ VERIFICAR )
 - clientid
 - state (Ativo / Finalizado / Cancelado)
 - rating ( 1-5 estrelas / null )
 - data (criacao)
 - price 

*/

import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['financeiro', 'programacao', 'traducao', 'aprendizagem', 'bem-estar', 'escrita', 'outro'],
        required: true,
        default: 'outro'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    state: {
        type: String,
        enum: ['active', 'finished', 'cancelled'],
        required: true,
        default: 'active'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },

}, { timestamps: true })

const model = mongoose.model('Service', serviceSchema)

/**
 * @typedef {Object} Service
 * @property {UUID} requester
 * @property {UUID} chat
 * @property {string} type ['financeiro', 'programacao', 'traducao', 'aprendizagem', 'bem-estar', 'escrita', 'outro'] default: 'outro'
 * @property {number} rating [1-5] default: null
 * @property {string} state ['active', 'finished', 'cancelled'] default: 'active'
 * @property {number} price default: 0
 */

/**
 * 
 * @param {Service} data
 * @returns {Service}
 */
export async function createService(data) {
    return await model.create(data)
}

/**
 * 
 * @param {UUID} id Service ID
 * @returns {Service | null}
 */
export async function getServiceById(id) {
    return await model.findById(id).exec()
}

/**
 * 
 * @param {UUID} requesterId User ID
 * @returns {Service[]}
*/
export async function getServicesByRequesterId(requesterId) {
    return await model.find({ requester: requesterId }).exec()
}

/**
 * 
 * @param {UUID} id Service ID
 * @param {Service} data Data to update
 * @returns {Service} Updated Document
 */
export async function updateServiceData(id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true }).exec()
}
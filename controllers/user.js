import { updateUserById, getUserById } from '../models/user.js'

async function isImgUrl(url) {
    //verify if url is a valid url
    try {
        url = new URL(url)
    } catch (e) {
        return false
    }
    return fetch(url, {method: 'HEAD'}).then(res => {
        return res.headers.get('Content-Type').startsWith('image')
    })
}

export async function editProfile(req, res) {
    const content = req.body
    const data = {}
    let error = false
    let message = []

    const userP = await getUserById(req.params.id)
    if (!userP) {
        return res.status(404).json({message: 'User not found'})
    }

    if (userP._id != req.user.id) {
        return res.status(403).json({message: 'Unauthorized'})
    }

    if (Object.keys(content).length == 0) {
        error = true
        message.push('Properties to edit are required')
    }

    
    if (content.fullname) {
        const regex_fullname = /^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)+$/
        if (!(regex_fullname.test(content.fullname))) {
            error = true
            message.push('Invalid Full Name')
        } else {
            data.fullname = content.fullname
        }
    }

    if (content.address) {
        data.address = content.address
    }

    if (content.address_number) {
        const regex_address_number = /^[0-9]+$/
        if (!(regex_address_number.test(content.address_number))) {
            error = true
            message.push('Invalid Address Number')
        }
        data.address_number = content.address_number
    }

    if (content.postal_code) {
        data.postal_code = content.postal_code
    }

    const regex_string = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (content.country) {
        if (regex_string.test(content.country)) {
            error = true
            message.push('Invalid Country')
        }
        data.country = content.country
    }

    if (content.city) {
        if (regex_string.test(content.city)) {
            error = true
            message.push('Invalid City')
        }
        data.city = content.city
    }

    if (content.nacionality) {
        if (regex_string.test(content.nacionality)) {
            error = true
            message.push('Invalid Nacionality')
        }
        data.nacionality = content.nacionality
    }

    if (content.image_url) {
        if (!(await isImgUrl(content.image_url))) {
            error = true
            message.push('Invalid Image URL')
        }
        data.image_url = content.image_url
    }
    if (error) {
        return res.status(400).json({message: message})
    }
    // verify if data has any propery
    if (Object.keys(data).length == 0) {
        return res.status(400).json({message: 'Properties to edit are required'})
    }

    const user = await updateUserById(req.user.id, data)

    res.status(200).json({message: user})
}

export async function getUser(req, res) {
    const user = await getUserById(req.params.id)
    if (!user) {
        return res.status(404).json({message: 'User not found'})
    }

    if (user._id != req.user.id) {
        return res.status(403).json({message: 'Unauthorized'})
    }
    user.password = undefined
    res.status(200).json({message: user})
}

const customersMailService = require('../services/customers.mail.service')
const validateFields = require('../utils/validateFields')
const sendMailService = require("../services/send.mail.service")

async function contactAmperTech(req, res) {
    console.log(req.files)

    const dataFormContact = req.body
    try {
        validateFields.checkFields(dataFormContact)
        const result = customersMailService.contactAmperTech(req.body, req.files)
        res.status(200).json({ message: result })
    } catch (error) {
        //console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

async function serviceOrderAmperTech(req, res) {
    const dataForm = req.body
    const files = req.files
    console.log(dataForm, files)
    try {
        const response = await sendMailService.serviceOrderAmperTech(dataForm, files)
        res.status(200).json(response)
    } catch (error) {
        console.log("erro controller", {server_error: error.message})
        res.status(500).json({server_error: error.message})
    }
}

module.exports = {
    contactAmperTech,
    serviceOrderAmperTech
}
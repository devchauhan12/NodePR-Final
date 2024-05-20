const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')

const managerGet = async (req, res) => {
    try {
        const manager = await userModel.find({ role: 'manager' })
        res.render('pages/manager', { managers: manager })
    } catch (error) {
        console.log(error)
    }
}
const managerCreate = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: 'Manager Email already Exist',
                success: false
            })
        }
        const show = password
        const _SALT_ROUND = 10
        const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)

        const data = await userModel.create({ name, email, show: show, password: hashedPassword, role: 'manager' })
        res.redirect('/manager')
    } catch (error) {
        console.log(error)
    }
}
const managerForm = (req, res) => {
    try {
        res.render('pages/addmanager')
    } catch (error) {
        console.log(error)
    }
}
const managerDelete = async (req, res) => {
    const { id } = req.params
    try {
        const manager = await userModel.findByIdAndDelete(id);
        res.redirect('pages/manager')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { managerGet, managerCreate, managerForm, managerDelete }
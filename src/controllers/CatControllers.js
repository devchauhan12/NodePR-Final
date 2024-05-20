const categoryModel = require("../models/categoryModel")

const CatGet = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.render('pages/category', { Cat: category })
    } catch (error) {
        console.log(error)
    }
}
const CatAdd = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body)
        res.redirect('back')
    } catch (error) {
        console.log(error)
    }
}
const CatForm = async (req, res) => {
    try {
        res.render('pages/addcategory')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { CatAdd, CatGet, CatForm }
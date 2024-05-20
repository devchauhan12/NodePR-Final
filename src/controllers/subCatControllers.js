const categoryModel = require("../models/categoryModel")
const subCategoryModel = require("../models/subCategoryModel")

const subCatGet = async (req, res) => {
    try {
        const subcategory = await subCategoryModel.find({}).populate('categoryID')
        console.log(subcategory)
        res.render('pages/subcategory', { subCat: subcategory })
    } catch (error) {
        console.log(error)
    }
}
const subCatAdd = async (req, res) => {
    try {
        const subcategory = await subCategoryModel.create(req.body)
        res.redirect('back')
    } catch (error) {
        console.log(error)
    }
}
const subCatForm = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.render('pages/addsubcategory', { categories: category })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { subCatAdd, subCatGet, subCatForm }
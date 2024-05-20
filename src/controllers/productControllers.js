const productModel = require("../models/productModel")
const subCategoryModel = require("../models/subCategoryModel")

const productGet = async (req, res) => {
    try {
        const product = await productModel.find({}).populate({
            path: 'subCategoryID',
            populate: {
                path: 'categoryID'
            }
        })
        res.render('pages/product', { product: product })
    } catch (error) {
        console.log(error)
    }
}
const productAdd = async (req, res) => {
    try {
        let productimage = '';
        if (req.file) {
            productimage = req.file.filename
        }

        const product = await productModel.create({
            ...req.body, productimage: productimage
        });

        console.log(product)

        res.redirect('back')
    } catch (error) {
        console.log(error)
    }
}
const productForm = async (req, res) => {
    try {
        const subcategory = await subCategoryModel.find({})
        res.render('pages/addproduct', { subcategories: subcategory })
    } catch (error) {
        console.log(error)
    }
}
const productEdit = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findById(id)
        const subCategoryData = await subCategoryModel.find({})
        res.render('pages/editproduct', { product: product, subcategories: subCategoryData })
    } catch (error) {
        console.log(error)
    }
}
const productUpdate = async (req, res) => {
    const { id } = req.params
    const { name, description, price, subCategoryID } = req.body
    try {
        let updateFields = { name: name, description: description, price: price, subCategoryID: subCategoryID };
        if (req.file) {
            const productimage = req.file.filename;
            updateFields.productimage = productimage;
        }
        const product = await productModel.findByIdAndUpdate(id, updateFields, { new: true })
        res.redirect('/product')
    } catch (error) {
        console.log(error)
    }
}
const productDelete = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findByIdAndDelete(id)
        res.redirect('/product')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { productAdd, productGet, productForm, productDelete, productEdit, productUpdate }
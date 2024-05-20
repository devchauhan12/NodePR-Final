const { Router } = require('express')
const { productGet, productForm, productAdd, productDelete, productEdit, productUpdate } = require('../controllers/productControllers')
const authenticate = require('../middleware/authenticate')
const setUserData = require('../middleware/setUserData')
const ensureUserAccess = require('../middleware/ensureUserAccess')
const upload = require('../middleware/multer')

const ProductRouter = Router()
ProductRouter.use(authenticate)
ProductRouter.use(setUserData)
ProductRouter.use(ensureUserAccess)

// Gets
ProductRouter.get('/', productGet)
ProductRouter.get('/create', productForm)
ProductRouter.get('/edit/:id', productEdit)
ProductRouter.get('/delete/:id', productDelete)

// Posts
ProductRouter.post('/create',upload, productAdd)
ProductRouter.post('/edit/:id', upload, productUpdate)

module.exports = ProductRouter
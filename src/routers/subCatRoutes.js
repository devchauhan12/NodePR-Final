const { Router } = require('express')
const { subCatGet, subCatAdd, subCatForm } = require('../controllers/subCatControllers')
const authenticate = require('../middleware/authenticate')
const setUserData = require('../middleware/setUserData')
const ensureUserAccess = require('../middleware/ensureUserAccess')

const subCatRouter = Router()

subCatRouter.use(authenticate)
subCatRouter.use(setUserData)
subCatRouter.use(ensureUserAccess)

subCatRouter.get('/', subCatGet)
subCatRouter.get('/form', subCatForm)
subCatRouter.post('/form', subCatAdd)

module.exports = subCatRouter
const { Router } = require('express')
const { CatGet, CatAdd, CatForm } = require('../controllers/CatControllers')
const ensureUserAccess = require('../middleware/ensureUserAccess')
const setUserData = require('../middleware/setUserData')
const authenticate = require('../middleware/authenticate')

const CatRouter = Router()

CatRouter.use(authenticate)
CatRouter.use(setUserData)
CatRouter.use(ensureUserAccess)

CatRouter.get('/', CatGet)
CatRouter.get('/form', CatForm)
CatRouter.post('/form', CatAdd)

module.exports = CatRouter
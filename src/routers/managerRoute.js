const { Router } = require('express')
const authenticate = require('../middleware/authenticate')
const setUserData = require('../middleware/setUserData')
const ensureUserAccess = require('../middleware/ensureUserAccess')
const ensureAdminAccess = require('../middleware/ensureAdminAccess')
const { managerForm, managerGet, managerDelete, managerCreate } = require('../controllers/managerController')

const managerRouter = Router()

managerRouter.use(authenticate)
managerRouter.use(setUserData)
managerRouter.use(ensureUserAccess)
managerRouter.use(ensureAdminAccess) 

// Gets
managerRouter.get('/', managerGet)
managerRouter.get('/create', managerForm)
managerRouter.get('/delete/:id', managerDelete)

// Posts
managerRouter.post('/create', managerCreate)

module.exports = managerRouter
const { Router } = require('express')
const setUserData = require('../middleware/setUserData')
const guest = require('../middleware/guest')
const authenticate = require('../middleware/authenticate')
const onlyuser = require('../middleware/onlyuser')
const { UserSignupForm, UserSignup, UserLoginForm, UserLogin, UserLogout, UserPage, OtpForm, OtpVerify } = require('../controllers/userController')
const userRouter = Router()

userRouter.use(setUserData)

// Gets
userRouter.get('/', authenticate, setUserData, onlyuser, UserPage)
userRouter.get('/signup', guest, UserSignupForm)
userRouter.get('/login', guest, UserLoginForm)
userRouter.get('/logout', UserLogout)
userRouter.get('/otpverification', guest, OtpForm)

// Posts
userRouter.post('/signup', guest, UserSignup)
userRouter.post('/login', guest, UserLogin)
userRouter.post('/otpverification', guest, OtpVerify)

module.exports = userRouter
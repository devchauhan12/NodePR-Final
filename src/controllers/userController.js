const userModel = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const productModel = require('../models/productModel')



const UserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.findOne({ email })

        if (user) {
            return res.status(400).redirect('back')
        }

        const _SALT_ROUND = 10
        const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)

        const data = await userModel.create({ name, email, password: hashedPassword })
        res.redirect('/user/login')
    } catch (error) {
        console.log(error)
    }
}

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).redirect('/user/signup')
        }

        const isVerify = await bcryptjs.compare(password, user.password)

        if (!isVerify) {
            return res.status(401).redirect('back')
        }

        if (user.role !== "user") {
            const payload = {
                sub: user._id,
                user: user.name,
                role: user.role
            }

            const secret = "secret_Key";

            const token = jwt.sign(payload, secret, {
                expiresIn: "1d"
            });

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            res.redirect('/')
        } else {
            const OTP = generateOTP();
            const otpExpiration = new Date(Date.now() + 4 * 60 * 1000);
            req.session.otp = OTP;
            req.session.user = user;
            req.session.otpExpiration = otpExpiration;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'devtest392@gmail.com',
                    pass: 'ngtk fbvi dftd mnjf'
                }
            })

            const mailOptions = {
                from: 'devtes392t@gmail.com',
                to: user.email,
                subject: 'Login OTP',
                html: `
                <p>Hello, ${user.name}</p>
                <p>Your One-Time Password (OTP) for login is: <strong>${OTP}</strong></p>Please enter this OTP within 4:00 Minutes to complete your authentication process.
                <p>For security purposes, please refrain from sharing this OTP with anyone.</p>
            `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/user/otpverification')
        }
    } catch (error) {
        console.log(error)
    }
}

const UserLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect('/user/login')
    } catch (error) {
        console.log(error)
    }
}

const UserLoginForm = async (req, res) => {
    try {
        res.render('pages/loginForm')
    } catch (error) {
        console.log(error)
    }
}

const UserPage = async (req, res) => {
    try {
        const products = await productModel.find().populate({
            path: 'subCategoryID',
            populate: {
                path: 'categoryID'
            }
        })
        res.render('pages/user', { products: products })
    } catch (error) {
        console.log(error)
    }
}

const OtpForm = async (req, res) => {
    try {
        res.render('pages/otpForm')
    } catch (error) {
        console.log(error)
    }
}

const OtpVerify = async (req, res) => {
    try {
        const { otp } = req.body
        const userOTP = req.session.otp;
        const user = req.session.user;

        if (otp === userOTP) {
            const payload = {
                sub: user._id,
                user: user.name,
                role: user.role
            }
            const secret = "secret_Key";
            const token = jwt.sign(payload, secret, {
                expiresIn: "1d"
            });

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            delete req.session.otp;
            delete req.session.otpExpiration;
            delete req.session.user

            res.redirect('/user/')
        } else {
            res.redirect('/user/otpverification')
        }
    } catch (error) {
        console.log(error)
    }
}

const generateOTP = () => {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

const UserSignupForm = async (req, res) => {
    try {
        res.render('pages/signupForm')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { UserSignupForm, UserSignup, UserLogin, UserLogout, UserLoginForm, UserPage, OtpForm, OtpVerify }
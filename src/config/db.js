const mongoose = require('mongoose')

const url = 'mongodb+srv://devchauhansurat:Dev2362@nodeadmin.qyifg9s.mongodb.net/PR-Final'

const db = async () => {
    try {
        await mongoose.connect(url)
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}
module.exports = db;
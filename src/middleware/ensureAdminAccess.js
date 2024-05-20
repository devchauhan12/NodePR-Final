const ensureAdminAccess = async (req, res, next) => {
    try {
        if (!req.user) {
            res.clearCookie('token')
            return res.redirect('/user/login')
        }
        if (req.user.role === "user") {
            return res.redirect('/user/')
        }
        if (req.user.role !== "admin") {
            res.redirect('/')
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = ensureAdminAccess
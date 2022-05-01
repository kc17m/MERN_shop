const jwt = require("jsonwebtoken")

function doAuthMiddleware(req, res, next) {
    const token = req.headers.token
    try {
        const tokenPayLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.userClaims = tokenPayLoad
        next()
    } catch (err) {
        console.log("error while verifying token: ", err)
        return res.status(401).json({ message: "please login first" })
    }
}

module.exports = {
    doAuthMiddleware
}
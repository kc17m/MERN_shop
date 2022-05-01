const crypto = require("crypto")
const jwt = require("jsonwebtoken")

function hash(input) {
    return crypto.createHash("sha256").update(input).digest("hex")
}

function createRandomSalt() {
    return crypto.randomBytes(64).toString("hex")
}

function createPasswordHash(password, salt) {
    return hash(password + salt)
}

function createToken(user) {
    const TEN_Min = 60 * 10 // define expirationy period 
    const initatedAt = Math.floor(Date.now) / 1000 //time in Seconds
    const expiresAt = initatedAt + TEN_Min // timestamp for expiration

    const tokenPayLoad = { //token components:
        sub: user._id, // 1. subject: user id
        tokenType: "access",
        iat: initatedAt,
        exp: expiresAt
    }
    const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET)
    console.log("Token from hash - createToken", token); //success
    return token
}

module.exports = {
    hash,
    createRandomSalt,
    createPasswordHash,
    createToken
}
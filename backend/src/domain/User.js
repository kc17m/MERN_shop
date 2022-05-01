const { createPasswordHash, createRandomSalt } = require("../utils/hash")

function makeUser({ _id, name, email, createdAt, productOrdered, password, passwordHash, passwordSalt }) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("User name must be provided")
    }

    if (!passwordHash && !password) {
        throw new Error("Password or PasswordHash must be provided")
    }

    const _pwSalt = passwordSalt || createRandomSalt()

    return {
        name,
        email,
        createdAt: createdAt || Date.now(),
        productOrdered: productOrdered || [], //analog zu wishlist
        passwordHash: passwordHash || createPasswordHash(password, _pwSalt),
        passwordSalt: _pwSalt,
        _id

    }
}

module.exports = {
    makeUser
}
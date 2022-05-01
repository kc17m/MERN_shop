const { findUserByEmail, insertOne } = require("../db-access/users-dao")
const { makeUser } = require("../domain/User")

async function registerUser(userInfo) {
    const foundUser = await findUserByEmail(userInfo.email)
    if (foundUser) {
        throw { message: "User with this email " + userInfo.email + " already registered." }

    }
    const user = makeUser(userInfo)
    const updateResult = insertOne(user)
    return updateResult
}





///#### zum Vergleich - function as promise: 

// function registerUser(userInfo) {
//     return new Promise((resolve, reject) => {

//         return findUserByEmail(userInfo.email)
//             .then(foundUser => {
//                 if (foundUser) {
//                     reject({ message: "User with this email " + userInfo.email + " already registered." })
//                     return
//                 }
//                 const user = makeUser(userInfo)
//                 return insertOne(user)
//             })
//             .then((updateResult) => resolve(updateResult))
//     })
// }


module.exports = {
    registerUser
}
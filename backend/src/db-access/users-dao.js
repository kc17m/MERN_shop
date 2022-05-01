const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

async function findById(id) {
    const db = await getDB()
    const foundUser = await db.collection("Users").findOne({ _id: new ObjectId(id) })
    return foundUser
}

async function findUserByEmail(email) {
    const db = await getDB()
    const user = await db.collection("Users").findOne({ email: email })
    return user
}

async function insertOne(user) {
    const db = await getDB()
    const insertResult = await db.collection("Users").insertOne(user)
    return insertResult
}

async function updateUserOrderList(userId, productId) {
    const db = await getDB()

    return db.collection("Users").updateOne(
        { _id: new ObjectId(userId) },
        { $push: { productOrdered: productId } }
    )
}

//zum Vergleich: promises:
// function findById(id) {
//     return getDB().then(db => db.collection("Users").findOne({ _id: new ObjectId(id) }))
// }

// function findUserByEmail(email) {
//     return getDB().then(db => db.collection("Users").findOne({ email: email }))
// }

// function insertOne(user) {
//     return getDB().then(db => db.collection("Users").insertOne(user))
// }



module.exports = {
    findById,
    findUserByEmail,
    insertOne,
    updateUserOrderList
}
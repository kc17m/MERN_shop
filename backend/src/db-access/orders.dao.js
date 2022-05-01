const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

function findAllOrders() {
    return getDB().then(db => db.collection("orders").find().toArray())
}

function findById(id) {
    return getDB().then(db => db.collection("orders").findOne({ _id: new ObjectId(id) }))
}

function insertOne(order) {
    return getDB().then(db => { db.collection("orders").insertOne(order) })
}

function updateOrderProducts(orderId, productId) {
    return getDB().then(db =>
        db.collection("orders").updateOne(
            { _id: new ObjectId(orderId) },
            { $push: { products: productId } }
        ))
}


module.exports = {
    findAllOrders,
    findById,
    insertOne,
    updateOrderProducts

}
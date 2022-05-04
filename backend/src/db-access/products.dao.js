const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

function findAllProducts() {
    return getDB().then(db => db.collection("guitars").find().toArray())
}

function findById(id) {
    return getDB().then(db => db.collection("guitars").findOne({ _id: new ObjectId(id) }))
}

function insertOne(product) {
    return getDB().then(db => db.collection("guitars").insertOne(product))
}
///#####/////
async function buyOne(id) { ///siehe "id" unten als Variable
    const db = await getDB()
    console.log("id in buyOne:", id)
    const result = await db.collection("guitars").updateOne(
        { _id: id }, // "id" als variable beliebig
        { $inc: { stock: -1, sold: 1 } }
    )
    return result
}

///#####///
async function deleteOneProduct(id) {
    const db = await getDB()
    console.log("DAO: id in deleteOne", id)
    const result = await db.collection("guitars").deleteOne(
        { _id: id }
    )
    return result
}

/// ##### ////

///####/// update product - funktioniert nicht!!!
async function updateOneProduct(id, updateInfo) { ///siehe "id" unten als Variable
    const db = await getDB()
    console.log("id in updateOneProduct:", id)
    //  console.log("updated Product:" price);
    const result = await db.collection("guitars").updateOne(
        { _id: id },
        { $set: updateInfo }//{ title: "YAMAHA Pacifica 311H", stock: 21 } } ///
    )
    return result
}

///#####////





module.exports = {
    findAllProducts,
    findById,
    insertOne,
    buyOne,
    updateOneProduct,
    deleteOneProduct
}
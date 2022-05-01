const { findById, buyOne } = require("../db-access/products.dao")
const { makeProduct } = require("../domain/Product")

///// ###### ////
async function buyProduct(myProductwithId) {
    console.log("USECASE BUY: myProductwithId ", myProductwithId)
    const foundProduct = await findById(myProductwithId.productId)  ///.id aus parameter oben
    console.log("USECASE BUY: found product ", foundProduct)
    if (!foundProduct) {
        throw ({ message: "Product with Id " + myProductwithId.productId + " not found." })
    }
    const product = makeProduct(foundProduct)
    console.log(product)
    const updatedProduct = await buyOne(product._id)

    return updatedProduct
}
///#####///////

module.exports = {
    buyProduct
}
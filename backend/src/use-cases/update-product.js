const { updateOneProduct, findById } = require("../db-access/products.dao")
const { makeProduct } = require("../domain/Product")

async function updateProduct(productwithId) {
    const foundProduct = await findById(productwithId.productId)  ///.id aus parameter oben
    if (!foundProduct) {
        throw ({ message: "Product with Id " + myProductwithId.productId + " not found." })
    }
    const product = makeProduct(foundProduct)
    console.log(product)
    const updatedProduct = await updateOneProduct(product._id)

    return updatedProduct
}
///#####///////

module.exports = {
    updateProduct
}
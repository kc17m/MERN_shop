const { findById, deleteOneProduct } = require("../db-access/products.dao")
const { makeProduct } = require("../domain/Product")


async function deleteProduct(productWithId) {
    console.log("OK USECASE DELETE: productwithID aus useCase Delete Prod:", productWithId.productId)
    const foundProduct = await findById(productWithId.productId)
    console.log("USECASE DELETE: product found aus deleteProduct useCase: ", foundProduct)

    if (!foundProduct) {
        throw ({ message: "FOR DELETE PRODUCT: Product with this id " + productWithId.productId + " not found." })
    }
    const product = makeProduct(foundProduct)
    console.log("product aus UseCase14 ", product)
    result = await deleteOneProduct(product._id)

    return result

}

// async function buyProduct(myProductwithId) {
//     const foundProduct = await findById(myProductwithId.productId)  ///.id aus parameter oben
//     if (!foundProduct) {
//         throw ({ message: "Product with Id " + myProductwithId.productId + " not found." })
//     }
//     const product = makeProduct(foundProduct)
//     console.log(product)
//     const updatedProduct = await buyOne(product._id)

//     return updatedProduct

module.exports = {
    deleteProduct
}
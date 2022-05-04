const { updateOneProduct, findById } = require("../db-access/products.dao")
const { makeProduct } = require("../domain/Product")

//{} unten: Objekt mit zwei Werten: 
async function updateProduct({ productId, ...restProduct }) {
    const foundProduct = await findById(productId)  ///.id aus parameter oben
    if (!foundProduct) {
        throw ({ message: "Product with Id " + productId + " not found." })
    }
    const product = makeProduct(foundProduct)
    console.log("USE CASE: product: ", product)
    const updatedProduct = await updateOneProduct(product._id, restProduct)
    console.log("updated Product aus use case:", updatedProduct);

    return updatedProduct
}
///#####///////

module.exports = {
    updateProduct
}
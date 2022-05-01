const { findById } = require("../db-access/products.dao");

function showProduct({ productId }) {
    return findById(productId)
        .then((product) => productToProductView(product))
}

function productToProductView(product) {
    console.log("inside productToProductView:", product)
    const productCopy = { ...product }

    // delete productCopy.stock

    // neue felder anlegen
    productCopy.isAvailable = product.stock > 0
    productCopy.isLimited = product.stock < 10

    return productCopy
}

module.exports = {
    showProduct
}
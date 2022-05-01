const { findAllProducts } = require("../db-access/products.dao");

function listAllProducts() {
    return findAllProducts()
        .then(products => products.map(p => ({
            _id: p._id,
            title: p.title,
            image: p.image,
            category: p.category,
            description: p.description,
            price: p.price,
            stock: p.stock,
            isAvailable: p.stock > 0,
            isLimited: p.stock < 5,
            sold: p.sold
        })))
}

module.exports = {
    listAllProducts
}
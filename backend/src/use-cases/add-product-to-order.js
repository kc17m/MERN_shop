const OrdersDAO = require("../db-access/products.dao")
const ProductsDAO = require("../db-access/orders.dao")
const { makeProduct } = require("../domain/Product")
const { makeOrder } = require("../domain/Order")


function addProducttoOrder({ orderId, productId }) {
    return new Promise((resolve, reject) => {
        Promise.all([
            OrdersDAO.findById(orderId),
            ProductsDAO.findById(productId),
        ]).then(([foundOrder, foundProduct]) => {
            if (!foundOrder) {
                reject({ message: "Order with this id " + orderId + " not found" })
                return
            }
            if (!foundProduct) {
                reject({ message: "Product with this id " + productId + " not fonud" })
                return
            }
            const order = makeOrder(foundOrder)
            const product = makeProduct(foundProduct)

            return { order, product }
        })
            .then(({ order, product }) => OrdersDAO.updateOrderProducts(order._id, product._id))
            .then(resolve)
    })
}

module.exports = {
    addProducttoOrder
}
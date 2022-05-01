

function makeOrder({ _id, date, products, state, price, customer }) {

    return {
        _id,
        date: date || Date.now(),
        products: products || [],
        state: state || "2nd hand",
        price: price || "$250",
        customer: customer || "Richard Starkey"
    }
}


module.exports = {
    makeOrder
}
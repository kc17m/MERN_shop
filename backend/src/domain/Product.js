
function makeProduct({ _id, title, category, description, variations, price, stock, sold, image }) {

    return {
        title: title || "new guitar",
        category: category || "fender",
        description: description || "pls update descr",
        variations: variations || ["only one color available"],
        price: price || "$250",
        stock: stock || 25,
        image: image || "https://andertons-productimages.imgix.net/150877-tmp9F0D.jpg?auto=compress&w=1000&h=1000&auto=format",
        sold: sold || 0,
        _id
    }
}




module.exports = {
    makeProduct
}
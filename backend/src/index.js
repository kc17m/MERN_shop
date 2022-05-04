const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const { listAllProducts } = require("./use-cases/list-all-products")
const { showProduct } = require("./use-cases/show-product")
const { createNewProduct } = require("./use-cases/create-new-product")
const { updateProduct } = require("./use-cases/update-product")
const { buyProduct } = require("./use-cases/buy-product")
const { deleteProduct } = require("./use-cases/delete-product")
const { registerUser } = require("./use-cases/register-user")
const { loginUser } = require("./use-cases/login-user")
const { doAuthMiddleware } = require("./auth/auth-middleware")




const PORT = process.env.PORT || 8100
const app = express()

app.use(cors())
//app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("do you see me?")
})

app.get("/api/products/all", (req, res) => {
    listAllProducts()
        .then((allProducts) => res.json(allProducts))
        .catch(() => res.json({ err: "Error finding Products - md" }))
})
//Thunder TESTED - works!

app.get("/api/product/single/:id", (req, res) => {
    const handleError = (error) => res.status(500).json({ err: error.message || "Error listing single product - md" })

    try {
        const id = req.params.id

        showProduct({ productId: id })
            .then(product => res.json(product))
            .catch((err) => handleError(err))
    }
    catch (err) {
        handleError(err)
    }
})
//Thunder TESTED - works!

app.post("/api/products/add", (req, res) => {
    const handleError = (error) => res.status(500).json({ err: error.message || "error creating new product - md" })

    try {
        const productInfo = req.body

        createNewProduct(productInfo)
            .then(product => res.json(product))
            .catch(handleError)
    } catch (err) {
        handleError(err)
    }
})
//Thunder TESTED - works!!

app.put("/api/products/buy", async (req, res) => {
    try {
        const updatedProduct = req.body
        const productId = updatedProduct.productId  //productid muss in json aus Frontend der übergebenen id entsprechen
        // console.log("product id to see what it is:", productId)
        // console.log("is the same as product id as object", { productId })
        const product = await buyProduct({ productId })

        res.json({ product })
        console.log("aus index PUT for buy: res.json product obj", { product })
    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while buying product." })
    }
})
///##############///// TESTED - WORKS

///#####//// DELETE ##### /////

app.delete("/api/products/delete/:id", async (req, res) => {
    try {
        const deletedProd = req.body
        const productId = req.params.id
        console.log("OK Index.js: delete: productId: ", productId)
        console.log("OK Index.js: delete id as object: ", { productId })
        const productToDelete = await deleteProduct({ productId })
        console.log("Index.js - productToDelete", productToDelete)

        res.json({ productToDelete })
        console.log("Index.js: DELETE: res.json product obj", { productToDelete })
    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error deleting product." })
    }
})
/// WORKS IN THUNDER CLIENT


///REGISTER NEW USER 
app.post("/api/users/register", async (req, res) => {
    try {
        const userInfo = req.body

        const user = await registerUser(userInfo)
        res.json(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Error while registering new user" })
    }
})
//### WORKS IN THUNDER CLIENT ####///

//### LOGIN ###///

app.post("/api/users/login", async (req, res) => {
    try {
        const email = req.body.email // data from user input
        const password = req.body.password

        console.log("aus Index.js - password ", password)

        const token = await loginUser({ email, password })
        console.log("from index, registerUser, token ", token) // function from usecase
        res.json({ token })  //deconstructed token from loginUser and createToken aus "hash"
        console.log("token from index as obj ", token)
        console.log("token from index - deconstructed ", { token })
    } catch (error) {
        console.log(error);
        res.status(404).json({ err: "My message: Something went wrong" }) //generic message not stating what is incorrect
    }
})

//### WORKS IN THUNDER CLIENT ####///



// ### UPDATE PROD ### ///

app.put("/api/products/update", async (req, res) => {
    try {
        const updatedProduct = req.body
        console.log("INDEX JS product id as object:", updatedProduct)
        const product = await updateProduct(updatedProduct)

        res.json({ product })
        console.log("INDEX JS: res.json product obj", { product })
    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while updating product." })
    }
})



///Works in Thunder client ####////

//// ROUTES TO BE COMPLETED ////

app.get("/api/users/userInfo", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub // req.body.userId

        const userInfo = await showUserInfo({ userId })
        res.status(201).json(userInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while getting your user info." })
    }
})



app.use((_, res) => {
    res.status(404).json({ err: "nothing found." })
})



app.listen(PORT, () => console.log("Server listening on Port", PORT))
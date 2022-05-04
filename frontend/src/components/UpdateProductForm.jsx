import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../api";
import BackButton from "./BackButton";
import Header from "./Header";
import Footer from "./Footer";


const UpdateProductForm = () => {

    const [prodDetail, setProdDetail] = useState();
    const { productId } = useParams()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("fender");
    const [description, setDescription] = useState("");
    const [variations, setVariations] = useState([]);
    const [price, setPrice] = useState("$369.00");
    const [stock, setStock] = useState(50);
    const [sold, setSold] = useState(0)
    const [image, setImage] = useState("https://europe.yamaha.com/en/files/1FC21ADE6D01471891DF3348C7A05EF7_12073_4b83e8d182da3f915114c2d8973c4ea0.jpg?impolicy=resize&imwid=735&imhei=735");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")


    useEffect(() => {
        fetch(apiBaseUrl + "/api/product/single/" + productId)
            .then(response => response.json())
            .then(productData => {
                if (!productData.err) {
                    setProdDetail(productData)
                    console.log(productData)
                }
            })
    }, [productId, price, category, description, image, sold, stock, title, variations])

    const handleUpdate = (e) => {
        e.preventDefault()

        const updateObj = {
            'title': title,
            "category": category,
            'description': description,
            'image': image,
            'price': price,
            "sold": sold,
            "stock": stock,

            "variations": [variations]
        }
        console.log(updateObj);

        fetch(apiBaseUrl + "/api/products/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj)
        })

            .then(response => response.json())
            .then(data => {
                if (data.err) setError(data.err)
                else {
                    setError("")
                    setSuccess("Congratulations, your article has been updated")
                    setProdDetail(data)
                }
            })


    }


    if (prodDetail) return (
        <><Header title="Update Section" />
            <section className="prodUpdate">
                <article>

                    <div className="prodDetail" >
                        <h2>PRODUCTS TO UPDATE</h2>

                        <h2>{prodDetail.title}</h2>

                        {prodDetail.category && <h4>Category: {prodDetail.category.toUpperCase()}</h4>}
                        <figure><img src={prodDetail.image} alt="guitar" /></figure>
                        <h5>{prodDetail.description}</h5>
                        <h4>Price price: {prodDetail.price}</h4>
                        <h5>Colors: </h5>
                        <ul className="colorList">
                            {prodDetail.variations && prodDetail.variations.map((color, index) => <li key={index}>{color}</li>)}
                        </ul>
                        <p>In Stock: {prodDetail.stock}</p>
                        <p>Sold Items: {prodDetail.sold}</p>

                    </div >
                </article>
                <form className="formlist">

                    <label htmlFor="title">Change Product Name</label>
                    <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder={prodDetail.title} />
                    <label>Another category? </label>
                    <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="Fender">Fender</option>
                        <option value="Les Paul">Les Paul</option>
                        <option value="Acoustic">Acoustic</option>
                        <option value="Classic">Classic</option>
                        <option value="Left Handed">Left Handed</option>
                    </select>

                    <label htmlFor="description">Amend Product Description</label>
                    <textarea name="description" rows="10" cols="50" value={description} name="description" onChange={(e) => setDescription(e.target.value)} placeholder={prodDetail.description} />

                    <label htmlFor="image">New Image</label>
                    <input type="text" value={image} name="image" onChange={(e) => setImage(e.target.value)} placeholder={prodDetail.image} />

                    <label htmlFor="price">Update Price</label>
                    <input type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)} placeholder={prodDetail.price} />

                    <label htmlFor="sold">Change Sold Articles</label>
                    <input type="number" value={sold} name="sold" onChange={(e) => setSold(Number(e.target.value))} placeholder={prodDetail.sold} />

                    <label htmlFor="stock">Change Items in Stock</label>
                    <input type="number" value={stock} name="stock" onChange={(e) => setStock(Number(e.target.value))} placeholder={prodDetail.stock} />

                    <label>Change Color </label>
                    <select value={variations} onChange={(e) => { setVariations(e.target.value) }}>
                        <option value="Filthy Red">Filthy Red</option>
                        <option value="Stealth Black">Stealth Black</option>
                        <option value="Slate Blue">Slate Blue</option>
                        <option value="Ivory">Ivory</option>

                    </select>
                    <button className="buyNow" onClick={handleUpdate} >UPDATE NOW</button>
                </form >
                <h4>{success}</h4>
                <BackButton />
            </section>


            <Footer />

        </>
    );
    else return <h1>Guitar not available</h1>
}

export default UpdateProductForm;
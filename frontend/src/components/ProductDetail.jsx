import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../api";
import BackButton from "./BackButton";
import Header from "./Header";
import Footer from "./Footer";

const ProductDetail = () => {

    const [prodDetail, setProdDetail] = useState();
    const { productId } = useParams()

    useEffect(() => {
        fetch(apiBaseUrl + "/api/product/single/" + productId)
            .then(response => response.json())
            .then(productData => {
                if (!productData.err) {
                    setProdDetail(productData)
                    console.log(productData)
                }
            })
    }, [productId])

    const showText = document.querySelector(".show")
    console.log(showText)


    const handleBuy = () => {

        showText.classList.remove("hidden")

        fetch(apiBaseUrl + "/api/products/buy", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: prodDetail._id })
        })
            .then(res => res.json())
        // .then((data) => setProdDetail(data))
    }

    if (prodDetail) return (

        <div>
            <Header title="Your selected Guitar" />
            <div className="prodDetail" >

                <h2>{prodDetail.title}</h2>
                {prodDetail.category && <h4>Category: {prodDetail.category.toUpperCase()}</h4>}
                <figure><img src={prodDetail.image} alt="guitar" /></figure>
                <h5>{prodDetail.description}</h5>
                <h4>Our special price: {prodDetail.price}</h4>
                <h5>Available Colors: </h5>
                <ul className="colorList">
                    {prodDetail.variations && prodDetail.variations.map((color, index) => <li key={index}>{color}</li>)}
                </ul>
                <p>In Stock: {prodDetail.stock}</p>
                <button className="buyNow" onClick={handleBuy}>BUY NOW</button>
                <BackButton />
                <h3 className="show hidden">Congratulations! {prodDetail.title} will be shipped to your location soon - Enjoy!</h3>

            </div >
            <Footer />


        </div>)
    else return <h1>Guitar not available</h1>

}

export default ProductDetail;
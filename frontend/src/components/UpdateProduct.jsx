import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../api";
import { Link } from "react-router-dom"



const UpdateProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(apiBaseUrl + "/api/products/all")
            .then(response => response.json())
            .then(productsData => setProducts(productsData))
    }, [])


    return (<>
        <Header title="Update Guitars" />
        <section className="update">
            <article>
                <h2>List of all Guitars</h2>
                <h4>Click on the item to be updated</h4>
                {products && products.map(product =>
                    <h5 key={product._id}><Link to={"/updateForm/" + product._id}>{product.title}, {product.category}</Link></h5>)}
            </article>

        </section>

        <Footer />

    </>);
}

export default UpdateProduct;
import ProductItem from "./ProductItem";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react"


const ProductList = (props) => {

    // const [header, setHeader] = useState("Please log in if you have an account")


    return (<div>
        <Header title="List of all Guitars" />

        <section className="guitarList">
            {props.products.map(product =>
                <ProductItem product={product} setProduct={props.setProduct} key={product._id} />)}
        </section>
        <Footer />

    </div>);
}

export default ProductList;
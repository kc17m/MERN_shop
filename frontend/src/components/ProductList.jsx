import ProductItem from "./ProductItem";
import Header from "./Header";

const ProductList = (props) => {
    return (<div>
        <Header />

        <section className="guitarList">
            {props.products.map(product =>
                <ProductItem product={product} setProduct={props.setProduct} key={product._id} />)}
        </section>
    </div>);
}

export default ProductList;
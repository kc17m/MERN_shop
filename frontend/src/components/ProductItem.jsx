import { Link } from "react-router-dom"

const ProductItem = (props) => {

    //console.log(props.product.title)

    return (<div className="guitarListContainer">


        <h5 className="listHeader">{props.product.title}</h5>
        <figure className="guitarImg">
            <img className="guitarListImg" src={props.product.image} alt="guitar" />
        </figure>
        <h6>Price: {props.product.price}</h6>
        <Link to={"/api/product/single/" + props.product._id}> <button className="findMore">Find out more...</button></Link>

    </div>);
}

export default ProductItem;
import { apiBaseUrl } from "../api";
import { Link } from "react-router-dom";

const DeleteProduct = (props) => {

    const handleDelete = (event, id) => {
        console.log("id", id, "event.target", event.target)
        const tobeDeleted = { productId: id };
        console.log(tobeDeleted)
        fetch(apiBaseUrl + "/api/products/delete/" + id, {
            method: "DELETE",

        })
            .then(response => response.json())
            .then((event.target.classList.add("hidden")))
    }

    return (<div className="deleteList" >
        <h2>WANT TO REMOVE ITEMS FROM STOCK? </h2><h4>CLICK ARTICLES BELOW TO DELETE <span className="icon">↓</span></h4>
        <h4 className="action">Please be careful, this action cannot be undone</h4>
        {props.guitars && console.log(props.guitars)}
        {props.guitars.map((el) => {
            return <p key={el._id} onClick={(e) => handleDelete(e, el._id)}>{el.title}   </p>
        })
        }


    </div >);
}

export default DeleteProduct;
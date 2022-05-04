import BackButton from "./BackButton";
import Dashboard from "./Dashboard";
import { apiBaseUrl } from "../api";
import { useEffect, useState } from "react";
import AddProductForm from "./AddProductform";
import Header from "./Header"
import DeleteProduct from "./DeleteProduct";
import Footer from "./Footer";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

const ManageProducts = (props) => {


    // const [header, setHeader] = useState("")

    console.log("Token management: ", props.token)
    const [guitars, setGuitars] = useState([])

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("fender");
    const [description, setDescription] = useState("");
    const [variations, setVariations] = useState("");
    const [price, setPrice] = useState("$369.00");
    const [stock, setStock] = useState(50);
    const [sold, setSold] = useState(0)
    const [image, setImage] = useState("https://europe.yamaha.com/en/files/1FC21ADE6D01471891DF3348C7A05EF7_12073_4b83e8d182da3f915114c2d8973c4ea0.jpg?impolicy=resize&imwid=735&imhei=735");


    const [error, setError] = useState("")

    useEffect(() => {
        fetch(apiBaseUrl + "/api/products/all")
            .then(response => response.json())
            .then(productsData => setGuitars(productsData))
        // setHeader("You are currently logged in")
        console.log(guitars)
    }, [title])

    if (!props.token) {
        return <Navigate to="/signIn" />
    } else return (<div>
        <Header title="Management Dashboard" token={props.token} />

        <h1 className="heading" >MANAGEMENT DASHBOARD - Top 5 Articles</h1>
        <section className="dashboard">
            <Dashboard guitars={guitars} />
        </section>
        <section className="addDelete">
            <AddProductForm
                guitars={guitars} setGuitars={setGuitars}

                title={title} setTitle={setTitle}
                category={category} setCategory={setCategory}
                description={description} setDescription={setDescription}
                variations={variations} setVariations={setVariations}
                price={price} setPrice={setPrice}
                stock={stock} setStock={setStock}
                sold={sold} setSold={setSold}
                image={image} setImage={setImage}

                error={error} setError={setError} />
            <DeleteProduct guitars={guitars} setGuitars={setGuitars} />
        </section>
        <section className="updateLink"><h3 >Need to update your selection? </h3><Link to='/update'><button>Click here</button></Link></section>

        <BackButton />
        <Footer />
    </div >);
}

export default ManageProducts;
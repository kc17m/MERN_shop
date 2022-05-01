import BackButton from "./BackButton";
import Dashboard from "./Dashboard";
import { apiBaseUrl } from "../api";
import { useEffect, useState } from "react";
import AddProductForm from "./AddProductform";
import Header from "./Header"
import DeleteProduct from "./DeleteProduct";

const AddProduct = () => {

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
        console.log(guitars)
    }, [])



    return (<div>
        <Header />
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

        <BackButton />
    </div >);
}

export default AddProduct;
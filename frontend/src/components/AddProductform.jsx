import { apiBaseUrl } from "../api"


const AddProductForm = (props) => {

    const handleAdd = (e) => {
        e.preventDefault()


        const postObj = {
            'title': props.title,
            "category": props.category,
            'description': props.description,
            'image': props.image,
            'price': props.price,
            "stock": props.stock,
            "variations": [props.variations]
        }
        console.log(postObj);

        fetch(apiBaseUrl + "/api/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(postObj)
        })
            .then(response => response.json())
            .then(data => {
                if (data.err) props.setError(data.err)
                else {
                    props.setError("")
                    props.setTitle("Fender 2000")
                    props.setCategory("Fender")
                    props.setDescription("Brilliant Sound Quality - Best of Class")
                    props.setImage("https://www.stars-musik.de/medias/fender/custom-shop-tele-thinline-2p90-mn-cz558087-600-187749.png")
                    props.setPrice("$399.00")
                    props.setStock("50")
                    props.setVariations([])

                    //props.setGuitars(data)

                }
            })
    }


    return (<section className="addproductSection">

        <h2>ADD NEW ARTICLE</h2>
        <form className="formlist">

            <label htmlFor="title">Product Name</label>
            <input type="text" value={props.title} name="title" onChange={(e) => props.setTitle(e.target.value)} placeholder="Fender 2000" />
            <label>What category is it? </label>
            <select value={props.category} onChange={(e) => { props.setCategory(e.target.value) }}>
                <option value="Fender">Fender</option>
                <option value="Les Paul">Les Paul</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Classic">Classic</option>
                <option value="Left Handed">Left Handed</option>
            </select>

            <label htmlFor="description">Please add a descriptive text</label>
            <input type="text" value={props.description} name="description" onChange={(e) => props.setDescription(e.target.value)} placeholder="fender" />

            <label htmlFor="image">Image</label>
            <input type="text" value={props.image} name="image" onChange={(e) => props.setImage(e.target.value)} placeholder="https://www.stars-musik.de/medias/fender/custom-shop-tele-thinline-2p90-mn-cz558087-600-187749.png" />

            <label htmlFor="price">Price</label>
            <input type="text" value={props.price} name="price" onChange={(e) => props.setPrice(e.target.value)} placeholder="$399.00" />

            <label htmlFor="stock">Items in Stock</label>
            <input type="number" value={props.stock} name="stock" onChange={(e) => props.setStock(e.target.value)} placeholder="50" />

            <label>Please pick a color: </label>
            <select value={props.variations} onChange={(e) => { props.setVariations(e.target.value) }}>
                <option value="Filthy Red">Filthy Red</option>
                <option value="Stealth Black">Stealth Black</option>
                <option value="Slate Blue">Slate Blue</option>
                <option value="Ivory">Ivory</option>

            </select>
            <button className="addToList" onClick={handleAdd}>Add to Product List</button>
        </form >

    </section >);
}

export default AddProductForm;
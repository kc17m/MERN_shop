import { useNavigate, Navigate } from "react-router-dom";

const Dashboard = (props) => {
    props.guitars &&
        console.log(props.guitars)
    console.log(props.token);


    return (
        <section className="manage">
            <article >
                <h2>TOP SELLERS:</h2>
                {props.guitars && props.guitars.sort((a, b) => (b.sold - a.sold))
                    .slice(0, 5)
                    .map((e, index) => <div key={index}> <h3>{e.title}</h3> <h4>Sold Articles: {e.sold}, Price: {e.price} </h4></div>)}

            </article >
            <article>
                <h2>LEAST ARTICLES IN STOCK:</h2>
                {props.guitars && props.guitars
                    .sort((a, b) => (a.stock) - (b.stock))
                    .slice(0, 5)
                    .map((e, index) => <div key={index}> <h3>{e.title}</h3> <h4>In Stock: {e.stock} </h4></div>)}
            </article>
            <article>
                <h2>PREMIUM ARTICLES:</h2>
                {props.guitars && props.guitars
                    .sort((a, b) => (b.price.slice(1)) - (a.price.slice(1)))
                    // .map(e => e.price.slice(1))
                    .slice(0, 5)
                    .map((e, index) => <div key={index}> <h3>{e.title}</h3> <h4>Price: {e.price} </h4></div>)}
            </article>
        </section >);
}

export default Dashboard;
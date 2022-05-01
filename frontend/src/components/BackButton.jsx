import { Link } from "react-router-dom"
const BackButton = () => {
    return (
        <div>
            <Link to="/"> <button className="buttonBack">Back to List of Guitars</button></Link>

        </div>
    );
}

export default BackButton
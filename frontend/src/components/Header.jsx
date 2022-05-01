import { Link } from "react-router-dom"
import Image from "../img/greattoplay_logo.png"



const Header = (props) => {
    return (
        <header>
            <img className="logo" src={Image} alt="logo" />
            {/* <img src="./greattoplay_logo.png" alt="logo" /> */}
            <Link to='/newproducts'><h2>Admin Section</h2></Link>

            <Link to='/register'><h2>Registration</h2></Link>
            <div className="logged">
                <Link to='/signIn'><h4>{props.header}</h4></Link>
            </div>
        </header>
    );
}

export default Header;
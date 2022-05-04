import { Link } from "react-router-dom"
import Image from "../img/greattoplay_logo.png"



const Header = (props) => {
    console.log("Token header: ", props.token);

    return (

        <header >

            <img className="logo" src={Image} alt="logo" />
            <div className="notLogged"><h4>You are here:</h4> <h3 className="optional-title">{props.title}</h3></div>
            <div className="notLogged"><Link to='/newproducts'><h3>Admin Section</h3></Link></div>

            <div className="notLogged"><Link to='/register'><h3>Register as new user</h3></Link></div>
            {props.token ?
                <><div className="notLogged">
                    <Link to="/signIn"><h3>Logout</h3></Link> </div>
                    <div className="logged">
                        <h5>You are currently logged in</h5>
                    </div>
                </>
                :
                <>
                    <div className="notLogged">
                        <Link to="/signIn"><h3>Login here</h3></Link> </div>
                    <div className="logged">
                        <h5>You are are not logged in</h5>
                    </div>
                </>}
        </header>

    );
}

export default Header;
import BackButton from "./BackButton";
import Header from "./Header";
import { useState } from "react";
import { apiBaseUrl } from "../api";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const SignIn = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [header, setHeader] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(apiBaseUrl + "/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((response) => response.json())
            .then(result => {
                if (result.err) {
                    setError("Sorry, there seems to be a problem with your login")
                } else {
                    setError("")
                    setEmail("")
                    setPassword("")
                    setHeader(`You are logged in as ${email}`)
                    const token = result.token
                    props.setToken(token)
                    console.log("TOKEN SIGNIN PAGE: ", token)
                    setSuccess("Login successful - you can now browse through all admin sections")
                }

            })
            .catch(() => console.log("error123"))
    }


    return (<>
        <Header title="Login" token={props.token} header={header} />
        <section className="signIn">

            <h2 className="userlog">USER LOGIN</h2>
            <form className="formlist">


                <label>Email </label>

                <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="lara@croft.de" />

                <label htmlFor="password">Password</label>
                <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="enter your password here" />


                <button className="addToList" onClick={handleLogin}>Login</button>
                <br />


            </form >
            <article>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <h4 style={{ textAlign: "center" }} >Don't have an account yet? <Link to='/register'><span style={{ textAlign: "center", textDecoration: "underline" }}>Click here to register</span></Link> </h4>
            </article>



            <BackButton />
        </section>
        <Footer />

    </>
    )
}

export default SignIn;
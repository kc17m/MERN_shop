import BackButton from "./BackButton";
import Header from "./Header";
import { useState } from "react";
import { apiBaseUrl } from "../api";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [token, setToken] = useState(null)
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
            .then((res) => res.json())
            .then(result => {
                if (result.err) {
                    setError("Sorry, there seems to be a problem with your login")
                } else {
                    setError("")
                    setEmail("")
                    setPassword("")
                    setHeader(`You are logged in as ${email}`)
                }
                const token = result.token
                setToken(token)
            })
            .catch(() => console.log("error"))


    }


    return (
        <section className="signIn">
            <Header header={header} />

            <h2 className="userlog">USER LOGIN</h2>
            <form className="formlist">


                <label>Email </label>

                <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="lara@croft.de" />

                <label htmlFor="password">Password</label>
                <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="enter your password here" />


                <button className="addToList" onClick={handleLogin}>Login</button>
                <br />
                <p style={{ textAlign: "start", color: "tomato" }}>{error}</p>

            </form >
            <h4 style={{ textAlign: "center" }} >Don't have an account yet? <Link to='/register'><span style={{ textAlign: "center", textDecoration: "underline" }}>Click here to register</span></Link> </h4>




            <BackButton />
        </section>)
}

export default SignIn;
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../api";
import Header from "./Header";
import BackButton from "./BackButton";
import Footer from "./Footer";

const RegisterUser = (props) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    console.log("Register ", props.token);

    async function handleRegister(e) {
        e.preventDefault()

        if (password.length < 3) {
            setError("Password must be at least 3 chars")
            return
        }
        if (password !== passwordConfirm) {
            setError("Your passwords do not match")
            return
        }

        try {
            const response = await fetch(apiBaseUrl + "/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            const result = await response.json()
            console.log("result", result);

            if (result.err) {
                console.log("error to be set");
                setError(result.err)
            }
            else if (result.acknowledged === true && result.insertedId) {
                setSuccess("Account created successfully! Please use credentials to log in.")
                setError("")
                setName("")
                setPassword("")
                setPasswordConfirm("")
            }
        }

        catch (error) {
            console.log("error from catch", error)
            setError("Problem with your registration - try again")
        }

    }



    return (<>
        <Header title="Registration" />
        <section className="registration">

            <h2>REGISTER USER</h2>

            <form className="formlist">

                <label htmlFor="title">Name</label>
                <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="Lara Croft" />
                <label>Email </label>

                <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} placeholder="lara@croft.de" />


                <label htmlFor="password">Password</label>
                <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="strong password please" />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" value={passwordConfirm} name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="confirm your password" />

                <button className="addToList" onClick={handleRegister}>Register</button>

            </form >
            <article>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message"><Link to="/singIn">{success}</Link></p>}

                <h4 style={{ textAlign: "center" }} >You already have an account? <Link to='/signIn'><span style={{ textAlign: "center", textDecoration: "underline" }}>Click here to log in</span></Link> </h4>


            </article>

            <BackButton />

        </section>
        <Footer />



    </>);
}

export default RegisterUser
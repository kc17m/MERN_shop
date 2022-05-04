import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App"
import ProductDetail from './components/ProductDetail'
import ManageProducts from './components/ManageProducts'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import RegisterUser from './components/RegisterUser'
import { useState } from "react"
import Header from './components/Header'
import UpdateProduct from './components/UpdateProduct'
import UpdateProductForm from './components/UpdateProductForm'




const AppRouter = () => {

    const [token, setToken] = useState(null)
    console.log("token from AppRouter ", token);
    const logout = () => setToken(null)

    //const logout = () => setToken(null)
    return (<BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/header' element={<Header token={token} logout={logout} />} />
            <Route path='/newproducts' element={<ManageProducts token={token} />} />
            <Route path='/api/product/single/:productId' element={<ProductDetail />} />
            <Route path='/dashboard' element={<Dashboard token={token} />} />
            <Route path='/signIn' element={<SignIn setToken={setToken} />} />
            <Route path='/register' element={<RegisterUser token={token} />} />
            <Route path='/update' element={<UpdateProduct token={token} />} />
            <Route path='/updateForm/:productId' element={<UpdateProductForm />} />


        </Routes>
    </BrowserRouter>);
}

export default AppRouter;
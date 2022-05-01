import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App"
import ProductDetail from './components/ProductDetail'
import ManageProduct from './components/ManageProducts'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import RegisterUser from './components/RegisterUser'




const AppRouter = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/newproducts' element={<ManageProduct />} />
            <Route path='/api/product/single/:productId' element={<ProductDetail />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/register' element={<RegisterUser />} />


        </Routes>
    </BrowserRouter>);
}

export default AppRouter;
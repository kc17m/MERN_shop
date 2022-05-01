import "./style/main.css"
import './App.css';
import { useEffect, useState } from "react"
import { apiBaseUrl } from "./api";
import ProductList from "./components/ProductList"

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(apiBaseUrl + "/api/products/all")
      .then(response => response.json())
      .then(productsData => setProducts(productsData))
  }, [])

  return (
    <div className="App">

      <ProductList setProducts={setProducts} products={products} />

    </div>
  );
}

export default App;

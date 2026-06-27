import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Order from "./Pages/Order"
import CartPage from "./Pages/CartPage"
import Footer from "./Components/Footer"
import { CartProvider } from "./Context/CartContext"
import ScrollToTop from "./Components/ScrollToTop"

function App() {

  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App

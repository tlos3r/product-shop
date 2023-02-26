import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Header, Footer } from "./component";
import { ToastContainer } from "react-toastify";
import { Home, Contact, Login, Register, Reset, Admin, Cart } from "./pages";
import AdminOnlyRoute from "./component/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./component/Product/productDetails/ProductDetails";
const App = () => {
    return (
        <section className="container">
            <ToastContainer theme="colored" />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset" element={<Reset />} />
                    <Route
                        path="/admin/*"
                        element={
                            <AdminOnlyRoute>
                                <Admin />
                            </AdminOnlyRoute>
                        }
                    />
                    <Route path="/product-details/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </section>
    );
};

export default App;

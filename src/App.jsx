import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ProductSection from "./views/ProductSection/ProductSection";
import CartSection from "./views/CartSection/CartSection";
import LoginForm from "./views/SectionLogin/LoginForm";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailProduct from "./views/DetailProductSection/DetailProduct";
import Layout from "./views/Layout";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./views/ProtectedRoute";

library.add(fas, far, fab);

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<ProductSection />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartSection />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/product/:id"
                            element={
                                <ProtectedRoute>
                                    <DetailProduct />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default App;

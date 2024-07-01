import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./Context/CartContext.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import { FilterProvider } from "./Context/SearchContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/index.jsx";
import { WishListProvider } from "./Context/WishListContext.jsx";
import { ProductsProvider } from "./Context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <FilterProvider>
                <ThemeProvider>
                    <CartProvider>
                        <WishListProvider>
                            <ProductsProvider>
                                <RouterProvider router={router} />
                            </ProductsProvider>
                        </WishListProvider>
                    </CartProvider>
                </ThemeProvider>
            </FilterProvider>
        </AuthProvider>
    </React.StrictMode>
);

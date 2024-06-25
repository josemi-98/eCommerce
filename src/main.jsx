import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./Context/CartContext.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";
import { FilterProvider } from "./Context/SearchContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <FilterProvider>
            <ThemeProvider>
                <AuthProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </AuthProvider>
            </ThemeProvider>
        </FilterProvider>
    </React.StrictMode>
);

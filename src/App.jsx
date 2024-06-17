import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import CardOferta from "./Components/CardOfertas/CardOferta";
import ProductSection from "./Components/ProductSection/ProductSection";
import CartSection from "./Components/CartSection/CartSection";
import { ThemeProvider } from "./Components/Provider/ThemeProvider";
import LoginForm from "./Components/SectionLogin/LoginForm";
import "./App.css";
import useCart from "./Components/Hooks/UseCart";

library.add(fas, far, fab);

function App() {
    const { cartState, addToCart } = useCart();

    const [filtro, setFiltro] = useState("");

    const [activeSection, setActiveSection] = useState("home");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setUserName(name);
    };

    return (
        <ThemeProvider>
            <Header
                onFilterChange={setFiltro}
                carritoCount={cartState.cartCount}
                setActiveSection={setActiveSection}
            />
            <CardOferta isLoggedIn={isLoggedIn} name={userName} />
            {activeSection === "home" && (
                <ProductSection filtro={filtro} dispatch={addToCart} />
            )}
            {activeSection === "cart" && (
                <CartSection cartItems={cartState.cartItems} />
            )}
            <LoginForm onLogin={handleLogin} />
            <Footer />
        </ThemeProvider>
    );
}

export default App;

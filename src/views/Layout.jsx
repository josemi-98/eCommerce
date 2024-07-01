import Header from "./Header/Header";
import CardOferta from "./Banner/CardOferta";
import Footer from "./Footer/Footer";
import { useContext } from "react";
import { FilterContext } from "../Context/SearchContext";
import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function Layout() {
    const { setFiltro } = useContext(FilterContext);
    // const location = useLocation();
    //  si usasemos children y el app
    // const excludePaths = ["/login"]; 

    // if (excludePaths.includes(location.pathname)) {
    //     return <>{children}</>;
    // }

    return (
        <>
            <Header onFilterChange={setFiltro} />
            <CardOferta />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;

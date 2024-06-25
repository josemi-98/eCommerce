import PropTypes from "prop-types";
import Header from "./Header/Header";
import CardOferta from "./Banner/CardOferta";
import Footer from "./Footer/Footer";
import { useContext } from "react";
import { FilterContext } from "../Context/SearchContext";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const { setFiltro } = useContext(FilterContext);
    const location = useLocation();

    const excludePaths = ["/login"]; 

    if (excludePaths.includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <>
            <Header onFilterChange={setFiltro} />
            <CardOferta />
            {children}
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

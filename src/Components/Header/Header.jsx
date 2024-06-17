import "./Header.css";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import { Navbar } from "react-bootstrap";
import IconList from "../IconList/IconList";
import PropTypes from "prop-types";
import { ThemeContext } from "../Provider/ThemeProvider";
import { useContext } from "react";

function Header({ onFilterChange, carritoCount, setActiveSection }) {
    const handleFilterChange = (nuevoFiltro) => {
        onFilterChange(nuevoFiltro);
    };

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Navbar
                expand="lg"
                className={`navbar-custom ${theme} px-3 sticky-top`}
            >
                <HeaderNavBar
                    onFilterChange={handleFilterChange}
                    setActiveSection={setActiveSection}
                />
                <IconList
                    carritoCount={carritoCount}
                    setActiveSection={setActiveSection}
                />
            </Navbar>
        </>
    );
}

Header.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    carritoCount: PropTypes.number.isRequired, // Ahora carritoCount es un número
    setActiveSection: PropTypes.func.isRequired, // Ahora carritoCount es un número
};

export default Header;

import "./Header.css";
import HeaderNavBar from "../../Components/HeaderNavBar/HeaderNavBar";
import { Navbar, Container, Nav } from "react-bootstrap";
import IconList from "../../Components/IconList/IconList";
import PropTypes from "prop-types";
import { ThemeContext } from "../../Context/ThemeProvider";
import { useContext } from "react";

function Header({ onFilterChange }) {
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
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <HeaderNavBar onFilterChange={handleFilterChange} />
                        </Nav>
                        <Nav>
                            <IconList />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

Header.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default Header;

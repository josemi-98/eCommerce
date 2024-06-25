import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import logo from "../../assets/logo_sinFondo.png";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HeaderNavBar({ onFilterChange }) {
    const [textoFiltro, setTextoFiltro] = useState("");
    const searchInputRef = useRef(null);

    const handleInputChange = (e) => {
        const nuevoTexto = e.target.value;
        setTextoFiltro(nuevoTexto);
        onFilterChange(nuevoTexto); 
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <>
            <Navbar.Brand as={Link} to="/">
                <img
                    src={logo}
                    width="80"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
            </Navbar.Brand>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#categories">
                        Categorías
                    </Nav.Link>
                    <Nav.Link href="#offers">
                        Ofertas
                    </Nav.Link>
                    <Nav.Link href="#contact">
                        Contacto
                    </Nav.Link>
                </Nav>
                <Form className="d-flex flex-grow-1 mx-3">
                    <FormControl
                        ref={searchInputRef}
                        type="search"
                        placeholder="Buscar"
                        className="me-2 search-bar"
                        aria-label="Search"
                        onChange={handleInputChange}
                        value={textoFiltro}
                        style={{ minWidth: '40rem' }}
                    />
                </Form>
            </Navbar.Collapse>
        </>
    );
}

HeaderNavBar.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default HeaderNavBar;

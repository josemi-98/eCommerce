import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import logo from "../../assets/logo_sinFondo.png";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function HeaderNavBar({ onFilterChange, setActiveSection }) {
    const [textoFlitro, setTextoFiltro] = useState("");

    const searchInputRef = useRef(null)

    const handleInputChange = (e) => {
        const nuevoTexto = e.target.value;
        setTextoFiltro(nuevoTexto);
        onFilterChange(nuevoTexto);
    };

    const handleInicioClick = () => {
        setActiveSection('home');
    };

    useEffect (()=>{
        if(searchInputRef.current){
            searchInputRef.current.focus()
        }
    },[])

    return (
        <>
            <Navbar.Brand href="#">
                <img
                    src={logo}
                    width="80"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {/* as={Link} */}
                    <Nav.Link  onClick={handleInicioClick}>
                        Inicio
                    </Nav.Link>
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
                        value={textoFlitro}
                    />
                </Form>
            </Navbar.Collapse>
        </>
    );
}

HeaderNavBar.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    setActiveSection: PropTypes.func.isRequired, // Necesitamos setActiveSection
};

export default HeaderNavBar;

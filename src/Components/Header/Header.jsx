import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Nav, Form, FormControl  } from 'react-bootstrap';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from '../../assets/logo_sinFondo.png';
import data from '../../../data.json';
import CardRopa from '../CardRopa/CardRopa';
import CardOferta from '../CardOfertas/CardOferta';

import { useState } from "react"

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
    };

  return (
    <>
        <Navbar expand="lg" className="navbar-custom px-3">
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
            <Nav.Link href="#home" className="text-white">Inicio</Nav.Link>
            <Nav.Link href="#categories" className="text-white">Categorías</Nav.Link>
            <Nav.Link href="#offers" className="text-white">Ofertas</Nav.Link>
            <Nav.Link href="#contact" className="text-white">Contacto</Nav.Link>
            </Nav>
            <Form className="d-flex flex-grow-1 mx-3">
            <FormControl
                type="search"
                placeholder="Buscar"
                className="me-2 search-bar"
                aria-label="Search"
                onChange={handleSearch}
                value={searchTerm}
            />
            </Form>

            <Nav>
                
            <Nav.Link href="#cart" className="text-white">
                <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
            <Nav.Link href="#wishlist" className="text-white">
                <FontAwesomeIcon icon={faHeart} />
            </Nav.Link>
            <Nav.Link href="#profile" className="text-white">
                <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        <CardOferta></CardOferta>

        <CardRopa data={filteredData} />

    </>
  )
}

export default Header

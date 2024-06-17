import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import {
    faShoppingCart,
    faHeart,
    faUser,
    faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./IconList.css";
import { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

function IconList({ carritoCount, setActiveSection }) {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <Nav>
                <Nav.Link onClick={() => setActiveSection('cart')}>
                    <div className="cart-icon-container">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {carritoCount > 0 && (
                            <span className="cart-count">{carritoCount}</span>
                        )}
                    </div>
                </Nav.Link>
                <Nav.Link href="#wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                </Nav.Link>
                <Nav.Link href="">
                    <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
                <Nav.Link href="" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={faYinYang} />
                </Nav.Link>
            </Nav>
        </>
    );
}

IconList.propTypes = {
    carritoCount: PropTypes.number.isRequired,
    setActiveSection: PropTypes.func.isRequired,
};

export default IconList;

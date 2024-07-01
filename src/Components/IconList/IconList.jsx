import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Dropdown } from "react-bootstrap";
import {
    faShoppingCart,
    faHeart,
    faUser,
    faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import "./IconList.css";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import useCart from "../../Hooks/UseCart";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function IconList() {
    const { toggleTheme } = useContext(ThemeContext);

    const { cartItems } = useCart();

    const { isLoggedIn, handleLogout, userData } = useAuth();

    const navigate = useNavigate();

    const cartItemsCount = cartItems.length;

    const handleLogoutClick = () => {
        handleLogout();
        navigate("/");
    };

    return (
        <>
            <Nav>
                <Dropdown>
                    <Dropdown.Toggle as={Nav.Link} className="custom-toggle">
                        <FontAwesomeIcon icon={faUser} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu thick-border dropdown-menu-end">
                        {!isLoggedIn && (
                            <Dropdown.Item as={Link} to="/login">
                                <button className="custom-button">
                                    Iniciar Sesión
                                </button>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item as={Link} to="">
                            Perfil
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="">
                            Pedidos
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="">
                            Devolver artículo
                        </Dropdown.Item>
                        {isLoggedIn && (
                            <>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    onClick={handleLogoutClick}
                                    className="logout-item"
                                >
                                    <span className="logout-link">
                                    ¿No eres {userData.name}?{" "} Cerrar sesión
                                    </span>
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Nav.Link as={Link} to="/cart">
                    <div className="cart-icon-container">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/deseos">
                    <FontAwesomeIcon icon={faHeart} />
                </Nav.Link>
                <Nav.Link href="" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={faYinYang} />
                </Nav.Link>
            </Nav>
        </>
    );
}

export default IconList;

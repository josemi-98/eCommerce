import CartCard from "../CartCard/CartCard";
import PropTypes from "prop-types";
import "./CartSection.css";

function CartSection({ cartItems }) {
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="card-cart">
            <h1>Carrito de compras</h1>
            <div className="card-container-cart">
                {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <CartCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
            <div className="total-cuenta">Total a Pagar: ${totalAmount.toFixed(2)}</div>
        </div>
    );
}

CartSection.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

export default CartSection;

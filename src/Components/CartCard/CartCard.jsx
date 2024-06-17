import PropTypes from "prop-types";

const CartCard = ({ product }) => {
    const { id, title, image, price, quantity } = product;

    return (
        <div className="card-item-cart" key={id}>
            <img src={image} alt={title} className="card-image-cart" />
            <div className="cart-icon-container-cart">
                <span className="cart-count-cart">{quantity}</span>
            </div>
            <div className="card-content-cart">
                <h3 className="card-title-cart">{title}</h3>
                <p className="card-price-cart">Precio por unidad: ${price.toFixed(2)}</p>
                <p className="card-price-cart">Precio total: ${(price * quantity).toFixed(2)}</p>
            </div>
        </div>
    );
};

CartCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartCard;

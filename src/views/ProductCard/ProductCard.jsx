import PropTypes from "prop-types";
import useCart from "../../Hooks/UseCart";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
    const { id, title, image, price, rating } = product;

    const { addToCart } = useCart();

    const { isLoggedIn} = useAuth();


    return (
        <div className="card" key={id}>
            <Link to={`/product/${id}`} className="card-link">
                <img src={image} alt={title} className="card-image" />
                {/* <FontAwesomeIcon icon={faTrashAlt} />
                <FontAwesomeIcon icon={faTrashAlt} /> */}

                <div className="card-content">
                    <h3 className="card-title">{title}</h3>
                    {/* <p className="card-description">{description}</p> */}
                    {false && (
                        <div className="product-rating">
                            <p>{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
                        </div>
                    )}
                    <p className="card-price">${price}</p>
                </div>
            </Link>
            {isLoggedIn && (
                <button onClick={() => addToCart(product)}>Añadir Carrito</button>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number,
            count: PropTypes.number,
        }),
    }).isRequired,
};

export default ProductCard;

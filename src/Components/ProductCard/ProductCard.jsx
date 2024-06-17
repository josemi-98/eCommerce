import PropTypes from "prop-types";

const ProductCard = ({ product, dispatch }) => {
    const { id, title, image, price, description, rating } = product;

    const carrito = () => {
        dispatch({ type: "añadirAlCarrito", product });
    };

    return (
        <div className="card" key={id}>
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {false && (
                    <div className="product-rating">
                        <p>{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
                    </div>
                )}
                <p className="card-price">${price}</p>
            </div>
            <button onClick={carrito}>Añadir Carrito</button>
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
        description: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number,
            count: PropTypes.number,
        }),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default ProductCard;

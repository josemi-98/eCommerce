import data from "../../../data.json";
import "./ProductSection.css";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

function ProductSection({ filtro, dispatch }) {
    const products = data.filter((product) =>
        product.title.toLowerCase().includes(filtro.toLowerCase())
    );
    return (
        <div className="card-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} dispatch={dispatch} />
            ))}
        </div>
    );
}

ProductSection.propTypes = {
    filtro: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default ProductSection;

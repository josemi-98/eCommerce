import data from "../../../data.json";
import "./ProductSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { useContext } from "react";
import { FilterContext } from "../../Context/SearchContext";

function ProductSection() {

    const {filtro} = useContext(FilterContext)
    const products = data.filter((product) =>
        product.title.toLowerCase().includes(filtro.toLowerCase())
    );
    return (
        <div className="card-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
}



export default ProductSection;

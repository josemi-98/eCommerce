import { Link } from "react-router-dom";
import useWishList from "../../Hooks/UseWishList";
import BackButton from "../../Components/BackButton/BackButton";

function ProductWishlist() {

    const { wishList } = useWishList();

    const uniqueWishList = Object.values(wishList);

    return (
        <div>
            <div className="card-cart" >
                <h1>Tus artículos</h1>
                <BackButton/>
                <div className="card-container-cart">
                    {uniqueWishList.length > 0 ? (
                        <>
                            {uniqueWishList.map((product) => (
                                <div
                                    className="card-item-cart"
                                    key={product.id}
                                >
                                <Link to={`/product/${product.id}`} className="card-link">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="card-image-cart"
                                    />
                                    <div className="card-content-cart">
                                        <h3 className="card-title-cart">
                                            {product.title}
                                        </h3> 
                                    </div>
                                    </Link>
                                </div>
                            ))}
                          
                        </>
                    ) : (
                        <p>No hay lista de deseos.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductWishlist;

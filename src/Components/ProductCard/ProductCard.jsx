import useCart from "../../Hooks/UseCart";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalAddProduct from "../../Components/ProductModal/ProductModal";
import { useEffect, useState } from "react";
import ProductForm from "../ProductForm/ProductForm";
import useWishList from "../../Hooks/UseWishList";

const ProductCard = ({ product, onDelete, onEdit }) => {
    const { id, title, image, price, rating } = product;

    const { addToCart } = useCart();

    const { wishList, removeFromWishList, addToWishList } = useWishList();

    const { isLoggedIn, userData } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);

    const isAdmin = userData && userData.rol === 'admin'; 

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(wishList.some(item => item.id === id));
    }, [wishList, id]);

    const handleLikeClick = () => {
        if (liked) {
            removeFromWishList(id);
        } else {
            addToWishList(product);
        }
        setLiked(!liked);
    };

    return (
        <div className="card" key={id}>
            {isLoggedIn ? (
                isAdmin ? (
                    <div className="card-icons">
                        <FontAwesomeIcon
                            icon={faPen}
                            className="card-icon"
                            onClick={() => onEdit(product)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="card-icon"
                            onClick={() => onDelete(product.id)}
                        />
                    </div>
                ) : (
                    <div className="card-icons">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="card-icon"
                            style={{ color: liked ? 'orange' : 'white' }}
                            onClick={handleLikeClick}
                        />
                    </div>
                )
            ) : null}
            <Link to={`/product/${id}`} className="card-link">
                <img src={image} alt={title} className="card-image" />

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
                <button onClick={() => addToCart(product)}>
                    Añadir Carrito
                </button>
            )}
            <ModalAddProduct isOpen={modalOpen} onClose={closeModal} initialData={product}>
                <ProductForm onSubmit={() => onEdit(product)} initialData={product} />
            </ModalAddProduct>
        </div>
    );
};

export default ProductCard;

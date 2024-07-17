import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useCart from "../../Hooks/UseCart";
import useAuth from "../../Hooks/useAuth";
import useWishList from "../../Hooks/UseWishList";
import ModalAddProduct from "../../Components/ProductModal/ProductModal";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { deleteProductThunk } from "../../Redux/Thunks/ProductsThunks";

const ProductCard = ({ product, onEdit }) => {
    
    const dispatch = useDispatch();
    const { id, title, image, price } = product;
    const { addToCart, deleteProduct } = useCart();
    const { wishList, removeFromWishList, addToWishList } = useWishList();
    const { isLoggedIn, userData } = useAuth();
    const [modalOpen, setModalOpen] = useState(false); 
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

    const handleEditClick = () => {
        setModalOpen(true); 
    };

    //Elimino el producto y lo limipio si esta en el carrito 
    const handleDeteleProduct = (id) => {
        dispatch(deleteProductThunk(id)).then(()=>{
            deleteProduct(id)
        })
    }

    return (
        <div className="card" key={id}>
            {isLoggedIn ? (
                isAdmin ? (
                    <div className="card-icons">
                        <FontAwesomeIcon
                            icon={faPen}
                            className="card-icon"
                            onClick={handleEditClick} 
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="card-icon"
                            onClick={() => handleDeteleProduct(id)}
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
                    <p className="card-price">${price}</p>
                </div>
            </Link>
            {isLoggedIn && (
                <button onClick={() => addToCart(product)}>
                    Añadir Carrito
                </button>
            )}
            <ModalAddProduct isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <ProductForm initialData={product} closeModal={() => setModalOpen(false)} onSubmit={onEdit} />
            </ModalAddProduct>
        </div>
    );
};

export default ProductCard;

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductByIdThunk } from "../../Redux/Thunks/ProductsThunks";
import { resetSelectedProduct, selectError, selectLoading, selectSelectedProduct } from "../../Redux/Slices/ProductsSlice";
import useCart from "../../Hooks/UseCart";
import BackButton from "../../Components/BackButton/BackButton";
import Loader from "../../Components/Loader/Loader";

function DetailProduct() {
    const { addToCart } = useCart();
    const dispatch = useDispatch();
    const { id } = useParams();

    const loading = useSelector(selectLoading);
    const product = useSelector(selectSelectedProduct);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(getProductByIdThunk(id));

        return () => {
            dispatch(resetSelectedProduct())
        }
    }, [id, dispatch]);

    if (loading) {
        return <Loader />;
    }

    
    if (!product && !error) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row shadow p-3 mb-5 bg-white rounded">
                <div className="col-md-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center">
                    <h3>{product.title}</h3>
                    <p className="text-primary fw-bold">${product.price}</p>
                    <p>{product.description}</p>
                    <p className="text-muted">Categoría: {product.category}</p>
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Añadir al carrito</button>
                </div>
            </div>
            <BackButton />
        </div>
    );
}

export default DetailProduct;

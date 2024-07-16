import { useParams } from "react-router-dom";
// import data from "../../../data.json";
import useCart from "../../Hooks/UseCart";
import BackButton from "../../Components/BackButton/BackButton";
import useProduct from "../../Hooks/useProduct";
import Loader from "../../Components/Loader/Loader";
import { useEffect, useState } from "react";

function DetailProduct() {

    const {addToCart} = useCart();
    const  [product, setProduct ] = useState(null)

    const {loading, getProductById} = useProduct()

    const { id } = useParams();
    // const product = data.find((product) => product.id.toString() === id);

    useEffect(()=> {
        const fetchData = async () => {
            const productData = await getProductById(id)
            setProduct(productData)
        };
        fetchData();
    }, [id, getProductById])

    if ( loading){
         <Loader />;
    }

    if (!product) {
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
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Añadir carrito</button>
                </div>
            </div>
            <BackButton/>
        </div>
    );
}

export default DetailProduct;

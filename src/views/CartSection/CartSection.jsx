import "./CartSection.css";
import useCart from "../../Hooks/UseCart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

function CartSection() {
    const { cartItems, clearCart, deleteProduct } = useCart();

    const groupedCartIems = cartItems.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, count: 1 };
        } else {
            acc[item.id].count++;
        }
        return acc;
    }, {});

    const uniqueCartItems = Object.values(groupedCartIems);

    const totalPrice = uniqueCartItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );

    const handleBuy = () =>{
        alert("Estas siendo redirigido a la pasarela de pago")
        clearCart()
    } 

    // const unitPrice = parseFloat(product.price).toFixed(2);
                    // const totalPrice = (parseFloat(product.price) * product.count).toFixed(2);

    return (
        <div className="card-cart">
            <h1>Carrito de compras</h1>
            <div className="card-container-cart">
                {uniqueCartItems.length > 0 ? (
                    <>
                        {uniqueCartItems.map((product) => (
                            <div className="card-item-cart" key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="card-image-cart"
                                />
                                <div className="cart-icon-container-cart">
                                    <span className="cart-count-cart">
                                        {product.count}
                                    </span>
                                </div>
                                <div className="card-content-cart">
                                    <h3 className="card-title-cart">
                                        {product.title}
                                    </h3>
                                    <p className="card-price-cart">
                                        Precio por unidad: $
                                        { product.price}
                                    </p>
                                    <p className="card-price-cart">
                                        Precio total: $
                                        {(
                                            product.price * product.count
                                        )}
                                    </p>
                                    <button
                                        className="text-muted"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />  Eliminar 
                                    </button>
                                    <span className="text-muted">|</span>
                                    <button className="text-muted">
                                      <FontAwesomeIcon icon={faHeart} />  Mover a favoritos
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="total-cuenta">
                            Total a Pagar: ${totalPrice}
                        </div>
                        <button
                            className="btn btn-primary mx-2"
                            onClick={handleBuy}
                        >
                            Comprar
                        </button>
                        <button
                            className="btn btn-danger mx-2"
                            onClick={() => clearCart()}
                        >
                            Borrar Compra
                        </button>
                    </>
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
        </div>
    );
}

export default CartSection;

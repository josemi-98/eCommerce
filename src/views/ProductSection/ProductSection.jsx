import "./ProductSection.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ModalProduct from "../../Components/ProductModal/ProductModal";
import ProductForm from "../../Components/ProductForm/ProductForm";
import useProduct from "../../Hooks/useProduct";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";

function ProductSection() {

    const { userData } = useAuth();

    // const [loading, setLoading] = useState(true);
    // const [showSpinner, setShowSpinner] = useState(true); 

    const {
        filteredProducts,
        currentProduct,
        modalOpen,
        handleEditProductDetails,
        deleteProduct,
        openModal,
        setCurrentProduct,
        closeModal,
        loading,
    } = useProduct();

    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
            
    //             setShowSpinner(true);

    //             const data = await ProductLoader();

    //             setCurrentProduct(data);
    //             setShowSpinner(false);
    //         } catch (error) {
    //             console.error('Error loading products:', error);
    //             setShowSpinner(false); 
    //         } finally {
    //             setLoading(false); 
    //         }
    //     };

    //     loadData();
    // }, [setCurrentProduct]);

    const isAdmin = userData && userData.rol === 'admin';           


    if (loading) {
        
        return <Loader/>
    }

    return (
        <>
            {isAdmin && (
                <button className="button-add-product" onClick={() => {
                    setCurrentProduct(null);
                    openModal();
                }}>Nuevo producto</button>
            )}
            <div className="card-grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => handleEditProductDetails(product.id, product.title, product.price, product.image, product.description, product.category)}
                        onDelete={() => deleteProduct(product.id)}
                    />
                ))}

                <ModalProduct isOpen={modalOpen} onClose={closeModal} initialData={currentProduct}>
                    <ProductForm initialData={currentProduct} closeModal={closeModal} />
                </ModalProduct>
            </div>
        </>
    );
}

export default ProductSection;

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductThunk, updateProductThunk, getAllProductsThunk } from "../../Redux/Thunks/ProductsThunks";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ModalProduct from "../../Components/ProductModal/ProductModal";
import ProductForm from "../../Components/ProductForm/ProductForm";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import { selectProducts, selectLoading, selectError } from "../../Redux/Slices/ProductsSlice";
import "./ProductSection.css";
import { FilterContext } from "../../Context/FilterContext";

function ProductSection() {
    const dispatch = useDispatch();
    const { userData } = useAuth();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isAdmin = userData && userData.rol === 'admin';    
    const [modalOpen, setModalOpen] = useState(false);

    const { filtro } = useContext(FilterContext);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // const [categoriasUnicas, setCategoriasUnicas] = useState([]);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.title.toLowerCase().includes(filtro.toLowerCase())
            )
        );
        //* Recalcular categorías únicas cuando cambian los productos filtrados
        // const uniqueCategories = [
        //     ...new Set(products.map((product) => product.category)),
        // ];
        // setCategoriasUnicas(uniqueCategories);
    }, [filtro, products]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);

    const handleSaveProduct = (productData) => {
        if (productData.id) {
            dispatch(updateProductThunk({ id: productData.id, editedProduct: productData }));
        } else {
            dispatch(addProductThunk(productData));
        }
        closeModal();
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {isAdmin && (
                <button className="button-add-product" onClick={() => openModal()}>
                    Nuevo producto
                </button>
            )}
            <div className="card-grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleSaveProduct}
                    />
                ))}
                <ModalProduct isOpen={modalOpen} onClose={closeModal}>
                    <ProductForm closeModal={closeModal} onSubmit={handleSaveProduct} initialData={products} />
                </ModalProduct>
            </div>
        </>
    );
}

export default ProductSection;

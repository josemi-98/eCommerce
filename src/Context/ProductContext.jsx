import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { FilterContext } from "./SearchContext";
import { v4 as uuidv4 } from "uuid";
import data from "../../data/db.json";

export const ProductContext = createContext();

const API_URL = "http://localhost:3000/products";

export const ProductsProvider = ({ children }) => {
    const { filtro } = useContext(FilterContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState(data.products);
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        title: "",
        description: "",
        image: "",
        price: null,
        category: "",
    });
    const [currentProduct, setCurrentProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [categoriasUnicas, setCategoriasUnicas] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.title.toLowerCase().includes(filtro.toLowerCase())
            )
        );
        //* Recalcular categorías únicas cuando cambian los productos filtrados
        const uniqueCategories = [
            ...new Set(products.map((product) => product.category)),
        ];
        setCategoriasUnicas(uniqueCategories);
    }, [filtro, products]);

    //* Métodos para usar el modal
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null);
    };

    //* Función para manejar los cambios en el campo del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    //* Métodos para hacer el CRUD de productos
    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setTimeout(()=> {
                setLoading(false)
            }, 2000);
        }
    };

    const getProductById = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            const product = response.data;
            return product;
        } catch (e) {
            console.error("Error creating product:", e);
            //* ASI TENDRIAN QUE MANEJARSE LOS ERRORES
            // if (e.response && e.response.status === 404 ) {
            //     setError("erro el producto no existe", e)
            // } else {
            //     setError(`error al obetener el producto con ${id}:`, e)
            // }
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (editedProduct.id !== null) {
            await editProduct();
        } else {
            await createProduct();
        }
    };

    const createProduct = async () => {
        try {
            setLoading(true);
            const newId = uuidv4();
            const newProduct = { ...editedProduct, id: newId };

            const response = await axios.post(API_URL, newProduct);
            setProducts([...products, response.data]);
            setEditedProduct({
                id: null,
                title: "",
                description: "",
                image: "",
                price: null,
                category: "",
            });
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_URL}/${editedProduct.id}`,
                editedProduct
            );

            const updateProduct = response.data;

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updateProduct.id ? updateProduct : product
                )
            );
        } catch (error) {
            console.error("Error editing product:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleEditProductDetails = (
        id,
        title,
        price,
        image,
        description,
        category
    ) => {
        const selectedProduct = products.find((product) => product.id === id);
        setCurrentProduct({
            ...selectedProduct,
            title,
            price,
            image,
            description,
            category,
        });
        openModal();
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );
            // getProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                currentProduct,
                modalOpen,
                editedProduct,
                loading,
                setEditedProduct,
                handleSave,
                handleEditProductDetails,
                deleteProduct,
                openModal,
                setCurrentProduct,
                closeModal,
                handleInputChange,
                getProductById,
                categoriasUnicas,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

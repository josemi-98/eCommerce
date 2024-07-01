import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../Context/SearchContext";
import data from "../../data/db.json"
// import axios from "axios";

// const API_URL = "http://localhost:3000/products";

const useProductLocal = () => {
    const { filtro = "" } = useContext(FilterContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState(data.products);
    const [editedProduct, setEditedProduct] = useState({
        id: null,
        title: "",
        description: "",
        image: "",
        price: "",
        category: ""
    });
    const [currentProduct, setCurrentProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // useEffect (() => {
    //     getProducts()
    // },[])

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) => {
                return (
                    product.title &&
                    product.title.toLowerCase().includes(filtro.toLowerCase())
                );
            })
        );
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

    // //* Métodos para hacer el CRUD de productos 
    // const getProducts = async () => {
    //     try {
    //       const response = await axios.get(API_URL);
    //       console.log(response);
    //       setProducts(response.data)
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }

    const handleSave = (product) => {
        if (product.id !== null) {
            const updatedProducts = products.map((producto) =>
                producto.id === product.id ? product : producto
            );
            setProducts(updatedProducts);
            
        } else {
            const newId = Math.floor(Math.random() * 1000);
            const newProduct = { ...product, id: newId };
            setProducts([...products, newProduct]);
        }
        closeModal();
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        openModal();
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    // const deleteProduct = async (id) => {
    //     try {
    //         await axios.delete(`${API_URL}/${id}`)
    //         setProducts((prevProducts) => 
    //             prevProducts.filter((product)=> product.id !== id)
    //         )

    //     } catch (error) {
    //         console.error("Error deleting product:",error);
    //       }
    // }


  return {
    filteredProducts,
    currentProduct,
    modalOpen,
    editedProduct,
    setEditedProduct,
    handleSave,
    handleEdit,
    deleteProduct,
    openModal,
    setCurrentProduct,
    closeModal,
    handleInputChange
  }
}

export default useProductLocal

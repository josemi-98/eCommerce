import axios from "axios";

const API_URL = "http://localhost:3000/products";

//*Obetener productos con metodo get
export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

//*Obtener un producto con el metodo get a traves de la id 
export const getProductsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

//*Editar un producto con el metodo put 
export const updateProduct = async (id, editedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, editedProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

//*Eliminar producto con el metodo delete
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

//*Añadir un producto con el metodo post 
export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(API_URL, newProduct);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

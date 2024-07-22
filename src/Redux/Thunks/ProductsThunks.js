//* para crear los thunks se define el nombre del action que van a generar y luego el actionCreator

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductsById,
    updateProduct,
} from "../../Api/ProductsApi";
import { v4 as uuidv4 } from "uuid";


export const getAllProductsThunk = createAsyncThunk(
    "products/getProducts",
    async () => {
        return await getAllProducts();
    }
);

export const getProductByIdThunk = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        return await getProductsById(id);
    }
);

export const updateProductThunk = createAsyncThunk(
    "products/updateProduct",
    async ({id, editedProduct}) => {
        return await updateProduct(id, editedProduct);
    }
);

export const deleteProductThunk = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        await deleteProduct(id);
        return id;
    }
);


export const addProductThunk = createAsyncThunk(
    "products/addProduct",
    async (newProduct) => {
        const newId = uuidv4();
        const productWithId = { ...newProduct, id: newId };
        return await addProduct(productWithId);
    }
);

import { PRODUCTS_ADD_PRODUCT, PRODUCTS_EDIT_PRODUCT, PRODUCTS_REMOVE_PRODUCT } from "./actionTypes";

export const addProduct = (product) => ({
    type: PRODUCTS_ADD_PRODUCT,
    payload: product,
});

export const editProduct = (productId) => ({
    type: PRODUCTS_EDIT_PRODUCT,
    payload: productId,
});

export const removeProduct = (productId) => ({
    type: PRODUCTS_REMOVE_PRODUCT,
    payload: productId,
});
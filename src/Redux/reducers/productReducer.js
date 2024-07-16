import { PRODUCTS_ADD_PRODUCT, PRODUCTS_EDIT_PRODUCT, PRODUCTS_REMOVE_PRODUCT } from "../actions/actionTypes"
import data  from "../../../data.json"

const initialState = {
    products: data,
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCTS_ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case PRODUCTS_EDIT_PRODUCT:
            return{

            }
        case PRODUCTS_REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product)=> product.id !== action.payload)
            }
        default:
            return state;
    }
}

export default productReducer

export const selectAllProducts = (state) => state.products.products;
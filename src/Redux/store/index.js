// primero creamos nuestras funcion con la api, luego los thunks, los slice y por ultimo el store

import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../Slices/ProductsSlice";

const store = configureStore({
    reducer: {
        products: ProductsSlice,
    },
    devTools: true,
});


export default store;

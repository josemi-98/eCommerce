import { createSlice } from "@reduxjs/toolkit";
import { addProductThunk, deleteProductThunk, getAllProductsThunk, getProductByIdThunk, updateProductThunk } from "../Thunks/ProductsThunks";

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: {},
};

const pendingMatcher = (action) => {
    action.type.endsWith("/pending");
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        resetSelectedProduct: (state) => {
            state.selectedProduct = {};
        },
    },
    extraReducers: (builder) => {
        builder
            //casos para mostrar todos los productos  
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.loading = false; 
                state.products = action.payload;
            })
            .addCase(getAllProductsThunk.rejected, (state, action)=> {
                state.loading = false; 
                if ( action.error.response && action.error.response.status === 404){
                    state.error = "No hay ningun producto"
                } else {
                    state.error = "Error al recuperar los productos"
                }
            })
            
            //Muestra el producto por id 
            .addCase(getProductByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductByIdThunk.rejected, (state, action) => {
                state.loading = false; 
                const id = action.meta.arg;
                if (action.error.response && action.error.response.status === 404) {
                    state.error = `El producto con el ${id} no existe`
                } else {
                    state.error = `Error al obtener el producto de ${id}`
                }
            })

            //casos para EDITAR un producto 
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = {
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                }
                console.log(action);
                state.products = state.products.map((product) => 
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            })
            .addCase(updateProductThunk.rejected, (state, action) => {
                state.loading = false; 
                const id = action.meta.arg;
                if (action.error.response && action.error.response.status === 404) {
                    state.error = `Producto con ID ${id} ya no existe`;
                } else {
                    state.error = `Error al guardar las modificaciones en el producto ${id}`;
                }
            })
        
            //casos para ELIMINAR producto
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.loading = false;
                const deletedProductId = action.meta.arg;
                state.products = state.products.filter(
                    (product) => product.id !== deletedProductId
                );
            })
            .addCase(deleteProductThunk.rejected, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (
                    action.error.response &&
                    action.error.response.status === 404
                ) {
                    state.error = `El product con in ID ${id} ya no existia`;
                } else {
                    state.error = `Ha habido un error al eliminar el product con la  ID ${id}`;
                }
            })

            //casos para AÑADIR un producto 
            .addCase(addProductThunk.fulfilled, (state, action)=> {
                state.loading = false
                const addedProduct = action.payload;
                state.products = [...state.products, addedProduct]
            })
            .addCase(addProductThunk.rejected, (state)=> {
                state.loading = false;
                state.error = "Error al crear producto"
            })

            //aciones para el pending
            .addMatcher(pendingMatcher, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const { setSelectedProduct, resetSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

export default productsSlice.reducer;

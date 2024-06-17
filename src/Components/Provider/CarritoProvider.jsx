// CarritoContext.js

import { createContext, useReducer, useContext } from 'react';
import PropTypes from "prop-types"

// Definir el contexto
const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
    const initialState = {
        cartCount: 0,
        cartItems: [],
    };

    const añadirCarrtioReducer = (state, action) => {
        switch (action.type) {
            case "añadirAlCarrito": {
                const existingItemIndex = state.cartItems.findIndex(item => item.id === action.product.id);

                if (existingItemIndex !== -1) {
                    // Si el producto ya existe en el carrito, incrementar la cantidad
                    const updatedCartItems = state.cartItems.map((item, index) => {
                        if (index === existingItemIndex) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            };
                        }
                        return item;
                    });

                    return {
                        ...state,
                        cartCount: state.cartCount + 1,
                        cartItems: updatedCartItems,
                    };
                } else {
                    // Si es un nuevo producto, añadirlo al carrito con cantidad 1
                    const newCartItems = [...state.cartItems, { ...action.product, quantity: 1 }];

                    return {
                        ...state,
                        cartCount: state.cartCount + 1,
                        cartItems: newCartItems,
                    };
                }
            }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(añadirCarrtioReducer, initialState);

    return (
        <CarritoContext.Provider value={{ state, dispatch }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Función custom hook para acceder al contexto
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
    }
    return context;
};


CarritoProvider.propTypes = {
    children: PropTypes.node.isRequired
};
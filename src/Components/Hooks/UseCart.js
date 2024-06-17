import { useReducer } from 'react';

const useCart = () => {
    const initialState = {
        cartCount: 0,
        cartItems: [],
    };

    const añadirCarrtio = (state, action) => {
        switch (action.type) {
            case 'añadirAlCarrito': {
                const existingItemIndex = state.cartItems.findIndex(
                    (item) => item.id === action.product.id
                );
                if (existingItemIndex !== -1) {
                    const updatedCartItems = state.cartItems.map((item, index) => {
                        if (index === existingItemIndex) {
                            return { ...item, quantity: item.quantity + 1 };
                        }
                        return item;
                    });
                    return {
                        ...state,
                        cartCount: state.cartCount + 1,
                        cartItems: updatedCartItems,
                    };
                } else {
                    const newCartItems = [
                        ...state.cartItems,
                        { ...action.product, quantity: 1 },
                    ];
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

    const [cartState, addToCart] = useReducer(añadirCarrtio, initialState);

    return { cartState, addToCart };
};

export default useCart;

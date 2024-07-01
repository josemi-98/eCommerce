import { createContext, useState, useEffect } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState(() => {
        const savedWishList = localStorage.getItem("wishList");
        return savedWishList ? JSON.parse(savedWishList) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }, [wishList]);

    const addToWishList = (item) => {
        setWishList([...wishList, item]);
    };

    const removeFromWishList = (itemId) => {
        setWishList(wishList.filter((item) => item.id !== itemId));
    };

    return (
        <WishListContext.Provider
            value={{ addToWishList, removeFromWishList, wishList }}
        >
            {children}
        </WishListContext.Provider>
    );
};


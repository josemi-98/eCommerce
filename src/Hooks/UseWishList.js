import { useContext } from "react";
import { WishListContext } from "../Context/WishListContext";

const useWishList = () => {
    const context = useContext(WishListContext);

    return context;
};

export default useWishList;

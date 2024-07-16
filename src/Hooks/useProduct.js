import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const useProduct = () => {
    const context = useContext(ProductContext);

    return context;
};

export default useProduct;

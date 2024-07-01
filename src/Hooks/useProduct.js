import { useContext} from "react";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext";

const API_URL = "http://localhost:3000/products";


const ProductLoader = async () => {
    try {

        await new Promise ((resolve)=> setTimeout(resolve,1000));

        const response = await axios.get(API_URL);


        return response.data;
    } catch ( error) {
        console.error("Error fetching products: ", error)
        return [];
    }
}



const useProduct = () => {
    const context = useContext(ProductContext);

    return context;
}

export { ProductLoader };
export default useProduct

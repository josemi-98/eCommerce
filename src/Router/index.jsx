import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout";
import NotFound from "../views/NotFound";
import ProductSection from "../views/ProductSection/ProductSection";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import DetailProduct from "../views/DetailProductSection/DetailProduct";
import LoginForm from "../views/SectionLogin/LoginForm";
import CartSection from "../views/CartSection/CartSection";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ProductWishlist from "../views/ProductWishlist/ProductWishlist";
// import { ProductLoader } from "../Hooks/useProduct";

library.add(fas, far, fab);

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout/>,
        // errorElement: <NotFound/>,
        children:[
            {path:"/", element: <ProductSection/>},
            {path:"/deseos", element: (
                <ProtectedRoute>
                    <ProductWishlist/>
                </ProtectedRoute>
            )},
            {path:"*", element: <NotFound/>},
            // {path:"/", element: <ProductSection/>, loader: ProductLoader},
            {
                path: "product/:id",
                element: (
                    <ProtectedRoute>
                        <DetailProduct/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRoute>
                        <CartSection/>
                    </ProtectedRoute>
                )
            },
        ]
    },
    {path:"/login", element:<LoginForm/>}
])
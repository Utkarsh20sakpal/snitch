import { createBrowserRouter } from 'react-router';
import { Register } from '../features/auth/pages/register';
import { Login } from '../features/auth/pages/login';
import { CreateProduct } from '../features/pages/createProduct';
import Dashboard from '../features/pages/sellerDashboard';
import Protected from '../features/auth/components/protected';
import Home from '../features/pages/home';
import { ProductDetail } from '../features/pages/productDetail';
import SellerProductDetails from '../features/pages/sellerProductDetails'

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/product/:id",
        element: <ProductDetail />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/seller",
        children:[
            {
            path:"/seller/create-product",
            element:<Protected
             role = "seller"
            ><CreateProduct /></Protected>
        },
        {
            path:"/seller/dashboard",
            element:<Protected 
            role = "seller"
            ><Dashboard /> </Protected>
        }, 
        {
             path: "/seller/product/:productId",
             element: <Protected role="seller" >
             <SellerProductDetails />
                        </Protected>
          }

    
    ]
    }
])

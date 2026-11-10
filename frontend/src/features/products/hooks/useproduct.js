import { createProduct, getSellerProducts, getAllProducts, getProductById } from "../services/products.api.js"
import { setProducts, setSellerProducts } from "../state/product.slice.js"
import { useDispatch } from "react-redux";


export const useProduct = () => {
    const dispatch = useDispatch();

    async function handelCreateProduct(formData) {
        const response = await createProduct(formData);
        return response.products;
    }

    async function handelGetSellerProducts() {
        const response = await getSellerProducts();
        dispatch(setSellerProducts(response.products));
        return response.products;
    }

    async function handelGetAllProducts(){
        const response = await getAllProducts();
        dispatch(setProducts(response.products));
        return response.products
    }

    async function handelGetProductById(id) {
        const response = await getProductById(id);
        return response.product;
    }

    return {
        handelCreateProduct,
        handelGetSellerProducts,
        handelGetAllProducts,
        handelGetProductById
    }
}

import { createProduct, getSellerProducts } from "../services/products.api.js"
import { setSellerProducts } from "../state/product.slice.js"
import { useDispatch } from "react-redux";


export const useProduct = () => {
    const dispatch = useDispatch();

    async function handelCreateProduct(formData) {
        const response = await createProduct(formData);
        return response.product;
    }

    async function handelGetSellerProducts() {
        const response = await getSellerProducts();
        dispatch(setSellerProducts(response.products));
        return response.products;
    }

    return {
        handelCreateProduct,
        handelGetSellerProducts
    }
}

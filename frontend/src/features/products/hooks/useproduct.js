import { createProduct, getSellerProducts, getAllProducts, getProductById, addProductVariant, deleteProductVariant } from "../services/products.api.js"
import { setProducts, setSellerProducts } from "../state/product.slice.js"
import { useDispatch } from "react-redux";


export const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        const response = await createProduct(formData);
        return response.products;
    }

    async function handleGetSellerProducts() {
        const response = await getSellerProducts();
        dispatch(setSellerProducts(response.products));
        return response.products;
    }

    async function handleGetAllProducts(){
        const response = await getAllProducts();
        dispatch(setProducts(response.products));
        return response.products
    }

    async function handleGetProductById(id) {
        const response = await getProductById(id);
        return response.product;
    }

    async function handleAddProductVariant(id, formData) {
        const response = await addProductVariant(id, formData);
        return response.product;
    }

    async function handleDeleteProductVariant(id, variantId) {
        const response = await deleteProductVariant(id, variantId);
        return response.product;
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
        handleGetAllProducts,
        handleGetProductById,
        handleAddProductVariant,
        handleDeleteProductVariant,
        // Backward-compatibility aliases
        handelCreateProduct: handleCreateProduct,
        handelGetSellerProducts: handleGetSellerProducts,
        handelGetAllProducts: handleGetAllProducts,
        handelGetProductById: handleGetProductById,
    }
}

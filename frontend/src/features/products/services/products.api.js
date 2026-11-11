import axios from "axios";

const productsApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/products",
  withCredentials: true,
  
});

export async function createProduct(formData) {

    const response = await productsApiInstance.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;

}


export async function getSellerProducts() {

    const response = await  productsApiInstance.get("/seller");
    return response.data;

}

export async function getAllProducts(){

    const response = await productsApiInstance("/");
    return response.data
}

export async function getProductById(id) {
    const response = await productsApiInstance.get(`/${id}`);
    return response.data;
}

export async function addProductVariant(id, formData) {
    const response = await productsApiInstance.post(`/${id}/variants`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function deleteProductVariant(id, variantId) {
    const response = await productsApiInstance.delete(`/${id}/variants/${variantId}`);
    return response.data;
}
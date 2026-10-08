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

    const response = productsApiInstance.get("/seller");
    return response.data;

}
import api from "../Api/Api.js";

export const getProductsByCategory = async (category) => {
    return await api.get(`/products/${category}`);
};
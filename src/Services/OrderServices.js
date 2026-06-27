import api from "../Api/Api.js";

export const createOrder = async (orderData) => {
    return await api.post("/orders/create", orderData);
};

export const getOrderById = async (id) => {
    return await api.get(`/orders/${id}`);
};

export const getAllOrders = async (activeId = "") => {
    return await api.get(`/orders/list${activeId ? `?activeId=${activeId}` : ""}`);
};



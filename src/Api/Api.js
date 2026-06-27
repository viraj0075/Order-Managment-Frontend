import axiosInstance from "./Axios.js";

const request = async (method, url, data = null, config = {}) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            ...config,
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Something went wrong.",
            status: error.response?.status,
        };
    }
};

const api = {
    get: (url, config) => request("get", url, null, config),

    post: (url, data, config) =>
        request("post", url, data, config),

    put: (url, data, config) =>
        request("put", url, data, config),

    patch: (url, data, config) =>
        request("patch", url, data, config),

    delete: (url, config) =>
        request("delete", url, null, config),
};

export default api;
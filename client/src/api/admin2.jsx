import axios from "axios";

export const listOrdersAdmin = async (token) => {
    return await axios.get("http://localhost:5000/api/admin/orders", {
        headers: {
            Authorization: `Berare ${token}`,
        },
    });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
    // code body
    return axios.put(
        "http://localhost:5000/api/admin/order-status",
        {
            orderId,
            orderStatus,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getListAllUsers = async (token) => {
    return await axios.get("http://localhost:5000/api/users", {
        headers: {
            Authorization: `Berare ${token}`,
        },
    });
};

export const changeUserStatus = async (token, value) => {
    return await axios.post("http://localhost:5000/api/change-status", value, {
        headers: {
            Authorization: `Berare ${token}`,
        },
    });
};

export const changeUserRole = async (token, value) => {
    return await axios.post("http://localhost:5000/api/change-role", value, {
        headers: {
            Authorization: `Berare ${token}`,
        },
    });
};

import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getAllAdmins = async () => {
    return await axios.get(URL.ADMIN_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getAdminById = async (id) => {
    return await axios.get(URL.ADMIN_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createAdmin = async (data) => {
    return await axios.post(URL.ADMIN_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateAdmin = async (id, data) => {
    return await axios.put(URL.ADMIN_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteAdmin = async (id) => {
    return await axios.delete(URL.ADMIN_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const login = async (data) => {
    return await axios.post(URL.ADMIN_LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login,
}
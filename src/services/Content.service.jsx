import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getContents = async () => {
    return await axios.get(URL.CONTENT_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getContentById = async (id) => {
    return await axios.get(URL.CONTENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createContent = async (data) => {
    return await axios.post(URL.CONTENT_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateContent = async (id, data) => {
    return await axios.put(URL.CONTENT_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteContent = async (id) => {
    return await axios.delete(URL.CONTENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getContentByCourseId = async (id) => {
    return await axios.get(URL.GET_CONTENT_BY_COURSE_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export default {
    getContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    getContentByCourseId,
}
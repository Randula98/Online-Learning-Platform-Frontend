import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getAnnouncements = async () => {
    return await axios.get(URL.ANNOUNCEMENT_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getAnnouncementById = async (id) => {
    return await axios.get(URL.ANNOUNCEMENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createAnnouncement = async (data) => {
    return await axios.post(URL.ANNOUNCEMENT_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateAnnouncement = async (id, data) => {
    return await axios.put(URL.ANNOUNCEMENT_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteAnnouncement = async (id) => {
    return await axios.delete(URL.ANNOUNCEMENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export default {
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
}
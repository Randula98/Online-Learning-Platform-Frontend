import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getNotices = async () => {
    return await axios.get(URL.NOTICE_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getNoticeById = async (id) => {
    return await axios.get(URL.NOTICE_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createNotice = async (data) => {
    return await axios.post(URL.NOTICE_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateNotice = async (id, data) => {
    return await axios.put(URL.NOTICE_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteNotice = async (id) => {
    return await axios.delete(URL.NOTICE_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getNoticeByCourseId = async (id) => {
    return await axios.get(URL.GET_NOTICE_BY_COURSE_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export {
    getNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
    getNoticeByCourseId,
}
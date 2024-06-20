import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getCourses = async () => {
    return await axios.get(URL.COURSE_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getCourseById = async (id) => {
    return await axios.get(URL.COURSE_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createCourse = async (data) => {
    return await axios.post(URL.COURSE_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateCourse = async (id, data) => {
    return await axios.put(URL.COURSE_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteCourse = async (id) => {
    return await axios.delete(URL.COURSE_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export default {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
}

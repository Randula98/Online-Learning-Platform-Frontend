import axios from "axios";
import * as URL from "./endpoints/url";

const token = localStorage.getItem("token");

const getStudents = async () => {
    return await axios.get(URL.STUDENT_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const getStudentById = async (id) => {
    return await axios.get(URL.STUDENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const createStudent = async (data) => {
    return await axios.post(URL.STUDENT_URL, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateStudent = async (id, data) => {
    return await axios.put(URL.STUDENT_URL_ID(id), data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const deleteStudent = async (id) => {
    return await axios.delete(URL.STUDENT_URL_ID(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const login = async (data) => {
    return await axios.post(URL.STUDENT_LOGIN, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    login,
}

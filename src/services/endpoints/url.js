const BASE_URL = 'http://localhost:8080';

export const ADMIN_URL = `${BASE_URL}/admins`;
export const ADMIN_URL_ID = (id) =>{
    return `${BASE_URL}/admins/${id}`;
}
export const ADMIN_LOGIN = `${BASE_URL}/admins/login`;

export const ANNOUNCEMENT_URL = `${BASE_URL}/announcements`;
export const ANNOUNCEMENT_URL_ID = (id) =>{
    return `${BASE_URL}/announcements/${id}`;
}

export const COURSE_URL = `${BASE_URL}/courses`;
export const COURSE_URL_ID = (id) =>{
    return `${BASE_URL}/courses/${id}`;
}

export const CONTENT_URL = `${BASE_URL}/contents`;
export const CONTENT_URL_ID = (id) =>{
    return `${BASE_URL}/contents/${id}`;
}
export const GET_CONTENT_BY_COURSE_ID = (id) =>{
    return `${BASE_URL}/contents/course/${id}`;
}

export const NOTICE_URL = `${BASE_URL}/notices`;
export const NOTICE_URL_ID = (id) =>{
    return `${BASE_URL}/notices/${id}`;
}
export const GET_NOTICE_BY_COURSE_ID = (id) =>{
    return `${BASE_URL}/notices/course/${id}`;
}

export const STUDENT_URL = `${BASE_URL}/students`;
export const STUDENT_URL_ID = (id) =>{
    return `${BASE_URL}/students/${id}`;
}
export const STUDENT_LOGIN = `${BASE_URL}/students/login`;
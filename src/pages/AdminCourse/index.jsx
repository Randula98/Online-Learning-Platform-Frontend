import React, { useState, useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap'

import AdminNoticeList from './AdminNoticeList'
import AdminContentList from './AdminContentList'

import CourseService from '../../services/Course.service'

import { useParams } from 'react-router-dom'

export default function AdminCourse() {

    const { id } = useParams()

    const [course, setCourse] = useState({})

    useEffect(() => {
        getCourseData();
    }, [id]);

    async function getCourseData() {
        try {
            const response = await CourseService.getCourseById(id)
            setCourse(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container className='mt-2'>
                <Alert variant="info">
                    <h2>{course.courseName} - {course.moduleCode} ({course.displayName})</h2>
                </Alert>
                {/* Notice Component */}
                <AdminNoticeList notices={course.notices} courseId={id} />
                {/* Content Component */}
                <AdminContentList contents={course.content} courseId={id} />
            </Container>
        </>
    )
}

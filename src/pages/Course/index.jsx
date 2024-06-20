import React, { useState, useEffect } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'

import NoticeList from './NoticeList'
import ContentList from './ContentList'
import Swal from 'sweetalert2';

import CourseService from '../../services/Course.service'
import StudentService from '../../services/Student.service'

import { jwtDecode } from 'jwt-decode';

import { useParams, useNavigate } from 'react-router-dom'

export default function Course() {

    const userId = jwtDecode(localStorage.getItem('token')).id;

    const { id } = useParams()

    const navigate = useNavigate();

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

    async function unenrollCourse() {
        const data = {
            studentId: userId,
            courseId: course._id
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'You can re-enroll this course later',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unenroll it!'
        }).then((result) => {
            if (result.isConfirmed) {
                StudentService.unenroll(data)
                    .then(response => {
                        navigate('/courses')
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'An error occured while unenrolling this course',
                            'error'
                        )
                    });
            }
        })
    }

    return (
        <>
            <Container className='mt-2'>
                <Alert variant="info">
                    <h2>{course.courseName} - {course.moduleCode} ({course.displayName})</h2>
                </Alert>

                {/* Notice Component */}
                <NoticeList notices={course.notices} />

                {/* Content Component */}
                <ContentList contents={course.content} />

                <Button variant="danger" onClick={() => {
                    unenrollCourse();

                }}>Unenroll this Module</Button>{' '}

            </Container>
        </>
    )
}

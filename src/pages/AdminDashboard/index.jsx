import React, { useState } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";

import CourseList from "../../ToRemove/course.json";
import StudentList from "../../ToRemove/student.json";
import AnnouncementList from "../../ToRemove/announcement.json";

export default function AdminDashboard() {
    const [studentFilter, setStudentFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [announcementFilter, setAnnouncementFilter] = useState("");

    // Filtered lists based on user input
    const filteredStudents = StudentList.filter(student =>
        student.fname.toLowerCase().includes(studentFilter.toLowerCase()) ||
        student.lname.toLowerCase().includes(studentFilter.toLowerCase()) ||
        student.email.toLowerCase().includes(studentFilter.toLowerCase())
    );

    const filteredCourses = CourseList.filter(course =>
        course.courseName.toLowerCase().includes(courseFilter.toLowerCase()) ||
        course.moduleCode.toLowerCase().includes(courseFilter.toLowerCase())
    );

    const filteredAnnouncements = AnnouncementList.filter(announcement =>
        announcement.topic.toLowerCase().includes(announcementFilter.toLowerCase())
    );

    return (
        <Container fluid>
            <Alert variant="light">
                <h3>Admin Dashboard</h3>
            </Alert>
            <Row>
                <Col sm={12} md={4}>
                    <Alert variant="secondary">
                        <h3>Student Management</h3>
                    </Alert>

                    <div className="studentList">
                        <Row>
                            <Col xs={12}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search Student..."
                                            value={studentFilter}
                                            onChange={(e) => setStudentFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={12}>
                                <Container fluid style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    {
                                        filteredStudents.map((student, index) => (
                                            <Alert key={index} variant="light">
                                                <Row>
                                                    <Col xs={8}>
                                                        <h5>{student.fname} {student.lname}</h5>
                                                        <p>{student.email}</p>
                                                    </Col>
                                                    <Col xs={4} className="d-flex align-items-end justify-content-end">
                                                        <Button variant='primary'>View</Button>
                                                    </Col>
                                                </Row>
                                            </Alert>
                                        ))
                                    }
                                </Container>
                                <Button variant="success" className="mt-2">Add</Button>
                            </Col>
                        </Row>
                    </div>

                </Col>

                <Col sm={12} md={4}>
                    <Alert variant="secondary">
                        <h3>Course Management</h3>
                    </Alert>

                    <div className="courseList">
                        <Row>
                            <Col xs={12}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search Course..."
                                            value={courseFilter}
                                            onChange={(e) => setCourseFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={12}>
                                <Container fluid style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    {
                                        filteredCourses.map((course, index) => (
                                            <Alert key={index} variant="light">
                                                <Row>
                                                    <Col xs={8}>
                                                        <h5>{course.courseName}</h5>
                                                        <p>{course.moduleCode}</p>
                                                    </Col>
                                                    <Col xs={4} className="d-flex align-items-end justify-content-end">
                                                        <Button variant='primary'>View</Button>
                                                    </Col>
                                                </Row>
                                            </Alert>
                                        ))
                                    }
                                </Container>
                                <Button variant="success" className="mt-2">Add</Button>
                            </Col>
                        </Row>
                    </div>

                </Col>

                <Col sm={12} md={4}>
                    <Alert variant="secondary">
                        <h3>Announcement Management</h3>
                    </Alert>

                    <div className="announcementList">
                        <Row>
                            <Col xs={12}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search Announcement..."
                                            value={announcementFilter}
                                            onChange={(e) => setAnnouncementFilter(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={12}>
                                <Container fluid style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    {
                                        filteredAnnouncements.map((announcement, index) => (
                                            <Alert key={index} variant="light">
                                                <h5>{announcement.topic}</h5>
                                                <Button variant='primary'>Edit</Button> &nbsp; &nbsp;
                                                <Button variant='danger'>Delete</Button>
                                            </Alert>
                                        ))
                                    }
                                </Container>
                                <Button variant="success" className="mt-2">Add</Button>
                            </Col>
                        </Row>
                    </div>

                </Col>

            </Row>
        </Container>
    )
}

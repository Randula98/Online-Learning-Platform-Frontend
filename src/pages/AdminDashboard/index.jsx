import React from 'react';
import {
    Alert,
    Container,
    Row,
    Col,

} from "react-bootstrap";

import AnnouncementManagement from './AnnouncementManagement';
import CourseManagement from './CourseManagement';
import StudentManagement from './StudentManagement';

export default function AdminDashboard() {
    return (
        <Container fluid>
            <Alert variant="light">
                <h3>Admin Dashboard</h3>
            </Alert>
            <Row>
                <Col sm={12} md={4}>
                    <StudentManagement />
                </Col>

                <Col sm={12} md={4}>
                    <CourseManagement />
                </Col>

                <Col sm={12} md={4}>
                    <AnnouncementManagement />
                </Col>
            </Row>
        </Container>
    )
}

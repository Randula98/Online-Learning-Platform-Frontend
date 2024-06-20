import React, { useState, useEffect } from 'react'
import {
    Alert,
    Container,
    Row,
    Col,
    ButtonGroup,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    Button,
    Pagination
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import CourseService from '../../services/Course.service';

export default function Courses() {

    const [CourseList, setCourseList] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
        setUser(localStorage.getItem('user'));
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        CourseService.getCourses()
            .then(response => {
                setCourseList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const coursesPerPage = 6;

    const filteredCourses = CourseList.filter(course => {
        const matchesSearchQuery = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.moduleCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear ? course.academicYear === selectedYear : true;
        const matchesSemester = selectedSemester ? course.academicSemester === selectedSemester : true;
        const matchesSpecialization = selectedSpecialization ? course.specialization === selectedSpecialization : true;

        return matchesSearchQuery && matchesYear && matchesSemester && matchesSpecialization;
    });

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <Alert variant="light">
                <h3>Courses</h3>
            </Alert>

            <Row className="mb-3">
                <Col xs={12} md={6} lg={3} className="mb-2 mb-md-0">
                    <DropdownButton
                        as={ButtonGroup}
                        title={selectedYear ? `Year ${selectedYear}` : "Year"}
                        variant="secondary"
                        className="w-100"
                        onSelect={(eventKey) => setSelectedYear(eventKey ? parseInt(eventKey) : null)}
                    >
                        <Dropdown.Item eventKey={1}>Year 1</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Year 2</Dropdown.Item>
                        <Dropdown.Item eventKey={3}>Year 3</Dropdown.Item>
                        <Dropdown.Item eventKey={4}>Year 4</Dropdown.Item>
                        <Dropdown.Item eventKey={null}>All Years</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 mb-md-0">
                    <DropdownButton
                        as={ButtonGroup}
                        title={selectedSemester ? `Semester ${selectedSemester}` : "Semester"}
                        variant="secondary"
                        className="w-100"
                        onSelect={(eventKey) => setSelectedSemester(eventKey ? parseInt(eventKey) : null)}
                    >
                        <Dropdown.Item eventKey={1}>1st Semester</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>2nd Semester</Dropdown.Item>
                        <Dropdown.Item eventKey={null}>All Semesters</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 mb-md-0">
                    <DropdownButton
                        as={ButtonGroup}
                        title={selectedSpecialization ? selectedSpecialization : "Specialization"}
                        variant="secondary"
                        className="w-100"
                        onSelect={(eventKey) => setSelectedSpecialization(eventKey)}
                    >
                        <Dropdown.Item eventKey="Software Engineering">Software Engineering</Dropdown.Item>
                        <Dropdown.Item eventKey="Information Technology">Information Technology</Dropdown.Item>
                        <Dropdown.Item eventKey="Data Science">Data Science</Dropdown.Item>
                        <Dropdown.Item eventKey="Information System Engineering">Information System Engineering</Dropdown.Item>
                        <Dropdown.Item eventKey="Cyber Security">Cyber Security</Dropdown.Item>
                        <Dropdown.Item eventKey="Interactive Media">Interactive Media</Dropdown.Item>
                        <Dropdown.Item eventKey={null}>All Specializations</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col xs={12} md={6} lg={3}>
                    <Form inline className="w-100">
                        <FormControl
                            type="text"
                            placeholder="Search Courses..."
                            className="w-100"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>

            <Container>
                <Row>
                    {
                        currentCourses.map((course, index) => (
                            <Col key={index} xs={12} md={6} lg={4} className="mb-3">
                                <Alert variant="light">
                                    <h5>{course.courseName} - {course.moduleCode}</h5>
                                    <p>{course.specialization}</p>
                                    <p>Year {course.academicYear} - Semester {course.academicSemester}</p>
                                    <Button variant="primary" onClick={() => {
                                        if (isLoggedIn) {
                                            navigate(`/courses/${course._id}`);
                                        }
                                        else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'You need to login to view course details!',
                                                showCloseButton: false,
                                                showConfirmButton: false,
                                                timer: 2000
                                            });
                                        }

                                    }}>View Course</Button>
                                </Alert>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </Container>
        </Container>
    );
}

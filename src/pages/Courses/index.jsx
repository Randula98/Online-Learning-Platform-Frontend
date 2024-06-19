import React, { useState } from 'react';
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

import CourseList from "../../ToRemove/course.json";

export default function Courses() {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const coursesPerPage = 6;

    // Filter courses based on search query, year, semester, and specialization
    const filteredCourses = CourseList.filter(course => {
        const matchesSearchQuery = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.moduleCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear ? course.academicYear === selectedYear : true;
        const matchesSemester = selectedSemester ? course.academicSemester === selectedSemester : true;
        const matchesSpecialization = selectedSpecialization ? course.specialization === selectedSpecialization : true;

        return matchesSearchQuery && matchesYear && matchesSemester && matchesSpecialization;
    });

    // Calculate the indices of the courses to be displayed on the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Handler for changing page
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
                                        navigate(`/course/${course.moduleCode}`);

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

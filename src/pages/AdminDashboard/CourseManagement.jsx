import React, { useState, useEffect } from 'react'
import {
    Alert,
    Container,
    Row,
    Col,
    Form as FormBST,
    Button,
    Modal,
} from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CourseService from '../../services/Course.service';

export default function CourseManagement() {

    const [CourseList, setCourseList] = useState([]);

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

    const [courseFilter, setCourseFilter] = useState("");
    const [currentCourse, setCurrentCourse] = useState(null);

    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);

    const filteredCourses = CourseList.filter(course =>
        course.courseName.toLowerCase().includes(courseFilter.toLowerCase()) ||
        course.moduleCode.toLowerCase().includes(courseFilter.toLowerCase())
    );

    const handleCloseAddCourse = () => setShowAddCourse(false);
    const handleShowAddCourse = () => setShowAddCourse(true);

    const handleCloseEditCourse = () => setShowEditCourse(false);
    const handleShowEditCourse = () => setShowEditCourse(true);

    function handleEditCourse(course) {
        setCurrentCourse(course);
        handleShowEditCourse();
    }

    const courseSchema = Yup.object().shape({
        courseName: Yup.string().required('Course Name is required'),
        displayName: Yup.string().required('Display Name is required'),
        moduleCode: Yup.string().required('Module Code is required'),
        academicYear: Yup.string().required('Academic Year is required'),
        academicSemester: Yup.string().required('Academic Semester is required'),
        specialization: Yup.string().required('Specialization is required'),
        courseYear: Yup.string().required('Course Year is required'),
        courseMonth: Yup.string().required('Course Month is required'),
    });

    async function addCourse(values) {
        try {
            await CourseService.createCourse(values);
            Swal.fire({
                icon: 'success',
                title: 'Course Added Successfully',
                showCloseButton: false,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                CourseService.getCourses()
                    .then(response => {
                        setCourseList(response.data);
                        handleCloseAddCourse();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    async function editCourse(values) {
        try {
            await CourseService.updateCourse(currentCourse._id, values);
            Swal.fire({
                icon: 'success',
                title: 'Course Updated Successfully',
                showCloseButton: false,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                CourseService.getCourses()
                    .then(response => {
                        setCourseList(response.data);
                        handleCloseEditCourse();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    async function deleteCourse(courseId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this course?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await CourseService.deleteCourse(courseId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Course Deleted Successfully',
                        showCloseButton: false,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        CourseService.getCourses()
                            .then(response => {
                                setCourseList(response.data);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }

    return (
        <>
            <Alert variant="secondary">
                <h3>Course Management</h3>
            </Alert>

            <div className="courseList">
                <Row>
                    <Col xs={12}>
                        <FormBST>
                            <FormBST.Group className="mb-3">
                                <FormBST.Control
                                    type="text"
                                    placeholder="Search Course..."
                                    value={courseFilter}
                                    onChange={(e) => setCourseFilter(e.target.value)}
                                />
                            </FormBST.Group>
                        </FormBST>
                    </Col>
                    <Col xs={12}>
                        <Container fluid style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                            {
                                filteredCourses.map((course, index) => (
                                    <Alert key={index} variant="light">
                                        <Row>
                                            <Col xs={10}>
                                                <h5>{course.courseName}</h5>
                                                <p>{course.moduleCode}</p>
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-end justify-content-end">
                                                <Button variant='info' onClick={() => {
                                                    navigate(`/admin/course/${course._id}`)
                                                }}>View</Button>&nbsp; &nbsp;
                                                <Button variant='success' onClick={() => handleEditCourse(course)}>Edit</Button> &nbsp; &nbsp;
                                                <Button variant='danger' onClick={() => {
                                                    deleteCourse(course._id);
                                                }}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                ))
                            }
                        </Container>
                        <Button variant="primary" className="mt-2 mb-2" onClick={handleShowAddCourse}>Add</Button>
                    </Col>
                </Row>
            </div>

            {/* Add Course Modal */}
            <Modal
                show={showAddCourse}
                onHide={handleCloseAddCourse}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            courseName: '',
                            displayName: '',
                            moduleCode: '',
                            academicYear: '',
                            academicSemester: '',
                            specialization: '',
                            courseYear: '',
                            courseMonth: '',
                        }}
                        validationSchema={courseSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            addCourse(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="courseName" className="form-label">Course Name</label>
                                    <Field type="text" className={`form-control ${errors.courseName && touched.courseName ? 'is-invalid' : ''}`} id="courseName" name="courseName" />
                                    {errors.courseName && touched.courseName ? (
                                        <div className="invalid-feedback">{errors.courseName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="displayName" className="form-label">Display Name</label>
                                    <Field type="text" className={`form-control ${errors.displayName && touched.displayName ? 'is-invalid' : ''}`} id="displayName" name="displayName" />
                                    {errors.displayName && touched.displayName ? (
                                        <div className="invalid-feedback">{errors.displayName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="moduleCode" className="form-label">Module Code</label>
                                    <Field type="text" className={`form-control ${errors.moduleCode && touched.moduleCode ? 'is-invalid' : ''}`} id="moduleCode" name="moduleCode" />
                                    {errors.moduleCode && touched.moduleCode ? (
                                        <div className="invalid-feedback">{errors.moduleCode}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicYear" className="form-label">Academic Year</label>
                                    <Field as="select" className={`form-control ${errors.academicYear && touched.academicYear ? 'is-invalid' : ''}`} id="academicYear" name="academicYear">
                                        <option value="">Select Year...</option>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                    </Field>
                                    {errors.academicYear && touched.academicYear ? (
                                        <div className="invalid-feedback">{errors.academicYear}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicSemester" className="form-label">Academic Semester</label>
                                    <Field as="select" className={`form-control ${errors.academicSemester && touched.academicSemester ? 'is-invalid' : ''}`} id="academicSemester" name="academicSemester">
                                        <option value="">Select Semester...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </Field>
                                    {errors.academicSemester && touched.academicSemester ? (
                                        <div className="invalid-feedback">{errors.academicSemester}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="specialization" className="form-label">Specialization</label>
                                    <Field as="select" className={`form-control ${errors.specialization && touched.specialization ? 'is-invalid' : ''}`} id="specialization" name="specialization">
                                        <option value="">Select Specialization...</option>
                                        <option value="Software Engineering">Software Engineering</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Information System Engineering">Information System Engineering</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                        <option value="Interactive Media">Interactive Media</option>
                                    </Field>
                                    {errors.specialization && touched.specialization ? (
                                        <div className="invalid-feedback">{errors.specialization}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseYear" className="form-label">Course Year</label>
                                    <Field type="text" className={`form-control ${errors.courseYear && touched.courseYear ? 'is-invalid' : ''}`} id="courseYear" name="courseYear" />
                                    {errors.courseYear && touched.courseYear ? (
                                        <div className="invalid-feedback">{errors.courseYear}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseMonth" className="form-label">Course Month</label>
                                    <Field type="text" className={`form-control ${errors.courseMonth && touched.courseMonth ? 'is-invalid' : ''}`} id="courseMonth" name="courseMonth" />
                                    {errors.courseMonth && touched.courseMonth ? (
                                        <div className="invalid-feedback">{errors.courseMonth}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Edit Course Modal */}
            <Modal
                show={showEditCourse}
                onHide={handleCloseEditCourse}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={currentCourse || {
                            courseName: '',
                            displayName: '',
                            moduleCode: '',
                            academicYear: '',
                            academicSemester: '',
                            specialization: '',
                            courseYear: '',
                            courseMonth: '',
                        }}
                        enableReinitialize={true}
                        validationSchema={courseSchema}
                        onSubmit={(values) => {
                            editCourse(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="courseName" className="form-label">Course Name</label>
                                    <Field type="text" className={`form-control ${errors.courseName && touched.courseName ? 'is-invalid' : ''}`} id="courseName" name="courseName" />
                                    {errors.courseName && touched.courseName ? (
                                        <div className="invalid-feedback">{errors.courseName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="displayName" className="form-label">Display Name</label>
                                    <Field type="text" className={`form-control ${errors.displayName && touched.displayName ? 'is-invalid' : ''}`} id="displayName" name="displayName" />
                                    {errors.displayName && touched.displayName ? (
                                        <div className="invalid-feedback">{errors.displayName}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="moduleCode" className="form-label">Module Code</label>
                                    <Field type="text" className={`form-control ${errors.moduleCode && touched.moduleCode ? 'is-invalid' : ''}`} id="moduleCode" name="moduleCode" />
                                    {errors.moduleCode && touched.moduleCode ? (
                                        <div className="invalid-feedback">{errors.moduleCode}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicYear" className="form-label">Academic Year</label>
                                    <Field as="select" className={`form-control ${errors.academicYear && touched.academicYear ? 'is-invalid' : ''}`} id="academicYear" name="academicYear">
                                        <option value="">Select Year...</option>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                    </Field>
                                    {errors.academicYear && touched.academicYear ? (
                                        <div className="invalid-feedback">{errors.academicYear}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicSemester" className="form-label">Academic Semester</label>
                                    <Field as="select" className={`form-control ${errors.academicSemester && touched.academicSemester ? 'is-invalid' : ''}`} id="academicSemester" name="academicSemester">
                                        <option value="">Select Semester...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </Field>
                                    {errors.academicSemester && touched.academicSemester ? (
                                        <div className="invalid-feedback">{errors.academicSemester}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="specialization" className="form-label">Specialization</label>
                                    <Field as="select" className={`form-control ${errors.specialization && touched.specialization ? 'is-invalid' : ''}`} id="specialization" name="specialization">
                                        <option value="">Select Specialization...</option>
                                        <option value="Software Engineering">Software Engineering</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Information System Engineering">Information System Engineering</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                        <option value="Interactive Media">Interactive Media</option>
                                    </Field>
                                    {errors.specialization && touched.specialization ? (
                                        <div className="invalid-feedback">{errors.specialization}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseYear" className="form-label">Course Year</label>
                                    <Field type="text" className={`form-control ${errors.courseYear && touched.courseYear ? 'is-invalid' : ''}`} id="courseYear" name="courseYear" />
                                    {errors.courseYear && touched.courseYear ? (
                                        <div className="invalid-feedback">{errors.courseYear}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseMonth" className="form-label">Course Month</label>
                                    <Field type="text" className={`form-control ${errors.courseMonth && touched.courseMonth ? 'is-invalid' : ''}`} id="courseMonth" name="courseMonth" />
                                    {errors.courseMonth && touched.courseMonth ? (
                                        <div className="invalid-feedback">{errors.courseMonth}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">
                                    Edit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

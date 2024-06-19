import React, { useState } from 'react';
import {
    Alert,
    Container,
    Row,
    Col,
    Form as FormBST,
    Button,
    Modal
} from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import StudentList from "../../ToRemove/student.json";

export default function StudentManagement() {

    const [studentFilter, setStudentFilter] = useState("");

    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showEditStudent, setShowEditStudent] = useState(false);
    const [showViewStudent, setShowViewStudent] = useState(false);

    const handleCloseAddStudent = () => setShowAddStudent(false);
    const handleShowAddStudent = () => setShowAddStudent(true);

    const handleCloseEditStudent = () => setShowEditStudent(false);
    const handleShowEditStudent = () => setShowEditStudent(true);

    const handleCloseViewStudent = () => setShowViewStudent(false);
    const handleShowViewStudent = () => setShowViewStudent(true);

    function handleEditStudent(student) {
        //set
        handleShowEditStudent();
    }

    function handleViewStudent(student) {
        //set
        handleShowViewStudent();
    }

    // Filtered lists based on user input
    const filteredStudents = StudentList.filter(student =>
        student.fname.toLowerCase().includes(studentFilter.toLowerCase()) ||
        student.lname.toLowerCase().includes(studentFilter.toLowerCase()) ||
        student.email.toLowerCase().includes(studentFilter.toLowerCase())
    );

    const studentSchema = Yup.object().shape({
        fname: Yup.string().required('First name is required'),
        lname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        contactNo: Yup.string().required('Contact number is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password cannot be more than 20 characters'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password cannot be more than 20 characters')
    });

    return (
        <>
            <Alert variant="secondary">
                <h3>Student Management</h3>
            </Alert>

            <div className="studentList">
                <Row>
                    <Col xs={12}>
                        <FormBST>
                            <FormBST.Group className="mb-3">
                                <FormBST.Control
                                    type="text"
                                    placeholder="Search Student..."
                                    value={studentFilter}
                                    onChange={(e) => setStudentFilter(e.target.value)}
                                />
                            </FormBST.Group>
                        </FormBST>
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
                                                <Button variant='info' onClick={() => {
                                                    handleViewStudent(student);
                                                }}>View</Button>&nbsp; &nbsp;
                                                <Button variant='success' onClick={() => {
                                                    handleEditStudent(student);
                                                }}>Edit</Button> &nbsp; &nbsp;
                                                <Button variant='danger'>Delete</Button>

                                            </Col>
                                        </Row>
                                    </Alert>
                                ))
                            }
                        </Container>
                        <Button variant="primary" className="mt-2 mb-2" onClick={handleShowAddStudent}>Add</Button>
                    </Col>
                </Row>
            </div>

            {/* Add Student Modal */}
            <Modal
                show={showAddStudent}
                onHide={handleCloseAddStudent}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            contactNo: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={studentSchema}
                        onSubmit={(values) => {
                            // register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <Field type="text" className={`form-control ${errors.fname && touched.fname ? 'is-invalid' : ''}`} id="fname" name="fname" />
                                    {errors.fname && touched.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <Field type="text" className={`form-control ${errors.lname && touched.lname ? 'is-invalid' : ''}`} id="lname" name="lname" />
                                    {errors.lname && touched.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
                                    {errors.email && touched.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                    <Field type="text" className={`form-control ${errors.contactNo && touched.contactNo ? 'is-invalid' : ''}`} id="contactNo" name="contactNo" onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }} />
                                    {errors.contactNo && touched.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} id="password" name="password" />
                                    {errors.password && touched.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <Field type="password" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">Add</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Edit Student Modal */}
            <Modal
                show={showEditStudent}
                onHide={handleCloseEditStudent}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            contactNo: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={studentSchema}
                        onSubmit={(values) => {
                            // register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <Field type="text" className={`form-control ${errors.fname && touched.fname ? 'is-invalid' : ''}`} id="fname" name="fname" />
                                    {errors.fname && touched.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <Field type="text" className={`form-control ${errors.lname && touched.lname ? 'is-invalid' : ''}`} id="lname" name="lname" />
                                    {errors.lname && touched.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
                                    {errors.email && touched.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                    <Field type="text" className={`form-control ${errors.contactNo && touched.contactNo ? 'is-invalid' : ''}`} id="contactNo" name="contactNo" onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }} />
                                    {errors.contactNo && touched.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>

                                <Button variant="primary" type="submit">Edit</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* View Student Modal */}
            <Modal
                show={showViewStudent}
                onHide={handleCloseViewStudent}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            contactNo: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={studentSchema}
                        onSubmit={(values) => {
                            // register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <Field type="text" className={`form-control ${errors.fname && touched.fname ? 'is-invalid' : ''}`} id="fname" name="fname" />
                                    {errors.fname && touched.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <Field type="text" className={`form-control ${errors.lname && touched.lname ? 'is-invalid' : ''}`} id="lname" name="lname" />
                                    {errors.lname && touched.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
                                    {errors.email && touched.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                    <Field type="text" className={`form-control ${errors.contactNo && touched.contactNo ? 'is-invalid' : ''}`} id="contactNo" name="contactNo" onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }} />
                                    {errors.contactNo && touched.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

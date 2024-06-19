import React, { useState } from 'react';
import { Alert, Button, Row, Col, Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function AdminContentList({ contents }) {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseViewModal = () => setShowViewModal(false);
    const handleShowViewModal = () => setShowViewModal(true);

    function handleEditModal(content) {
        //set
        handleShowEditModal();
    }

    function handleViewModel(content) {
        //set
        handleShowViewModal();
    }

    const contentSchema = Yup.object().shape({
        week: Yup.string().required('Week is required'),
        topic: Yup.string().required('Topic is required'),
        fileUrl: Yup.string().required('File URL is required'),
        recordingUrl: Yup.string().required('Recording URL is required'),
    });

    return (

        <>
            <Row>
                <Col md={10}>
                    <h3>Module Content</h3>
                </Col>
                <Col md={2}>
                    <Button variant="primary" onClick={handleShowAddModal}>Add New Content</Button>&nbsp;&nbsp;
                </Col>
            </Row>
            <ul className="mt-2">
                {contents.map((content, index) => (
                    <Alert variant="light" key={index}>
                        <Alert.Heading>{content.week} - {content.topic}</Alert.Heading>
                        <hr />
                        <p className="mb-0">
                            <Button variant="primary" onClick={() => (
                                handleViewModel(content)
                            )}>View</Button>&nbsp;&nbsp;
                            <Button variant="success" onClick={() => {
                                handleEditModal(content)
                            }}>Edit</Button>&nbsp;&nbsp;
                            <Button variant="danger">Delete</Button>
                        </p>
                    </Alert>
                ))}
            </ul>

            {/* Add Content Modal */}
            <Modal
                show={showAddModal}
                onHide={handleCloseAddModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            week: '',
                            topic: '',
                            fileUrl: '',
                            recordingUrl: ''
                        }}
                        validationSchema={contentSchema}
                        onSubmit={(values) => {
                            // addContent(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="week" className="form-label">Week</label>
                                    <Field type="text" className={`form-control ${errors.week && touched.week ? 'is-invalid' : ''}`} id="week" name="week" />
                                    {errors.week && touched.week ? (
                                        <div className="invalid-feedback">{errors.week}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <Field type="text" className={`form-control ${errors.topic && touched.topic ? 'is-invalid' : ''}`} id="topic" name="topic" />
                                    {errors.topic && touched.topic ? (
                                        <div className="invalid-feedback">{errors.topic}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fileUrl" className="form-label">File URL</label>
                                    <Field type="text" className={`form-control ${errors.fileUrl && touched.fileUrl ? 'is-invalid' : ''}`} id="fileUrl" name="fileUrl" />
                                    {errors.fileUrl && touched.fileUrl ? (
                                        <div className="invalid-feedback">{errors.fileUrl}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recordingUrl" className="form-label">Recording URL</label>
                                    <Field type="text" className={`form-control ${errors.recordingUrl && touched.recordingUrl ? 'is-invalid' : ''}`} id="recordingUrl" name="recordingUrl" />
                                    {errors.recordingUrl && touched.recordingUrl ? (
                                        <div className="invalid-feedback">{errors.recordingUrl}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">Add Content</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Edit Content Modal */}
            <Modal
                show={showEditModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            week: '',
                            topic: '',
                            fileUrl: '',
                            recordingUrl: ''
                        }}
                        validationSchema={contentSchema}
                        onSubmit={(values) => {
                            // editContent(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="week" className="form-label">Week</label>
                                    <Field type="text" className={`form-control ${errors.week && touched.week ? 'is-invalid' : ''}`} id="week" name="week" />
                                    {errors.week && touched.week ? (
                                        <div className="invalid-feedback">{errors.week}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <Field type="text" className={`form-control ${errors.topic && touched.topic ? 'is-invalid' : ''}`} id="topic" name="topic" />
                                    {errors.topic && touched.topic ? (
                                        <div className="invalid-feedback">{errors.topic}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fileUrl" className="form-label">File URL</label>
                                    <Field type="text" className={`form-control ${errors.fileUrl && touched.fileUrl ? 'is-invalid' : ''}`} id="fileUrl" name="fileUrl" />
                                    {errors.fileUrl && touched.fileUrl ? (
                                        <div className="invalid-feedback">{errors.fileUrl}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recordingUrl" className="form-label">Recording URL</label>
                                    <Field type="text" className={`form-control ${errors.recordingUrl && touched.recordingUrl ? 'is-invalid' : ''}`} id="recordingUrl" name="recordingUrl" />
                                    {errors.recordingUrl && touched.recordingUrl ? (
                                        <div className="invalid-feedback">{errors.recordingUrl}</div>
                                    ) : null}
                                </div>
                                <Button variant="primary" type="submit">Edit Content</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* view content modal */}
            <Modal
                show={showViewModal}
                onHide={handleCloseViewModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Week: 1</p>
                    <p>Topic: Introduction to Programming</p>
                    <p>File URL: <a href="#">Click here</a></p>
                    <p>Recording URL: <a href="#">Click here</a></p>
                </Modal.Body>
            </Modal>
        </>

    )
}

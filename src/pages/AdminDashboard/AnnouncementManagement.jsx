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


import AnnouncementList from "../../ToRemove/announcement.json";

export default function AnnouncementManagement() {

    const [announcementFilter, setAnnouncementFilter] = useState("");

    const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
    const [showEditAnnouncement, setShowEditAnnouncement] = useState(false);
    const [showViewAnnouncement, setShowViewAnnouncement] = useState(false);

    const handleCloseAddAnnouncement = () => setShowAddAnnouncement(false);
    const handleShowAddAnnouncement = () => setShowAddAnnouncement(true);

    const handleCloseEditAnnouncement = () => setShowEditAnnouncement(false);
    const handleShowEditAnnouncement = () => setShowEditAnnouncement(true);

    const handleCloseViewAnnouncement = () => setShowViewAnnouncement(false);
    const handleShowViewAnnouncement = () => setShowViewAnnouncement(true);

    function handleEditAnnouncement(announcement) {
        //set
        handleShowEditAnnouncement();
    }

    function handleViewAnnouncement(announcement) {
        //set
        handleShowViewAnnouncement();
    }

    const filteredAnnouncements = AnnouncementList.filter(announcement =>
        announcement.topic.toLowerCase().includes(announcementFilter.toLowerCase())
    );

    const announcementSchema = Yup.object().shape({
        topic: Yup.string().required('Topic is required'),
        description: Yup.string().required('Description is required'),
    });

    return (
        <>
            <Alert variant="secondary">
                <h3>Announcement Management</h3>
            </Alert>

            <div className="announcementList">
                <Row>
                    <Col xs={12}>
                        <FormBST>
                            <FormBST.Group className="mb-3">
                                <FormBST.Control
                                    type="text"
                                    placeholder="Search Announcement..."
                                    value={announcementFilter}
                                    onChange={(e) => setAnnouncementFilter(e.target.value)}
                                />
                            </FormBST.Group>
                        </FormBST>
                    </Col>
                    <Col xs={12}>
                        <Container fluid style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                            {
                                filteredAnnouncements.map((announcement, index) => (
                                    <Alert key={index} variant="light">
                                        <h5>{announcement.topic}</h5>
                                        <Button variant='info' onClick={() => {
                                            handleViewAnnouncement(announcement);
                                        }}>View</Button> &nbsp;
                                        <Button variant='success' onClick={() => {
                                            handleEditAnnouncement(announcement);
                                        }}>Edit</Button> &nbsp;
                                        <Button variant='danger'>Delete</Button>
                                    </Alert>
                                ))
                            }
                        </Container>
                        <Button variant="primary" className="mt-2 mb-2" onClick={handleShowAddAnnouncement}>Add</Button>
                    </Col>
                </Row>
            </div>

            {/* Add Announcement Modal */}
            <Modal
                show={showAddAnnouncement}
                onHide={handleCloseAddAnnouncement}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            topic: '',
                            description: '',
                        }}
                        validationSchema={announcementSchema}
                        onSubmit={(values) => {
                            // register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <Field type="text" className={`form-control ${errors.topic && touched.topic ? 'is-invalid' : ''}`} id="topic" name="topic" />
                                    {errors.topic && touched.topic ? (
                                        <div className="invalid-feedback">{errors.topic}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <Field as="textarea" className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`} id="description" name="description" />
                                    {errors.description && touched.description ? (
                                        <div className="invalid-feedback">{errors.description}</div>
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

            {/* Edit Announcement Modal */}
            <Modal
                show={showEditAnnouncement}
                onHide={handleCloseEditAnnouncement}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            topic: '',
                            description: '',
                        }}
                        validationSchema={announcementSchema}
                        onSubmit={(values) => {
                            // register(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="topic" className="form-label">Topic</label>
                                    <Field type="text" className={`form-control ${errors.topic && touched.topic ? 'is-invalid' : ''}`} id="topic" name="topic" />
                                    {errors.topic && touched.topic ? (
                                        <div className="invalid-feedback">{errors.topic}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <Field as="textarea" className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`} id="description" name="description" />
                                    {errors.description && touched.description ? (
                                        <div className="invalid-feedback">{errors.description}</div>
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

            {/* View Announcement Modal */}
            <Modal
                show={showViewAnnouncement}
                onHide={handleCloseViewAnnouncement}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="topic" className="form-label">Topic</label> - <span>Topic</span>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <p>Description</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

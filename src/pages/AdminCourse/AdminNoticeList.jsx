import React, { useState } from 'react';
import { Alert, Button, Row, Col, Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function AdminNoticeList({ notices }) {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  function handleEditModal(notice) {
    //set
    handleShowEditModal();
  }

  const noticeSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <>
      <Row>
        <Col md={10}>
          <h3>Notices</h3>
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={handleShowAddModal}>Add New Notice</Button>&nbsp;&nbsp;
        </Col>
      </Row>
      <ul className="mt-2">
        {notices.map((notice, index) => (
          <Alert variant="secondary" key={index}>
            <Row>
              <Col md={8}>
                <Alert.Heading>{notice.topic}</Alert.Heading>
              </Col>
              <Col md={4}>
                <Button variant="success" onClick={() => {
                  handleEditModal(notice)
                }}>Edit</Button>&nbsp;&nbsp;
                <Button variant="danger">Delete</Button>
              </Col>
            </Row>

            <hr />
            <p className="mb-0">
              {notice.description}
            </p>
          </Alert>
        ))}
      </ul>

      {/* Add Notice Modal */}
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              topic: '',
              description: '',
            }}
            validationSchema={noticeSchema}
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
                <Button variant="primary" type="submit">Add Notice</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Edit Notice Modal */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              topic: '',
              description: '',
            }}
            validationSchema={noticeSchema}
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
                <Button variant="primary" type="submit">Edit Notice</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

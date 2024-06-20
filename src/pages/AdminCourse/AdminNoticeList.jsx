import React, { useState } from 'react';
import { Alert, Button, Row, Col, Modal } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import NoticeService from '../../services/Notice.service';

export default function AdminNoticeList({ notices, courseId }) {

  const [seletedNotice, setSelectedNotice] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  function handleEditModal(notice) {
    setSelectedNotice(notice);
    handleShowEditModal();
  }

  const noticeSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    description: Yup.string().required('Description is required'),
  });

  async function addNotice(values) {
    values.course = courseId;
    try {
      const response = await NoticeService.createNotice(values);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Notice added successfully',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 2000
        });
        handleCloseAddModal();
        // getCourseData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editNotice(values) {
    values.course = courseId;
    try {
      const response = await NoticeService.updateNotice(seletedNotice._id, values);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Notice updated successfully',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 2000
        });
        handleCloseEditModal();
        // getCourseData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNotice(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this notice!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await NoticeService.deleteNotice(id);
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Notice deleted successfully',
              showCloseButton: false,
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              // getCourseData();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    )
  }

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
        {notices && (
          notices.map((notice, index) => (
            <Alert variant="secondary" key={index}>
              <Row>
                <Col md={8}>
                  <Alert.Heading>{notice.topic}</Alert.Heading>
                </Col>
                <Col md={4}>
                  <Button variant="success" onClick={() => {
                    handleEditModal(notice)
                  }}>Edit</Button>&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => {
                    deleteNotice(notice._id)
                  }}>Delete</Button>
                </Col>
              </Row>

              <hr />
              <p className="mb-0">
                {notice.description}
              </p>
            </Alert>
          ))
        )}

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
              addNotice(values);
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
              topic: seletedNotice.topic,
              description: seletedNotice.description,
            }}
            validationSchema={noticeSchema}
            onSubmit={(values) => {
              editNotice(values);
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

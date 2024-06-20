import React from 'react'
import {
  Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import StudentService from '../../services/Student.service';

export default function StudentLogin() {

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot be more than 20 characters')
  });

  async function login(values) {
    try {
      const response = await StudentService.login(values);
      if (!response.data.password) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
          footer: 'Please try again',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 2000
        });
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successful!',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.type);
          window.location.href = '/my-courses';
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <Formik
        initialValues={{
          email: 'randulam@gmail.com',
          password: '123456'
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} id="email" name="email" />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} id="password" name="password" />
              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

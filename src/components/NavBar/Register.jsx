import React from 'react'
import {
  Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import StudentService from '../../services/Student.service';


export default function Register() {

  const registerSchema = Yup.object().shape({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    contactNo: Yup.string().required('Contact number is required').min(10, 'Contact number must be at least 10 characters').max(10, 'Contact number cannot be more than 10 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password cannot be more than 20 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot be more than 20 characters')
  });

  async function register(values) {
    try {
      const response = await StudentService.createStudent(values);
      if (response.data.message === 'User already exists') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User already exists!',
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
          text: 'Registration successful!',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          const user = {
            email: values.email,
            password: values.password
          };
          StudentService.login(user).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.type);
            window.location.href = '/my-courses';
          });
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User already exists!',
        footer: 'Please enter a different email address',
        showCloseButton: false,
        showConfirmButton: false,
        timer: 2000
      });
    }
  }



  return (
    <>
      <Formik
        initialValues={{
          fname: 'John',
          lname: 'Doe',
          email: 'johndoe@gmail.com',
          contactNo: '0711234567',
          password: '123456',
          confirmPassword: ''
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          register(values);
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
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

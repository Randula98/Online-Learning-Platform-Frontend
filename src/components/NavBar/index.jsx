import React, { useState, useEffect } from 'react';
import {
    Container,
    Navbar,
    Nav,
    Button,
    Modal
} from 'react-bootstrap';

import cwlogo from '../../assets/images/cwlogo.png';

import Register from './Register';
import StudentLogin from './StudentLogin';

export default function NavBar() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
        setUser(localStorage.getItem('user'));

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {user === 'admin' ? (
                        <Navbar.Brand href="/admin">
                            <img
                                src={cwlogo}
                                className="d-inline-block align-top"
                                alt="Course Work Online Learning"
                            />
                        </Navbar.Brand>
                    ) : (
                        <Navbar.Brand href="/">
                            <img
                                src={cwlogo}
                                className="d-inline-block align-top"
                                alt="Course Work Online Learning"
                            />
                        </Navbar.Brand>
                    )}
                    < Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user === 'admin' ? (
                                <Nav.Link href="/admin">Admin Dashboard</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link href="/courses">Courses</Nav.Link>
                                    <Nav.Link href="/my-courses">My Courses</Nav.Link>
                                    <Nav.Link href="/announcements">Announcements</Nav.Link>
                                </>
                            )}

                        </Nav>
                        <Nav className="ms-auto">
                            {!isLoggedIn && (
                                <>
                                    <Nav.Item>
                                        <Button variant="outline-dark" onClick={handleShowRegister}>
                                            Register
                                        </Button>
                                    </Nav.Item>
                                    &nbsp;&nbsp;
                                    <Nav.Item>
                                        <Button variant="outline-dark" onClick={handleShowLogin}>
                                            Login
                                        </Button>
                                    </Nav.Item>
                                </>
                            )}
                            {isLoggedIn && (
                                <Nav.Item>
                                    <Button variant="outline-dark" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Register Modal */}
            <Modal
                show={showRegister}
                onHide={handleCloseRegister}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Student Portal Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* login Modal */}
            <Modal
                show={showLogin}
                onHide={handleCloseLogin}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Student Portal Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentLogin />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

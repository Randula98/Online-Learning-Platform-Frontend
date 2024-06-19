import React, { useState } from 'react';
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

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={cwlogo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/courses">Courses</Nav.Link>
                            <Nav.Link href="/courses">My Courses</Nav.Link>
                            <Nav.Link href="/courses">Announcements</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
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

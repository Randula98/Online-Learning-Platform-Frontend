import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import cwlogo from '../../assets/images/cwlogo.png';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img src={cwlogo} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#academic-year">Academic Year</Nav.Link>
                        <Nav.Link href="#degree">Specializations</Nav.Link>
                        <Nav.Link href="#degree">Announcements</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Item>
                            <Button variant="outline-dark">
                                Register
                            </Button>
                        </Nav.Item>
                        &nbsp;&nbsp;
                        <Nav.Item>
                            <Button variant="outline-dark">
                                Login
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

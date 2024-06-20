import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';

import AdminLogin from './AdminLogin';

export default function Footer() {

  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };


  return (

    <>
      <footer className="bg-light text-dark py-3 mt-4">
        <Container>
          <hr className="mt-2 mb-3" />
          <p className="text-center">&copy; {new Date().getFullYear()} Course Work Online Learning (E-Learning) Platoform
            {isLoggedIn && (
              <Button variant="outline-dark" onClick={handleLogout} className="float-end">
                Logout
              </Button>
            )}
            {!isLoggedIn && (
              <Button variant="outline-dark" onClick={handleShowLogin} className="float-end">
                Admin Login
              </Button>
            )}
          </p>
        </Container>
      </footer>

      {/* login Modal */}
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Admin Portal Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminLogin />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
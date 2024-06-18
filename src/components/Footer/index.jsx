import React from 'react'
import { Container} from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light text-dark py-3 mt-4">
      <Container>
        <hr className="mt-2 mb-3" />
        <p className="text-center">&copy; {new Date().getFullYear()} Course Work Online Learning (E-Learning) Platoform</p>
      </Container>
    </footer>
  )
}

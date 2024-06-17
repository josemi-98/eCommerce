import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const saveDataToLocalStorage = () => {
    localStorage.setItem('userData', JSON.stringify({ name, email }));
  };

  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name);
      setEmail(parsedData.email);
    }
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`Nombre: ${name}, Email: ${email}`);
    saveDataToLocalStorage(); 
    setShowLogoutMessage(true);
    onLogin(name); 
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Iniciar Sesión
                </Button>
                {showLogoutMessage && name !== "" && (
                  <p>{`¿Quieres cerrar sesión, ${name}?`}</p>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginForm;

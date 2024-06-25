import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const { isLoggedIn, handleLogin } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const nombre = form.nombre.value;
        const email = form.email.value;

        if (nombre && email) {
            handleLogin({ name: nombre, email });
            form.reset();
        } else {
            alert("Por favor complete todo los campos");
        }

        const destination = location.state?.pathname || "/";
            navigate(destination);
    };

    return (
        <Container className="mt-5">
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
                                        name="nombre"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa tu email"
                                        name="email"
                                    />
                                </Form.Group>

                                {!isLoggedIn && (
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mt-3"
                                    >
                                        Iniciar Sesión
                                    </Button>
                                )}
                            </Form>
                            
                        <Link to={"/"} style={{ textDecoration: 'none' }}>Volver </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;

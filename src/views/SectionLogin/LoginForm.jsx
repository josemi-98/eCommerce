import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./LoginForm.css";

const LoginForm = () => {
    const { isLoggedIn, handleLogin } = useAuth();
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        const { nombre, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setError("confirmPassword", {
                message: "Las contraseñas no coinciden",
            });
            return;
        }

        if (!handleEmailValidation()){
            return;
        }

        if (nombre && email) {
            handleLogin({ name: nombre, email, password, confirmPassword });
            const destination = location.state?.pathname || "/";
            navigate(destination);
        }
        console.log(data);
    };

    const handleEmailValidation = () => {
        const email = watch("email");

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)) {
            setError("email", {
                message: "Ingrese una dirección de correo electrónico válido."
            });
        } else {
            setError("email", {
                message: ""
            })
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa tu nombre"
                                        className="mb-2"
                                        {...register("nombre", {
                                            required: "Por favor, ingrese su nombre.",
                                            minLength: {
                                                value: 4,
                                                message: "El nombre debe tener al menos 4 caracteres."
                                            },
                                            maxLength: {
                                                value: 40,
                                                message: "El nombre no debe exceder los 40 caracteres."
                                            }
                                        })}
                                    />
                                    {errors.nombre && <Form.Text className="m-2 error-text">{errors.nombre.message}</Form.Text>}
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label className="mt-2">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa tu email"
                                        className="mb-2"
                                        {...register("email", {
                                            required: "Por favor, ingrese su email.",
                                        })}
                                        onBlur={handleEmailValidation} 
                                    />
                                    {errors.email && (
                                        <Form.Text className="m-2 error-text">{errors.email.message}</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formContraseña">
                                    <Form.Label className="mt-2">Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        className="mb-2"
                                        {...register("password", {
                                            required: "Por favor, ingrese su contraseña.",
                                            minLength: {
                                                value: 6,
                                                message: "La contraseña debe tener al menos 6 caracteres"
                                            }
                                        })}
                                    />
                                    {errors.password && (
                                        <Form.Text className="m-2 error-text">{errors.password.message}</Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formContraseñaRepeat">
                                    <Form.Label className="mt-2">Repite contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        className="mb-2"
                                        {...register("confirmPassword", {
                                            required: "Por favor, repita su contraseña",
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <Form.Text className="m-2 error-text">{errors.confirmPassword.message}</Form.Text>
                                    )}
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
                            <Link to={"/"} style={{ textDecoration: 'none' }}>Volver</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;

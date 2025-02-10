import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
});

export const RegisterPage = () =>
{
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validation) });

    const handleRegister = (form) =>
    {
        registerUser(form.userName, form.email, form.password);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4 lime-green">
                                Sign in to your account
                            </Card.Title>
                            <Form onSubmit={handleSubmit(handleRegister)}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        autoComplete="off"
                                        {...register("userName")}
                                    />
                                    {errors.userName && <p className="text-danger">{errors.userName.message}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        autoComplete="off"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                    />
                                </Form.Group>
                                <div className="mb-3">
                                    <a href="#" className="text-decoration-none blue">
                                        Forgot password?
                                    </a>
                                </div>
                                <Button type="submit" className="w-100 bg-lime-green border-lime-green">
                                    Sign up
                                </Button>
                                <p className="mt-3 text-center">
                                    Already registered?&nbsp;
                                    <NavLink to="/login" className="blue text-decoration-none">
                                        Sign in
                                    </NavLink>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

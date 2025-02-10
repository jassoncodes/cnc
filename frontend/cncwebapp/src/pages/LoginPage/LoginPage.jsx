import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

export const LoginPage = () =>
{
    const location = useLocation();
    const { loginUser, isLoggedIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validation) });

    const handleLogin = (form) =>
    {
        loginUser(form.userName, form.password);
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
                            <Form onSubmit={handleSubmit(handleLogin)}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        {...register("userName")}
                                    />
                                    {errors.userName && <p className="text-danger">{errors.userName.message}</p>}
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
                                    Sign in
                                </Button>
                                <p className="mt-3 text-center">
                                    Don't have an account yet?&nbsp;
                                    <NavLink to="/register" className="blue text-decoration-none">
                                        Sign up
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

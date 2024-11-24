import { Col, Navbar, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import logo from "../../assets/logo-cnc.png"

export const AppHeader = () =>
{
    return (
        <Row as='header'>
            <Col sm='12' xs='12' md='12' className="my-4 p-3 border rounded shadow-sm bg-body">
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand as='div'>
                        {/* <img src={logo} alt="" className="w-25"></img> */}
                        <NavLink to='/' className="nav-link nav-item fs-2 fw-bold justify-content-lg-center">
                            <img src={logo} className="cnc-logo"></img>
                        </NavLink>
                    </Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link nav-item">About</NavLink>
                            </Nav>
                        </Navbar.Collapse> */}
                </Navbar>
            </Col>
        </Row>
    )
}

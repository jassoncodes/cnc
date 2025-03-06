import { Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/useAuth"


export const SideBar = () =>
{
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <Container>
            <Row className="d-none d-lg-block">
                <h4>Menu</h4>
            </Row>
            <Row>
                <Navbar collapseOnSelect expand='lg' variant>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-side-navbar-nav" />
                        <Navbar.Collapse id="responsive-side-navbar-nav">
                            <Nav className="flex-column me-auto">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="text-white">
                                        <i className="bi-gear"></i>&nbsp;
                                        Mantenimientos
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as='li'>
                                            <NavLink to={'/pacientes'} className='nav-link'>
                                                <i className="bi bi-person"></i>&nbsp;Pacientes
                                            </NavLink>
                                        </Dropdown.Item>
                                        <Dropdown.Item as='li'>
                                            <NavLink to={'/pacientes'} className='nav-link'>
                                                <i className="bi bi-person-badge"></i>&nbsp;Especialistas
                                            </NavLink>
                                        </Dropdown.Item>
                                        <Dropdown.Item as='li'>
                                            <NavLink to={'/pacientes'} className='nav-link'>
                                                <i className="bi bi-file-medical"></i>&nbsp;Especialidades
                                            </NavLink>
                                        </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
            <Row>
                <Link onClick={logout} className="text-decoration-none blue">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>
                        &nbsp;Logout
                    </span>
                </Link>
            </Row>
        </Container>
    )
}

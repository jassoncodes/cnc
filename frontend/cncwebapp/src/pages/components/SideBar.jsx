import { Container, Dropdown, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

export const SideBar = () =>
{
    return (
        <>
            <Row className="d-none d-lg-block">
                <h4 className="">Menu</h4>
            </Row>
            <Row>
                <Navbar expand="lg" className="p-0">
                    <Container fluid className="p-2">
                        <Navbar.Toggle aria-controls="side-navbar" />
                        <Navbar.Collapse id="side-navbar" >
                            <Nav>
                                <NavDropdown
                                    id="dropdown-basic"
                                    title="Mantenimientos"
                                >
                                    {/* <i className="bi-gear"></i>&nbsp; */}
                                    <NavDropdown.Item as='li'>
                                        <NavLink to={'/pacientes'} className='nav-link'>
                                            <i className="bi bi-person"></i>&nbsp;Pacientes
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as='li'>
                                        <NavLink to={'/pacientes'} className='nav-link'>
                                            <i className="bi bi-person-badge"></i>&nbsp;Especialistas
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as='li'>
                                        <NavLink to={'/pacientes'} className='nav-link'>
                                            <i className="bi bi-file-medical"></i>&nbsp;Especialidades
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </>
    )
}

import { Col, Navbar, Row } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

import logo from "../../assets/logo-cnc.png"
import { useAuth } from "../../context/useAuth"

export const AppHeader = () =>
{
    const { isLoggedIn, logout } = useAuth();
    const classList = isLoggedIn() ? "my-3 p-2 border rounded shadow-sm bg-body" : "my-4 p-4";
    return (
        <Row as='header' className={classList}>
            <Col className={!isLoggedIn() && `text-center`}>
                <NavLink to='/' className="nav-link nav-item">
                    <img src={logo} className="cnc-logo"></img>
                </NavLink>
            </Col>
            {isLoggedIn() &&
                <Col className="align-content-center text-end">
                    <Link onClick={logout} className="text-decoration-none blue fs-5">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>
                            &nbsp;Logout
                        </span>
                    </Link>
                </Col>
            }
        </Row>
    )
}

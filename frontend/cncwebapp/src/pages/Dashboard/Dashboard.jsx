import { Col, Container, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { SideBar } from "../components/SideBar"


export const Dashboard = () =>
{
    return (
        <Row as='main'>
            <Col lg="2" className="p-3 border-end shadow-sm-end bg-white-seasalt">
                <SideBar />
            </Col>
            <Col lg="10" className="p-3 min-vh-75">
                <Outlet />
            </Col>
        </Row>
    )
}

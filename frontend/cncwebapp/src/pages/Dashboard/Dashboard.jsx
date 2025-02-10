import { Col, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { SideBar } from "../../components/SideBard"


export const Dashboard = () =>
{
    return (
        <Row as='main'>
            <Col lg='2' className="p-3 border-end shadow-sm-end bg-white-seasalt">
                <SideBar />
            </Col>
            <Col lg='10' className="p-3">
                <Outlet />
            </Col>
        </Row>
    )
}

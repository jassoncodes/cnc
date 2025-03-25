import { Col, Row } from "react-bootstrap"


export const AppFooter = () =>
{
    return (
        <Row as='footer' className="mt-2 py-3">
            <Col className="pb-2 text-center">
                <span className="fw-bold">CNC &copy; 2024</span>
            </Col>
        </Row>
    )
}

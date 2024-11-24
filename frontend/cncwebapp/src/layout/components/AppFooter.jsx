import { Col, Row } from "react-bootstrap"


export const AppFooter = () =>
{
    return (
        <Row as='footer' className="mt-2 py-3">
            <Col className="pb-2">
                <span className="fw-bold">Footer</span>
            </Col>
        </Row>
    )
}

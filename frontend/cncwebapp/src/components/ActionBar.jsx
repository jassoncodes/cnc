import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { Search } from './Search';

export const ActionBar = ({ onCreate, barTitle, barIcon, createDisabled, onSearch }) =>
{
    return (
        <Navbar className="bg-body-tertiary rounded p-2 justify-content-between">
            <div className="d-flex gap-3">
                <h4><i className={barIcon}></i>&nbsp;{barTitle}</h4>

                {/** Add button */}
                <Button onClick={onCreate} disabled={createDisabled}>
                    <i className={`white ` + barIcon}></i>
                    <span className="white">
                        &nbsp;Agregar
                    </span>
                </Button>

            </div>
            <Form inline="true">
                <Row>
                    <Col xs="auto">
                        <Search onSearch={onSearch} />
                    </Col>
                </Row>
            </Form>
        </Navbar>
    )
}

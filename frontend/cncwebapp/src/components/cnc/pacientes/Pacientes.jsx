import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { camelCaseToCapitalCase } from "../../../utils";
import { TableList } from "../components/TableList";
import { ActionBar } from "../components/ActionBar";

const api_host = import.meta.env.VITE_API_HOST;
const api_port = import.meta.env.VITE_API_PORT;
const api_root = import.meta.env.VITE_API_ROOT;

const api_base = `${api_host}:${api_port}/${api_root}`;

export const Pacientes = ({ route }) =>
{
    const apiRoute = `${api_base}/${route}`;
    const [pacientes, setPacientes] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [errors, setErrors] = useState("");

    const getPacientesAsync = async () =>
    {
        const reqData = await fetch(apiRoute);
        if (reqData.status === 404)
        {
            setErrors("Not found");
        }

        const data = await reqData.json();

        const tHeader = Object.keys(data[0]).map(key =>
        {
            return camelCaseToCapitalCase(key);
        });

        setPacientes(data);
        setTableHeaders(tHeader);
    }

    useEffect(() =>
    {
        getPacientesAsync();
    }, []);


    return (
        <Container>
            <h4><i className="bi bi-person"></i>&nbsp;Pacientes</h4>
            <ActionBar />
            <TableList tableHeaders={tableHeaders} tableValues={pacientes} />
        </Container>
    )
}


Pacientes.protoTypes = {
    route: PropTypes.string.isRequired,
};
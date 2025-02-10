import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { TableList } from "../../components/TableList";
import { ActionBar } from "../../components/ActionBar";
import { getPacientesAsync, createPacienteAsync, getPacientesByIdAsync } from "../../services/PacientesService";
import { FormPacientes } from "./components/FormPacientes";
import { toast } from "react-toastify";
import { PACIENTES_TABLE_HEADERS } from "../../utils/TableHeaders";


export const Pacientes = ({ route }) =>
{
    const [pacientes, setPacientes] = useState([]);
    const [pacienteById, setPacienteById] = useState();
    const [errors, setErrors] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getPacientes = async () =>
    {
        const reqData = await getPacientesAsync(route);

        if (reqData.status === 404)
        {
            setErrors("Not found");
        } else if (reqData.status === 401)
        {
            setErrors("Unauthorized");
        }

        if (reqData.data.length === 0)
        {
            setErrors("No se ha encontrado ningún paciente");
            return;
        }
        const data = await reqData.data;

        setPacientes(data);
    }

    const createPaciente = async (patientData) =>
    {
        try
        {
            const response = await createPacienteAsync(route, patientData);
            if (response.status === 201)
            {
                setIsCreating(!isCreating);
            }
            toast.success(`Se ha registrado al paciente \n${patientData.nombre} ${patientData.apellido}`)
        } catch (error)
        {
            setErrors("Error al crear paciente: ", error);
            console.log("Pacientes.jsx Error al crear paciente: ", error)
        }
    }

    const handleDoubleClick = async (elementClicked) =>
    {
        if (isCreating)
        {
            console.log("Editando informacion de paciente: ", elementClicked);
        }
        const res = await getPacientesByIdAsync(route, elementClicked);
        const pacienteData = res.data;
        setPacienteById(pacienteData);
        setIsCreating(!isCreating);
        console.log(res.data)
    }

    const handleSubmit = (isCreating) =>
    {
        if (isCreating)
        {
            console.log("esta creando un paciente");
        } else
        {
            console.log("esta editando un paciente");
        }
    }

    const handleCancel = () =>
    {
        setIsCreating(!isCreating);
        setPacienteById();
    }

    const handleDelete = (pacienteId) =>
    {
        console.log("Borrar paciente: ", pacienteId);
    }

    useEffect(() =>
    {
        getPacientes();

    }, [isCreating]);


    return (
        <Container>
            <ActionBar barTitle="Pacientes" barIcon="bi bi-person" onCreate={() => setIsCreating(!isCreating)} />
            {
                isCreating ? (
                    <FormPacientes
                        onSubmit={async (patientData) => createPaciente(patientData)}
                        onCancel={handleCancel}
                        onDelete={(pacienteId) => (handleDelete(pacienteId))}
                        editPaciente={pacienteById}
                    />
                ) : (
                    errors ? (
                        <Container className="mt-4">
                            <Row>
                                <Col><h5 className="blue">{errors}</h5>
                                </Col>
                            </Row>
                        </Container>
                    ) :
                        (
                            <TableList
                                tableHeaders={PACIENTES_TABLE_HEADERS}
                                tableValues={pacientes}
                                onDoubleClick={async (elementClicked) => handleDoubleClick(elementClicked)}
                            />
                        )
                )
            }
        </Container>
    )
}


Pacientes.protoTypes = {
    route: PropTypes.string.isRequired,
};
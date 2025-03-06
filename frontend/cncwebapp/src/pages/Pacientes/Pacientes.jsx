import PropTypes, { string } from "prop-types";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { TableList } from "../../components/TableList";
import { ActionBar } from "../../components/ActionBar";
import { getPacientesAsync, createPacienteAsync, getPacientesByIdAsync, updatePacienteAsync, deactivatePacienteAsync } from "../../services/PacientesService";
import { FormPacientes } from "./components/FormPacientes";
import { toast } from "react-toastify";
import { PACIENTES_TABLE_HEADERS } from "../../utils/TableHeaders";
import { json } from "react-router-dom";


export const Pacientes = () =>
{
    const [pacientes, setPacientes] = useState([]);
    const [pacienteById, setPacienteById] = useState([]);
    const [errors, setErrors] = useState("");
    const [formMode, setFormMode] = useState("")
    // const [isCreating, setIsCreating] = useState(false);
    // const [isEditing, setIsEdigint] = useState(false);

    const getPacientes = async () =>
    {
        try
        {
            const reqData = await getPacientesAsync();

            if (reqData.status === 404)
            {
                throw new Error("No se encontraron datos");
            }

            if (reqData.status === 200)
            {
                const data = await reqData.data;
                setPacientes(prev => data)
            }

        } catch (error)
        {
            setErrors(`${error}`)
        }
    }

    const createPaciente = async (patientData) =>
    {
        try
        {
            const response = await createPacienteAsync(patientData);
            if (response.status !== 201)
            {
                throw new Error("No se ha podido crear al paciente")
            }
            toast.success(`Se ha registrado al paciente \n${patientData.nombre} ${patientData.apellido}`)
        } catch (error)
        {
            setErrors(`${error}`);
        }
    }

    const updatePaciente = async (pacienteId, pacientData) =>
    {
        try
        {
            const response = await updatePacienteAsync(pacienteId, pacientData);
            if (response.status !== 204)
            {
                throw new Error("No se pudo actualizar el paciente: ");
            }
            toast.success(`Se ha editado la informacion del pciente \n${pacientData.nombre} ${pacientData.apellido}`)
        } catch (error)
        {
            setErrors(`${error}`);
        }
    }

    const deactivePacient = async (pacienteId) =>
    {
        try
        {
            const response = await deactivatePacienteAsync((pacienteId));
            if (response.status !== 200)
            {
                throw new Error("No se ha podido desactivar al paciente");
            }
            toast.success(response.data.message);
        } catch (error)
        {
            setErrors(`${error}`);
        }
    }

    const clear = () =>
    {
        setFormMode("");
        setPacienteById(prev => []);
    }

    const handleDoubleClick = async (elementClicked) =>
    {

        setFormMode("edit");
        const res = await getPacientesByIdAsync(elementClicked);
        const pacienteData = res.data;
        setPacienteById(prev =>
        {
            return pacienteData;
        });
    }

    const handleCancel = () =>
    {
        clear();
    }

    const handleSubmit = async (pacientData) =>
    {
        if (formMode === "create")
        {
            await createPaciente(pacientData);
        } else
        {
            await updatePaciente(pacienteById.id, pacientData)

        }
        clear();
    }

    const handleDelete = async (pacienteId) =>
    {
        await deactivePacient(pacienteId);
        clear();
    }

    const handleSearch = (searchValue) =>
    {
        if (Array.from(searchValue).length >= 3)
        {
            console.log("Buscando: ", searchValue)
        }
        console.log(pacientes)

        //change map for something else
        const filteredData = pacientes.map((paciente) =>
        {
            if (String(paciente.nombre).includes(searchValue))
            {
                return paciente
            }
        })
        console.log(filteredData)
    }

    useEffect(() =>
    {
        getPacientes();

    }, [formMode]);


    return (
        <Container>
            <ActionBar
                barTitle="Pacientes"
                barIcon="bi bi-person"
                onCreate={() => setFormMode("create")}
                createDisabled={formMode ? true : false}
                onSearch={handleSearch}
            />
            {
                formMode /** "edit" or "create" **/ ? (
                    <FormPacientes
                        onSubmit={async (patientData) => handleSubmit(patientData)}
                        onCancel={handleCancel}
                        onDelete={async (pacienteId) => handleDelete(pacienteId)}
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
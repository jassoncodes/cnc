import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { TableList } from "../../components/TableList";
import { ActionBar } from "../../components/ActionBar";
import { getPacientesAsync, createPacienteAsync, getPacientesByIdAsync, updatePacienteAsync, deactivatePacienteAsync } from "../../services/PacientesService";
import { FormPacientes } from "./components/FormPacientes";
import { toast } from "react-toastify";
import { PACIENTES_TABLE_HEADERS } from "../../utils/TableHeaders";

//editPaciente is null error pendiente

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

            if (reqData.status === 200)
            {
                const data = await reqData.data;
                setPacientes(prev =>
                {
                    return data
                })
            }
        } catch (error)
        {
            setErrors("Error al obtener datos: ", error)
        }
    }

    const createPaciente = async (patientData) =>
    {
        try
        {
            const response = await createPacienteAsync(patientData);
            if (response.status === 201)
            {
                setFormMode("");
            }
            toast.success(`Se ha registrado al paciente \n${patientData.nombre} ${patientData.apellido}`)
        } catch (error)
        {
            setErrors("Error al crear paciente: ", error);
            console.error("Pacientes.jsx Error al crear paciente: ", error)
        }
    }

    const updatePaciente = async (pacienteId, pacientData) =>
    {
        try
        {
            const response = await updatePacienteAsync(pacienteId, pacientData);
            if (response.status === 201)
            {
                setFormMode("");
            }
            toast.success(`Se ha editado la informacion del pciente \n${pacientData.nombre} ${pacientData.apellido}`)
        } catch (error)
        {
            setErrors("Error al editar paciente: ", error);
            console.error("Pacientes.jsx Error al crear paciente: ", error)
        }
    }

    const deactivePacient = async (pacienteId) =>
    {
        try
        {
            const response = await deactivatePacienteAsync((pacienteId));
            if (response.status === 200)
            {
                toast.success(response.data.message);
            }
        } catch (error)
        {
            console.error("Error al desactivar paciente: ", error)
        }
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

        console.log("Editando data del paciente: ", res.data.id)
    }

    const handleCancel = async () =>
    {

        setFormMode("");
        setPacienteById();
    }

    const handleSubmit = async (pacientData) =>
    {
        if (formMode === "create")
        {
            console.log("crear paciente: ", pacientData)
            await createPaciente(pacientData);
        } else
        {
            await updatePaciente(pacienteById.id, pacientData)
            setFormMode("")
            setPacienteById();
        }
    }

    const handleDelete = async (pacienteId) =>
    {
        await deactivePacient(pacienteId);
        setFormMode("");
        setPacienteById();
    }

    useEffect(() =>
    {
        getPacientes();
    }, [formMode]);


    return (
        <Container>
            <ActionBar barTitle="Pacientes" barIcon="bi bi-person" onCreate={() => setFormMode("create")} createDisabled={formMode ? true : false} />
            {
                formMode /** "edit" or "create" **/ ? (
                    <FormPacientes
                        onSubmit={async (patientData) => handleSubmit(patientData)}
                        onCancel={async () => handleCancel()}
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